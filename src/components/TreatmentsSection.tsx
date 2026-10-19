import React, { useState } from 'react';
import { TREATMENTS } from '../data/hospitalData';
import { Treatment } from '../types';
import { Clock, Bed, RotateCcw, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface TreatmentsSectionProps {
  onSelectTreatment: (treatmentName: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ onSelectTreatment }) => {
  const [selectedId, setSelectedId] = useState<string>(TREATMENTS[0].id);

  const activeTreatment: Treatment =
    TREATMENTS.find((t) => t.id === selectedId) || TREATMENTS[0];

  return (
    <section id="treatments" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Specialized Laser Proctology
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Advanced Laser Treatments at Ami Hospital
          </h2>
          <p className="text-slate-600 mt-3 text-base leading-relaxed">
            Our German 1470nm radial diode laser selectively photocoagulates abnormal tissues without any incisions, stitches, or incontinence risk.
          </p>
        </div>

        {/* Treatment Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none justify-start md:justify-center mb-10">
          {TREATMENTS.map((treatment) => {
            const isActive = treatment.id === selectedId;
            return (
              <button
                key={treatment.id}
                onClick={() => setSelectedId(treatment.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{treatment.name.split(' (')[0]}</span>
                {treatment.tag && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    {treatment.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Treatment Card Detail */}
        <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50/40 rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Overview, Symptoms, Recovery */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase text-teal-600 tracking-wider">
                  {activeTreatment.tag} • US FDA Approved
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {activeTreatment.name}
                </h3>
                <p className="text-sm font-semibold text-teal-800 mt-0.5">
                  {activeTreatment.subtitle}
                </p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {activeTreatment.description}
                </p>
              </div>

              {/* Quick specs pill */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Duration</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900">
                    {activeTreatment.duration}
                  </div>
                </div>
                <div className="text-center border-x border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                    <Bed className="w-3.5 h-3.5 text-teal-600" />
                    <span>Hospital Stay</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900">
                    {activeTreatment.hospitalStay}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                    <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
                    <span>Recovery</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900">
                    {activeTreatment.recoveryTime}
                  </div>
                </div>
              </div>

              {/* Symptoms Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Common Symptoms Treated:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTreatment.symptoms.map((symptom, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Laser Advantages & Action Box */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Ami Hospital Laser Advantages:
                </h4>
                <ul className="mt-4 space-y-3">
                  {activeTreatment.laserAdvantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 font-bold" />
                      </div>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-teal-900 font-semibold">Mediclaim / Insurance:</span>
                  <span className="font-bold text-teal-700">100% Cashless Available</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-teal-900 font-semibold">0% No-Cost EMI:</span>
                  <span className="font-bold text-teal-700">Starts ₹2,999/month</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-teal-900 font-semibold">Doctor Choice:</span>
                  <span className="font-bold text-teal-700">Male & Female Doctors</span>
                </div>
              </div>

              <button
                onClick={() => onSelectTreatment(activeTreatment.name)}
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Book Consultation for {activeTreatment.name.split(' (')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
