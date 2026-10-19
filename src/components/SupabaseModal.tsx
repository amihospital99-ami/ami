import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Send,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import {
  supabase,
  SUPABASE_URL,
  saveAppointmentToSupabase,
  fetchRecentAppointments,
  SUPABASE_SETUP_SQL,
} from '../utils/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [testingInsert, setTestingInsert] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'appointments' | 'sql' | 'details'>('appointments');

  const loadData = async () => {
    setLoading(true);
    const data = await fetchRecentAppointments();
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleTestInsert = async () => {
    setTestingInsert(true);
    setTestResult(null);

    const testRef = 'TEST-' + Math.floor(1000 + Math.random() * 9000);
    const result = await saveAppointmentToSupabase({
      reference_id: testRef,
      patient_name: 'Test Patient (Supabase Verification)',
      phone: '+91 82384 11909',
      condition: 'Laser Piles Surgery (LHP)',
      branch: 'Main Center (Sector 12)',
      preferred_date: new Date().toISOString().split('T')[0],
      preferred_time: 'Morning (10:00 AM)',
      female_doctor_requested: false,
      notes: 'Live verification test record created via dashboard modal',
      source: 'live_test_button',
    });

    setTestingInsert(false);
    if (result.success) {
      setTestResult(`✓ Successfully created test appointment with Ref ${testRef} in Supabase!`);
      loadData();
    } else {
      setTestResult(
        `Notice: ${result.error || 'Failed to insert'}. If the table does not exist yet, run the SQL script below in your Supabase SQL editor.`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-700 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-black text-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black">Supabase Backend Connected</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/40 text-[11px] font-bold">
                  Live
                </span>
              </div>
              <p className="text-xs text-teal-200 font-mono mt-0.5">
                Project ID: rrnffijgokezhtqfhblv • appointments table
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Saved Appointments ({appointments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-3 border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>Table Schema & SQL Setup</span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Credentials & Project Info</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Whenever patients book online, their records are directly persisted in your Supabase backend.
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={handleTestInsert}
                    disabled={testingInsert}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{testingInsert ? 'Saving...' : 'Send Test Booking'}</span>
                  </button>
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2 ${
                    testResult.startsWith('✓')
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}
                >
                  {testResult.startsWith('✓') ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span>{testResult}</span>
                </div>
              )}

              {/* Table of Appointments */}
              {appointments.length > 0 ? (
                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-white font-bold">
                        <tr>
                          <th className="p-3">Ref ID</th>
                          <th className="p-3">Patient Name</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Condition</th>
                          <th className="p-3">Branch / Time</th>
                          <th className="p-3">Source</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {appointments.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-emerald-700">
                              {item.reference_id || 'N/A'}
                            </td>
                            <td className="p-3 font-bold text-slate-900">{item.patient_name}</td>
                            <td className="p-3 font-mono text-slate-800">{item.phone}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold border border-teal-200 text-[11px]">
                                {item.condition || 'Laser Piles'}
                              </span>
                              {item.female_doctor_requested && (
                                <span className="ml-1 text-[10px] text-rose-700 bg-rose-50 px-1 py-0.5 rounded font-bold">
                                  Lady Doc
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-[11px] text-slate-500">
                              <div>{item.branch || 'Main Center'}</div>
                              <div>{item.preferred_time || item.preferred_date || ''}</div>
                            </td>
                            <td className="p-3 text-[10px] text-slate-400 font-mono">
                              {item.source || 'website'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                  <Database className="w-10 h-10 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 font-semibold">
                    No appointments in the table yet. Click <strong>"Send Test Booking"</strong> above or fill the booking form on the landing page!
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Create the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono">appointments</code> Table in Supabase
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    If you haven't run this yet, paste this SQL in your Supabase SQL Editor and click "Run".
                  </p>
                </div>
                <button
                  onClick={copySql}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  {copiedSql ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  {SUPABASE_SETUP_SQL}
                </pre>
              </div>

              <a
                href="https://supabase.com/dashboard/project/rrnffijgokezhtqfhblv/sql"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
              >
                <span>Open your Supabase SQL Editor directly in Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3 font-medium">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Project Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900">rrnffijgokezhtqfhblv</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Supabase API URL:</span>
                  <span className="font-mono font-bold text-teal-700">{SUPABASE_URL}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Target Table:</span>
                  <span className="font-mono font-bold text-slate-900">public.appointments</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">API Key:</span>
                  <span className="font-mono text-slate-700 text-[11px]">sb_publishable_RjTFu...</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <strong>⚡ How this works:</strong>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Both the main consultation booking modal and the hero quick callback forms use the Supabase client to store every patient's name, phone, condition, doctor choice, and reference code directly in your project.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Backend Connected to Project: rrnffijgokezhtqfhblv
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
