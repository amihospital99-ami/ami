import { Treatment, Doctor, Testimonial, FaqItem } from '../types';

export const HOSPITAL_INFO = {
  name: 'Ami Hospital',
  legalName: 'Ami Super Speciality Laser Proctology Hospital',
  tagline: 'Painless Laser Cure for Piles, Fissure & Fistula',
  phone: '+91 82384 11909',
  emergencyPhone: '+91 82384 11909',
  whatsappNumber: '+918238411909',
  email: 'care@amihospital.com',
  address: 'Plot 42, Health City Avenue, Near Metro Station, Sector 12',
  city: 'Mumbai / Delhi / Ahmedabad / Bangalore Hubs',
  timings: 'OPD: 8:00 AM - 9:00 PM (Emergency 24x7)',
  branches: [
    { name: 'Ami Hospital - Main Center (Sector 12)', phone: '+91 82384 11909' },
    { name: 'Ami Proctology Clinic - City South', phone: '+91 82384 11909' },
    { name: 'Ami Day-Care Surgical Wing - West', phone: '+91 82384 11909' },
  ],
  stats: {
    patientsTreated: '15,000+',
    successRate: '99.4%',
    experienceYears: '20+',
    insurancePartners: '35+',
    laserSurgeriesDone: '12,500+',
    rating: '4.9 / 5.0 (2,400+ reviews)',
  },
};

export const TREATMENTS: Treatment[] = [
  {
    id: 'piles',
    name: 'Laser Piles Surgery (LHP)',
    subtitle: 'Laser Hemorrhoidoplasty for Grade 1, 2, 3 & 4 Piles',
    tag: 'Most Popular',
    iconName: 'Activity',
    description:
      'A minimally invasive procedure where 1470nm diode laser energy shrinks hemorrhoidal arterial flow while preserving the natural anoderm and sphincter muscle completely.',
    symptoms: [
      'Painless bright red bleeding during defecation',
      'Prolapsed mass or swelling protruding from the anus',
      'Severe itching, mucus discharge, and irritation',
      'Persistent discomfort while sitting or walking',
    ],
    laserAdvantages: [
      'No incisions, no open wounds, and no painful stitches',
      'Procedure completed in only 20 to 30 minutes',
      'Walk back home comfortably on the same day (4-hour discharge)',
      'Zero risk of anal incontinence or sphincter damage',
      'Virtually negligible recurrence rate (<1%)',
    ],
    duration: '25 Minutes',
    hospitalStay: '4 Hours (Same Day)',
    recoveryTime: '24 - 48 Hours',
  },
  {
    id: 'fissure',
    name: 'Laser Anal Fissure Treatment',
    subtitle: 'Sphincter-preserving gentle laser therapy for chronic cuts',
    tag: 'Instant Pain Relief',
    iconName: 'ShieldAlert',
    description:
      'Controlled laser debridement and internal sphincter relaxation stimulates micro-circulation, curing deep painful tears without the incontinence hazards of conventional cut surgery.',
    symptoms: [
      'Razor-sharp tearing pain during and after bowel movements',
      'Streaks of blood on stool surface or toilet paper',
      'Visible crack or sentinel skin tag at the anal verge',
      'Severe anal spasms preventing normal bowel evacuation',
    ],
    laserAdvantages: [
      'Immediate relief from severe post-defecation spasm',
      'Rapid epithelialization and accelerated tissue healing',
      'No permanent cutting of sphincter muscles',
      'Safe for diabetic and elderly patients',
      'Return to daily work routine within 36 hours',
    ],
    duration: '20 Minutes',
    hospitalStay: 'Day-Care (3 Hours)',
    recoveryTime: '1 - 2 Days',
  },
  {
    id: 'fistula',
    name: 'Laser Fistula Treatment (FiLaC)',
    subtitle: 'Fistula-tract Laser Closure preserving full sphincter function',
    tag: 'Advanced German Tech',
    iconName: 'Zap',
    description:
      'A radial emitting laser fiber seals the internal epithelialized fistula tract from inside out, eliminating the fistula while protecting sphincter muscles 100%.',
    symptoms: [
      'Recurrent pus or foul-smelling fluid discharge',
      'Painful recurrent abscesses or swelling near the anus',
      'Fever and chills during acute infection flare-ups',
      'Constant staining of undergarments',
    ],
    laserAdvantages: [
      'Strict sphincter preservation ensures 0% risk of incontinence',
      'No complex seton wires or painful wound dressings needed',
      'Minimally invasive with microscopic entry point',
      'Superior healing rate compared to open fistulectomy',
      'Painless post-operative recovery period',
    ],
    duration: '35 Minutes',
    hospitalStay: 'Day-Care / 6 Hours',
    recoveryTime: '2 - 3 Days',
  },
  {
    id: 'pilonidal',
    name: 'Pilonidal Sinus Laser (SiLaC)',
    subtitle: 'Sinus Laser Closure for tailbone cysts & chronic sinuses',
    tag: 'No Big Scar',
    iconName: 'Crosshair',
    description:
      'Painless laser obliteration of natal cleft sinuses. Cleans and seals the hair follicle sinus cavity with diode laser energy, avoiding large debilitating back wounds.',
    symptoms: [
      'Pain, redness, and swelling at the upper tailbone/buttock cleft',
      'Drainage of blood, fluid, or foul pus from small pinholes',
      'Inability to sit comfortably for prolonged work hours',
      'Recurrent infections despite oral antibiotics',
    ],
    laserAdvantages: [
      'Avoids open wide excision scars that take months to heal',
      'No daily painful gauze packing of deep cavities',
      'Resume desk work, driving, and gym within days',
      'Extremely high cosmetic and healing outcome',
      'Safe, outpatient daycare procedure',
    ],
    duration: '30 Minutes',
    hospitalStay: '4 Hours',
    recoveryTime: '2 Days',
  },
  {
    id: 'constipation',
    name: 'Pelvic Floor & Chronic Constipation Clinic',
    subtitle: 'Comprehensive biofeedback, fiber therapy & bowel retraining',
    tag: 'Holistic Care',
    iconName: 'HeartPulse',
    description:
      'Comprehensive clinical management of obstructed defecation syndrome, rectocele, and dyssynergic defecation to prevent piles recurrence and restore natural digestion.',
    symptoms: [
      'Straining excessively during bowel evacuation',
      'Sensation of incomplete evacuation or rectal blockage',
      'Hard, dry lumpy stools passed fewer than 3 times a week',
      'Chronic dependence on laxatives and enemas',
    ],
    laserAdvantages: [
      'Comprehensive anorectal manometry and diagnosis',
      'Individualized high-fiber nutrition and hydration plans',
      'Permanent lifestyle solution rather than temporary laxatives',
      'Supervised by senior gastroenterologists and dieticians',
      'Prevents future surgical recurrences',
    ],
    duration: 'Outpatient Care',
    hospitalStay: 'No Admission',
    recoveryTime: 'Immediate',
  },
];

