import React from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { Phone, Mail, MapPin, Download, ShieldCheck, Heart, Cloud, Database } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenCloudflare: () => void;
  onOpenSupabase?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenCloudflare,
  onOpenSupabase,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Cloudflare Notice Banner */}
        <div className="mb-12 p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-amber-950/70 border border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Cloudflare Pages Deployment Ready
              </span>
              <p className="text-xs text-slate-300">
                Need to deploy this Ami Hospital site to your Cloudflare account? Download the standalone pre-packaged ZIP file.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCloudflare}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Get Cloudflare Pages ZIP</span>
          </button>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-xs">
          {/* Col 1: About Ami Hospital */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white font-extrabold text-lg">
                +
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                AMI <span className="text-teal-400">HOSPITAL</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {HOSPITAL_INFO.legalName}. India's premier laser proctology clinic delivering painless, scalpel-free care with same-day recovery.
            </p>
            <div className="pt-2 text-slate-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.phone}`} className="hover:text-teal-400 transition">
                  {HOSPITAL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>
                  <a href={`mailto:${HOSPITAL_INFO.email}`} className="hover:text-teal-400 transition">
                    {HOSPITAL_INFO.email}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Treatments */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Laser Treatments
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#treatments" className="hover:text-teal-400 transition">
                  Laser Piles Surgery (LHP) - Grade 1-4
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-teal-400 transition">
                  Anal Fissure Laser Sphincterotomy
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-teal-400 transition">
                  Laser Fistula Tract Closure (FiLaC)
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-teal-400 transition">
                  Pilonidal Sinus Laser (SiLaC)
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-teal-400 transition">
                  Pelvic Floor & Chronic Constipation Care
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Branches */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Hospital Branches
            </h4>
            <div className="space-y-2 text-slate-400">
              {HOSPITAL_INFO.branches.map((b, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-slate-200">{b.name}</div>
                  <div className="text-[11px] text-teal-400 mt-0.5">{b.phone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Timings & Emergency */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Emergency & OPD
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Our 24x7 proctology emergency team is always prepared for acute thrombosis, bleeding, or abscess relief.
            </p>
            <div className="p-3 rounded-xl bg-teal-950 border border-teal-800/80 text-teal-200">
              <div className="font-bold text-white text-xs">24x7 Emergency Contact:</div>
              <div className="text-sm font-mono font-bold text-teal-300 mt-0.5">
                {HOSPITAL_INFO.emergencyPhone}
              </div>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              Book Priority OPD Slot
            </button>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-400 hover:text-teal-300 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                title="Admin Portal - Sign up or Login to view bookings"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Admin Login / Sign-up</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[11px] gap-4">
          <p>
            © 2026 Ami Hospital. All rights reserved. The medical information on this website is vetted by senior proctologists and intended for educational & appointment booking purposes.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap justify-center md:justify-end">
            {onOpenAdmin && (
              <>
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-400 hover:text-teal-400 transition font-bold flex items-center gap-1.5 cursor-pointer"
                  title="Admin Portal - Sign up or Login"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Admin Sign-up / Login</span>
                </button>
                <span>•</span>
              </>
            )}
            {onOpenSupabase && (
              <>
                <button
                  onClick={onOpenSupabase}
                  className="hover:text-emerald-400 transition font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Database className="w-3 h-3 text-emerald-400" />
                  <span>Supabase Backend</span>
                </button>
                <span>•</span>
              </>
            )}
            <button
              onClick={onOpenCloudflare}
              className="hover:text-amber-400 transition font-bold flex items-center gap-1"
            >
              <Cloud className="w-3 h-3 text-amber-400" />
              <span>Cloudflare ZIP</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-teal-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              NABH & ISO Standard Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
