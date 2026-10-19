import { HOSPITAL_INFO } from '../data/hospitalData';

const WHATSAPP_STORAGE_KEY = 'ami_hospital_whatsapp_number';

export function getWhatsAppNumber(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(WHATSAPP_STORAGE_KEY);
    if (saved && saved.trim().length >= 7 && !saved.includes('9876543210')) {
      return saved.trim();
    }
  }
  return HOSPITAL_INFO.whatsappNumber;
}

export function saveWhatsAppNumber(num: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(WHATSAPP_STORAGE_KEY, num.trim());
  }
}

export function cleanPhoneNumber(raw: string): string {
  let cleaned = raw.replace(/[^0-9]/g, '');
  // If user enters 10 digits without country code in India (e.g. 8238411909), prefix 91
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
}

export function buildWhatsAppUrl(message: string, customNumber?: string): string {
  const number = customNumber ? cleanPhoneNumber(customNumber) : cleanPhoneNumber(getWhatsAppNumber());
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encodedText}`;
}

export function openWhatsApp(message: string, customNumber?: string): void {
  const url = buildWhatsAppUrl(message, customNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export const WHATSAPP_MESSAGES = {
  generalInquiry: (topic?: string) =>
    `Hello Ami Hospital, I have an inquiry about ${topic || 'painless laser piles treatment'}. Could you please guide me on consultation timings and doctor availability?`,

  bookAppointment: (details: {
    name: string;
    phone: string;
    condition: string;
    branch?: string;
    date?: string;
    time?: string;
    ladyDoctor?: boolean;
    refId?: string;
  }) =>
    `*Ami Hospital - Appointment Booking Request*
${details.refId ? `🆔 Reference ID: ${details.refId}\n` : ''}👤 Patient: ${details.name}
📱 Phone: ${details.phone}
🏥 Condition: ${details.condition}
📍 Branch: ${details.branch || 'Main Center (Sector 12)'}
📅 Preferred Slot: ${details.time || 'Morning'} ${details.date ? 'on ' + details.date : ''}
👩‍⚕️ Lady Doctor: ${details.ladyDoctor ? 'Yes, prefer Dr. Sneha Patel' : 'Any Senior Proctologist'}

Please confirm the appointment slot and send hospital directions.`,

  symptomCheck: (data: {
    assessment: string;
    bleeding: string;
    pain: string;
    prolapse: string;
    duration: string;
  }) =>
    `*Ami Hospital - Symptom Self-Assessment Report*
🩺 Estimated Condition: ${data.assessment}
🩸 Bleeding: ${data.bleeding}
⚡ Pain Type: ${data.pain}
📍 Lump / Prolapse: ${data.prolapse}
⏳ Duration: ${data.duration}

Doctor, please evaluate this case and let me know if laser treatment is suitable.`,

  insuranceCheck: (policyName: string, phone: string) =>
    `Hello Ami Hospital Insurance Desk,
I would like to check cashless insurance eligibility for laser piles surgery.
🏥 Insurance Company / TPA: ${policyName}
📱 Contact Number: ${phone}

Please let me know if 100% cashless approval is possible and what documents are required.`,

  ladyDoctorConsult: () =>
    `Hello Dr. Sneha Patel & Team at Ami Hospital,
I am a female patient seeking a private consultation for anorectal / piles discomfort. Please let me know when Dr. Sneha Patel is available at the clinic for a confidential checkup.`,
};