export const COMPARISON_DATA = [
  {
    parameter: 'Surgical Method',
    traditional: 'Blade incision, cutting of anal tissue & sphincter',
    amiLaser: 'High-precision 1470nm radial laser coagulation (No Cuts)',
  },
  {
    parameter: 'Pain Level',
    traditional: 'Severe post-op pain lasting 2–4 weeks',
    amiLaser: 'Minimal to zero pain; mild soreness for 24h',
  },
  {
    parameter: 'Bleeding & Cuts',
    traditional: 'Heavy blood loss, open wounds with stitches',
    amiLaser: 'Pin-point laser seals blood vessels; Bloodless',
  },
  {
    parameter: 'Hospital Stay',
    traditional: '3 to 5 days hospitalization required',
    amiLaser: 'Day-care procedure (Discharge in 3 to 4 hours)',
  },
  {
    parameter: 'Daily Wound Dressing',
    traditional: 'Extremely painful daily dressings for 3–6 weeks',
    amiLaser: 'Zero open wounds, No dressings or bandages needed',
  },
  {
    parameter: 'Return to Work',
    traditional: '3 to 4 weeks bed rest mandatory',
    amiLaser: 'Back to normal desk work in 24 to 48 hours',
  },
  {
    parameter: 'Risk of Incontinence',
    traditional: 'Moderate risk due to accidental sphincter cut',
    amiLaser: 'Zero risk; 100% sphincter preservation guarantee',
  },
  {
    parameter: 'Recurrence Rate',
    traditional: '15% – 25% recurrence chance',
    amiLaser: 'Less than 1% long-term recurrence rate',
  },
];

