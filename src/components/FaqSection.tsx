import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Cpu, 
  Layers, 
  Languages, 
  ShieldCheck, 
  X, 
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface FaqItem {
  id: string;
  category: 'qualification' | 'crm' | 'arabic' | 'sovereignty';
  qEn: string;
  qAr: string;
  aEn: string;
  aAr: string;
  badgeEn: string;
  badgeAr: string;
}

export default function FaqSection() {
  const { language, isRtl } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('q1'); // Open first by default

  const categories = useMemo(() => [
    { id: 'all', labelEn: 'All Technical Questions', labelAr: 'الكل', icon: HelpCircle },
    { id: 'qualification', labelEn: 'Lead Qualification', labelAr: 'أتمتة التأهيل', icon: Cpu },
    { id: 'crm', labelEn: 'CRM & Portal Integration', labelAr: 'الربط البرمجي', icon: Layers },
    { id: 'arabic', labelEn: 'Bilingual AI Engine', labelAr: 'الذكاء اللغوي', icon: Languages },
    { id: 'sovereignty', labelEn: 'Sovereignty & Security', labelAr: 'السيادة والأمان', icon: ShieldCheck },
  ], []);

  const faqs: FaqItem[] = [
    {
      id: 'q1',
      category: 'qualification',
      badgeEn: 'PORTAL INGESTION',
      badgeAr: 'سحب العملاء فورياً',
      qEn: 'How does Ansury AI intercept leads from Property Finder, Bayut, and WhatsApp?',
      qAr: 'كيف يقوم نظام أنسوري باعتراض وسحب العملاء من بوابات بروبرتي فايندر وبيوت والواتساب؟',
      aEn: 'Ansury integrates directly with official property portal webhooks, email parsers, and the WhatsApp Business API. The moment an inquiry is generated on Property Finder or Bayut, our engine intercepts it in under 5 seconds, triggering the automated qualification cycle before any manual broker delay can occur.',
      aAr: 'يتكامل نظام أنسوري مباشرةً مع قنوات ربط الويب (Webhooks) الرسمية للبوابات العقارية ومحللات البريد الإلكتروني، والواجهة البرمجية لواتساب للأعمال. في اللحظة التي يتم فيها تسجيل استفسار على بروبرتي فايندر أو بيوت، يعترض محركنا الطلب في أقل من ٥ ثوانٍ، مطلقاً دورة التأهيل والفلترة تلقائياً قبل حدوث أي تأخير يدوي من الوسطاء.'
    },
    {
      id: 'q2',
      category: 'qualification',
      badgeEn: 'QUALIFICATION MATRIX',
      badgeAr: 'معايير التأهيل',
      qEn: 'What specific parameters does the AI qualify during the inbound conversation?',
      qAr: 'ما هي معايير التأهيل المحددة التي يفحصها الذكاء الاصطناعي أثناء المحادثة؟',
      aEn: 'The agent systematically qualifies the prospect\'s exact budget range (in QAR), target area (e.g. The Pearl, Lusail, West Bay), physical space layouts (number of bedrooms, office requirements), purchase timeline (immediate, off-plan, rental term), source of funds (cash, local mortgage), and verifies active contact details.',
      aAr: 'يقوم العميل الذكي بشكل منهجي بالتحقق من النطاق المالي الدقيق للميزانية (بالريال القطري)، والمنطقة العقارية المستهدفة (مثل اللؤلؤة قطر، لوسيل، الخليج الغربي)، والمساحة والتقسيمات (عدد الغرف، متطلبات المكاتب)، وجدول الشراء الزمني (فوري، قيد الإنشاء، مدة العقد)، ومصدر تمويل الصفقة (نقدي، تمويل عقاري محلي)، بالإضافة إلى تأكيد البيانات النشطة والاتصال الهاتفي.'
    },
    {
      id: 'q3',
      category: 'crm',
      badgeEn: 'ENTERPRISE CRM',
      badgeAr: 'مزامنة الأنظمة',
      qEn: 'Does Ansury support bidirectional synchronization with HubSpot and Salesforce?',
      qAr: 'هل تدعم أنظمة أنسوري المزامنة ثنائية الاتجاه مع HubSpot وSalesforce؟',
      aEn: 'Yes, fully. We establish secure REST API connections with HubSpot, Salesforce, and custom CRM systems. Once qualified, the lead is pushed instantly along with a comprehensive qualification summary, raw conversation transcripts, and prioritized broker task allocations. Updates inside your CRM can also update the AI\'s follow-up protocol.',
      aAr: 'نعم، وبشكل كامل. نقوم بإنشاء اتصالات برمجية آمنة وموثقة (REST API) مع HubSpot وSalesforce وأنظمة إدارة العملاء العقارية المخصصة. بمجرد انتهاء التأهيل، يتم ترحيل العميل فوراً مع ملخص تأهيلي منظم، والنص الكامل للمحادثة، وتنبيه فوري لوسيط المبيعات المناسب. كما يمكن لأي تحديث تجرونه داخل نظامكم أن يعدل بروتوكول تتبع الذكاء الاصطناعي.'
    },
    {
      id: 'q4',
      category: 'crm',
      badgeEn: 'DEDUPLICATION',
      badgeAr: 'منع تكرار السجلات',
      qEn: 'How are duplicate leads from different property portals managed?',
      qAr: 'كيف يتم التعامل مع تكرار العملاء من بوابات عقارية مختلفة؟',
      aEn: 'The system utilizes a precise client ledger framework. If the same user submits inquiries on both Property Finder and WhatsApp within a given timeframe, Ansury merges the transcripts into a single unified customer profile inside your CRM, preventing multiple brokers from double-calling and protecting your brand reputation.',
      aAr: 'يعتمد النظام على إطار عمل متطور لفرز السجلات وحمايتها من التكرار. إذا أرسل العميل نفسه استفسارات متعددة عبر بروبرتي فايندر وقناة الواتساب خلال فترة زمنية متقاربة، يدمج نظام أنسوري الحوارات والبيانات في ملف موحد لعميل واحد داخل نظامكم، مما يمنع تعارض وتكرار مكالمات الوسطاء ويحمي مصداقية وسمعة علامتكم.'
    },
    {
      id: 'q5',
      category: 'arabic',
      badgeEn: 'GCC DIALECTS',
      badgeAr: 'اللهجات الخليجية',
      qEn: 'How does the AI handle regional Arabic dialects vs. formal Arabic?',
      qAr: 'كيف يتعامل الذكاء الاصطناعي مع اللهجات العربية الإقليمية مقابل العربية الفصحى؟',
      aEn: 'Our conversational model is fine-tuned specifically for GCC dialects, with particular emphasis on Qatari phrasing and Gulf terms common in Doha\'s real estate market. The system naturally transitions between High-context Modern Standard Arabic (MSA) and localized everyday colloquial Arabic depending on the customer\'s input style.',
      aAr: 'تم تدريب وضبط نموذجنا اللغوي خصيصاً لاستيعاب الفروق الدقيقة للهجات الخليجية، مع تركيز مكثف على صياغات اللهجة القطرية والمصطلحات الدارجة في الدوحة والخليج. ينتقل النظام بمرونة لغوية تامة بين العربية الفصحى المعاصرة عالية السياق والعبارات العامية المحلية اليومية بناءً على طريقة حديث العميل وطبيعة استفساره.'
    },
    {
      id: 'q6',
      category: 'arabic',
      badgeEn: 'CULTURAL RESPECT',
      badgeAr: 'البروتوكولات الثقافية',
      qEn: 'How are traditional Qatari cultural honorifics and titles respected?',
      qAr: 'كيف يراعي المحرك اللغوي الألقاب الرسمية والبروتوكول الاجتماعي والتقدير في قطر؟',
      aEn: 'Respectful business communication is non-negotiable in the Doha market. The Arabic engine is pre-programmed with local cultural filters to automatically apply correct honorifics, titles (such as Sheikh, Excellency, Abu, etc.), and polite corporate greetings depending on the prospect\'s profile or introductory messages.',
      aAr: 'إن التخاطب الراقي والمحترم هو شرط جوهري ثابت في سوق الدوحة. تم تزويد المحرك العربي مسبقاً بفلاتر لغوية وثقافية تطبق تلقائياً صيغ الاحترام والألقاب والتحية المناسبة (مثل الشيخ، سعادة، الوالد، السيد، إلخ) والترحيب المناسب لمكانة العميل وبناءً على البيانات المبدئية والبادئة للمحادثة.'
    },
    {
      id: 'q7',
      category: 'sovereignty',
      badgeEn: 'LOCAL CLOUD',
      badgeAr: 'الاستضافة السيادية',
      qEn: 'Is our customer data stored locally within Qatar limits?',
      qAr: 'هل يتم تخزين بيانات عملائنا محلياً داخل حدود دولة قطر؟',
      aEn: 'Yes. For our Enterprise Tier deployments, we guarantee 100% sovereign hosting on secure local cloud servers in Doha, complying fully with the Qatar National Cyber Security Agency (NCSA) directives and Qatar Personal Data Privacy Protection Law (PDPPL).',
      aAr: 'نعم بالتأكيد. بالنسبة لمشروعات الفئات السيادية للمؤسسات، نضمن استضافة سيادية بنسبة ١٠٠٪ على خوادم سحابية محلية آمنة داخل دولة قطر، بما يتوافق تماماً مع توجيهات الوكالة الوطنية للأمن السيبراني وقانون حماية خصوصية البيانات الشخصية القطري (PDPPL).'
    },
    {
      id: 'q8',
      category: 'sovereignty',
      badgeEn: '99.98% UPTIME',
      badgeAr: 'استمرارية الخدمة',
      qEn: 'What is the system uptime and fall-back protocol during connection drops?',
      qAr: 'ما هو معدل استمرارية تشغيل النظام وبروتوكول الطوارئ عند حدوث انقطاع للاتصالات؟',
      aEn: 'Ansury operates on highly redundant cloud clusters with a certified 99.98% operational uptime. If a target CRM or webhook experiences a temporary drop, Ansury safely queues qualified leads on our offline-first encrypted databases, automatically retrying every 120 seconds until synchronization is confirmed.',
      aAr: 'تعمل أنسوري على مجموعات سحابية سريعة واحتياطية بمعدل تشغيل مستمر معتمد يبلغ ٩٩.٩٨٪. في حال حدوث عطل طارئ أو بطء في مزامنة نظام إدارة العملاء، تخزن أنسوري سجلات العملاء المؤهلين بأمان فوري في قواعد بيانات محلية مشفرة، وتعاود محاولات الربط تلقائياً كل ١٢٠ ثانية حتى اكتمال النقل لتفادي أي فقد.'
    }
  ];

  // Filter FAQS based on selected category & search query
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      // Category filter
      if (selectedCategory !== 'all' && faq.category !== selectedCategory) {
        return false;
      }
      // Search query filter (bilingual search match)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesQEn = faq.qEn.toLowerCase().includes(query);
        const matchesQAr = faq.qAr.toLowerCase().includes(query);
        const matchesAEn = faq.aEn.toLowerCase().includes(query);
        const matchesAAr = faq.aAr.toLowerCase().includes(query);
        const matchesBadgeEn = faq.badgeEn.toLowerCase().includes(query);
        const matchesBadgeAr = faq.badgeAr.toLowerCase().includes(query);
        return matchesQEn || matchesQAr || matchesAEn || matchesAAr || matchesBadgeEn || matchesBadgeAr;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <section id="faq-section" className="relative max-w-[1280px] mx-auto px-8 py-24 z-10 border-t border-[#2A3650]/30">
      
      {/* Background radial glowing grid accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <span className="font-mono text-[10px] text-[#06B6D4] font-bold uppercase tracking-widest block mb-3">
          {isRtl ? 'إجابات تقنية معتمدة' : 'TECHNICAL RETROSPECTIVE & ANSWERS'}
        </span>
        <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {isRtl ? 'دليل إجابات أنسوري التقني' : 'Architectural Knowledge Ledger'}
        </h2>
        <p className="font-sans text-[#8B95A7] text-sm md:text-base leading-relaxed">
          {isRtl 
            ? 'تصفح الإجابات الشاملة حول آليات عمل أتمتة التأهيل الفوري، والمزامنة اللحظية ثنائية الاتجاه، ومستوى سيادة البيانات في دولة قطر.'
            : 'Detailed solutions covering portal capture latency, custom dialect tuning, CRM data persistence pipelines, and Doha-limit sovereign cloud requirements.'}
        </p>
      </div>

      {/* Control Panel: Search & Category tabs */}
      <div className="bg-[#151D30]/80 rounded-2xl p-6 border border-[#2A3650]/40 shadow-xl mb-10 relative z-10 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          
          {/* Categorical filters (bilingual buttons) */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center lg:justify-start">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    // Open the first item of filtered list automatically to be helpful
                    const matchingFaqs = faqs.filter(f => cat.id === 'all' || f.category === cat.id);
                    if (matchingFaqs.length > 0) {
                      setExpandedId(matchingFaqs[0].id);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#06B6D4] text-[#111827] shadow-lg shadow-[#06B6D4]/15 font-bold' 
                      : 'bg-[#1D273B] text-[#D1D5DB] border border-[#2A3650]/50 hover:border-[#06B6D4]/40 hover:text-white'
                  }`}
                >
                  <CatIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#111827]' : 'text-[#06B6D4]'}`} />
                  <span>{isRtl ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Search Box */}
          <div className="relative w-full lg:w-80">
            <div className={`absolute top-1/2 -translate-y-1/2 text-[#8B95A7] ${isRtl ? 'left-3' : 'right-3'}`}>
              {searchQuery ? (
                <X 
                  onClick={() => setSearchQuery('')}
                  className="w-4 h-4 cursor-pointer hover:text-white transition-colors" 
                />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? 'ابحث في الأسئلة والحلول...' : 'Search answers ledger...'}
              className={`w-full bg-[#1A2333] border border-[#2A3650]/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#525E73] focus:outline-none focus:border-[#06B6D4] transition-colors ${
                isRtl ? 'text-right pr-4 pl-10' : 'text-left pl-4 pr-10'
              }`}
            />
          </div>

        </div>
      </div>

      {/* Accordion Component Grid / List */}
      <div className="space-y-4 relative z-10">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`bg-[#151D30]/50 rounded-2xl border transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg ${
                  isExpanded ? 'border-[#06B6D4]/55 bg-[#1A253D]/30' : 'border-[#2A3650]/30 hover:border-[#2A3650]/80'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className={`w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors ${
                    isRtl ? 'text-right flex-row-reverse' : 'text-left flex-row'
                  }`}
                >
                  <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                    
                    {/* Index or Icon indicator */}
                    <div className="w-8 h-8 rounded-lg bg-[#20293D] border border-[#2A3650]/40 flex items-center justify-center shrink-0 text-[#06B6D4] text-xs font-mono font-bold">
                      0{index + 1}
                    </div>

                    <div>
                      {/* Bilingual Category Badge */}
                      <span className={`inline-block font-mono text-[9px] font-bold text-[#06B6D4] bg-[#06B6D4]/5 border border-[#06B6D4]/15 px-2 py-0.5 rounded-md mb-2`}>
                        {isRtl ? faq.badgeAr : faq.badgeEn}
                      </span>
                      
                      {/* Active Question title */}
                      <h3 className="text-sm md:text-base font-bold text-white font-sora tracking-tight">
                        {isRtl ? faq.qAr : faq.qEn}
                      </h3>
                    </div>

                  </div>

                  {/* Expand chevron indicator */}
                  <div className={`p-1.5 rounded-full bg-[#1A2333] border border-[#2A3650]/50 transition-transform duration-300 shrink-0 ${
                    isExpanded ? 'transform rotate-180 text-[#06B6D4] border-[#06B6D4]/25' : 'text-[#8B95A7]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated expandable panel body */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[500px] border-t border-[#2A3650]/35 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-6 md:p-8 bg-[#182136]/15">
                    <p className={`text-xs md:text-sm text-[#B4C0D4] leading-relaxed font-sans ${isRtl ? 'text-right' : 'text-left'}`}>
                      {isRtl ? faq.aAr : faq.aEn}
                    </p>

                    {/* Meta indicator footer of FAQ */}
                    <div className={`flex items-center gap-4 mt-6 pt-5 border-t border-[#2A3650]/20 text-[10px] font-mono text-[#8B95A7] ${
                      isRtl ? 'justify-end' : 'justify-start'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{isRtl ? 'نظام استجابة نشط بالدوحة' : 'ACTIVE DOHA PIPELINE'}</span>
                      </div>
                      <span className="text-[#2A3650]">•</span>
                      <span>ID: {faq.id.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          /* Empty Search results state */
          <div className="text-center py-16 bg-[#151D30]/30 rounded-2xl border border-dashed border-[#2A3650]/35">
            <MessageSquare className="w-10 h-10 text-[#06B6D4]/30 mx-auto mb-4" />
            <h4 className="text-sm font-bold text-white font-sora mb-1">
              {isRtl ? 'لم نجد أي إجابة تطابق بحثكم' : 'No technical entries found'}
            </h4>
            <p className="text-xs text-[#8B95A7] max-w-sm mx-auto mb-4">
              {isRtl 
                ? 'جرب البحث عن كلمات بديلة مثل "مزامنة"، "واتساب"، "خوادم"، أو "أمان".'
                : 'Try searching for general terms such as "sync", "WhatsApp", "dialects", or "security".'}
            </p>
            <button
              onClick={clearFilters}
              className="text-xs font-mono font-bold text-[#06B6D4] hover:underline cursor-pointer"
            >
              {isRtl ? 'إعادة ضبط مرشحات البحث' : 'Reset all search filters'}
            </button>
          </div>
        )}
      </div>

      {/* Inline Help CTA card inside Answers Ledger */}
      <div className="mt-14 bg-gradient-to-r from-[#1E293B]/60 to-[#0F172A]/70 rounded-2xl p-6 border border-[#2A3650]/50 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center shrink-0">
            <span className="text-xs text-[#25D366] font-bold">QA</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-sora">
              {isRtl ? 'هل لديكم أسئلة فنية خاصة بمتطلباتكم؟' : 'Have a unique legacy database architecture?'}
            </h4>
            <p className="text-[11px] text-[#8B95A7] font-sans mt-0.5">
              {isRtl 
                ? 'يمكن لمهندسينا بناء روابط مخصصة متوافقة تماماً مع أنظمتكم الحالية.'
                : 'Our integration architects design direct adapters for bespoke real estate backends in Qatar.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.open(`https://wa.me/+97455001760?text=${encodeURIComponent(isRtl ? 'مرحباً أنسوري، لدي استفسار فني خاص بربط أنظمتنا العقارية.' : 'Hi Ansury, I have a specific integration query regarding our property systems.')}`, '_blank')}
          className="bg-[#25D366] text-[#111827] font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#20ba59] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span>{isRtl ? 'استشارة فنية فورية بالواتساب' : 'Immediate WhatsApp Consultation'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </section>
  );
}
