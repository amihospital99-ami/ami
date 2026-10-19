import React from 'react';
import { COMPARISON_DATA } from '../data/hospitalData';
import { Check, X, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface ComparisonSectionProps {
  onOpenBooking: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="comparison" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Clear Clinical Difference
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Traditional Surgery vs. Ami Hospital Laser Surgery
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Understand why more than 15,000 patients chose gentle German laser ablation instead of painful conventional cutting surgery.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs sm:text-sm">
                  <th className="py-5 px-6 font-bold w-1/3">Key Surgical Parameter</th>
                  <th className="py-5 px-6 font-bold w-1/3 text-rose-300 bg-slate-950/40">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>Traditional Open Surgery</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 font-bold w-1/3 text-teal-300 bg-teal-950/60 border-l border-teal-800/40">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      <span>Ami Hospital Laser Surgery</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">
                      {row.parameter}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3 h-3 font-bold" />
                        </div>
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-teal-950 font-bold bg-teal-50/60 border-l border-teal-100">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 font-bold" />
                        </div>
                        <span>{row.amiLaser}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Bar */}
          <div className="p-6 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider text-teal-300 font-bold">
                Why tolerate weeks of pain?
              </span>
              <p className="text-sm font-semibold text-slate-200 mt-0.5">
                Get painless laser treatment with zero cuts and same-day discharge at Ami Hospital.
              </p>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Consult Our Surgeon Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
