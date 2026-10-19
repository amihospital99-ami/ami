import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://rrnffijgokezhtqfhblv.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_RjTFu6KewhkEKy17CON8Pw_Pe7TCPK8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY_FALLBACK());

function SUPABASE_KEY_FALLBACK(): string {
  return SUPABASE_ANON_KEY;
}

export interface SupabaseAppointmentInput {
  reference_id: string;
  patient_name: string;
  phone: string;
  condition?: string;
  branch?: string;
  preferred_date?: string;
  preferred_time?: string;
  female_doctor_requested?: boolean;
  notes?: string;
  source?: string;
}

export interface SupabaseSaveResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function saveAppointmentToSupabase(
  input: SupabaseAppointmentInput
): Promise<SupabaseSaveResult> {
  try {
    // 1. Always store locally in backup cache
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('ami_local_appointments') || '[]');
      existing.unshift({
        ...input,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('ami_local_appointments', JSON.stringify(existing.slice(0, 50)));
    }

    // 2. Insert into Supabase 'appointments' table
    const payload = {
      reference_id: input.reference_id,
      patient_name: input.patient_name,
      phone: input.phone,
      condition: input.condition || 'Laser Piles Surgery (LHP)',
      branch: input.branch || 'Main Center (Sector 12)',
      preferred_date: input.preferred_date || null,
      preferred_time: input.preferred_time || null,
      female_doctor_requested: Boolean(input.female_doctor_requested),
      notes: input.notes || null,
      source: input.source || 'website_form',
      status: 'pending',
    };

    const { data, error } = await supabase.from('appointments').insert([payload]).select();

    if (error) {
      console.warn('Supabase insert notice:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    console.error('Unexpected Supabase connection error:', err);
    return {
      success: false,
      error: err?.message || 'Connection error',
    };
  }
}

export async function fetchRecentAppointments(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.warn('Could not fetch from Supabase table:', error.message);
      // Fallback to local storage cache
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('ami_local_appointments') || '[]');
      }
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching appointments:', err);
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('ami_local_appointments') || '[]');
    }
    return [];
  }
}

export async function updateAppointmentStatus(
  refOrId: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Update in Supabase
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .or(`reference_id.eq.${refOrId},id.eq.${refOrId}`);

    if (error) {
      console.warn('Supabase status update error:', error.message);
    }

    // 2. Also update in local storage backup
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('ami_local_appointments') || '[]');
      const updated = existing.map((item: any) =>
        item.reference_id === refOrId || item.id === refOrId
          ? { ...item, status: newStatus }
          : item
      );
      localStorage.setItem('ami_local_appointments', JSON.stringify(updated));
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/rrnffijgokezhtqfhblv/sql)

-- 1. Create appointments table
create table if not exists public.appointments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  reference_id text,
  patient_name text not null,
  phone text not null,
  condition text,
  branch text,
  preferred_date text,
  preferred_time text,
  female_doctor_requested boolean default false,
  notes text,
  status text default 'pending',
  source text default 'website_form'
);

-- Enable Row Level Security (RLS) for appointments
alter table public.appointments enable row level security;

create policy "Allow anonymous appointment booking"
  on public.appointments
  for insert
  with check (true);

create policy "Allow reading appointments"
  on public.appointments
  for select
  using (true);

create policy "Allow updating appointment status"
  on public.appointments
  for update
  using (true);

-- 2. Create single-slot admin users table
create table if not exists public.admin_users (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text default 'hospital_admin'
);

alter table public.admin_users enable row level security;

create policy "Allow admin account registration and login"
  on public.admin_users
  for all
  using (true)
  with check (true);
`;
