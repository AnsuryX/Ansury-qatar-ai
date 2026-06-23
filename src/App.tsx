import React, { useState, useRef } from 'react';
import Header from './components/Header';
import NodeNetwork from './components/NodeNetwork';
import LeadGeneratorSimulator from './components/LeadGeneratorSimulator';
import CrmSyncVisualizer from './components/CrmSyncVisualizer';
import DualResponseConsole from './components/DualResponseConsole';
import GetStartedModal from './components/GetStartedModal';
import TechStackModal from './components/TechStackModal';
import CaseStudiesSection from './components/CaseStudiesSection';
import IntelligencePlayground from './components/IntelligencePlayground';
import TrustedByCarousel from './components/TrustedByCarousel';
import WhatsAppButton from './components/WhatsAppButton';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';
import { 
  ArrowUpRight, 
  ArrowDown,
  Cpu, 
  TrendingUp, 
  Shield, 
  Zap, 
  Sparkles,
  Layers,
  Check
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('solutions');
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const { language, isRtl, t } = useLanguage();
  const copy = translations[language];

  const interactiveSectionRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => setIsGetStartedOpen(true);
  const handleShowTechStack = () => setIsTechStackOpen(true);

  const scrollToDemo = () => {
    interactiveSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#111827] text-[#dfe3e9] flex flex-col font-sans selection:bg-[#06B6D4]/30 selection:text-[#06B6D4]">
      
      {/* Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onGetStarted={handleGetStarted} 
      />

      {/* Main Container */}
      <main className="flex-1 relative">

        {/* Tab Routing */}
        {activeTab === 'solutions' && (
          <div>
            
            {/* Hero Section */}
            <section className="relative min-h-[820px] flex flex-col justify-center items-center text-center px-8 pt-24 pb-32 overflow-hidden">
              {/* Dynamic connected node network background */}
              <NodeNetwork />

              <div className="relative z-10 max-w-[900px] mx-auto flex flex-col items-center">
                <span className="font-eyebrow text-xs text-[#06B6D4] uppercase mb-6 block tracking-[0.2em] font-bold">
                  {copy.eyebrow}
                </span>
                
                <h1 className="font-sora text-3xl md:text-5xl lg:text-[54px] font-bold text-white mb-8 leading-[1.25] md:leading-[1.15] tracking-tight">
                  {copy.heroTitle}
                </h1>

                <p className="font-sans text-[#D1D5DB] text-base md:text-lg mb-12 max-w-[760px] mx-auto opacity-90 leading-relaxed">
                  {copy.heroSubtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={handleGetStarted}
                    className="bg-[#06B6D4] text-[#111827] font-bold px-8 py-4 rounded-full text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#06B6D4]/20 cursor-pointer select-none"
                  >
                    {copy.auditBtn}
                  </button>
                  <button 
                    onClick={scrollToDemo}
                    className="border border-[#06B6D4] text-white font-bold px-8 py-4 rounded-full text-sm hover:bg-[#06B6D4]/10 active:scale-95 transition-all cursor-pointer select-none flex items-center gap-2"
                  >
                    <span>{copy.runMath}</span>
                    <ArrowDown className={`w-4 h-4 text-[#06B6D4] animate-bounce ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </section>

            {/* Trusted By Carousel Section */}
            <TrustedByCarousel />

            {/* Bento Grid / Stats Section */}
            <section className="max-w-[1280px] mx-auto px-8 py-16 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Large Stat Card */}
                <div className="md:col-span-8 bg-[#20283B] rounded-xl p-10 lg:p-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] flex flex-col justify-between group overflow-hidden relative border border-[#2A3650]/30">
                  <div className="relative z-10">
                    <span className="font-sans text-xs font-bold text-[#06B6D4] mb-4 block tracking-wider uppercase">
                      {copy.statsEyebrow}
                    </span>
                    <h2 className={`font-sora font-bold text-[#06B6D4] leading-none mb-4 ${isRtl ? 'text-[72px] md:text-[88px]' : 'text-[64px] md:text-[80px]'}`}>
                      {isRtl ? '٧٠٪' : '70%'}
                    </h2>
                    <p className="font-sora font-bold text-white text-xl md:text-3xl max-w-[650px] leading-tight">
                      {copy.statsMainTitle}
                    </p>
                  </div>
                  <div className="mt-12 relative z-10">
                    {language === 'en' ? (
                      <p className="font-sans text-[#D1D5DB] text-sm max-w-[680px] leading-relaxed">
                        A client with <span className="text-white font-bold">1,200 inbound leads per month</span> was spending <strong className="text-white">$7,200 every month</strong> in agent time just to qualify them. Ansury replaced 70% of that process. Net monthly savings: <strong className="text-[#06B6D4]">$3,540</strong>. The system paid for itself in <span className="text-[#06B6D4] font-bold">3.4 months</span>. Year-one net benefit: <span className="text-[#06B6D4] font-bold">$30,480</span>. That's not a projection — it's the math.
                      </p>
                    ) : (
                      <p className="font-sans text-[#D1D5DB] text-sm max-w-[680px] leading-relaxed">
                        العميل الذي يمتلك <span className="text-white font-bold">1,200 عميل مستهدف شهرياً</span> كان ينفق <strong className="text-white">7,200 دولار كل شهر</strong> من وقت وكلائه لتأهيلهم يدوياً فقط. استبدل نظام أنسوري 70٪ من تلك العملية الفاقدة للجدوى. صافي التوفير الشهري: <strong className="text-[#06B6D4]">3,540 دولار</strong>. استرد النظام تكلفته بالكامل في غضون <span className="text-[#06B6D4] font-bold">3.4 أشهر</span>. الفائدة الصافية المحققة في السنة الأولى: <span className="text-[#06B6D4] font-bold">30,480 دولار</span>. هذه ليست مجرد أمنيات أو إسقاطات عاطفية — بل الحسابات الرياضية الدقيقة للشركات.
                      </p>
                    )}
                  </div>
                  {/* Glowing background hint */}
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#06B6D4]/5 rounded-full blur-3xl group-hover:bg-[#06B6D4]/10 transition-colors duration-500"></div>
                </div>

                {/* Secondary Highlight Card */}
                <div className="md:col-span-4 flex">
                  <div className="bg-[#1A2333] rounded-xl p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] w-full flex flex-col justify-between border border-[#2A3650]/30 hover:translate-y-[-2px] transition-transform duration-300">
                    <div>
                      <div className="w-12 h-12 bg-[#06B6D4] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#06B6D4]/20">
                        <Cpu className="w-5 h-5 text-[#111827] stroke-[2.5]" />
                      </div>
                      <h3 className="font-sora font-bold text-white text-xl mb-4">{copy.crmCardTitle}</h3>
                      <p className="font-sans text-[#8B95A7] text-sm leading-relaxed">
                        {copy.crmCardDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features Row */}
                <div className="md:col-span-4 bg-[#1A2333] rounded-xl p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] border border-[#2A3650]/30 hover:translate-y-[-2px] transition-transform duration-300">
                  <div className="w-12 h-12 bg-[#06B6D4] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#06B6D4]/20">
                    <TrendingUp className="w-5 h-5 text-[#111827] stroke-[2.5]" />
                  </div>
                  <h3 className="font-sora font-bold text-white text-lg mb-2">{copy.hoursSavedTitle}</h3>
                  <p className="font-sans text-[#8B95A7] text-xs leading-relaxed">
                    {copy.hoursSavedDesc}
                  </p>
                </div>

                <div className="md:col-span-4 bg-[#1A2333] rounded-xl p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] border border-[#2A3650]/30 hover:translate-y-[-2px] transition-transform duration-300">
                  <div className="w-12 h-12 bg-[#06B6D4] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#06B6D4]/20">
                    <Shield className="w-5 h-5 text-[#111827] stroke-[2.5]" />
                  </div>
                  <h3 className="font-sora font-bold text-white text-lg mb-2">{copy.firstConvTitle}</h3>
                  <p className="font-sans text-[#8B95A7] text-xs leading-relaxed">
                    {copy.firstConvDesc}
                  </p>
                </div>

                <div className="md:col-span-4 bg-[#1A2333] rounded-xl p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.3)] border border-[#2A3650]/30 hover:translate-y-[-2px] transition-transform duration-300">
                  <div className="w-12 h-12 bg-[#06B6D4] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#06B6D4]/20">
                    <Zap className="w-5 h-5 text-[#111827] stroke-[2.5]" />
                  </div>
                  <h3 className="font-sora font-bold text-white text-lg mb-2">{copy.prodAiTitle}</h3>
                  <p className="font-sans text-[#8B95A7] text-xs leading-relaxed">
                    {copy.prodAiDesc}
                  </p>
                </div>

              </div>
            </section>

            {/* Visual Anchor Section with Doha Skyline */}
            <section className="max-w-[1280px] mx-auto px-8 py-16">
              <div className="relative w-full h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-[#2A3650]/35 group">
                <div 
                  className="bg-cover bg-center w-full h-full scale-[1.01] group-hover:scale-[1.03] transition-transform duration-700 ease-out" 
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7iIiGVsNakP9-pGAPnoY_NcFnebDbw16Rv1fewo8aChg_dZQW0UUNMD3C_0zeck44zVIgh6FLCGZmRYAOC_5hJlnQovRwQCnCx2dJBHn4kv7Yz2trKuPfPibuGnlLixC32MI_EL19s-fod536WuL93gh-n73voL-zO_-sWtv6im-PpS1aJ2JjPwrX-VD8o5D9YzfWnd_Ki0RcHbU0f6gGe0cnO6Grmcxl0Dw3VVEif4uAy0dpkJ4FTuLP5Kw16OxDGVAzm7NfFTM')` }}
                  referrerPolicy="no-referrer"
                />
                {/* Visual Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent"></div>
                
                <div className="absolute bottom-12 left-8 right-8 md:left-12 md:right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div className="max-w-[720px]">
                    <span className="font-eyebrow text-xs text-[#06B6D4] mb-3 block font-bold tracking-widest uppercase">
                      {copy.skylineEyebrow}
                    </span>
                    <h2 className="font-sora text-3xl md:text-5xl text-white font-bold tracking-tight mb-4 leading-tight">
                      {copy.skylineTitle}
                    </h2>
                    <p className="text-sm text-[#D1D5DB] leading-relaxed opacity-95">
                      {copy.skylineDesc}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-[#D1D5DB]/90 bg-[#111827]/95 px-5 py-3 rounded-xl border border-[#2A3650]/80 backdrop-blur-sm shadow-xl shrink-0">
                    <span className="block text-[#06B6D4] font-bold text-[9px] uppercase tracking-wide mb-1">{copy.telemetry}</span>
                    {copy.location}
                  </div>
                </div>
              </div>
            </section>

            {/* THREE PREMIUM SUBSCRIPTION PACKAGES */}
            <section className="max-w-[1280px] mx-auto px-8 py-16 relative z-10 border-t border-[#2A3650]/30">
              <div className="text-center mb-16">
                <span className="font-mono text-xs text-[#06B6D4] uppercase tracking-[0.2em] block font-bold mb-3">
                  {copy.pricingEyebrow}
                </span>
                <h2 className="font-sora text-3xl md:text-4xl text-white font-bold mb-4">
                  {copy.pricingTitle}
                </h2>
                <p className="font-sans text-[#8B95A7] text-sm md:text-base max-w-[680px] mx-auto leading-relaxed">
                  {copy.pricingDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {[
                  {
                    name: copy.pilotsTier,
                    price: isRtl ? "1,490 ر.ق" : "1,490 QAR",
                    frequency: isRtl ? " / شهرياً" : "/ month",
                    badge: copy.pilotsBadge,
                    description: copy.pilotsDesc,
                    features: copy.pilotsFeat,
                    cta: copy.pilotsCta,
                    popular: false,
                    icon: Cpu
                  },
                  {
                    name: copy.growthTier,
                    price: isRtl ? "3,490 ر.ق" : "3,490 QAR",
                    frequency: isRtl ? " / شهرياً" : "/ month",
                    badge: copy.growthBadge,
                    description: copy.growthDesc,
                    features: copy.growthFeat,
                    cta: copy.growthCta,
                    popular: true,
                    icon: Zap
                  },
                  {
                    name: copy.enterpriseTier,
                    price: isRtl ? "شخصي" : "Custom",
                    frequency: "",
                    badge: copy.enterpriseBadge,
                    description: copy.enterpriseDesc,
                    features: copy.enterpriseFeat,
                    cta: copy.enterpriseCta,
                    popular: false,
                    icon: Layers
                  }
                ].map((pkg, idx) => {
                  const IconComponent = pkg.icon;
                  return (
                    <div 
                      key={idx}
                      className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                        pkg.popular 
                          ? 'bg-[#20283B] border-[#06B6D4] shadow-[0_0_25px_rgba(6,182,212,0.15)] scale-105 z-10 lg:translate-y-[-8px]' 
                          : 'bg-[#1A2333] border-[#2A3650] hover:border-[#8B95A7]/30 hover:bg-[#1c2637]'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#06B6D4] text-[#111827] text-[10px] font-bold font-mono uppercase px-4 py-1 rounded-full tracking-widest shadow-md">
                          {copy.reco}
                        </span>
                      )}
                      
                      <div>
                        {/* Header info */}
                        <div className="flex justify-between items-start mb-6 gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider mb-2 inline-block">
                              {pkg.badge}
                            </span>
                            <h3 className="font-sora font-bold text-white text-xl block">
                              {pkg.name}
                            </h3>
                          </div>
                          <div className={`p-2.5 rounded-lg border shrink-0 ${pkg.popular ? 'bg-[#06B6D4]/10 border-[#06B6D4]/30' : 'bg-[#111827] border-[#2A3650]'}`}>
                            <IconComponent className={`w-5 h-5 ${pkg.popular ? 'text-[#06B6D4]' : 'text-[#8B95A7]'}`} />
                          </div>
                        </div>

                        {/* Price display */}
                        <div className="flex items-baseline gap-1 mb-4 border-b border-[#2A3650]/40 pb-5">
                          <span className="font-sora text-3xl font-bold text-white">
                            {pkg.price}
                          </span>
                          <span className="text-xs font-mono text-[#8B95A7]">
                            {pkg.frequency}
                          </span>
                        </div>

                        <p className="text-xs text-[#8B95A7] leading-relaxed mb-6">
                          {pkg.description}
                        </p>

                        {/* Bullet points */}
                        <div className="flex flex-col gap-3 mb-8">
                          {pkg.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex gap-2.5 items-start text-xs text-[#D1D5DB] leading-relaxed">
                              <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${pkg.popular ? 'text-[#06B6D4]' : 'text-emerald-400'}`} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={handleGetStarted}
                        className={`w-full py-3.5 px-6 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer ${
                          pkg.popular
                            ? 'bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#111827] shadow-lg shadow-[#06B6D4]/10'
                            : 'bg-[#111827] hover:bg-[#111827]/80 text-[#D1D5DB] border border-[#2A3650]'
                        }`}
                      >
                        {pkg.cta}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Interactive Control Center Section (Demonstration Suite) */}
            <section 
              ref={interactiveSectionRef}
              className="py-16 bg-[#0E131F]/40 border-t border-b border-[#2A3650]/30"
            >
              <div className="max-w-[1280px] mx-auto px-8">
                
                {/* Header detail */}
                <div className="mb-14 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/20 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span className="font-mono text-[10px] text-[#06B6D4] font-bold uppercase tracking-wider">
                      {copy.liveSandboxEyebrow}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold font-sora text-white mb-4">
                    {copy.liveSandboxTitle}
                  </h2>
                  <p className="text-[#8B95A7] text-sm leading-relaxed">
                    {copy.liveSandboxDesc}
                  </p>
                </div>

                {/* Pipeline 1: Lead Gen & Qualification */}
                <div className="bg-[#111827] rounded-xl border border-[#2A3650]/40 p-6 lg:p-8 mb-12 shadow-xl">
                  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 pb-4 border-b border-[#2A3650]/40`}>
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <span className="font-mono text-[10px] text-[#06B6D4] block mb-1 font-bold uppercase tracking-wider">
                        {isRtl ? 'القسم الأول — استقطاب ذكي متعدد القنوات' : 'MODULE A — OMNI-CHANNEL CAPTURE'}
                      </span>
                      <h3 className="text-xl font-bold font-sora text-white">
                        {isRtl ? 'تدفق تجميع وتدقيق العميل الفوري' : 'Lead Ingestion & Verification Flow'}
                      </h3>
                    </div>
                    <div className="text-[#8B95A7] font-mono text-[10px] tracking-widest bg-[#20283B] px-3 py-1 rounded border border-[#2A3650]/50 uppercase font-bold">
                      [SYS_CODE: LG-PRO]
                    </div>
                  </div>
                  <LeadGeneratorSimulator />
                </div>

                {/* Pipeline 2: CRM & Sync Visualizer */}
                <div className="mb-12">
                  <CrmSyncVisualizer />
                </div>

                {/* Pipeline 3: Cultural Dialect translation */}
                <div>
                  <DualResponseConsole onShowTechStack={handleShowTechStack} />
                </div>

              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#20283B] py-24 border-t border-[#2A3650]/40">
              <div className="max-w-[1280px] mx-auto px-8 text-center flex flex-col items-center">
                <span className="font-mono text-[10px] text-[#06B6D4] uppercase tracking-widest block font-bold mb-3">
                  {isRtl ? 'تسريع وتيرة قنوات المبيعات' : 'ACCELERATE PIPELINE THROUGHPUT'}
                </span>
                <h2 className="font-sora text-3xl md:text-4xl text-white font-bold mb-6 max-w-2xl leading-tight">
                  {copy.readyTitle}
                </h2>
                <p className="font-sans text-[#D1D5DB] text-sm md:text-base mb-10 max-w-[550px] opacity-85 leading-relaxed">
                  {copy.readyDesc}
                </p>
                <button 
                  onClick={handleGetStarted}
                  className="bg-[#06B6D4] text-[#111827] font-bold px-10 py-5 rounded-full text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#06B6D4]/10 cursor-pointer select-none"
                >
                  {copy.startIntegration}
                </button>
              </div>
            </section>

          </div>
        )}

        {activeTab === 'case-studies' && (
          <CaseStudiesSection />
        )}

        {activeTab === 'intelligence' && (
          <IntelligencePlayground />
        )}

      </main>

      {/* Footer */}
      <footer className="w-full pt-16 pb-12 bg-[#111827] border-t border-[#2A3650]/40 mt-auto">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="mb-8 md:mb-0 flex flex-col gap-4">
            <div className={`text-xl font-bold font-sora text-[#06B6D4] ${isRtl ? 'text-right' : 'text-left'}`}>
              Ansury AI
            </div>
            <p className={`font-sans text-[#8B95A7] text-xs max-w-sm leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
              {copy.footerText}
            </p>
            <div className={`text-[#8B95A7] text-[11px] font-mono mt-2`}>
              © 2026 Ansury AI.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-16 md:gap-20">
            <div className="flex flex-col space-y-3">
              <span className="font-mono text-[10px] font-bold text-[#06B6D4] tracking-widest uppercase mb-2">
                {copy.legal}
              </span>
              <a className="text-[#8B95A7] text-xs hover:text-white transition-colors" href="mailto:Ansurysystems@gmail.com" target="_blank" rel="noopener noreferrer">
                {copy.privacy}
              </a>
              <a className="text-[#8B95A7] text-xs hover:text-white transition-colors" href="mailto:Ansurysystems@gmail.com" target="_blank" rel="noopener noreferrer">
                {copy.terms}
              </a>
            </div>
            <div className="flex flex-col space-y-3">
              <span className="font-mono text-[10px] font-bold text-[#06B6D4] tracking-widest uppercase mb-2">
                {copy.company}
              </span>
              <a className="text-[#8B95A7] text-xs hover:text-white transition-colors" href="mailto:Ansurysystems@gmail.com" target="_blank" rel="noopener noreferrer">
                {copy.sustainability}
              </a>
              <a className="text-[#8B95A7] text-xs hover:text-white transition-colors" href="mailto:Ansurysystems@gmail.com" target="_blank" rel="noopener noreferrer">
                {copy.contactUs}
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Modals Container */}
      <GetStartedModal 
        isOpen={isGetStartedOpen} 
        onClose={() => setIsGetStartedOpen(false)} 
      />
      <TechStackModal 
        isOpen={isTechStackOpen} 
        onClose={() => setIsTechStackOpen(false)} 
      />

      {/* Persistent Floating Action Buttons */}
      <WhatsAppButton />

    </div>
  );
}
