import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, MessageSquare } from 'lucide-react';
import { openWhatsApp, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface SymptomCheckerProps {
  onOpenBooking: () => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onOpenBooking }) => {
  const [bleeding, setBleeding] = useState<string>('drops');
  const [pain, setPain] = useState<string>('painless');
  const [prolapse, setProlapse] = useState<string>('goesBack');
  const [duration, setDuration] = useState<string>('months');

  // Compute diagnosis recommendation based on user selections
  const getRecommendation = () => {
    if (pain === 'burning') {
      return {
        title: 'Suspected Anal Fissure (Tear in Anoderm)',
        severity: 'Moderate to High Pain',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        summary:
          'Sharp razor-cutting pain during and after bowel movements with bright streaks of blood is a hallmark of anal fissure spasms.',
        recommendedProcedure: 'Ami Laser Sphincter Relaxation (20 Mins, Instant Spasm Relief)',
        urgency: 'Early laser treatment prevents chronic scarring and deep infection.',
      };
    }

    if (pain === 'throbbing') {
      return {
        title: 'Suspected Anal Fistula or Perianal Abscess',
        severity: 'Requires Urgent Examination',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        summary:
          'Deep throbbing pain, localized swelling, or intermittent pus discharge suggests an active infected tract (fistula in ano).',
        recommendedProcedure: 'FiLaC (Fistula-tract Laser Closure) preserving 100% sphincter control',
        urgency: 'Never squeeze or delay fistula infections; laser sealing prevents complex branching.',
      };
    }

    if (prolapse === 'permanent' || bleeding === 'spurting') {
      return {
        title: 'Grade 3 or Grade 4 Internal Piles (Hemorrhoids)',
        severity: 'High Prolapse & Bleeding Risk',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        summary:
          'Hemorrhoidal tissue that stays outside or bleeds heavily causes progressive hemoglobin drop and hygiene complications.',
        recommendedProcedure: 'German LHP (Laser Hemorrhoidoplasty) - 25 Mins, No Cuts, No Stitches',
        urgency: '1470nm laser shrinks vessels permanently with same-day 4-hour discharge.',
      };
    }

    return {
      title: 'Grade 1 or Grade 2 Early Internal Piles',
      severity: 'Early Stage (Highly Curable)',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      summary:
        'Occasional painless drops of bright blood or mild protrusion that reduces spontaneously is characteristic of early-stage piles.',
      recommendedProcedure: 'Daycare Outpatient Laser / Dietary & Fiber Biofeedback Protocol',
      urgency: 'Treating early prevents progression into painful prolapse or emergency hospital stays.',
    };
  };

  const recommendation = getRecommendation();

  return (
    <section id="symptom-checker" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            100% Confidential Online Self-Check
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Piles & Proctology Symptom Assessment
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Select your symptoms below to get an instant clinical estimation and understand if laser treatment is right for you.
          </p>
        </div>

        {/* Interactive Checker Box */}
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Quiz Questions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Question 1: Bleeding */}
              <div>
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  1. Bleeding during or after stool?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBleeding('none')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      bleeding === 'none'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    No bleeding seen
                  </button>
                  <button
                    type="button"
                    onClick={() => setBleeding('drops')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      bleeding === 'drops'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    Few drops of bright blood
                  </button>
                  <button
                    type="button"
                    onClick={() => setBleeding('spurting')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      bleeding === 'spurting'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    Continuous spurting / splash
                  </button>
                </div>
              </div>

              {/* Question 2: Pain Type */}
              <div>
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  2. What type of pain or sensation do you feel?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPain('painless')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      pain === 'painless'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    Completely painless
                  </button>
                  <button
                    type="button"
                    onClick={() => setPain('burning')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      pain === 'burning'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    Sharp cutting / razor burning
                  </button>
                  <button
                    type="button"
                    onClick={() => setPain('throbbing')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      pain === 'throbbing'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    Deep throbbing / swelling ache
                  </button>
                </div>
              </div>

              {/* Question 3: Prolapse / Lump */}
              <div>
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  3. Do you feel a mass or swelling protruding outside?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setProlapse('noLump')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      prolapse === 'noLump'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    No lump protruding
                  </button>
                  <button
                    type="button"
                    onClick={() => setProlapse('goesBack')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      prolapse === 'goesBack'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    Pops out but goes back inside
                  </button>
                  <button
                    type="button"
                    onClick={() => setProlapse('permanent')}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition border cursor-pointer ${
                      prolapse === 'permanent'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    Stays outside permanently
                  </button>
                </div>
              </div>

              {/* Question 4: Duration */}
              <div>
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  4. How long have you had these symptoms?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDuration('recent')}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition border cursor-pointer ${
                      duration === 'recent'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    &lt; 1 Month
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration('months')}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition border cursor-pointer ${
                      duration === 'months'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    1 - 6 Months
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration('chronic')}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition border cursor-pointer ${
                      duration === 'chronic'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm'
                        : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    &gt; 1 Year (Chronic)
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Instant Assessment Result Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-lg space-y-5">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border mb-2 ${recommendation.badgeColor}`}>
                  {recommendation.severity}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {recommendation.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {recommendation.summary}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
                <span className="text-[10px] font-bold uppercase text-teal-800 tracking-wider">
                  Recommended Treatment at Ami Hospital:
                </span>
                <p className="text-xs font-bold text-teal-950 mt-1">
                  {recommendation.recommendedProcedure}
                </p>
                <p className="text-[11px] text-teal-700 mt-1">
                  {recommendation.urgency}
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/30 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Book Free Consultation For This</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      WHATSAPP_MESSAGES.symptomCheck({
                        assessment: recommendation.title,
                        bleeding,
                        pain,
                        prolapse,
                        duration,
                      })
                    )
                  }
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Symptoms to Doctor on WhatsApp</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-teal-600" />
                  Free 2nd opinion • No obligation • 100% private
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
