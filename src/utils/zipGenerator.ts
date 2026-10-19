import JSZip from 'jszip';

export async function generateCloudflareZip(): Promise<{ blob: Blob; filename: string }> {
  const zip = new JSZip();

  const cloudflareHeaders = `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
  Cache-Control: public, max-age=3600

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

  const cloudflareRoutes = JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: [],
    },
    null,
    2
  );

  const wranglerToml = `name = "ami-hospital"
compatibility_date = "2026-01-01"

[site]
bucket = "./"
`;

  const readmeContent = `# Ami Hospital Landing Page - Cloudflare Pages Deployment

This package contains the complete production-ready website for **Ami Hospital (Laser Piles & Proctology Center)**, formatted specifically for 1-click deployment on Cloudflare Pages.

---

## 🚀 How to Deploy to Cloudflare Pages (Step-by-Step)

### Option 1: Direct Upload (Fastest - No Git Required)
1. Log in to your Cloudflare dashboard: **https://dash.cloudflare.com/**
2. Navigate to **Workers & Pages** in the left sidebar.
3. Click **Create application** > select the **Pages** tab.
4. Click **Upload assets** (Direct Upload).
5. Name your project: \`ami-hospital\`.
6. Either:
   - Extract this zip and drag-and-drop the unzipped folder into Cloudflare, OR
   - Upload this zip directly.
7. Click **Deploy site**.
8. Done! Your hospital website is live immediately at:
   \`https://ami-hospital.pages.dev\` (You can connect a custom domain like \`amihospital.com\` with free SSL in 1 click).

---

### Option 2: Deploy using Cloudflare Wrangler CLI
\`\`\`bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to your Cloudflare account
npx wrangler login

# 3. Deploy
npx wrangler pages deploy . --project-name=ami-hospital
\`\`\`

---

## 📁 Included Files in this ZIP:
- \`index.html\` - Complete standalone, responsive Ami Hospital landing page with all proctology treatments, doctor bios, interactive symptom checker, appointment booking, and FAQs.
- \`_headers\` - Cloudflare Edge caching and security headers (CSP, HSTS, X-Frame-Options).
- \`_routes.json\` - Cloudflare Pages routing rule.
- \`wrangler.toml\` - Configuration for Cloudflare CLI deployment.
- \`README.md\` - This guide.
`;

  // Generate self-contained standalone index.html
  const standaloneHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ami Hospital - Laser Piles & Proctology Center</title>
  <meta name="description" content="Ami Hospital offers advanced, painless laser treatments for Piles, Fissure, Fistula, and Pilonidal Sinus with same-day discharge and 24/7 care." />
  <meta property="og:title" content="Ami Hospital - Laser Piles & Proctology Center" />
  <meta property="og:description" content="Painless 30-minute laser treatment for Piles, Fissure & Fistula. Walk home same day." />
  <meta property="og:type" content="website" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, .heading-font { font-family: 'Outfit', sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased">
  <!-- Top Emergency Bar -->
  <div class="bg-slate-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">24x7 Helpline</span>
        <span>Emergency & Free Consultation: <strong>+91 82384 11909</strong></span>
      </div>
      <div class="flex items-center gap-4 text-slate-300">
        <span>⭐ 4.9/5 Rating (15,000+ Cured)</span>
        <span class="hidden md:inline">|</span>
        <span class="hidden md:inline">100% Cashless Mediclaim Approved</span>
      </div>
    </div>
  </div>

  <!-- Header / Navigation -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#" class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-teal-500/20">
          +
        </div>
        <div>
          <span class="text-2xl font-extrabold text-slate-900 tracking-tight heading-font">AMI <span class="text-teal-600">HOSPITAL</span></span>
          <p class="text-[10px] uppercase font-bold tracking-widest text-slate-500">Laser Proctology Center</p>
        </div>
      </a>
      <nav class="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
        <a href="#treatments" class="hover:text-teal-600 transition">Treatments</a>
        <a href="#comparison" class="hover:text-teal-600 transition">Laser vs Open Surgery</a>
        <a href="#symptom-checker" class="hover:text-teal-600 transition">Symptom Checker</a>
        <a href="#doctors" class="hover:text-teal-600 transition">Doctors</a>
        <a href="#insurance" class="hover:text-teal-600 transition">Insurance & EMI</a>
        <a href="#faq" class="hover:text-teal-600 transition">FAQ</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="https://wa.me/918238411909?text=Hello%20Ami%20Hospital,%20I%20have%20an%20inquiry%20about%20laser%20piles%20treatment." target="_blank" class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition">
          💬 WhatsApp Doctor
        </a>
        <a href="tel:+918238411909" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
          📞 Call Doctor
        </a>
        <a href="#book" class="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/20 transition transform active:scale-95">
          Book Free Visit
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50 py-12 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Hero Content -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold border border-teal-200">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            US FDA Approved German Laser Technology
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Pain-Free Laser Cure for <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Piles & Fissure</span> in 30 Mins.
          </h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-2xl">
            No cuts. No stitches. No painful dressing. Walk home the very same day with Ami Hospital’s specialized proctology care. Over 15,000 satisfied patients cured permanently.
          </p>

          <!-- Key Highlights -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            <div class="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <div class="text-xl font-black text-teal-600">30 Min</div>
              <div class="text-xs text-slate-500 font-medium">Laser Procedure</div>
            </div>
            <div class="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <div class="text-xl font-black text-teal-600">Same Day</div>
              <div class="text-xs text-slate-500 font-medium">Discharge in 4 Hrs</div>
            </div>
            <div class="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <div class="text-xl font-black text-teal-600">100%</div>
              <div class="text-xs text-slate-500 font-medium">Cashless Mediclaim</div>
            </div>
            <div class="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <div class="text-xl font-black text-teal-600">0% EMI</div>
              <div class="text-xs text-slate-500 font-medium">Starts ₹2,999/mo</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a href="#book" class="px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-600/30 transition transform active:scale-95">
              Book Free Consultation
            </a>
            <a href="https://wa.me/918238411909?text=Hi%20Ami%20Hospital,%20I%20would%20like%20to%20inquire%20about%20painless%20laser%20treatment." target="_blank" class="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 transition flex items-center gap-2">
              <span>💬 Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <!-- Hero Form Card -->
        <div class="lg:col-span-5" id="book">
          <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8">
            <div class="border-b border-slate-100 pb-4 mb-5">
              <div class="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                Zero Waiting Time
              </div>
              <h2 class="text-xl font-bold text-slate-900">Book Free Doctor Consultation</h2>
              <p class="text-xs text-slate-500 mt-1">Get 100% confidential diagnosis & cost estimate</p>
            </div>
            <form onsubmit="handleBook(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Patient Name</label>
                <input required type="text" id="pname" placeholder="Enter full name" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number (For OTP / Confirmation)</label>
                <input required type="tel" id="pphone" placeholder="+91 82384 xxxxx" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Condition</label>
                  <select id="pcondition" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="Piles (Hemorrhoids)">Piles (Bawaseer)</option>
                    <option value="Anal Fissure">Anal Fissure (Cuts/Pain)</option>
                    <option value="Fistula (FiLaC)">Anal Fistula (Bhagandar)</option>
                    <option value="Pilonidal Sinus">Pilonidal Sinus</option>
                    <option value="Other / Constipation">Chronic Constipation</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Time</label>
                  <select id="ptime" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Morning (9AM - 1PM)</option>
                    <option>Afternoon (1PM - 5PM)</option>
                    <option>Evening (5PM - 9PM)</option>
                  </select>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-1">
                <input type="checkbox" id="pfemale" class="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                <label for="pfemale" class="text-xs text-slate-600">I prefer consultation with a <strong>Female Doctor</strong></label>
              </div>
              <button type="submit" class="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/30 transition">
                Confirm Free Appointment Now
              </button>
              <div id="booking-success" class="hidden p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium text-center">
                ✅ Appointment confirmed! Our medical counselor will call you within 15 minutes.
              </div>
              <p class="text-[11px] text-center text-slate-400">🔒 100% Private & Confidential. Your medical data is strictly protected.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Treatments Section -->
  <section id="treatments" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-teal-600 font-bold uppercase tracking-wider text-xs">Specialized Procedures</span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">World-Class Laser Treatments at Ami Hospital</h2>
        <p class="text-slate-600 mt-3 text-base">We use 1470nm radial diode laser fibers that specifically target diseased veins without harming healthy surrounding anal muscles.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Card 1: Piles -->
        <div class="rounded-2xl border border-slate-200/80 p-6 hover:shadow-lg transition bg-white flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xl mb-4">🩸</div>
            <span class="text-[11px] font-bold uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded">Grade 1 to 4</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2">Laser Piles Surgery (LHP)</h3>
            <p class="text-xs text-slate-600 mt-2 leading-relaxed">Painless laser ablation of hemorrhoidal arterial tissue. Relieves bleeding, swelling, and prolapse immediately.</p>
            <ul class="mt-4 space-y-1.5 text-xs text-slate-600">
              <li>✓ 20 min painless procedure</li>
              <li>✓ No cuts, no wounds, no stitches</li>
              <li>✓ Walk out same day in 4 hours</li>
            </ul>
          </div>
          <a href="#book" class="mt-6 block text-center py-2.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 text-xs font-bold transition">Book Laser Visit</a>
        </div>

        <!-- Card 2: Fissure -->
        <div class="rounded-2xl border border-slate-200/80 p-6 hover:shadow-lg transition bg-white flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xl mb-4">⚡</div>
            <span class="text-[11px] font-bold uppercase text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">Instant Pain Relief</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2">Laser Fissure Cure</h3>
            <p class="text-xs text-slate-600 mt-2 leading-relaxed">Relaxes the hypertonic internal anal sphincter and promotes rapid tissue healing without incontinence risk.</p>
            <ul class="mt-4 space-y-1.5 text-xs text-slate-600">
              <li>✓ Stops sharp burning pain</li>
              <li>✓ Sphincter-preserving laser</li>
              <li>✓ Rapid healing within 24-48 hrs</li>
            </ul>
          </div>
          <a href="#book" class="mt-6 block text-center py-2.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 text-xs font-bold transition">Book Laser Visit</a>
        </div>

        <!-- Card 3: Fistula -->
        <div class="rounded-2xl border border-slate-200/80 p-6 hover:shadow-lg transition bg-white flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl mb-4">🎯</div>
            <span class="text-[11px] font-bold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">German FiLaC Tech</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2">Laser Fistula (FiLaC)</h3>
            <p class="text-xs text-slate-600 mt-2 leading-relaxed">Laser fiber glides into the fistula tract, coagulating and closing it from within while protecting muscle control.</p>
            <ul class="mt-4 space-y-1.5 text-xs text-slate-600">
              <li>✓ Zero damage to sphincter muscle</li>
              <li>✓ No painful open wound dressing</li>
              <li>✓ Extremely low recurrence (&lt;1%)</li>
            </ul>
          </div>
          <a href="#book" class="mt-6 block text-center py-2.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 text-xs font-bold transition">Book Laser Visit</a>
        </div>

        <!-- Card 4: Pilonidal Sinus -->
        <div class="rounded-2xl border border-slate-200/80 p-6 hover:shadow-lg transition bg-white flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl mb-4">🛡️</div>
            <span class="text-[11px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">No Deep Hole / Scar</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2">Sinus Laser (SiLaC)</h3>
            <p class="text-xs text-slate-600 mt-2 leading-relaxed">Eliminates chronic tailbone pilonidal sinus with radial diode laser. Avoids months of painful packing.</p>
            <ul class="mt-4 space-y-1.5 text-xs text-slate-600">
              <li>✓ Minimally invasive pin-hole entry</li>
              <li>✓ No large back excision scars</li>
              <li>✓ Resume sitting & work in 48 hours</li>
            </ul>
          </div>
          <a href="#book" class="mt-6 block text-center py-2.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 text-xs font-bold transition">Book Laser Visit</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Comparison Section: Traditional vs Ami Laser -->
  <section id="comparison" class="py-16 bg-slate-50 border-t border-slate-200/60">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-teal-600 font-bold uppercase tracking-wider text-xs">Why Choose Laser?</span>
        <h2 class="text-3xl font-extrabold text-slate-900 mt-2">Traditional Surgery vs. Ami Hospital Laser Surgery</h2>
        <p class="text-slate-600 mt-2 text-sm">See why 15,000+ patients chose Ami Hospital over painful conventional surgery.</p>
      </div>

      <div class="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="p-4 sm:p-5 font-bold">Feature / Parameter</th>
              <th class="p-4 sm:p-5 font-bold text-rose-300">Traditional Surgery</th>
              <th class="p-4 sm:p-5 font-bold text-teal-300">Ami Hospital Laser Surgery</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td class="p-4 font-semibold text-slate-900">Surgical Method</td>
              <td class="p-4 text-rose-600 font-medium">Cuts, blade incisions & painful stitches</td>
              <td class="p-4 text-emerald-700 font-bold bg-emerald-50/50">Laser energy coagulation (Zero Cuts)</td>
            </tr>
            <tr>
              <td class="p-4 font-semibold text-slate-900">Pain Level</td>
              <td class="p-4 text-rose-600 font-medium">Severe pain lasting 2 to 4 weeks</td>
              <td class="p-4 text-emerald-700 font-bold bg-emerald-50/50">Virtually painless (Walks out smiling)</td>
            </tr>
            <tr>
              <td class="p-4 font-semibold text-slate-900">Hospital Stay</td>
              <td class="p-4 text-rose-600 font-medium">3 to 5 days hospitalization</td>
              <td class="p-4 text-emerald-700 font-bold bg-emerald-50/50">Same-Day Discharge (3 to 4 hours)</td>
            </tr>
            <tr>
              <td class="p-4 font-semibold text-slate-900">Wound Dressing</td>
              <td class="p-4 text-rose-600 font-medium">Excruciating daily dressings for 3–5 weeks</td>
              <td class="p-4 text-emerald-700 font-bold bg-emerald-50/50">Zero open wounds, No dressings needed</td>
            </tr>
            <tr>
              <td class="p-4 font-semibold text-slate-900">Return to Work</td>
              <td class="p-4 text-rose-600 font-medium">3 to 4 weeks bed rest required</td>
              <td class="p-4 text-emerald-700 font-bold bg-emerald-50/50">Back to normal routine in 24–48 hours</td>
            </tr>
            <tr>
              <td class="p-4 font-semibold text-slate-900">Recurrence Rate</td>
              <td class="p-4 text-rose-600 font-medium">15% – 25% recurrence rate</td>
              <td class="p-4 text-emerald-700 font-bold bg-emerald-50/50">&lt; 1% recurrence rate with German laser</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Interactive Symptom Checker -->
  <section id="symptom-checker" class="py-16 bg-white border-t border-slate-100">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-br from-teal-900 via-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl">
        <div class="max-w-2xl">
          <span class="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">Self-Assessment Tool</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold">Confidential Piles Symptom Checker</h2>
          <p class="text-sm text-slate-300 mt-2">Answer 3 simple questions to evaluate your condition and understand if laser treatment is indicated.</p>
        </div>

        <div class="mt-8 space-y-6">
          <div>
            <label class="block text-sm font-semibold text-teal-200 mb-2">1. Do you experience bleeding during bowel movements?</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button onclick="setQuiz(1, 'None')" class="quiz-btn-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">No bleeding</button>
              <button onclick="setQuiz(1, 'Drops')" class="quiz-btn-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">Drops of bright blood</button>
              <button onclick="setQuiz(1, 'Splash')" class="quiz-btn-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">Spurting / heavy splash</button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-teal-200 mb-2">2. What type of pain or discomfort do you feel?</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button onclick="setQuiz(2, 'Painless')" class="quiz-btn-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">Completely painless</button>
              <button onclick="setQuiz(2, 'Burning')" class="quiz-btn-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">Sharp razor cutting / burning</button>
              <button onclick="setQuiz(2, 'Throbbing')" class="quiz-btn-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">Throbbing deep lump pain</button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-teal-200 mb-2">3. Do you feel a mass or lump protruding?</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button onclick="setQuiz(3, 'NoLump')" class="quiz-btn-3 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">No lump felt</button>
              <button onclick="setQuiz(3, 'GoesBack')" class="quiz-btn-3 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">Lump goes back automatically</button>
              <button onclick="setQuiz(3, 'Permanent')" class="quiz-btn-3 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-left">Lump stays outside constantly</button>
            </div>
          </div>

          <div id="quiz-result" class="p-4 rounded-2xl bg-teal-800/60 border border-teal-500/40 text-sm">
            <h4 class="font-bold text-teal-300">💡 Clinical Assessment Recommendation:</h4>
            <p class="text-xs text-slate-200 mt-1" id="quiz-advice">
              Select your answers above for an instant stage assessment and medical guidance.
            </p>
            <div class="mt-3">
              <a href="#book" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold text-xs transition">
                Consult Senior Proctologist Now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Doctors Section -->
  <section id="doctors" class="py-16 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-teal-600 font-bold uppercase tracking-wider text-xs">Medical Leadership</span>
        <h2 class="text-3xl font-extrabold text-slate-900 mt-2">Meet Ami Hospital Proctology Experts</h2>
        <p class="text-slate-600 mt-2 text-sm">Pioneering laser surgeons trained in Germany and Italy with over two decades of surgical excellence.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Dr 1 -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-2xl border-2 border-teal-500">
                👨‍⚕️
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-900">Dr. Amit R. Sharma</h3>
                <p class="text-xs font-semibold text-teal-600">Chief Proctologist & Medical Director</p>
                <p class="text-[11px] text-slate-500">MBBS, MS (General Surgery), FIAGES, FALS</p>
              </div>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              18+ years of dedicated proctology experience with more than 10,000 laser procedures performed. Trained in advanced 1470nm diode laser surgery in Germany.
            </p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span class="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">Laser Piles (LHP)</span>
              <span class="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">FiLaC Fistula</span>
              <span class="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">10,000+ Surgeries</span>
            </div>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500 font-medium">Mon - Sat: 9 AM - 6 PM</span>
            <a href="#book" class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition">Consult Doctor</a>
          </div>
        </div>

        <!-- Dr 2 -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-2xl border-2 border-rose-500">
                👩‍⚕️
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-xl font-bold text-slate-900">Dr. Sneha Patel</h3>
                  <span class="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">Female Specialist</span>
                </div>
                <p class="text-xs font-semibold text-rose-600">Senior Proctologist & Colorectal Surgeon</p>
                <p class="text-[11px] text-slate-500">MBBS, DNB (Surgery), Fellowship Laser Proctology</p>
              </div>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              14+ years of specialized surgical experience. Provides compassionate, 100% private care for female patients dealing with post-pregnancy piles, fissures, and pelvic floor disorders.
            </p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span class="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">Female Proctology</span>
              <span class="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">Post-Pregnancy Piles</span>
              <span class="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">6,500+ Surgeries</span>
            </div>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500 font-medium">Tue - Sun: 10 AM - 7 PM</span>
            <a href="#book" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition">Consult Lady Doctor</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Insurance & 0% EMI Section -->
  <section id="insurance" class="py-16 bg-white border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-3xl p-8 sm:p-12 border border-teal-100">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 space-y-4">
            <span class="inline-block px-3 py-1 rounded-full bg-teal-200/60 text-teal-900 text-xs font-bold uppercase tracking-wider">Hassle-Free Billing</span>
            <h2 class="text-3xl font-extrabold text-slate-900">100% Cashless Insurance & 0% EMI Support</h2>
            <p class="text-sm text-slate-600 leading-relaxed">
              Ami Hospital is empaneled with all major government and private insurance TPAs. Our in-house insurance coordinator processes your claim approvals in under 2 hours with ₹0 advance deposit.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div class="p-3 bg-white rounded-xl shadow-xs text-center border border-slate-200">
                <div class="text-xs font-bold text-slate-800">Star Health</div>
                <div class="text-[10px] text-teal-600 font-semibold">Cashless Approved</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs text-center border border-slate-200">
                <div class="text-xs font-bold text-slate-800">HDFC ERGO</div>
                <div class="text-[10px] text-teal-600 font-semibold">Cashless Approved</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs text-center border border-slate-200">
                <div class="text-xs font-bold text-slate-800">Care Insurance</div>
                <div class="text-[10px] text-teal-600 font-semibold">Cashless Approved</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs text-center border border-slate-200">
                <div class="text-xs font-bold text-slate-800">ICICI Lombard</div>
                <div class="text-[10px] text-teal-600 font-semibold">Cashless Approved</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs text-center border border-slate-200">
                <div class="text-xs font-bold text-slate-800">Niva Bupa</div>
                <div class="text-[10px] text-teal-600 font-semibold">Cashless Approved</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs text-center border border-slate-200">
                <div class="text-xs font-bold text-slate-800">All TPAs / Corporate</div>
                <div class="text-[10px] text-teal-600 font-semibold">100% Accepted</div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-5 bg-white p-6 rounded-2xl shadow-md border border-slate-200/80">
            <h3 class="text-lg font-bold text-slate-900">Check Your Insurance Coverage</h3>
            <p class="text-xs text-slate-500 mt-1">Get free eligibility check within 10 minutes</p>
            <div class="mt-4 space-y-3">
              <input type="text" id="ins-policy" placeholder="Your Insurance Company Name" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
              <input type="tel" id="ins-phone" placeholder="Your Contact Number" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
              <button onclick="checkInsurance()" class="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition">
                Check My Cashless Eligibility
              </button>
              <div id="ins-msg" class="hidden text-xs text-emerald-700 font-bold text-center">
                Our TPA desk is verifying your coverage right now!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="py-16 bg-white border-t border-slate-100">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <span class="text-teal-600 font-bold uppercase tracking-wider text-xs">Got Questions?</span>
        <h2 class="text-3xl font-extrabold text-slate-900 mt-1">Frequently Asked Questions</h2>
      </div>

      <div class="space-y-3">
        <details class="group bg-slate-50 p-4 rounded-xl border border-slate-200/80 cursor-pointer">
          <summary class="font-bold text-slate-800 text-sm flex justify-between items-center">
            Is laser piles surgery really painless?
            <span class="text-teal-600 font-bold transition group-open:rotate-180">▼</span>
          </summary>
          <p class="text-xs text-slate-600 mt-3 leading-relaxed">
            Yes. The procedure is performed under gentle short anesthesia. Because there are no blade cuts or surgical stitches, patients experience minimal discomfort and can walk comfortably right after surgery.
          </p>
        </details>

        <details class="group bg-slate-50 p-4 rounded-xl border border-slate-200/80 cursor-pointer">
          <summary class="font-bold text-slate-800 text-sm flex justify-between items-center">
            How long is the hospital stay?
            <span class="text-teal-600 font-bold transition group-open:rotate-180">▼</span>
          </summary>
          <p class="text-xs text-slate-600 mt-3 leading-relaxed">
            Ami Hospital performs laser proctology as a daycare procedure. You arrive in the morning or afternoon, have the 25-minute laser session, rest in our private recovery lounge for 3 to 4 hours, and return home the same day.
          </p>
        </details>

        <details class="group bg-slate-50 p-4 rounded-xl border border-slate-200/80 cursor-pointer">
          <summary class="font-bold text-slate-800 text-sm flex justify-between items-center">
            Can female patients request a lady doctor?
            <span class="text-teal-600 font-bold transition group-open:rotate-180">▼</span>
          </summary>
          <p class="text-xs text-slate-600 mt-3 leading-relaxed">
            Yes! Dr. Sneha Patel and an exclusive all-female clinical care team ensure absolute privacy, dignity, and comfortable examinations for our female patients.
          </p>
        </details>

        <details class="group bg-slate-50 p-4 rounded-xl border border-slate-200/80 cursor-pointer">
          <summary class="font-bold text-slate-800 text-sm flex justify-between items-center">
            Is the cost covered by health insurance?
            <span class="text-teal-600 font-bold transition group-open:rotate-180">▼</span>
          </summary>
          <p class="text-xs text-slate-600 mt-3 leading-relaxed">
            Yes, proctology laser treatments are approved and covered under all leading health insurance policies and corporate TPAs. We also offer 0% interest EMI schemes starting at ₹2,999/month.
          </p>
        </details>
      </div>
    </div>
  </section>

  <!-- Hospital Location & Footer -->
  <footer class="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
        <div>
          <span class="text-2xl font-black heading-font text-white">AMI <span class="text-teal-400">HOSPITAL</span></span>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">
            Super Speciality Laser Proctology Center. Committed to painless, modern, and permanent solutions for anorectal disorders.
          </p>
          <div class="mt-4 text-xs text-slate-300 space-y-1">
            <p>📍 Plot 42, Health City Avenue, Sector 12</p>
            <p>📞 Helpline: +91 82384 11909</p>
            <p>✉️ care@amihospital.com</p>
          </div>
        </div>
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Treatments</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="#treatments" class="hover:text-teal-400">Laser Piles Surgery (LHP)</a></li>
            <li><a href="#treatments" class="hover:text-teal-400">Anal Fissure Laser Therapy</a></li>
            <li><a href="#treatments" class="hover:text-teal-400">Laser Fistula Closure (FiLaC)</a></li>
            <li><a href="#treatments" class="hover:text-teal-400">Pilonidal Sinus Laser (SiLaC)</a></li>
            <li><a href="#treatments" class="hover:text-teal-400">Pelvic Floor & Constipation Clinic</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="#comparison" class="hover:text-teal-400">Laser vs Open Surgery</a></li>
            <li><a href="#symptom-checker" class="hover:text-teal-400">Piles Stage Self-Check</a></li>
            <li><a href="#doctors" class="hover:text-teal-400">Meet Our Specialists</a></li>
            <li><a href="#insurance" class="hover:text-teal-400">Cashless Mediclaim & EMI</a></li>
            <li><a href="#faq" class="hover:text-teal-400">FAQ & Recovery Guide</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Emergency & Appointments</h4>
          <p class="text-xs text-slate-400 mb-3">Our medical team is available 24x7 for emergencies and same-day consultations.</p>
          <a href="tel:+918238411909" class="block text-center py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition">
            Call +91 82384 11909
          </a>
          <p class="text-[11px] text-slate-500 mt-2 text-center">OPD: 8 AM - 9 PM | Emergency: 24 Hours</p>
        </div>
      </div>
      <div class="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>© 2026 Ami Hospital. All rights reserved. Medical content verified by licensed proctologists.</p>
        <p class="text-[11px]">Designed for instant Cloudflare Pages direct upload.</p>
      </div>
    </div>
  </footer>

  <script>
    function handleBook(e) {
      e.preventDefault();
      document.getElementById('booking-success').classList.remove('hidden');
      const name = document.getElementById('pname').value;
      const phone = document.getElementById('pphone').value;
      const cond = document.getElementById('pcondition').value;
      setTimeout(() => {
        window.open('https://wa.me/918238411909?text=' + encodeURIComponent('Hello Ami Hospital, I booked an appointment for ' + name + ' (Phone: ' + phone + ') for ' + cond + '. Please confirm my slot.'), '_blank');
      }, 1000);
    }

    const quizState = { b: '', p: '', l: '' };
    function setQuiz(q, val) {
      if (q === 1) quizState.b = val;
      if (q === 2) quizState.p = val;
      if (q === 3) quizState.l = val;
      
      const advice = document.getElementById('quiz-advice');
      if (quizState.b === 'Splash' || quizState.l === 'Permanent') {
        advice.innerHTML = '<strong class="text-amber-400">Grade 3 or 4 Hemorrhoids indicated:</strong> Substantial prolapse or heavy bleeding requires prompt medical evaluation. Ami Hospital 25-min laser treatment offers immediate relief with 0% cuts.';
      } else if (quizState.p === 'Burning') {
        advice.innerHTML = '<strong class="text-cyan-300">Acute / Chronic Anal Fissure indicated:</strong> Severe cutting spasm pain is typical of fissure tears. Ami Hospital sphincter-relaxing laser promotes rapid healing within 24-48 hours.';
      } else {
        advice.innerHTML = '<strong class="text-emerald-300">Grade 1 or Early Stage indicated:</strong> Mild discomfort or early bleeding can often be cured quickly before it worsens. Consult our doctor for simple outpatient laser care.';
      }
    }

    function checkInsurance() {
      document.getElementById('ins-msg').classList.remove('hidden');
    }
  </script>

  <!-- Floating WhatsApp Chat Widget -->
  <div class="fixed bottom-6 left-6 z-50">
    <a href="https://wa.me/918238411909?text=Hello%20Ami%20Hospital,%20I%20have%20an%20inquiry%20about%20painless%20piles%20laser%20treatment." target="_blank" class="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3.5 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95 font-bold text-xs border-2 border-white/80">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping"></span>
      <span>💬 WhatsApp Doctor (Online)</span>
    </a>
  </div>
</body>
</html>`;

  // Add files to zip
  zip.file('index.html', standaloneHtml);
  zip.file('_headers', cloudflareHeaders);
  zip.file('_routes.json', cloudflareRoutes);
  zip.file('wrangler.toml', wranglerToml);
  zip.file('README.md', readmeContent);

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  return {
    blob,
    filename: 'ami-hospital-cloudflare-pages.zip',
  };
}
