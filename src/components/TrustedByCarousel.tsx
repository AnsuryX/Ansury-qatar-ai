import React from 'react';
import { Building2, Landmark, ShieldCheck, Gem, Sparkles, Compass } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface CompanyLogo {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  locationEn: string;
  locationAr: string;
}

export default function TrustedByCarousel() {
  const { language, isRtl } = useLanguage();
  const copy = translations[language];

  // Renowned institutional real estate players in Qatar
  const agencies: CompanyLogo[] = [
    {
      id: 'udc',
      nameEn: 'United Development Co.',
      nameAr: 'الشركة المتحدة للتنمية',
      icon: Gem,
      accentColor: 'text-[#06B6D4]',
      locationEn: 'The Pearl',
      locationAr: 'اللؤلؤة'
    },
    {
      id: 'msheireb',
      nameEn: 'Msheireb Properties',
      nameAr: 'مشيرب العقارية',
      icon: Landmark,
      accentColor: 'text-amber-400',
      locationEn: 'Downtown Doha',
      locationAr: 'وسط الدوحة'
    },
    {
      id: 'diar',
      nameEn: 'Qatari Diar',
      nameAr: 'الديار القطرية',
      icon: ShieldCheck,
      accentColor: 'text-emerald-400',
      locationEn: 'Lusail City',
      locationAr: 'مدينة لوسيل'
    },
    {
      id: 'alfardan',
      nameEn: 'Alfardan Properties',
      nameAr: 'الفردان العقارية',
      icon: Building2,
      accentColor: 'text-teal-400',
      locationEn: 'Burj Alfardan',
      locationAr: 'برج الفردان'
    },
    {
      id: 'alasmakh',
      nameEn: 'Al Asmakh Real Estate',
      nameAr: 'الأصمخ للمشاريع العقارية',
      icon: Compass,
      accentColor: 'text-indigo-400',
      locationEn: 'West Bay',
      locationAr: 'الخليج الغربي'
    },
    {
      id: 'dar',
      nameEn: 'Dar Al Arkan Qatar',
      nameAr: 'دار الأركان قطر',
      icon: Sparkles,
      accentColor: 'text-rose-400',
      locationEn: 'Les Vagues',
      locationAr: 'لي فاغ'
    }
  ];

  // Duplicate items to ensure smooth infinite marquee scroll
  const marqueeItems = [...agencies, ...agencies, ...agencies];

  return (
    <div id="trusted-by-section" className="w-full bg-[#0F172A]/30 py-10 border-y border-[#2A3650]/25 overflow-hidden relative">
      {/* CSS-in-JS utility specifically for the infinite scroll marquee animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-33.3333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-track {
          display: flex;
          width: 300%;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-track-reverse {
          display: flex;
          width: 300%;
          animation: marquee-reverse 35s linear infinite;
        }
        .animate-marquee-track:hover,
        .animate-marquee-track-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-8 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className={`text-[11px] font-mono font-bold tracking-widest text-[#8B95A7] uppercase ${isRtl ? 'text-right md:order-2' : 'text-left md:order-1'}`}>
          {copy.trustedBy}
        </h3>
        <div className={`flex items-center gap-2 ${isRtl ? 'md:order-1' : 'md:order-2'}`}>
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
          <span className="text-[10px] font-mono text-[#06B6D4] font-semibold uppercase tracking-wider">
            {language === 'en' ? 'Active Digital Pipeline Integration' : 'ربط نشط ومباشر بالبوابات'}
          </span>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden leading-none select-none my-4">
        {/* Left & Right gradient overlays for smooth seamless fade effects */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none"></div>

        {/* Dynamic track running either forwards or backwards depending on reading direction */}
        <div className={isRtl ? 'animate-marquee-track-reverse font-rtl' : 'animate-marquee-track'}>
          {marqueeItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={`${item.id}-${index}`} 
                className="w-[280px] shrink-0 px-4 py-1"
              >
                <div className="bg-[#151D30]/60 hover:bg-[#1A243A]/80 hover:border-[#06B6D4]/30 active:scale-[0.98] transition-all duration-300 rounded-xl px-5 py-4 border border-[#2A3650]/20 flex items-center justify-between gap-4 cursor-pointer shadow-md group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg bg-[#20293D] flex items-center justify-center shrink-0 border border-[#2A3650]/40 group-hover:border-[#06B6D4]/25 transition-all`}>
                      <IconComponent className={`w-4 h-4 ${item.accentColor} transition-transform group-hover:scale-110 duration-300`} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-white font-sora truncate">
                        {language === 'en' ? item.nameEn : item.nameAr}
                      </span>
                      <span className="block text-[9px] text-[#8B95A7] font-mono tracking-wide uppercase mt-0.5 mt-[1px] truncate">
                        {language === 'en' ? item.locationEn : item.locationAr}
                      </span>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                    <span className="text-[9px] font-mono text-[#06B6D4] uppercase font-bold border border-[#06B6D4]/20 px-1.5 py-0.5 rounded bg-[#06B6D4]/5">
                      {isRtl ? 'متصل' : 'Verified'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
