import React, { useState } from 'react';
import { Phone, ShieldCheck, Download, Menu, X, Calendar, Sparkles, Database } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { openWhatsApp, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCloudflare: () => void;
  onOpenSupabase: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenCloudflare,
  onOpenSupabase,
}) => {
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
            {/* Supabase Backend Button */}
            <button
              onClick={onOpenSupabase}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300 shadow-xs transition active:scale-95 cursor-pointer"
              title="Supabase Backend (Project: rrnffijgokezhtqfhblv)"
            >
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Supabase</span>
            </button>

            {/* Cloudflare ZIP Badge Button */}
            <button
              onClick={onOpenCloudflare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 shadow-xs transition active:scale-95 cursor-pointer"
              title="Download Cloudflare Pages deployment ZIP file"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Cloudflare</span> ZIP
            </button>

            {/* WhatsApp Direct CTA */}
            <button
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.generalInquiry())}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
              title="Chat with Doctor on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="hidden md:inline">WhatsApp</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-600/25 transition active:scale-95 cursor-pointer"
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
                  openWhatsApp(WHATSAPP_MESSAGES.generalInquiry());
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupabase();
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Database className="w-4 h-4 text-emerald-700" />
                <span>Supabase Backend (Appointments)</span>
              </button>
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
