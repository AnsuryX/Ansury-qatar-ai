import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Globe, Sliders, Sparkles, Smartphone, Code } from 'lucide-react';

interface ResponseTemplate {
  english: string;
  arabic: string;
  markers: string[];
}

interface PersonaConfig {
  name: string;
  role: string;
  description: string;
  efficient: ResponseTemplate;
  vip: ResponseTemplate;
}

const PERSONAS: PersonaConfig[] = [
  {
    name: "H.E. Al-Dossari",
    role: "Saudi Family Office VIP",
    description: "Seeking ultra-exclusive freehold estate in La Plage, Pearl-Qatar. Highly formal, values honorifics and privacy.",
    efficient: {
      english: "Dear HE Al-Dossari, following up on your Pearl-Qatar interest. We have consolidated private files for three off-market waterfront villas in La Plage. Freehold ownership is fully registered under Qatar Law No.16. Kindly select a time for a encrypted briefing.",
      arabic: "سعادة الأستاذ عبداللطيف الدوسري المحترم، تحية طيبة وبعد. إشارةً لاهتمامكم بعقارات جهة لا بلاج باللؤلؤة، يسعدنا تزويدكم بملف بثلاث فلل حصرية ومستقلة على الواجهة البحرية. نؤكد لكم تسجيل الملكية الحرة وفقًا للقانون رقم ١٦ لسنة ٢٠١٨. بانتظار تحديد موعد لمكالمة خاصة.",
      markers: ["Honorific: سعادة الأستاذ المحترم", "Law Reference: القانون رقم ١٦ لسنة ٢٠١٨", "Waterfront term: الواجهة البحرية"]
    },
    vip: {
      english: "May Peace, Mercy, and Blessings of Allah be upon you, Excellency. It is our absolute honor to address your interest in the Pearl-Qatar. In alignment with your family office rules, we have secured a private dossier of three bespoke waterfront estates in La Plage. Freehold rights are guaranteed in perpetuity under Law No. 16 of 2018. We remain at your full convenience for an exclusive private presentation.",
      arabic: "السلام عليكم ورحمة الله وبركاته، سعادة الأستاذ عبداللطيف الدوسري المحترم. تشرفنا للغاية بمتابعة رغبتكم الكريمة باللؤلؤة. وتفادياً لمرحلة الإيجاز المفتوحة، قمنا بإعداد ملف متكامل من ثلاث فلل شاطئية حصرية مطابقة لتطلعاتكم الرفيعة بـ لا بلاج. نؤكد لسعادتكم اكتمال شروط التملك الحر للأخوة الأشقاء من مجلس التعاون وفقاً للقانون رقم ١٦ لعام ٢٠١٨. وبانتظار ساعة تفضلكم بتحديد اللقاء الخاص.",
      markers: ["Islamic Opening: السلام عليكم ورحمة الله", "Peer Recognition: للأخوة الأشقاء من مجلس التعاون", "Property Term: تطلعاتكم الرفيعة بمشروع لا بلاج"]
    }
  },
  {
    name: "Dr. Elizabeth Vance",
    role: "UK Biotech Corporate",
    description: "Relocating regional tech HQ to Lusail Marina. High focus on district-cooling, lease flexibility, and speed.",
    efficient: {
      english: "Hi Dr. Vance, we have mapped two contiguous corporate floors (1,800 sqm total) in Lusail Marina District. Features advanced district-cooling efficiency and direct metro link. Flexible 3-year term contracts are ready. Let's arrange a call today.",
      arabic: "مرحباً الدكتورة إليزابيث، قمنا بتحديد طابقين تجاريين متصلين (إجمالي ١٨٠٠ متر مربع) في منطقة مارينا لوسيل. المكاتب مجهزة بنظام تبريد المناطق المتقدم وتتصل مباشرة بالمترو. تتوفر عقود مرنة بمدد تصل لـ ٣ سنوات. يسعدنا الاتصال بكم اليوم لبحث التفاصيل.",
      markers: ["Direct Greeting: مرحباً الدكتورة", "Utility Translation: تبريد المناطق المتقدم", "Sub-District: مارينا لوسيل"]
    },
    vip: {
      english: "Dear Dr. Vance, it is a pleasure to coordinate with your executive team regarding the relocation of Apex Biotech. We have curated a technical workspace proposal featuring two high-floor connected zones (1,800 sqm) in Lusail's Marina District. The site optimizes carbon goals with specialized district-cooling and transit links. Terms are structured for international corporate compliance. We are ready to host your delegation.",
      arabic: "سعادة الدكتورة إليزابيث فينس المحترمة، يسعدنا التنسيق مع فريقكم التنفيذي لنقل المقر الإقليمي لشركة أيبكس بيوتك. أعددنا مقترحاً مخصصاً يضم منطقتين متصلتين بالأدوار المرتفعة بمساحة ١٨٠٠ متر مربع ببرج مارينا لوسيل. يراعي المشروع معايير الاستدامة بتفعيل خدمات الكفاءة الحرارية. يسعدنا تسهيل زيارة وفدكم الكريم للدوحة.",
      markers: ["Formal corporate: سعادة الدكتورة المحترمة", "Localization: برج مارينا لوسيل", "Standard diplomatic wrap: وفدكم الكريم للدوحة"]
    }
  }
];

