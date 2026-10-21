export interface Treatment {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  iconName: string;
  description: string;
  symptoms: string[];
  laserAdvantages: string[];
  duration: string;
  hospitalStay: string;
  recoveryTime: string;
}

export interface Doctor {
  name: string;
  role: string;
  qualification?: string;
  experience: string;
  surgeriesCount: string;
  specialty: string[];
  languages: string[];
  bio: string;
  availability: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  age: number;
  city: string;
  condition: string;
  rating: number;
  recoveryTime: string;
  review: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'treatment' | 'insurance' | 'recovery' | 'general';
}

export interface AppointmentData {
  patientName: string;
  phone: string;
  condition: string;
  cityBranch: string;
  preferredDate: string;
  preferredTime: string;
  femaleDoctorRequested: boolean;
  notes?: string;
}