export const DOCTORS: Doctor[] = [
  {
    name: 'Dr. Amit R. Sharma',
    role: 'Chief Proctologist & Medical Director',
    qualification: 'MBBS, MS (General Surgery), FIAGES, FALS (Proctology)',
    experience: '18+ Years Experience',
    surgeriesCount: '10,000+ Laser Procedures',
    specialty: ['Laser Hemorrhoidoplasty', 'Complex FiLaC Fistula Repair', 'Laparoscopy'],
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    bio: 'Pioneer in laser proctology in Western India. Trained in Germany and Italy for advanced diode laser techniques. Former Senior Consultant at top tertiary hospitals.',
    availability: 'Mon - Sat (9:00 AM - 6:00 PM)',
  },
  {
    name: 'Dr. Sneha Patel',
    role: 'Senior Female Proctologist & Colorectal Surgeon',
    qualification: 'MBBS, DNB (Surgery), Fellowship in Laser Proctology',
    experience: '14+ Years Experience',
    surgeriesCount: '6,500+ Laser Surgeries',
    specialty: ['Female Proctology & Pelvic Health', 'Post-Partum Piles', 'Anal Fissure & Sinus'],
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Dedicated to providing compassionate, 100% private, and empathetic treatment for female patients facing post-pregnancy hemorrhoids and chronic anorectal disorders.',
    availability: 'Tue - Sun (10:00 AM - 7:00 PM)',
  },
  {
    name: 'Dr. Rajesh K. Mehta',
    role: 'Senior Consultant Anesthesiologist & Critical Care',
    qualification: 'MBBS, MD (Anesthesia), Fellowship in Day-Care Sedation',
    experience: '16+ Years Experience',
    surgeriesCount: '15,000+ Sedations',
    specialty: ['Painless Local/Regional Block', 'Short Daycare Sedation', 'Senior Citizen Safety'],
    languages: ['English', 'Hindi'],
    bio: 'Expert in ultra-safe short-acting sedation protocols that allow patients to wake up refreshed within 15 minutes with zero nausea or dizziness.',
    availability: 'On-Call 24x7 for All Surgeries',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    patientName: 'Ramesh Verma',
    age: 44,
    city: 'Mumbai',
    condition: 'Grade 3 Bleeding Piles',
    rating: 5,
    recoveryTime: 'Back to office in 2 days',
    review:
      'I suffered in silence for 4 years fearing severe surgery pain. At Ami Hospital, Dr. Amit completed the laser procedure in just 25 minutes! I walked to my car without any help and was back at my office desk on Monday without pain. Truly life-changing!',
    date: '2 weeks ago',
  },
  {
    id: 't2',
    patientName: 'Pooja Deshmukh',
    age: 32,
    city: 'Pune',
    condition: 'Severe Post-Pregnancy Fissure',
    rating: 5,
    recoveryTime: 'Relief within 24 hours',
    review:
      'After my delivery, the fissure pain was unbearable. I was very shy, but Dr. Sneha Patel and the female nursing team at Ami Hospital made me feel completely comfortable and safe. The treatment was painless and the relief was immediate.',
    date: '1 month ago',
  },
  {
    id: 't3',
    patientName: 'Sanjay Kothari',
    age: 51,
    city: 'Ahmedabad',
    condition: 'High Complex Anal Fistula (FiLaC)',
    rating: 5,
    recoveryTime: 'Healed completely without dressing',
    review:
      'Other doctors told me I needed an open surgery with 6 weeks of painful daily dressing. Ami Hospital used the German FiLaC laser. Zero cuts, zero dressing! My insurance was approved cashlessly within 2 hours. Highly recommend Ami Hospital!',
    date: '3 weeks ago',
  },
];

export const INSURANCE_PARTNERS = [
  'Star Health & Allied Insurance',
  'HDFC ERGO General Insurance',
  'Care Health Insurance',
  'ICICI Lombard',
  'Niva Bupa Health Insurance',
  'Bajaj Allianz',
  'Tata AIG',
  'Max Bupa',
  'New India Assurance',
  'Medi Assist TPA',
  'Paramount Health TPA',
  'Vipul Medcorp',
];

export const FAQ_LIST: FaqItem[] = [
  {
    category: 'treatment',
    question: 'Is laser piles surgery really 100% painless?',
    answer:
      'Yes. The procedure is performed under gentle short sedation or localized block so you feel nothing during the procedure. Post-operatively, because there are no surgical cuts or stitches, patients experience only a mild sensation rather than the severe pain typical of traditional open surgery.',
  },
  {
    category: 'treatment',
    question: 'How long does the surgery take and when can I go home?',
    answer:
      'The laser surgery itself takes only 20 to 30 minutes. You will be monitored in our comfortable recovery lounge for about 3 to 4 hours, enjoy a light meal, and walk home comfortably the very same day.',
  },
  {
    category: 'recovery',
    question: 'When can I resume work and daily physical activities?',
    answer:
      'Most desk workers comfortably return to work within 24 to 48 hours. Light walking is encouraged from day one. Strenuous weightlifting or heavy workouts can be resumed within 1 to 2 weeks.',
  },
  {
    category: 'insurance',
    question: 'Is laser treatment covered under Mediclaim / Health Insurance?',
    answer:
      'Yes, proctology laser procedures at Ami Hospital are recognized and covered by all major Indian health insurance policies and TPAs. Our dedicated insurance desk handles 100% cashless pre-authorization with zero paper hassle.',
  },
  {
    category: 'insurance',
    question: 'What if I do not have insurance? Is there a 0% EMI option?',
    answer:
      'Yes! Ami Hospital offers 0% interest EMI options starting at just ₹2,999/month with zero processing fee and no down payment, making world-class laser care accessible to everyone.',
  },
  {
    category: 'general',
    question: 'Can female patients consult a lady doctor at Ami Hospital?',
    answer:
      'Absolutely. We have Dr. Sneha Patel and an exclusive, all-female clinical care team ensuring 100% privacy, dignity, and comfort for our female patients.',
  },
  {
    category: 'general',
    question: 'What is the recurrence rate after laser treatment?',
    answer:
      'The recurrence rate with German 1470nm radial laser ablation at Ami Hospital is under 1%, compared to 15-25% in traditional surgeries. Our specialists also provide nutritional counseling to ensure healthy bowel habits permanently.',
  },
];
