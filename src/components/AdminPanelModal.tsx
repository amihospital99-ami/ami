import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  UserCheck,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Database,
  ExternalLink,
  ChevronDown,
  User,
  Mail,
  KeyRound,
  FileSpreadsheet,
} from 'lucide-react';
import {
  checkAdminAccountExists,
  registerSingleAdmin,
  loginAdmin,
  getAdminSession,
  logoutAdmin,
  AdminAccount,
} from '../utils/adminAuth';
import {
  fetchRecentAppointments,
  updateAppointmentStatus,
  SUPABASE_SETUP_SQL,
  SUPABASE_URL,
} from '../utils/supabase';
import { openWhatsApp } from '../utils/whatsapp';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  // Auth states
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Dashboard states
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ladyDoctorFilter, setLadyDoctorFilter] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showSqlSetup, setShowSqlSetup] = useState(false);

  // Check auth and single-slot status when opening modal
  useEffect(() => {
    if (isOpen) {
      initAuthStatus();
    }
  }, [isOpen]);

  const initAuthStatus = async () => {
    const activeSession = getAdminSession();
    setSession(activeSession);

    const exists = await checkAdminAccountExists();
    setAdminExists(exists);

    // If no admin exists yet, default to register tab so the admin can claim the single slot!
    if (!exists && !activeSession) {
      setAuthMode('register');
    } else {
      setAuthMode('login');
    }

    if (activeSession) {
      loadAppointments();
    }
  };

  const loadAppointments = async () => {
    setLoadingData(true);
    const data = await fetchRecentAppointments();
    setAppointments(data);
    setLoadingData(false);
  };

  if (!isOpen) return null;

  // Single-Slot Admin Registration Handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (regPassword !== regConfirmPassword) {
      setAuthError('Passwords do not match. Please re-enter.');
      return;
    }

    setSubmittingAuth(true);
    const result = await registerSingleAdmin(regName, regEmail, regPassword);
    setSubmittingAuth(false);

    if (result.success) {
      setAuthSuccess('✓ Single Admin Account registered successfully! Slot is now locked.');
      setAdminExists(true);
      const activeSession = getAdminSession();
      setSession(activeSession);
      loadAppointments();
    } else {
      setAuthError(result.error || 'Failed to register admin account.');
    }
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setSubmittingAuth(true);

    const result = await loginAdmin(loginEmail, loginPassword);
    setSubmittingAuth(false);

    if (result.success) {
      setSession(result.user);
      loadAppointments();
    } else {
      setAuthError(result.error || 'Invalid email or password.');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    logoutAdmin();
    setSession(null);
    setAuthMode('login');
  };

  // Status Change Handler
  const handleStatusChange = async (refOrId: string, newStatus: string) => {
    setUpdatingId(refOrId);
    await updateAppointmentStatus(refOrId, newStatus);
    setAppointments((prev) =>
      prev.map((item) =>
        item.reference_id === refOrId || item.id === refOrId
          ? { ...item, status: newStatus }
          : item
      )
    );
    setUpdatingId(null);
  };

  // Export to CSV
  const handleExportCsv = () => {
    if (appointments.length === 0) return;
    const headers = [
      'Reference ID',
      'Patient Name',
      'Phone',
      'Condition',
      'Branch',
      'Preferred Date',
      'Preferred Time',
      'Lady Doctor',
      'Status',
      'Source',
      'Created At',
      'Notes',
    ];

    const rows = appointments.map((a) => [
      a.reference_id || '',
      `"${(a.patient_name || '').replace(/"/g, '""')}"`,
      a.phone || '',
      `"${(a.condition || '').replace(/"/g, '""')}"`,
      `"${(a.branch || '').replace(/"/g, '""')}"`,
      a.preferred_date || '',
      a.preferred_time || '',
      a.female_doctor_requested ? 'Yes' : 'No',
      a.status || 'pending',
      a.source || '',
      a.created_at || '',
      `"${(a.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ami-hospital-appointments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      (item.patient_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || '').includes(searchTerm) ||
      (item.reference_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.condition || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || (item.status || 'pending').toLowerCase() === statusFilter.toLowerCase();

    const matchesLady = !ladyDoctorFilter || Boolean(item.female_doctor_requested);

    return matchesSearch && matchesStatus && matchesLady;
  });

  // Calculate Metrics
  const totalBookings = appointments.length;
  const pendingCount = appointments.filter((a) => (a.status || 'pending') === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const femaleRequests = appointments.filter((a) => a.female_doctor_requested).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">
                  Ami Hospital • Administrator Portal
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                  Internal Staff Only
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live Bookings & Lead Management • Connected to Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {session && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="Log out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50">
          {!session ? (
            /* ================= AUTHENTICATION VIEW (Single-Slot or Login) ================= */
            <div className="max-w-md mx-auto my-6 space-y-6">
              {/* Tab Selector */}
              <div className="flex p-1 rounded-2xl bg-slate-200 text-xs font-bold">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError(null);
                  }}
                  className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>

                <button
                  onClick={() => {
                    if (!adminExists) {
                      setAuthMode('register');
                      setAuthError(null);
                    }
                  }}
                  disabled={Boolean(adminExists)}
                  className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                    authMode === 'register'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : adminExists
                      ? 'text-slate-400 opacity-60 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 cursor-pointer'
                  }`}
                >
                  {adminExists ? <Lock className="w-3.5 h-3.5 text-slate-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-600" />}
                  <span>{adminExists ? 'Slot Claimed (Locked)' : 'Claim Single Admin Slot'}</span>
                </button>
              </div>

              {/* Single Slot Banner */}
              {!adminExists ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Single Admin Slot Available</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    You can now create the primary administrator account for Ami Hospital. Once you register this account, no one else will be allowed to register.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Registration is Locked:</strong> The single admin account for Ami Hospital has already been provisioned. Please enter your email and password to log in.
                  </div>
                </div>
              )}

              {/* Error / Success Notifications */}
              {authError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
              {authSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{authSuccess}</span>
                </div>
              )}

              {/* Login Form */}
              {authMode === 'login' ? (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-slate-900 text-base">Sign In to Admin Portal</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Access all booked appointments and hospital leads
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Admin Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          required
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="admin@amihospital.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Admin Password
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          required
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingAuth}
                      className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/30 transition cursor-pointer disabled:opacity-50"
                    >
                      {submittingAuth ? 'Verifying Credentials...' : 'Sign In as Administrator'}
                    </button>
                  </form>
                </div>
              ) : (
                /* Registration Form (Available ONLY for the single slot) */
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      One-Time Provisioning
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base mt-1">
                      Create Your Primary Admin Account
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      This will be the only admin account permitted for this website.
                    </p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name / Title
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          required
                          type="text"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. Dr. Amit Sharma / Clinic Manager"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          required
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="e.g. admin@amihospital.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Password (min 6 chars)
                        </label>
                        <input
                          required
                          type="password"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Confirm Password
                        </label>
                        <input
                          required
                          type="password"
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingAuth}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition cursor-pointer disabled:opacity-50"
                    >
                      {submittingAuth ? 'Provisioning Admin...' : 'Claim Slot & Create Admin Account'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            /* ================= LOGGED IN DASHBOARD VIEW ================= */
            <div className="space-y-6">
              {/* Top Greeting & Admin Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-black text-lg">
                    {session.name ? session.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      Welcome, {session.name || 'Admin'}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-teal-600" />
                      <span>{session.email}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">Super Administrator</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={loadAppointments}
                    disabled={loadingData}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
                    <span>Refresh Bookings</span>
                  </button>

                  <button
                    onClick={handleExportCsv}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Total Bookings
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    {totalBookings}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
                    Pending Calls
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-600">
                    {pendingCount}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">
                    Confirmed
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-teal-600">
                    {confirmedCount}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
                    Lady Doctor
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-rose-600">
                    {femaleRequests}
                  </div>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by patient name, mobile number, condition, or reference ID..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => setLadyDoctorFilter(!ladyDoctorFilter)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1 ${
                      ladyDoctorFilter
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>Lady Doc Only</span>
                    {ladyDoctorFilter && <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />}
                  </button>
                </div>
              </div>

              {/* Bookings List Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                {filteredAppointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                        <tr>
                          <th className="p-3.5">Ref ID</th>
                          <th className="p-3.5">Patient Details</th>
                          <th className="p-3.5">Condition / Branch</th>
                          <th className="p-3.5">Preferred Slot</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Quick Contact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {filteredAppointments.map((item, idx) => {
                          const status = (item.status || 'pending').toLowerCase();
                          return (
                            <tr key={idx} className="hover:bg-slate-50/80 transition">
                              {/* Ref ID */}
                              <td className="p-3.5 align-top">
                                <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 block w-fit">
                                  {item.reference_id || 'AMI-LEAD'}
                                </span>
                                <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                                  {item.created_at
                                    ? new Date(item.created_at).toLocaleDateString()
                                    : 'Just now'}
                                </span>
                              </td>

                              {/* Patient Details */}
                              <td className="p-3.5 align-top space-y-0.5">
                                <div className="font-bold text-slate-900 text-sm">
                                  {item.patient_name}
                                </div>
                                <div className="text-slate-600 font-mono font-semibold">
                                  {item.phone}
                                </div>
                                {item.notes && (
                                  <p className="text-[11px] text-slate-500 italic max-w-xs mt-1">
                                    "{item.notes}"
                                  </p>
                                )}
                              </td>

                              {/* Condition / Branch */}
                              <td className="p-3.5 align-top space-y-1">
                                <div className="font-semibold text-slate-800">
                                  {item.condition || 'Laser Piles Surgery'}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {item.branch || 'Main Center (Sector 12)'}
                                </div>
                                {item.female_doctor_requested && (
                                  <span className="inline-block px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                                    👩‍⚕️ Lady Doctor Requested
                                  </span>
                                )}
                              </td>

                              {/* Preferred Slot */}
                              <td className="p-3.5 align-top text-xs text-slate-600">
                                <div className="font-semibold text-slate-800">
                                  {item.preferred_time || 'Morning Slot'}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {item.preferred_date ? `Date: ${item.preferred_date}` : 'Earliest Available'}
                                </div>
                                <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                                  Src: {item.source || 'website'}
                                </span>
                              </td>

                              {/* Status Dropdown */}
                              <td className="p-3.5 align-top">
                                <select
                                  disabled={updatingId === (item.reference_id || item.id)}
                                  value={status}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      item.reference_id || item.id,
                                      e.target.value
                                    )
                                  }
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                    status === 'confirmed'
                                      ? 'bg-teal-50 text-teal-800 border-teal-300'
                                      : status === 'completed'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : status === 'cancelled'
                                      ? 'bg-rose-50 text-rose-800 border-rose-300'
                                      : 'bg-amber-50 text-amber-800 border-amber-300'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>

                              {/* Actions: Call & WhatsApp */}
                              <td className="p-3.5 align-top text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <a
                                    href={`tel:${item.phone}`}
                                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                    title="Call Patient"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>

                                  <button
                                    onClick={() => {
                                      const confirmMsg = `Hello ${item.patient_name}, this is Ami Hospital. We received your appointment booking (Ref: ${item.reference_id || 'N/A'}) for ${item.condition || 'Laser Consultation'} at our ${item.branch || 'Main Center'}. Are you available for consultation?`;
                                      openWhatsApp(confirmMsg, item.phone);
                                    }}
                                    className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition cursor-pointer"
                                    title="Reply to Patient on WhatsApp"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-10 text-center space-y-2">
                    <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
                    <h5 className="font-bold text-slate-800 text-sm">No Bookings Found</h5>
                    <p className="text-xs text-slate-500">
                      {searchTerm
                        ? 'No bookings match your current filter or search criteria.'
                        : 'No appointments registered in the database yet.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Database Schema Drawer Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setShowSqlSetup(!showSqlSetup)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-teal-600" />
                  <span>
                    {showSqlSetup ? 'Hide Supabase SQL Tables Schema' : 'View Supabase SQL Schema for admin_users & appointments'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSqlSetup ? 'rotate-180' : ''}`} />
                </button>

                {showSqlSetup && (
                  <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-teal-300">
                        Supabase SQL Script (appointments & admin_users)
                      </span>
                      <a
                        href="https://supabase.com/dashboard/project/rrnffijgokezhtqfhblv/sql"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                      >
                        <span>Open Supabase SQL Editor</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <pre className="p-3 rounded-xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800 max-h-56">
                      {SUPABASE_SETUP_SQL}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Strict Single-Slot Admin Access • Encrypted Local & Supabase Auth</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
