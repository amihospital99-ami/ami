import React, { useState } from 'react';
import { Phone, ShieldCheck, Download, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCloudflare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenCloudflare }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Notification / Emergency Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              24x7 Helpline
            </span>
            <a
              href={`tel:${HOSPITAL_INFO.phone}`}
              className="font-medium hover:text-teal-400 transition flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>Call: <strong className="text-white">{HOSPITAL_INFO.phone}</strong> (Free First Consultation)</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>100% Cashless Mediclaim Approved</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline font-semibold text-amber-300">⭐ 4.9/5.0 (15,000+ Cured)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-xs transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-teal-600/20 group-hover:scale-105 transition">
              <span className="leading-none text-white font-serif">+</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
                  AMI <span className="text-teal-600">HOSPITAL</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                  LASER CLINIC
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Advanced Laser Proctology Center
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#treatments" className="hover:text-teal-600 transition">
              Treatments
            </a>
            <a href="#comparison" className="hover:text-teal-600 transition">
              Laser vs Surgery
            </a>
            <a href="#symptom-checker" className="hover:text-teal-600 transition flex items-center gap-1 text-teal-700">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Symptom Check
            </a>
            <a href="#doctors" className="hover:text-teal-600 transition">
              Surgeons
            </a>
            <a href="#insurance" className="hover:text-teal-600 transition">
              Insurance & EMI
            </a>
            <a href="#reviews" className="hover:text-teal-600 transition">
              Reviews
            </a>
            <a href="#faq" className="hover:text-teal-600 transition">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cloudflare ZIP Badge Button */}
            <button
              onClick={onOpenCloudflare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 shadow-xs transition active:scale-95 cursor-pointer"
              title="Download Cloudflare Pages deployment ZIP file"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Cloudflare</span> ZIP
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-600/25 transition active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Visit</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Laser Treatments (Piles, Fissure, Fistula)
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Laser vs Traditional Open Surgery
            </a>
            <a
              href="#symptom-checker"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-teal-700 border-b border-slate-100"
            >
              Interactive Piles Symptom Checker
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Our Proctologists & Lady Doctor
            </a>
            <a
              href="#insurance"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Cashless Mediclaim & 0% EMI
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Frequently Asked Questions
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCloudflare();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-700" />
                Download Cloudflare Pages Ready ZIP
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm shadow-md"
              >
                Book Free Consultation Now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