export default function DualResponseConsole({ onShowTechStack }: { onShowTechStack: () => void }) {
  const [activePersona, setActivePersona] = useState<PersonaConfig>(PERSONAS[0]);
  const [toneType, setToneType] = useState<'efficient' | 'vip'>('efficient');
  const [isCopied, setIsCopied] = useState(false);

  const activeResponse = activePersona[toneType];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${activeResponse.english}\n\n${activeResponse.arabic}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="py-24 px-8 max-w-[1280px] mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Picture with overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[520px] group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent z-10 opacity-90"></div>
          <img 
            className="object-cover w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-700" 
            referrerPolicy="no-referrer"
            alt="Intricate AI-driven data dashboard on a luxury office tablet in Doha at sunset." 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuASvsXZMyeS_aQsbhPcUhJyqnPEu3RdVbPoeC83PDIy2U-HLtkrb6_S9cwywT9WAKiAjnNvNsBo0anTEYHol3Vtp1SdTu_hgN1LshYpcKHuxTaw0zdwch4z5K0r6LQpKK93qGE9RVEVeKGPKXwFTrFc_TQ89J5P6xkOTTRNEIoZQGw0u6pKKIPd-793leX8RG4rpNGX8OYI2UKK--iRPE-CKM-UN38QrV7ZzbHy29h9GEG8VNOZqK1-p9JTqB1rq0nmiv329vFg6sc"
          />
          <div className="absolute bottom-10 left-10 right-10 z-20">
            <div className="bg-[#06B6D4] text-[#111827] px-4 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3 inline-block font-sans">
              LOCAL FLUENCY
            </div>
            <h3 className="text-2xl font-bold font-sora text-white mb-2">
              Arabic/English Dual Response
            </h3>
            <p className="text-[#D1D5DB] text-xs leading-relaxed max-w-sm">
              Deep regional awareness embedded at the engine layer, guaranteeing fluent honorific scaling and strict regulatory compliance.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Cultural Intelligence Console */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-eyebrow text-xs text-[#06B6D4] block mb-2 font-bold tracking-widest uppercase">
              CULTURAL INTELLIGENCE
            </span>
            <h2 className="text-3xl font-bold font-sora text-white leading-tight mb-4">
              Automated, Personalized Response Systems
            </h2>
            <p className="text-[#D1D5DB] text-base leading-relaxed">
              Ansury AI understands the complex social, diplomatic, and commercial hierarchy of the Qatari real estate market. Our models transition smoothly between formal high-importance Arabic etiquette and immediate corporate-efficient English copy.
            </p>
          </div>

          {/* Interactive Controllers */}
          <div className="bg-[#1A2333] border border-[#2A3650] rounded-xl p-5 flex flex-col gap-5 shadow-lg">
            
            {/* Controller row 1: Persona */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-[#8B95A7] uppercase tracking-wider font-bold">
                1. SELECT CLIENT PROFILE
              </span>
              <div className="flex gap-2.5">
                {PERSONAS.map((p, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePersona(p)}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-left transition-all text-xs border ${
                      activePersona.name === p.name
                        ? 'bg-[#20283B] text-[#06B6D4] border-[#06B6D4]'
                        : 'bg-[#111827] text-[#D1D5DB] border-[#2A3650] hover:bg-[#111827]/60'
                    }`}
                  >
                    <div className="font-bold">{p.name}</div>
                    <div className="text-[10px] text-[#8B95A7] truncate">{p.role}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Controller row 2: Tone formalist slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[10px] font-mono text-[#8B95A7] uppercase tracking-wider font-bold">
                <span>2. ADAPTIVE TONE SCALING</span>
                <span className="text-[#06B6D4] font-bold">
                  {toneType === 'efficient' ? 'CORPORATE EFFICIENT' : 'VIP HNWI FORMAL'}
                </span>
              </div>
              <div className="flex gap-4 items-center bg-[#111827] px-4 py-2.5 rounded-lg border border-[#2A3650]">
                <Sliders className="w-4 h-4 text-[#8B95A7]" />
                <div className="flex-1 flex gap-2">
                  <button
                    onClick={() => setToneType('efficient')}
                    className={`flex-1 py-1.5 rounded text-[11px] font-bold transition-all ${
                      toneType === 'efficient' 
                        ? 'bg-[#06B6D4] text-[#111827]' 
                        : 'text-[#D1D5DB] hover:bg-[#20283B]/50'
                    }`}
                  >
                    Lease / Transaction Direct
                  </button>
                  <button
                    onClick={() => setToneType('vip')}
                    className={`flex-1 py-1.5 rounded text-[11px] font-bold transition-all ${
                      toneType === 'vip' 
                        ? 'bg-[#06B6D4] text-[#111827]' 
                        : 'text-[#D1D5DB] hover:bg-[#20283B]/50'
                    }`}
                  >
                    Executive Protocol (Honorifics)
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bilingual Dual Output Panels */}
          <div className="bg-[#111827] border border-[#2A3650] rounded-xl p-5 flex flex-col gap-4 shadow-md relative overflow-hidden group">
            
            {/* Header copy tab indicators */}
            <div className="flex justify-between items-center pb-2.5 border-b border-[#2A3650]/40">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-xs font-mono font-bold text-white tracking-wider">
                  BILINGUAL ALIGNMENT
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs font-mono font-bold text-[#06B6D4] hover:text-white transition-colors"
              >
                {isCopied ? 'Copied Both!' : 'Copy Outputs'}
              </button>
            </div>

            {/* English Output */}
            <div className="flex flex-col gap-1 pr-2">
              <span className="text-[10px] font-mono text-[#8B95A7] uppercase">ENGLISH BROADCAST (LATENCY ~45MS)</span>
              <p className="text-white text-xs leading-relaxed font-normal">
                {activeResponse.english}
              </p>
            </div>

            <div className="h-[1px] bg-[#2A3650]/40 w-full"></div>

            {/* Arabic Output */}
            <div className="flex flex-col gap-1 text-right pl-2 select-all" dir="rtl">
              <span className="text-[10px] font-mono text-[#8B95A7] uppercase tracking-wider block" dir="ltr">ARABIC CULTURAL VERBATIM</span>
              <p className="text-white text-sm leading-loose font-medium font-sans">
                {activeResponse.arabic}
              </p>
            </div>

            {/* Context markers showing AI-intelligence */}
            <div className="mt-2 pt-3 border-t border-[#2A3650]/40 flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-[#8B95A7] font-mono font-bold mr-1">LOCAL COGNITION:</span>
              {activeResponse.markers.map((mark, i) => (
                <span 
                  key={i} 
                  className="bg-[#20283B] text-[#D1D5DB] px-2 py-0.5 rounded text-[10px] border border-[#06B6D4]/20 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-[#06B6D4] rounded-full"></span>
                  {mark}
                </span>
              ))}
            </div>

          </div>

          {/* Bottom Action Menu */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onShowTechStack}
              className="w-full sm:w-auto bg-transparent border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4]/10 font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <Code className="w-4.5 h-4.5" />
              <span>View Tech Stack</span>
            </button>
            <span className="text-[11px] text-[#8B95A7] font-mono flex items-center gap-1.5 italic">
              <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
              Dual Translation handles Arabic nuances (pluralities, regions) natively.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
