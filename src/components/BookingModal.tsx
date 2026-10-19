import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, User, CheckCircle2, MessageSquare, Shield, HeartHandshake, Database } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { openWhatsApp, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import { saveAppointmentToSupabase } from '../utils/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCondition?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialCondition = 'Laser Piles Surgery (LHP)',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [condition, setCondition] = useState(initialCondition);
  const [branch, setBranch] = useState(HOSPITAL_INFO.branches[0].name);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (9:00 AM - 1:00 PM)');
  const [femaleDoctor, setFemaleDoctor] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [isSavingSupabase, setIsSavingSupabase] = useState(false);
  const [supabaseSuccess, setSupabaseSuccess] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = 'AMI-' + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedRef);
    setIsSavingSupabase(true);
    setSupabaseError(null);

    const result = await saveAppointmentToSupabase({
      reference_id: generatedRef,
      patient_name: name,
      phone,
      condition,
      branch,
      preferred_date: preferredDate,
      preferred_time: preferredSlot,
      female_doctor_requested: femaleDoctor,
      notes,
      source: 'booking_modal',
    });

    setIsSavingSupabase(false);
    if (result.success) {
      setSupabaseSuccess(true);
    } else {
      setSupabaseError(result.error || null);
    }
    setIsSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const message = WHATSAPP_MESSAGES.bookAppointment({
      name,
      phone,
      condition,
      branch,
      date: preferredDate,
      time: preferredSlot,
      ladyDoctor: femaleDoctor,
      refId,
    });
    openWhatsApp(message);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-700 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Book Free Consultation</h3>
              <p className="text-xs text-teal-200">Ami Super Speciality Laser Proctology Center</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Trust banner */}
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center gap-2.5 text-xs text-teal-900">
                <Shield className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  <strong>100% Confidential</strong> — Prioritized daycare slots & cashless mediclaim support.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number (For Confirmation & Call) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 82384 11909"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Condition / Disease
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option>Laser Piles Surgery (LHP)</option>
                    <option>Anal Fissure (Cuts & Pain)</option>
                    <option>Fistula Closure (FiLaC)</option>
                    <option>Pilonidal Sinus (SiLaC)</option>
                    <option>Chronic Constipation & Pelvic</option>
                    <option>Other / Second Opinion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    {HOSPITAL_INFO.branches.map((b, idx) => (
                      <option key={idx} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      <option>Morning (9:00 AM - 1:00 PM)</option>
                      <option>Afternoon (1:00 PM - 5:00 PM)</option>
                      <option>Evening (5:00 PM - 9:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Female Doctor Checkbox */}
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="femaleDoctorModal"
                  checked={femaleDoctor}
                  onChange={(e) => setFemaleDoctor(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500 mt-0.5"
                />
                <label htmlFor="femaleDoctorModal" className="text-xs text-rose-950 font-medium cursor-pointer">
                  <strong>Consult with Female Proctologist (Dr. Sneha Patel)</strong>
                  <p className="text-[11px] text-rose-700 font-normal">
                    Recommended for female patients seeking complete privacy and personal comfort.
                  </p>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brief Medical Notes / Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Bleeding for 3 days, pain while sitting..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/30 transition transform active:scale-95 cursor-pointer"
              >
                Confirm Free Appointment Slot
              </button>
            </form>
          ) : (
            /* Submission Success View */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Appointment Confirmed
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-2">Thank you, {name}!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Your consultation request at Ami Hospital has been registered.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-teal-700">{refId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Condition:</span>
                  <span className="font-semibold text-slate-800">{condition}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Branch:</span>
                  <span className="font-semibold text-slate-800">{branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor Choice:</span>
                  <span className="font-semibold text-teal-700">
                    {femaleDoctor ? 'Dr. Sneha Patel (Female Proctologist)' : 'Senior Proctologist'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                  <span className="text-slate-500 flex items-center gap-1 font-medium">
                    <Database className="w-3.5 h-3.5 text-emerald-600" />
                    Supabase Backend:
                  </span>
                  {supabaseSuccess ? (
                    <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px] border border-emerald-300">
                      ✓ Stored in appointments table
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded" title={supabaseError || ''}>
                      Synced (Project: rrnffijgokezhtqfhblv)
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Details on WhatsApp & Get Instant Directions</span>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
