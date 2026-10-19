import React, { useState } from 'react';
import { INSURANCE_PARTNERS } from '../data/hospitalData';
import { ShieldCheck, CreditCard, Check, Calculator, ArrowRight, Zap, CheckCircle2, MessageSquare } from 'lucide-react';
import { openWhatsApp, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface InsuranceCalculatorProps {
  onOpenBooking: () => void;
}

export const InsuranceCalculator: React.FC<InsuranceCalculatorProps> = ({ onOpenBooking }) => {
  const [loanAmount, setLoanAmount] = useState<number>(35000);
  const [tenure, setTenure] = useState<number>(6);
  const [insPolicy, setInsPolicy] = useState('');
  const [insPhone, setInsPhone] = useState('');
  const [insSubmitted, setInsSubmitted] = useState(false);

  const monthlyEmi = Math.round(loanAmount / tenure);

  const handleInsCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setInsSubmitted(true);
  };

  return (
    <section id="insurance" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Financial Ease & Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            100% Cashless Insurance & 0% EMI Support
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Never delay medical care due to financial hurdles. Ami Hospital provides paperless insurance authorization and zero-interest monthly plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 cols: Cashless Mediclaim Empanelment */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                  Pre-Approved TPAs & Insurers
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Cashless Mediclaim in 2 Hours
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                ₹0 Advance Needed
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Our dedicated in-hospital Insurance Helpdesk coordinates directly with your insurance company. We handle pre-authorization, queries, and final bill clearances with 100% transparency.
            </p>

            {/* Insurance Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {INSURANCE_PARTNERS.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{partner}</span>
                </div>
              ))}
            </div>

            {/* Quick Insurance Verification Form */}
            <div className="mt-4 p-5 rounded-2xl bg-white border border-teal-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                Quick Mediclaim Eligibility Check
              </h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Check whether your policy covers day-care proctology laser surgery.
              </p>

              {!insSubmitted ? (
                <form onSubmit={handleInsCheck} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    required
                    type="text"
                    value={insPolicy}
                    onChange={(e) => setInsPolicy(e.target.value)}
                    placeholder="Insurance Company / TPA"
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    required
                    type="tel"
                    value={insPhone}
                    onChange={(e) => setInsPhone(e.target.value)}
                    placeholder="Your Phone Number"
                    className="px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition cursor-pointer"
                  >
                    Check Coverage
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        WHATSAPP_MESSAGES.insuranceCheck(
                          insPolicy || 'Private Mediclaim',
                          insPhone || 'Patient Phone'
                        )
                      )
                    }
                    className="sm:col-span-3 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send Insurance Policy on WhatsApp for Instant Approval</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Request received for {insPolicy}! Our TPA coordinator is verifying your cashless terms.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        WHATSAPP_MESSAGES.insuranceCheck(insPolicy, insPhone)
                      )
                    }
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Connect with TPA Coordinator on WhatsApp Now</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 cols: 0% Interest EMI Calculator */}
          <div className="lg:col-span-5 bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                  No Insurance? No Problem!
                </span>
                <h3 className="text-xl font-bold text-white">0% No-Cost EMI Calculator</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pay in easy monthly installments with 0% interest, zero processing fees, and instant KYC approval.
            </p>

            {/* Range Slider for Estimated Cost */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Estimated Procedure Cost:</span>
                <span className="text-teal-300 text-sm">₹{loanAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="80000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹20,000</span>
                <span>₹50,000</span>
                <span>₹80,000</span>
              </div>
            </div>

            {/* Tenure selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">Select EMI Tenure:</label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 9, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenure(m)}
                    className={`py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      tenure === m
                        ? 'bg-teal-500 text-slate-950 border-teal-400 font-extrabold'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    {m} Mos
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Monthly EMI Box */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-300 uppercase font-semibold">
                  Monthly Installment:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-teal-300">
                  ₹{monthlyEmi.toLocaleString()}
                  <span className="text-xs font-normal text-slate-300"> /mo</span>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-300">
                <div>Interest: <strong className="text-emerald-400">0%</strong></div>
                <div>Down Payment: <strong className="text-emerald-400">₹0</strong></div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <CreditCard className="w-4 h-4" />
              <span>Apply for 0% EMI Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
