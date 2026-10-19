import React from 'react';
import { TESTIMONIALS, HOSPITAL_INFO } from '../data/hospitalData';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ThumbsUp className="w-3.5 h-3.5 text-teal-600" />
            Verified Patient Recoveries
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Real Stories, Pain-Free Lives
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Read heartfelt testimonials from patients cured of chronic piles, fissure, and fistula at Ami Hospital.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-slate-900 text-sm">
              {HOSPITAL_INFO.stats.rating}
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">{t.date}</span>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200 mb-3">
                  {t.condition}
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-teal-200 absolute -top-2 -left-2 -z-0 opacity-60" />
                  <p className="text-xs text-slate-700 leading-relaxed relative z-10 italic">
                    "{t.review}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <span>{t.patientName}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {t.age} yrs • {t.city}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Recovery:
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    {t.recoveryTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
