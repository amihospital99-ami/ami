import React, { useState } from 'react';
import { ShieldCheck, Clock, Zap, CheckCircle, ArrowRight, MessageSquare, PhoneCall, Award, UserCheck } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenCloudflare: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickCondition, setQuickCondition] = useState('Piles (Hemorrhoids)');
  const [ladyDoctor, setLadyDoctor] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      const msg = `Hi Ami Hospital, I need a consultation for ${quickCondition}. Name: ${quickName}, Phone: ${quickPhone}. ${ladyDoctor ? 'Prefer Lady Doctor.' : ''}`;
      window.open(`https://wa.me/${HOSPITAL_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-200/25 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 text-teal-800 text-xs font-bold border border-teal-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Advanced 1470nm German Laser Technology</span>
              <span className="text-teal-400">|</span>
              <span className="text-teal-900 font-semibold">US FDA Approved</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Painless Laser Cure for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-600">
                  Piles, Fissure & Fistula
                </span>{' '}
                in 30 Mins.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Experience world-class proctology treatment at <strong>Ami Hospital</strong>. Zero cuts, zero stitches, zero painful dressings. Walk home on the same day and resume your normal life in 24 hours.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-teal-600 font-black text-2xl">
                  <Clock className="w-5 h-5 text-teal-500" />
                  <span>30 Min</span>
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Laser Procedure</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-teal-600 font-black text-2xl">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>0 Cuts</span>
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">No Painful Stitches</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-teal-600 font-black text-2xl">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Same Day</span>
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">4-Hour Discharge</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-1.5 text-teal-600 font-black text-2xl">
                  <ShieldCheck className="w-5 h-5 text-indigo-500" />
                  <span>100%</span>
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Cashless Mediclaim</div>
              </div>
            </div>

            {/* Key Clinical Guarantees */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-700 font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>15,000+ Patients Successfully Treated</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>Specialized Lady Proctologist Available</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>0% Interest EMI Available</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-600/30 transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Book Free Doctor Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Ami%20Hospital,%20I%20would%20like%20to%20know%20about%20painless%20piles%20laser%20treatment.`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Doctor</span>
              </a>

              <a
                href={`tel:${HOSPITAL_INFO.phone}`}
                className="px-4 py-3.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-teal-600" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Lead Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-6 sm:p-8 relative">
              {/* Highlight ribbon */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Free 1st Consultation</span>
              </div>

              <div className="border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-xl font-black text-slate-900">Get Instant Doctor Callback</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with Ami Hospital proctologist within 15 minutes. 100% confidential.
                </p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Patient Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="e.g. Anand Patel"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (For Doctor Callback)
                    </label>
                    <input
                      required
                      type="tel"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Condition / Symptoms
                    </label>
                    <select
                      value={quickCondition}
                      onChange={(e) => setQuickCondition(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      <option>Piles (Hemorrhoids / Bleeding)</option>
                      <option>Anal Fissure (Sharp Pain / Cuts)</option>
                      <option>Anal Fistula (FiLaC / Pus Discharge)</option>
                      <option>Pilonidal Sinus (Tailbone Pain)</option>
                      <option>Chronic Constipation & Hard Stools</option>
                    </select>
                  </div>

                  {/* Female Doctor Checkbox */}
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="ladyDoctorHero"
                      checked={ladyDoctor}
                      onChange={(e) => setLadyDoctor(e.target.checked)}
                      className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500 mt-0.5"
                    />
                    <label htmlFor="ladyDoctorHero" className="text-xs text-rose-950 font-medium cursor-pointer">
                      <span>Prefer <strong>Lady Proctologist (Dr. Sneha Patel)</strong></span>
                      <p className="text-[10px] text-rose-700">Dedicated private female OPD & staff</p>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/30 transition transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Callback & Free Diagnosis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      100% Confidential
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                      Senior Doctors Only
                    </span>
                  </div>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Callback Requested!</h4>
                  <p className="text-xs text-slate-600">
                    Thank you, <strong>{quickName}</strong>. Our medical counselor from Ami Hospital is calling you at <strong>{quickPhone}</strong>.
                  </p>
                  <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 py-2 rounded-lg">
                    Redirecting to WhatsApp for instant slot confirmation...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
