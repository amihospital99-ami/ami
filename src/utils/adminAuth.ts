import { supabase } from './supabase';

const ADMIN_STORAGE_KEY = 'ami_hospital_admin_single_account';
const SESSION_STORAGE_KEY = 'ami_hospital_admin_session';

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
  role: 'hospital_admin';
}

// SHA-256 hash using native Web Crypto API
export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Checks if an admin account already exists (Single Slot Rule)
export async function checkAdminAccountExists(): Promise<boolean> {
  // 1. Check local backup cache first
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && parsed.email) return true;
      } catch (e) {}
    }
  }

  // 2. Check Supabase 'admin_users' table
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email')
      .limit(1);

    if (!error && data && data.length > 0) {
      // Sync to local cache
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          ADMIN_STORAGE_KEY,
          JSON.stringify({ email: data[0].email, id: data[0].id })
        );
      }
      return true;
    }
  } catch (err) {
    console.warn('Could not query admin_users from Supabase:', err);
  }

  return false;
}

// Registers the single admin account. Rejects if an admin account already exists!
export async function registerSingleAdmin(
  name: string,
  email: string,
  plainPassword: string
): Promise<{ success: boolean; error?: string; account?: AdminAccount }> {
  const alreadyExists = await checkAdminAccountExists();
  if (alreadyExists) {
    return {
      success: false,
      error: 'The single admin slot has already been claimed. New registrations are permanently disabled.',
    };
  }

  if (!email || !email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!plainPassword || plainPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const passwordHash = await hashPassword(plainPassword);
  const newAccount: AdminAccount = {
    id: 'admin-' + Math.floor(100000 + Math.random() * 900000),
    name: name.trim() || 'Hospital Administrator',
    email: email.trim().toLowerCase(),
    password_hash: passwordHash,
    created_at: new Date().toISOString(),
    role: 'hospital_admin',
  };

  // 1. Persist locally
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(newAccount));
    // Auto-login after registration
    localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        role: newAccount.role,
        loggedInAt: new Date().toISOString(),
      })
    );
  }

  // 2. Try inserting into Supabase 'admin_users' table
  try {
    await supabase.from('admin_users').insert([
      {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        password_hash: passwordHash,
        role: 'hospital_admin',
        created_at: newAccount.created_at,
      },
    ]);
  } catch (err) {
    console.warn('Supabase admin_users sync notice:', err);
  }

  return { success: true, account: newAccount };
}

// Log in admin
export async function loginAdmin(
  email: string,
  plainPassword: string
): Promise<{ success: boolean; error?: string; user?: any }> {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await hashPassword(plainPassword);

  // 1. Check Supabase first
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', normalizedEmail)
      .limit(1);

    if (!error && data && data.length > 0) {
      const user = data[0];
      if (user.password_hash === passwordHash) {
        const session = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'hospital_admin',
          loggedInAt: new Date().toISOString(),
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        }
        return { success: true, user: session };
      }
    }
  } catch (err) {
    console.warn('Supabase login check notice:', err);
  }

  // 2. Check local fallback account
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored) {
      try {
        const account: AdminAccount = JSON.parse(stored);
        if (account.email.toLowerCase() === normalizedEmail) {
          if (account.password_hash === passwordHash) {
            const session = {
              id: account.id,
              name: account.name,
              email: account.email,
              role: account.role,
              loggedInAt: new Date().toISOString(),
            };
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
            return { success: true, user: session };
          } else {
            return { success: false, error: 'Incorrect password. Please try again.' };
          }
        }
      } catch (e) {}
    }
  }

  return { success: false, error: 'Invalid admin credentials or account not found.' };
}

// Get active session
export function getAdminSession(): any | null {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch (e) {
    return null;
  }
}

// Logout admin
export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}
