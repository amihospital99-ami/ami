import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  CheckCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  User,
} from 'lucide-react';
import {
  getWhatsAppNumber,
  openWhatsApp,
  cleanPhoneNumber,
  WHATSAPP_MESSAGES,
} from '../utils/whatsapp';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [currentNumber, setCurrentNumber] = useState('');

  useEffect(() => {
    const num = getWhatsAppNumber();
    setCurrentNumber(num);
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const msg = textToSend || message || WHATSAPP_MESSAGES.generalInquiry();
    openWhatsApp(msg, currentNumber);
    setIsOpen(false);
    setMessage('');
  };

  const quickChips = [
    {
      label: '🩺 Book Free Consultation',
      msg: 'Hi Ami Hospital, I want to book a free doctor consultation for laser piles treatment.',
    },
    {
      label: '💰 Piles Laser Cost & EMI',
      msg: 'Hi Ami Hospital, what is the cost of laser piles surgery and how does the 0% EMI work?',
    },
    {
      label: '👩‍⚕️ Lady Doctor Consultation',
      msg: WHATSAPP_MESSAGES.ladyDoctorConsult(),
    },
    {
      label: '🏥 Check Cashless Insurance',
      msg: 'Hi Ami Hospital, I have health insurance and would like to verify cashless approval.',
    },
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 md:bottom-6 left-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/80"
            aria-label="Chat on WhatsApp with Ami Hospital"
          >
            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
            </span>

            {/* WhatsApp SVG Icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>

            <div className="hidden sm:block text-left">
              <span className="block text-xs font-black uppercase tracking-wider text-emerald-100">
                Live Support
              </span>
              <span className="block text-sm font-extrabold leading-tight">
                WhatsApp Doctor
              </span>
            </div>
          </button>
        )}
      </div>

      {/* WhatsApp Chat Window Card */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-50 w-[92vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center p-0.5 border-2 border-emerald-300">
                  <img
                    src="/assets/aistudio/Ami_Hospital_Logo_76550ad2.png"
                    alt="Ami Hospital"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm tracking-tight">Ami Hospital Proctology</h4>
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Online • Avg reply: 2 mins</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-700 text-white transition cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#EFEAE2] min-h-[200px] max-h-[300px] overflow-y-auto space-y-3">
            {/* Auto welcome speech bubble */}
            <div className="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-xs max-w-[85%] space-y-1">
              <p className="text-xs text-slate-800 leading-relaxed">
                Hello! 👋 Welcome to <strong>Ami Hospital</strong>.
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                Have questions about <strong>piles, fissure, fistula</strong>, or booking a <strong>female doctor</strong>?
              </p>
              <div className="text-[10px] text-slate-400 text-right flex items-center justify-end gap-1 pt-1">
                <span>Just now</span>
                <CheckCheck className="w-3.5 h-3.5 text-teal-600" />
              </div>
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                Quick Inquiries:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.msg)}
                    className="w-full text-left p-2 rounded-xl bg-white/90 hover:bg-white text-xs font-semibold text-slate-800 border border-slate-200/80 shadow-xs hover:border-emerald-400 transition flex items-center justify-between cursor-pointer"
                  >
                    <span>{chip.label}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type your message to doctor..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition active:scale-95 cursor-pointer shrink-0"
              title="Send on WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              100% Confidential Medical Chat
            </span>
            <span className="font-mono text-emerald-800 font-semibold">{currentNumber}</span>
          </div>
        </div>
      )}
    </>
  );
};
