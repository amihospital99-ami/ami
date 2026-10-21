import React from 'react';
import { DOCTORS } from '../data/hospitalData';
import { Award, CheckCircle2, Calendar, ShieldCheck, HeartHandshake, MessageSquare } from 'lucide-react';
import { openWhatsApp, WHATSAPP_MESSAGES } from '../utils/whatsapp';

interface DoctorsSectionProps {
  onOpenBooking: () => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="doctors" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            Medical Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Meet Our Senior Laser Proctologists
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Board-certified surgeons with specialized international fellowships in diode laser surgery from Germany and Italy.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc, idx) => {
            const isFemaleSpecialist =
              doc.name.includes('Sneha') ||
              doc.name.includes('Urvashi') ||
              doc.role.toLowerCase().includes('female');
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Doctor Avatar & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xs ${
                          isFemaleSpecialist
                            ? 'bg-rose-100 text-rose-700 border-2 border-rose-300'
                            : 'bg-teal-100 text-teal-700 border-2 border-teal-300'
                        }`}
                      >
                        {isFemaleSpecialist ? '👩‍⚕️' : '👨‍⚕️'}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight">
                          {doc.name}
                        </h3>
                        <p
                          className={`text-xs font-bold mt-0.5 ${
                            isFemaleSpecialist ? 'text-rose-600' : 'text-teal-600'
                          }`}
                        >
                          {doc.role}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {doc.experience}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isFemaleSpecialist && (
                    <div className="mb-3 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Dedicated Lady Doctor for Female Patient Privacy</span>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 font-medium mb-3">
                    <strong>Credentials:</strong> {doc.qualification}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {doc.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      Key Surgical Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specialty.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Surgical Track Record */}
                  <div className="flex items-center justify-between py-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium">Laser Surgeries:</span>
                    <span className="font-extrabold text-teal-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {doc.surgeriesCount}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>OPD Hours:</span>
                    <span className="font-semibold text-slate-700">{doc.availability}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={onOpenBooking}
                      className={`py-2 px-3 rounded-xl text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                        isFemaleSpecialist
                          ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                          : 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp(
                          isFemaleSpecialist
                            ? WHATSAPP_MESSAGES.ladyDoctorConsult()
                            : WHATSAPP_MESSAGES.generalInquiry(`consultation with ${doc.name}`)
                        )
                      }
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lady Doctor Assurance Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-teal-50 to-cyan-50 border border-rose-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold uppercase tracking-wider">
              Women's Health & Comfort
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Female Patients: 100% Private Consultations with Lady Proctologist
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              We understand that conditions like piles and fissures can feel uncomfortable to discuss. Dr. Sneha Patel and our female nurses ensure utmost dignity, confidentiality, and empathy.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/25 transition cursor-pointer active:scale-95"
            >
              Consult Lady Doctor
            </button>
            <button
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.ladyDoctorConsult())}
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Lady Doctor</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
