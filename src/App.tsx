/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TreatmentsSection } from './components/TreatmentsSection';
import { ComparisonSection } from './components/ComparisonSection';
import { SymptomChecker } from './components/SymptomChecker';
import { DoctorsSection } from './components/DoctorsSection';
import { InsuranceCalculator } from './components/InsuranceCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CloudflareModal } from './components/CloudflareModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Phone, MessageSquare, Calendar, Download } from 'lucide-react';
import { HOSPITAL_INFO } from './data/hospitalData';
import { openWhatsApp, WHATSAPP_MESSAGES } from './utils/whatsapp';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCloudflareOpen, setIsCloudflareOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('Laser Piles Surgery (LHP)');

  const handleOpenBookingWithCondition = (conditionName: string) => {
    setSelectedCondition(conditionName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenCloudflare={() => setIsCloudflareOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero with direct appointment lead card */}
        <Hero
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenCloudflare={() => setIsCloudflareOpen(true)}
        />

        {/* Specialized Laser Procedures */}
        <TreatmentsSection onSelectTreatment={handleOpenBookingWithCondition} />

        {/* Traditional Surgery vs Laser Comparison */}
        <ComparisonSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Interactive Symptom Self-Assessment Tool */}
        <SymptomChecker onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Board Certified Proctologists & Lady Doctor */}
        <DoctorsSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 100% Cashless Insurance & 0% EMI Calculator */}
        <InsuranceCalculator onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Verified Patient Recovery Testimonials */}
        <TestimonialsSection />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenCloudflare={() => setIsCloudflareOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialCondition={selectedCondition}
      />

      <CloudflareModal
        isOpen={isCloudflareOpen}
        onClose={() => setIsCloudflareOpen(false)}
      />

      {/* Floating Interactive WhatsApp Chat Widget */}
      <WhatsAppWidget />

      {/* Sticky Mobile Floating Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center justify-between gap-2 shadow-lg">
        <a
          href={`tel:${HOSPITAL_INFO.phone}`}
          className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
        >
          <Phone className="w-3.5 h-3.5 text-teal-600" />
          <span>Call Doctor</span>
        </a>
        <button
          onClick={() => openWhatsApp(WHATSAPP_MESSAGES.generalInquiry())}
          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Free</span>
        </button>
      </div>

      {/* Floating Cloudflare ZIP Quick Button on Bottom Right for Desktop */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsCloudflareOpen(true)}
          className="group flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold shadow-xl border border-slate-700 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <Download className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
          <span>Download Cloudflare ZIP</span>
        </button>
      </div>
    </div>
  );
}
