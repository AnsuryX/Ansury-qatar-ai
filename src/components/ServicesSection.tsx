import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitCommit, 
  Database, 
  FileText, 
  Zap, 
  Layers, 
  MessageSquare,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle,
  AlertCircle,
  FileCheck,
  Search,
  Check,
  Smartphone,
  CheckCircle2,
  Brain,
  History,
  FileJson
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ServiceItem {
  id: string;
  category: 'automation' | 'intelligence' | 'data';
  titleEn: string;
  titleAr: string;
  taglineEn: string;
  taglineAr: string;
  descEn: string;
  descAr: string;
  icon: React.ComponentType<{ className?: string }>;
  featuresEn: string[];
  featuresAr: string[];
  techBadge: string;
}

export default function ServicesSection() {
  const { language, isRtl } = useLanguage();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('nurture');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Simulation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [selectedDocType, setSelectedDocType] = useState<'invoice' | 'contract' | 'tenant'>('invoice');

  const services: ServiceItem[] = useMemo(() => [
    {
      id: 'nurture',
      category: 'automation',
      titleEn: 'Follow-up Nurture Sequences',
      titleAr: 'سلاسل المتابعة التلقائية وتغذية الاهتمام',
      taglineEn: 'Automating multi-touch communication for warm leads who need more than one contact to move forward.',
      taglineAr: 'أتمتة تواصل ذكي متعدد القنوات للعملاء الدافئين الذين يتطلبون متابعة مستمرة وموثوقة لاتخاذ القرار.',
      descEn: 'Establishing context-aware drip sequences over WhatsApp and email. Dynamically nurturing prospects with personalized GCC honorific intervals, responding intelligently to user intent cues, and instantly escalating to human brokers only when they show active intent to buy.',
      descAr: 'بناء سلاسل تواصل تنقيطية (Drip Sequences) ذكية ومحاطة بسياق المحادثات السابقة عبر الواتساب والبريد الإلكتروني. تتبع اهتمامات العملاء وتغذية رغبتهم الشراء بفترات زمنية مدروسة، والاستجابة الفورية لرسائلهم، مع إعادة تصعيد العميل لأقوى وسطاء المبيعات لديك فور استشعاره رغبة حتمية وجدية بالتعاقد.',
      icon: GitCommit,
      featuresEn: [
        'Dynamic multi-day delay triggers (12h, 48h, 72h)',
        'Conversational state memory preserves preceding topics',
        'Auto-escalation to human broker on "Intent Spike"',
        'Full WhatsApp Business API protocol integration',
        'Personalised local GCC respectful honorific filters'
      ],
      featuresAr: [
        'محفزات تأخير زمنية ديناميكية وتلقائية (١٢ ساعة، يومين، ٣ أيام)',
        'حفظ كامل لذاكرة الحوار ومواضيع العقار السابقة',
        'التصعيد التلقائي الفوري للوسيط البشري عند قفزة رغبة العميل',
        'تكامل كامل وتام مع الواجهات الرسمية لواتساب للأعمال',
        'فلاتر وصياغات محلية مبنية على الاحترام والأعراف الخليجية'
      ],
      techBadge: 'MULTIPATH_DRIP_V2'
    },
    {
      id: 'reactivation',
      category: 'automation',
      titleEn: 'Database Reactivation Campaigns',
      titleAr: 'حملات إعادة تنشيط قاعدة البيانات والعملاء',
      taglineEn: 'Re-engaging old leads and past customers sitting in a CRM, turning forgotten data into revenue.',
      taglineAr: 'إعادة إشراك واستثارة العملاء القدامى والمسجلين لسنوات في الـ CRM الخاص بك، وتحويل الأرقام الصامتة لأرباح.',
      descEn: 'Breathing immediate monetization into historic, cold databases. Our AI selectively crawls stagnant records, executes highly personalized WhatsApp reactivation dialogues regarding new tower launches in Lusail or The Pearl, and logs hot opportunities back in your pipeline with zero broker manual labor.',
      descAr: 'بث الحياة والأرباح الفورية في سجلات العملاء الباردة والمهملة المتراكمة في أنظمتكم لسنوات. يقوم المحرك بفحص ذكي لقاعدة بيانات الـ CRM، ثم يطلق محادثات تفاعلية مخصصة للغاية عبر الواتساب للاستفسار عما إذا كانوا لا يزالون يبحثون عن فرص، وعرض طروحات الأبراج الجديدة الحصرية بالدوحة.',
      icon: Database,
      featuresEn: [
        'Massive historic record crawling & classification',
        'Custom opt-out checks to respect client privacy',
        'Instant hot lead handoff triggers back to active CRM',
        'Bilingual customized Qatari dialect greeting adaptors',
        'ROI and response analytics transparency ledger'
      ],
      featuresAr: [
        'مسح ضخم وتصنيف آلي آمن لآلاف السجلات العقارية القديمة',
        'فحوصات مخصصة لعدم الإزعاج واحترام الخصوصية وحق الإلغاء',
        'ترحيل فوري وسريع للفرص المتفاعلة والنشطة لنظام الـ CRM',
        'تحيات دافئة مهيأة خصيصاً للمجتمع القطري والخليجي',
        'سجل دقيق للتحقق الفوري من العوائد وتكلفة استعادة العميل'
      ],
      techBadge: 'DB_CRAWLER_REACTIVATION'
    },
    {
      id: 'doc-processing',
      category: 'data',
      titleEn: 'Intelligent Document Processing',
      titleAr: 'المعالجة الذكية الفائقة للمستندات والفواتير',
      taglineEn: 'Using logic-based or AI systems to extract data from invoices and documents, replacing manual entry.',
      taglineAr: 'استخدام أنظمة الذكاء والمنطق العقاري المتقدم لاستخراج وهيكلة بيانات الفواتير والمستندات وإلغاء الإدخال اليدوي.',
      descEn: 'Eliminate time-consuming operational data errors completely. Leveraging proprietary AI-parsing and classification pipelines to extract tenant payment schedules, structural lease conditions, commercial broker commission invoices, and official utility bills, writing pristine, structured JSON data directly to your financial ledgers.',
      descAr: 'تخلص من أخطاء إدخال البيانات التشغيلية وهدر وقت فريق الحسابات تماماً. نوفر محركات أتمتة متقدمة لقراءة وتفكيك وتصنيف عقود الإيجار، جداول مستحقات المستأجرين، فواتير العمولات المعقدة للوسطاء، وسندات الصرف، ثم ترحيلها فورياً كبيانات رقمية مهيكلة (JSON) مباشرة في دفاتر الحسابات والمراجعة.',
      icon: FileText,
      featuresEn: [
        '99.8% precision parsing of Qatari financial layouts',
        'Multi-format support (scanned PDFs, images, XLS sheets)',
        'Automated double-entry cross verification checks',
        'Instant mapping to ERP systems & property databases',
        'Secure local cloud storage options to protect files'
      ],
      featuresAr: [
        'دقة بالغة تصل لـ ٩٩.٨٪ في تفكيك وفهم تنسيقات الحسابات بقطر',
        'دعم كامل لكافة التنسيقات (ملفات PDF المصورة، الصور، الجداول)',
        'فحوصات مطابقة تلقائية متقاطعة لمنع الأخطاء المحاسبية والتكرار',
        'ربط فوري ومباشر مع أنظمة تخطيط الموارد ERP وقواعد البيانات',
        'خيارات استضافة محلية مشفرة لضمان أمن المستندات وحمايتها'
      ],
      techBadge: 'DOCUMENT_PARSER_IDP'
    }
  ], []);

  const categories = useMemo(() => [
    { id: 'all', labelEn: 'All Services', labelAr: 'كافة الخدمات' },
    { id: 'automation', labelEn: 'Pipeline Automation', labelAr: 'أتمتة خط المبيعات' },
    { id: 'data', labelEn: 'Enterprise Data Logic', labelAr: 'معالجة بيانات المؤسسات' }
  ], []);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return services;
    return services.filter(s => s.category === activeCategory);
  }, [activeCategory, services]);

  const activeService = useMemo(() => {
    return services.find(s => s.id === selectedServiceId) || services[0];
  }, [selectedServiceId, services]);

  // Handle simulation execution
  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);

    const stepInterval = setInterval(() => {
      setSimStep(prev => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 1800);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimStep(0);
  };

  return (
    <section id="services-section" className="relative max-w-[1280px] mx-auto px-8 py-24 z-10 border-t border-[#2A3650]/30">
      
      {/* Background radial glowing grid accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Header section with modern display typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] text-[#06B6D4] font-bold uppercase tracking-widest block mb-3">
            {isRtl ? 'باقة الأنظمة التشغيلية المتكاملة' : 'Precision Expansion Capabilities'}
          </span>
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {isRtl ? 'الأتمتة الشاملة لتسريع عوائد المحفظة' : 'Advanced Operations & Expansion Modules'}
          </h2>
          <p className="font-sans text-[#8B95A7] text-sm md:text-base leading-relaxed">
            {isRtl 
              ? 'تجاوز حدود التأهيل التقليدي. نقوم بأتمتة سلاسل التواصل متعدد الأيام، وتنشيط سجلات الـ CRM المهملة، واستخراج بيانات الفواتير المعقدة فورياً.'
              : 'Take response systems beyond instant routing. Automate multi-day follow-up touchpoints, awaken valuable dormant leads, and ingest unstructured documents dynamically.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex bg-[#151D30] p-1.5 rounded-xl border border-[#2A3650]/50 shrink-0 self-start md:self-end">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                // Select first matching service
                const matches = services.filter(s => cat.id === 'all' || s.category === cat.id);
                if (matches.length > 0) {
                  setSelectedServiceId(matches[0].id);
                  resetSimulation();
                }
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#06B6D4] text-[#111827] font-bold shadow-md'
                  : 'text-[#8B95A7] hover:text-white'
              }`}
            >
              {isRtl ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive showcase block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left column: Services Selector Cards */}
        <div className="lg:col-span-5 space-y-4">
          {filteredServices.map((service) => {
            const ServiceIcon = service.icon;
            const isSelected = selectedServiceId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedServiceId(service.id);
                  resetSimulation();
                }}
                className={`group rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'bg-[#20283B] border-[#06B6D4] shadow-[0_4px_25px_-5px_rgba(6,182,212,0.15)] translate-x-1 lg:translate-x-2'
                    : 'bg-[#151D30]/60 border-[#2A3650]/40 hover:border-[#2A3650]/80 hover:bg-[#1a253c]/40'
                }`}
              >
                <div className={`p-3 rounded-xl border shrink-0 transition-all duration-300 ${
                  isSelected 
                    ? 'bg-[#06B6D4]/10 border-[#06B6D4]/40 text-[#06B6D4]' 
                    : 'bg-[#1D273B] border-[#2A3650]/60 text-[#8B95A7] group-hover:text-[#06B6D4]'
                }`}>
                  <ServiceIcon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className={`font-sora text-sm md:text-base font-bold transition-colors ${
                      isSelected ? 'text-white' : 'text-[#D1D5DB] group-hover:text-white'
                    }`}>
                      {isRtl ? service.titleAr : service.titleEn}
                    </h3>
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#111827] text-[#06B6D4] border border-[#2A3650]/60 tracking-wider">
                      {service.techBadge}
                    </span>
                  </div>
                  
                  <p className="font-sans text-xs text-[#8B95A7] leading-relaxed line-clamp-2">
                    {isRtl ? service.taglineAr : service.taglineEn}
                  </p>

                  <div className={`flex items-center gap-1 mt-3 text-[11px] font-mono font-bold text-[#06B6D4] transition-all duration-300 ${
                    isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}>
                    <span>{isRtl ? 'عرض مركز التشغيل والمحاكاة' : 'Open Simulation Sandbox'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Dynamic interactive Simulation Console */}
        <div className="lg:col-span-7">
          <div className="bg-[#151D30] rounded-2xl border border-[#2A3650]/60 overflow-hidden shadow-2xl relative">
            
            {/* Topbar decoration */}
            <div className="bg-[#111827] px-6 py-4 border-b border-[#2A3650]/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span className="text-[10px] font-mono text-[#525E73] ml-2">|</span>
                <span className="text-[10px] font-mono text-[#06B6D4] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Brain className="w-3 h-3 text-[#06B6D4]" />
                  {isRtl ? 'وحدة الاستجابة المتقدمة' : 'ADVANCED OPERATIONAL CORE'}
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#8B95A7] bg-[#1A2333] px-2 py-0.5 rounded border border-[#2A3650]/50">
                STATUS: ACTIVE
              </div>
            </div>

            {/* Console Content Panel */}
            <div className="p-6 md:p-8 min-h-[460px] flex flex-col justify-between">
              
              {/* Dynamic Service Overview Info */}
              <div className="mb-6">
                <span className="font-mono text-[9px] font-bold text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2 py-0.5 rounded-md mb-3 inline-block">
                  {isRtl ? 'تفاصيل الأتمتة المتقدمة' : 'DETAILED OPERATIONAL SPECIFICATION'}
                </span>
                <h3 className="font-sora text-xl font-bold text-white mb-3">
                  {isRtl ? activeService.titleAr : activeService.titleEn}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#B4C0D4] leading-relaxed mb-6">
                  {isRtl ? activeService.descAr : activeService.descEn}
                </p>

                {/* Grid of micro bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-[#111827]/60 p-4 rounded-xl border border-[#2A3650]/30">
                  {(isRtl ? activeService.featuresAr : activeService.featuresEn).map((feat, fidx) => (
                    <div key={fidx} className="flex gap-2 items-start text-xs text-[#D1D5DB]">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#06B6D4]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Interactive Simulator Block */}
              <div className="bg-[#111827] rounded-xl p-4 md:p-6 border border-[#2A3650]/40 font-mono text-[11px] leading-relaxed overflow-hidden relative">
                
                {/* 1. FOLLOW-UP NURTURE SIMULATION */}
                {activeService.id === 'nurture' && (
                  <div className="space-y-4">
                    {simStep === 0 && (
                      <div className="text-center py-6">
                        <Smartphone className="w-10 h-10 text-[#06B6D4] mx-auto mb-3 opacity-60 animate-pulse" />
                        <p className="text-[#8B95A7] text-xs max-w-sm mx-auto mb-4">
                          {isRtl 
                            ? 'محاكاة لسيناريو تواصل تنقيطي متعدد الأيام مع عميل دافئ مهتم ببرج اللؤلؤة.'
                            : 'Simulate a multi-day drip-sequence conversation with a prospect interested in Pearl Qatar.'}
                        </p>
                        <button
                          onClick={runSimulation}
                          className="bg-[#06B6D4] text-[#111827] font-bold text-xs px-5 py-2.5 rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                        >
                          {isRtl ? 'بدء محاكاة المتابعة' : 'Start Nurture Simulation'}
                        </button>
                      </div>
                    )}

                    {simStep >= 1 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[#2A3650]/30 pb-2">
                          <span className="text-[#06B6D4] font-bold">STAGE: SEQUENCE_RUNNING</span>
                          <span className="text-[#8B95A7] text-[10px]">TIME INTERVAL: +48 HOURS</span>
                        </div>

                        {/* Step 1: Initial System Check */}
                        <div className="flex gap-2 text-emerald-400">
                          <span>[SYS]</span>
                          <span>No initial agent reply within 24h. Initialising Drip Multi-Touch Stage 1...</span>
                        </div>

                        {/* Step 2: Automated WhatsApp Sent */}
                        {simStep >= 2 && (
                          <div className="bg-[#151D30] p-3 rounded-lg border border-[#2A3650]/40 my-2">
                            <span className="text-[#25D366] font-bold block mb-1">💬 WHATSAPP DISPATCHED (Day 2, 10:00 AM):</span>
                            <span className="text-[#D1D5DB] italic">
                              {isRtl 
                                ? '"مرحباً الوالد، أرجو أن تكون بتمام الصحة. نود إبلاغكم بأن المالك في اللؤلؤة قد وافق على تسهيل الدفعات التي ناقشناها سابقاً لتصبح على ٥ سنوات بدلاً من ٣. هل ترغب في مراجعة العقد المعدل اليوم؟"'
                                : '"Marhaban Abu Fahad, hope you are well. Regarding our discussion on the Pearl Tower apartment, the developer just announced a flexible 5-year installment plan instead of 3. Would you like us to secure this unit preference today?"'}
                            </span>
                          </div>
                        )}

                        {/* Step 3: Prospect Replies */}
                        {simStep >= 3 && (
                          <div className="flex gap-2 text-[#F59E0B]">
                            <span>[REPLY]</span>
                            <span>Prospect: "السلام عليكم، نعم هذا ممتاز جداً. هل يمكننا مراجعة الشروط غداً الساعة ٤ مساءً بالدوحة؟"</span>
                          </div>
                        )}

                        {/* Step 4: Intent Spike & Escalation */}
                        {simStep >= 4 && (
                          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg flex items-start gap-2.5 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold block uppercase tracking-wide">🔥 INTENT SPIKE DETECTED (Score: 98/100)</span>
                              <span>Escalating to lead broker Abu Bakr immediately. Live chat handoff dispatched with conversational context. CRM updated.</span>
                            </div>
                          </div>
                        )}

                        {simStep < 4 && (
                          <div className="flex items-center gap-2 text-[#8B95A7] text-[10px] animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
                            <span>Processing next timeline event...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. DATABASE REACTIVATION SIMULATION */}
                {activeService.id === 'reactivation' && (
                  <div className="space-y-4">
                    {simStep === 0 && (
                      <div className="text-center py-6">
                        <History className="w-10 h-10 text-[#06B6D4] mx-auto mb-3 opacity-60 animate-pulse" />
                        <p className="text-[#8B95A7] text-xs max-w-sm mx-auto mb-4">
                          {isRtl 
                            ? 'مسح قاعدة بيانات الـ CRM بحثاً عن العملاء الباردين الذين سجلوا منذ ٦ إلى ١٢ شهراً وإطلاق حملات ذكية.'
                            : 'Crawl your dormant CRM database for leads from 6-12 months ago to launch localized reactivation.'}
                        </p>
                        <button
                          onClick={runSimulation}
                          className="bg-[#06B6D4] text-[#111827] font-bold text-xs px-5 py-2.5 rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                        >
                          {isRtl ? 'إطلاق حملة التنشيط' : 'Start Dormant Reactivation'}
                        </button>
                      </div>
                    )}

                    {simStep >= 1 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[#2A3650]/30 pb-2">
                          <span className="text-[#06B6D4] font-bold">CRM CRAWLER MODULE</span>
                          <span className="text-[#8B95A7] text-[10px]">TARGET: DORMANT_LEADS_2025</span>
                        </div>

                        {/* Step 1: Scan status */}
                        <div className="flex items-center justify-between text-gray-400">
                          <span>Scanning HubSpot database segments...</span>
                          <span className="text-[#06B6D4]">10,480 contacts scanned</span>
                        </div>

                        {/* Step 2: Categorization */}
                        {simStep >= 2 && (
                          <div className="text-emerald-400 flex items-center justify-between">
                            <span>✓ Segments isolated (No active contact {'>'} 180 days)</span>
                            <span className="font-bold">1,420 reactivation prospects</span>
                          </div>
                        )}

                        {/* Step 3: Trigger active dispatch */}
                        {simStep >= 3 && (
                          <div className="bg-[#151D30] p-3 rounded-lg border border-[#2A3650]/40">
                            <span className="text-[#06B6D4] font-bold block mb-1">⚡ CONTEXT-RECONCILED DISPATCH:</span>
                            <span className="text-[#D1D5DB] block text-[10.5px]">
                              To: Nasser Al-Khelaifi | Last intent (July 2025: Pearl QAR 5M)
                            </span>
                            <span className="text-emerald-400 block mt-1.5 italic">
                              "Hi Nasser, we haven\'t spoken since you reviewed Tower B in Pearl. The adjacent premium off-plan tower is launching tomorrow with 0% interest on pre-booking. Do you want the VIP layout brochures?"
                            </span>
                          </div>
                        )}

                        {/* Step 4: Reactivated stats */}
                        {simStep >= 4 && (
                          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg text-emerald-400">
                            <div className="flex justify-between items-center font-bold mb-1">
                              <span>🎉 CAMPAIGN DISPATCH COMPLETE</span>
                              <span>ROI: +18.4% RESPONSES</span>
                            </div>
                            <span>84 prospects reactivated back into high-priority sales pipeline. Zero cold calling required.</span>
                          </div>
                        )}

                        {simStep < 4 && (
                          <div className="flex items-center gap-2 text-[#8B95A7] text-[10px] animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
                            <span>Crawling database records...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. DOCUMENT PROCESSING SIMULATION */}
                {activeService.id === 'doc-processing' && (
                  <div className="space-y-4">
                    {/* File selector mockup */}
                    <div className="flex gap-2 mb-3">
                      {(['invoice', 'contract', 'tenant'] as const).map((docType) => (
                        <button
                          key={docType}
                          disabled={isSimulating}
                          onClick={() => setSelectedDocType(docType)}
                          className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            selectedDocType === docType
                              ? 'bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/50'
                              : 'bg-[#151D30] text-[#8B95A7] border border-[#2A3650] hover:text-white'
                          }`}
                        >
                          {docType === 'invoice' && (isRtl ? 'فاتورة عمولة' : 'Broker Invoice.pdf')}
                          {docType === 'contract' && (isRtl ? 'عقد الإيجار' : 'Lease Contract.pdf')}
                          {docType === 'tenant' && (isRtl ? 'بيانات مستأجرين' : 'Tenant Ledger.xlsx')}
                        </button>
                      ))}
                    </div>

                    {simStep === 0 && (
                      <div className="text-center py-6 border border-dashed border-[#2A3650]/50 rounded-lg bg-[#111827]/40">
                        <FileCheck className="w-10 h-10 text-[#06B6D4] mx-auto mb-2 opacity-60" />
                        <p className="text-[#8B95A7] text-xs max-w-sm mx-auto mb-3">
                          {isRtl 
                            ? `مستعد لمعالجة مستندك المختار: ${selectedDocType}.pdf`
                            : `Ready to run real-time AI extraction on selected template: ${selectedDocType}`}
                        </p>
                        <button
                          onClick={runSimulation}
                          className="bg-[#06B6D4] text-[#111827] font-bold text-xs px-5 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                        >
                          {isRtl ? 'تحليل وفك المستند' : 'Parse Document Now'}
                        </button>
                      </div>
                    )}

                    {simStep >= 1 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[#2A3650]/30 pb-2">
                          <span className="text-[#06B6D4] font-bold uppercase">INGESTION MODULE IDP_v3</span>
                          <span className="text-[#8B95A7] text-[10px]">FILE: {selectedDocType.toUpperCase()}.PDF</span>
                        </div>

                        {/* Step 1: Scan/Upload */}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Reading layout coordinate metrics...</span>
                          <span className="text-emerald-400">✓ Ingested</span>
                        </div>

                        {/* Step 2: Extract details based on chosen doc */}
                        {simStep >= 2 && (
                          <div className="text-[#06B6D4]">
                            <span>[PARSING FIELDS] Localized structural classification...</span>
                          </div>
                        )}

                        {/* Step 3: Structured JSON Result */}
                        {simStep >= 3 && (
                          <div className="bg-[#151D30] p-3 rounded-lg border border-[#2A3650]/40 font-mono text-[9.5px] text-[#A7F3D0] max-h-40 overflow-y-auto">
                            {selectedDocType === 'invoice' && (
                              <pre>{`{
  "document_type": "Brokerage Commission Invoice",
  "issuer": "Qatar Prime Realty, Doha",
  "vat_number": "QA-30048210923",
  "amount_qar": 145000.00,
  "commission_rate": "2.25%",
  "associated_unit": "Pearl Townhouse #12",
  "payment_terms": "Immediate Net-30",
  "validation_status": "MATCHED_TO_CRM_DEAL"
}`}</pre>
                            )}
                            {selectedDocType === 'contract' && (
                              <pre>{`{
  "document_type": "Residential Lease Agreement",
  "lessor": "Lusail Tower Holdings LLC",
  "tenant": "Mohammed Al-Suwaidi",
  "start_date": "2026-08-01",
  "expiry_date": "2027-08-01",
  "annual_rent_qar": 180000.00,
  "security_deposit_qar": 15000.00,
  "integrity_check": "VALID_SIGNATURES_NCSA"
}`}</pre>
                            )}
                            {selectedDocType === 'tenant' && (
                              <pre>{`{
  "document_type": "Consolidated Tenant Ledger",
  "total_units": 48,
  "delinquent_accounts": 0,
  "occupancy_rate": "100%",
  "extracted_records": [
    {"unit": "101", "tenant": "N. Al-Thani", "status": "PAID"},
    {"unit": "102", "tenant": "J. Sterling", "status": "PAID"},
    {"unit": "103", "tenant": "K. Al-Khulaifi", "status": "PAID"}
  ]
}`}</pre>
                            )}
                          </div>
                        )}

                        {/* Step 4: Verification Complete */}
                        {simStep >= 4 && (
                          <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg text-emerald-400 text-[10px] flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                            <span>✓ Ingestion complete. structured JSON successfully synchronized into accounting ERP system with 0 verification errors.</span>
                          </div>
                        )}

                        {simStep < 4 && (
                          <div className="flex items-center gap-2 text-[#8B95A7] text-[10px] animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-[#06B6D4]" />
                            <span>Extracting invoice ledger matrices...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Reset button shown after simulation completes */}
                {simStep === 4 && (
                  <button
                    onClick={resetSimulation}
                    className="absolute bottom-2 right-2 bg-[#20283B] hover:bg-[#2A3650] border border-[#2A3650]/80 px-2.5 py-1 rounded text-[9px] font-bold text-white cursor-pointer"
                  >
                    {isRtl ? 'إعادة تشغيل المحاكاة' : 'RESET MODULE'}
                  </button>
                )}

              </div>

              {/* Console Action footer */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-[#2A3650]/40 relative z-10">
                <div className="text-[10px] font-sans text-[#8B95A7]">
                  {isRtl 
                    ? 'هل تود دمج إحدى هذه الوحدات المتقدمة في أنظمتكم الحالية؟' 
                    : 'Want custom logic or database adapters built for your Qatari portfolio?'}
                </div>
                <button
                  onClick={() => {
                    const startButton = document.getElementById('request-audit-btn-main');
                    if (startButton) {
                      startButton.click();
                    } else {
                      window.open(`https://wa.me/+97455001760?text=${encodeURIComponent(isRtl ? 'مرحباً أنسوري، أود مناقشة أتمتة سلاسل المتابعة والمستندات لدينا.' : 'Hi Ansury, I would like to discuss implementing nurture sequences and document parser systems for our operations.')}`, '_blank');
                    }
                  }}
                  className="bg-[#06B6D4] text-[#111827] font-bold text-xs px-5 py-2.5 rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#06B6D4]/15"
                >
                  <span>{isRtl ? 'طلب تدقيق للنظام تشغيلياً' : 'Secure Operational Audit Slot'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
