import React, { useState } from 'react';
import { 
  Globe, 
  Database, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  Activity, 
  CheckCircle,
  Cpu,
  Layers
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface SiteEntry {
  id: string;
  nameEn: string;
  nameAr: string;
  typeEn: 'Property Portal' | 'CRM Pipeline' | 'Messaging Network';
  typeAr: 'بوابة عقارية' | 'نظام إدارة عملاء' | 'شبكة مراسلة';
  domain: string;
  latencyEn: string;
  latencyAr: string;
  statusEn: 'Official Webhook' | 'Bespoke REST Sync' | 'Bilingual Pipeline';
  statusAr: 'ربط رسمي فوري' | 'مزامنة مخصصة' | 'قناة معالجة ثنائية';
  descEn: string;
  descAr: string;
  featuresEn: string[];
  featuresAr: string[];
}

export default function SupportedSitesDirectory() {
  const { language, isRtl } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'portal' | 'crm' | 'message'>('all');

  const sites: SiteEntry[] = [
    {
      id: 'site-pf',
      nameEn: 'Property Finder Qatar',
      nameAr: 'بروبرتي فايندر قطر',
      typeEn: 'Property Portal',
      typeAr: 'بوابة عقارية',
      domain: 'propertyfinder.qa',
      latencyEn: '< 4.5 seconds',
      latencyAr: 'أقل من ٤.٥ ثوانٍ',
      statusEn: 'Official Webhook',
      statusAr: 'ربط رسمي فوري',
      descEn: 'Qatar’s primary real estate listing portal. Ansury Systems captures raw lead feeds instantly and initiates conversational qualification within seconds of submission.',
      descAr: 'البوابة العقارية الأولى في دولة قطر. تلتقط أنظمة أنسوري بيانات العملاء فوراً وتبدأ محادثة التأهيل الذكية في غضون ثوانٍ من إرسال الطلب.',
      featuresEn: ['Sub-5s capture latency', 'Lead duplication filters', 'Agent assignment matching'],
      featuresAr: ['زمن التقاط أقل من ٥ ثوانٍ', 'فلاتر منع تكرار البيانات', 'توزيع فوري على وسطاء المبيعات']
    },
    {
      id: 'site-bayut',
      nameEn: 'Bayut Qatar',
      nameAr: 'بيوت قطر',
      typeEn: 'Property Portal',
      typeAr: 'بوابة عقارية',
      domain: 'bayut.qa',
      latencyEn: '< 5.0 seconds',
      latencyAr: 'أقل من ٥.٠ ثوانٍ',
      statusEn: 'Official Webhook',
      statusAr: 'ربط رسمي فوري',
      descEn: 'A leading search portal across Doha and Lusail. Ansury Systems intercepts email notifications and API pings to qualify buyers inquiring about off-plan towers.',
      descAr: 'منصة بحث رائدة للوحدات الفاخرة في الدوحة ولوسيل. تعترض أنظمة أنسوري إشعارات البريد وطلبات الـ API لتأهيل المشترين للمشاريع قيد الإنشاء.',
      featuresEn: ['Direct email parsing', 'Property reference mapping', 'Bilingual prompt routing'],
      featuresAr: ['تحليل فوري للبريد الإلكتروني', 'مطابقة رمز العقار المرجعي', 'توجيه ثنائي لغة فوري']
    },
    {
      id: 'site-ql',
      nameEn: 'Qatar Living',
      nameAr: 'قطر ليفينغ',
      typeEn: 'Property Portal',
      typeAr: 'بوابة عقارية',
      domain: 'qatarliving.com',
      latencyEn: '< 8.0 seconds',
      latencyAr: 'أقل من ٨.٠ ثوانٍ',
      statusEn: 'Official Webhook',
      statusAr: 'ربط رسمي فوري',
      descEn: 'The highest organic classifieds traffic hub in Qatar. Reaches local residents and expats instantly, converting rental and sales listings inquiries to CRM logs.',
      descAr: 'الملتقى الأكبر للإعلانات المبوبة عقارياً في قطر. يصل للمواطنين والمقيمين فوراً، ويحول استفسارات الإيجار والبيع إلى سجلات منظمة بالـ CRM.',
      featuresEn: ['SMS gateway trigger', 'Colloquial Arabic filter', 'Rental term verification'],
      featuresAr: ['تفعيل عبر بوابة الـ SMS', 'مرشح لهجة قطرية وعامية', 'التحقق من مدة عقد الإيجار']
    },
    {
      id: 'site-hubspot',
      nameEn: 'HubSpot CRM Integration',
      nameAr: 'ربط نظام HubSpot',
      typeEn: 'CRM Pipeline',
      typeAr: 'نظام إدارة عملاء',
      domain: 'hubspot.com',
      latencyEn: '100ms sync',
      latencyAr: 'مزامنة خلال ١٠٠ ملي ثانية',
      statusEn: 'Bespoke REST Sync',
      statusAr: 'مزامنة مخصصة',
      descEn: 'Bidirectional synchronization of contact cards, deals pipeline, and qualification summaries. Allows updating AI follow-ups directly from your dashboard.',
      descAr: 'مزامنة كاملة ثنائية الاتجاه لبطاقات العملاء، مراحل الصفقات، وملخصات التأهيل العقاري. تتيح تعديل بروتوكول الذكاء الاصطناعي من لوحتك الخاصة.',
      featuresEn: ['Custom field mapping', 'Raw chat transcript attach', 'Automatic pipeline progression'],
      featuresAr: ['مطابقة الحقول المخصصة', 'إرفاق النص الكامل للحوار', 'تحديث تلقائي لمرحلة الصفقة']
    },
    {
      id: 'site-salesforce',
      nameEn: 'Salesforce Enterprise Hub',
      nameAr: 'ربط نظام Salesforce للمؤسسات',
      typeEn: 'CRM Pipeline',
      typeAr: 'نظام إدارة عملاء',
      domain: 'salesforce.com',
      latencyEn: '150ms sync',
      latencyAr: 'مزامنة خلال ١٥٠ ملي ثانية',
      statusEn: 'Bespoke REST Sync',
      statusAr: 'مزامنة مخصصة',
      descEn: 'Enterprise ledger logging compliant with institutional database constraints in Qatar. Ensures high-security customer data management.',
      descAr: 'تسجيل قيود العملاء للمؤسسات الكبرى بما يتوافق مع متطلبات الأمان المحلية في قطر. يضمن إدارة بيانات العملاء بأعلى معايير الحماية.',
      featuresEn: ['Apex trigger compliance', 'Encrypted customer records', 'VIP priority path flags'],
      featuresAr: ['توافق مع أوامر Apex', 'تشفير كامل لبيانات العميل', 'تحديد عملاء الشخصيات الهامة']
    },
    {
      id: 'site-whatsapp',
      nameEn: 'WhatsApp Business API Gateway',
      nameAr: 'ربط بوابة الواتساب للأعمال',
      typeEn: 'Messaging Network',
      typeAr: 'شبكة مراسلة',
      domain: 'meta.com',
      latencyEn: 'Sub-second',
      latencyAr: 'أقل من ثانية واحدة',
      statusEn: 'Bilingual Pipeline',
      statusAr: 'قناة معالجة ثنائية',
      descEn: 'The core highway of GCC communication. Replaces cold calling with real-time, interactive, highly-personalized bilingual text conversations.',
      descAr: 'الشريان الأساسي للتواصل والصفقات بالخليج العربي. يستبدل مكالمات البيع الباردة بمحادثات نصية تفاعلية وفورية باللغتين العربية والإنجليزية.',
      featuresEn: ['Multi-day follow-up nurture', 'Prayer time window delay', 'Localized GCC respect filters'],
      featuresAr: ['سلاسل متابعة وتغذية متعددة الأيام', 'مراعاة أوقات الصلوات الرسمية', 'فلاتر احترام الألقاب والمكانة']
    }
  ];

  const filteredSites = sites.filter(site => {
    if (filterType === 'all') return true;
    if (filterType === 'portal' && site.typeEn === 'Property Portal') return true;
    if (filterType === 'crm' && site.typeEn === 'CRM Pipeline') return true;
    if (filterType === 'message' && site.typeEn === 'Messaging Network') return true;
    return false;
  });

  return (
    <section id="sites-directory" className="relative max-w-[1280px] mx-auto px-8 py-24 z-10 border-t border-[#2A3650]/30">
      
      {/* Absolute ambient backgrounds */}
      <div className="absolute -top-10 right-10 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase tracking-widest block mb-3">
          {language === 'en' ? 'SOVEREIGN DIRECTORY & PORTALS' : 'دليل المنصات والمواقع السيادي'}
        </span>
        <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {language === 'en' ? 'Supported GCC Sites & Ecosystem Integrations' : 'المنصات المحلية والعالمية المدعومة'}
        </h2>
        <p className="font-sans text-[#8B95A7] text-sm md:text-base leading-relaxed">
          {language === 'en' 
            ? 'Ansury Systems operates as a unified middleware layer, seamlessly binding Qatar’s primary property portals directly with your core CRM databases.'
            : 'يعمل نظام أنسوري كطبقة برمجية موحدة، ليربط بسلاسة بوابات العقارات الأكثر نشاطاً في دولة قطر مباشرةً مع أنظمة إدارة العملاء لديكم.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 mb-12 relative z-10">
        {[
          { id: 'all', labelEn: 'All Platforms', labelAr: 'كل المنصات' },
          { id: 'portal', labelEn: 'Property Portals', labelAr: 'البوابات العقارية' },
          { id: 'crm', labelEn: 'CRM Integrations', labelAr: 'أنظمة الـ CRM' },
          { id: 'message', labelEn: 'Messaging Gateways', labelAr: 'قنوات المراسلة' }
        ].map((tab) => {
          const isSelected = filterType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-gradient-to-tr from-[#10B981] to-[#06B6D4] text-[#111827] shadow-lg shadow-[#10B981]/15 font-bold' 
                  : 'bg-[#151D30]/80 text-[#8B95A7] border border-[#2A3650]/40 hover:text-white hover:border-[#8B95A7]/30'
              }`}
            >
              {language === 'en' ? tab.labelEn : tab.labelAr}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredSites.map((site) => (
          <div 
            key={site.id}
            id={site.id}
            className="bg-[#151D30]/60 border border-[#2A3650]/45 rounded-2xl p-6 hover:border-[#10B981]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Type tag & Latency stats */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[9px] text-[#10B981] bg-[#10B981]/5 border border-[#10B981]/15 px-2 py-0.5 rounded-md font-bold uppercase">
                  {language === 'en' ? site.typeEn : site.typeAr}
                </span>
                
                <span className="font-mono text-[10px] text-gray-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#06B6D4]" />
                  {language === 'en' ? site.latencyEn : site.latencyAr}
                </span>
              </div>

              {/* Title & Domain */}
              <h3 className="font-sora text-base font-bold text-white mb-1 group-hover:text-[#10B981] transition-colors flex items-center gap-1.5 justify-between">
                <span>{language === 'en' ? site.nameEn : site.nameAr}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8B95A7] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>

              <span className="text-[10px] font-mono text-gray-500 block mb-4">
                {language === 'en' ? 'Domain Mapping: ' : 'نطاق الربط العقاري: '}
                <span className="text-[#06B6D4]">{site.domain}</span>
              </span>

              {/* Description */}
              <p className="text-xs text-[#8B95A7] leading-relaxed mb-6 font-sans">
                {language === 'en' ? site.descEn : site.descAr}
              </p>
            </div>

            {/* Features list */}
            <div className="border-t border-[#2A3650]/30 pt-4 mt-auto">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mb-2 font-semibold">
                {language === 'en' ? 'Core Capabilities:' : 'القدرات الفنية الأساسية:'}
              </span>
              <ul className="space-y-1.5">
                {(language === 'en' ? site.featuresEn : site.featuresAr).map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[11px] text-[#D1D5DB] font-sans">
                    <CheckCircle className="w-3 h-3 text-[#10B981] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Integration Badge */}
              <div className="mt-4 pt-4 border-t border-[#2A3650]/20 flex items-center gap-1.5 text-[9px] font-mono text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>
                  {language === 'en' ? site.statusEn : site.statusAr}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Grounding & Search Crawler Directives (GEO optimized inline details) */}
      <div className="mt-12 bg-[#111827]/80 rounded-2xl p-6 border border-[#2A3650]/40 shadow-inner flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4 text-center lg:text-left">
          <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-[#06B6D4]" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-[#06B6D4] font-bold block">GEO / LLM INDEX GROUNDING DIRECTIVES</span>
            <p className="text-[11px] text-[#8B95A7] font-sans mt-0.5">
              {language === 'en'
                ? 'This web app strictly maps schemas & citation anchors. Certified by Ansury Systems Compliance Board, Doha State of Qatar.'
                : 'يخضع هذا التطبيق لضوابط الفهرسة الدقيقة ومطابقة البيانات لشبكات الذكاء الاصطناعي ومحركات البحث المعتمدة بالدوحة.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px] text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>ISO 27001 SECURE SCHEMA</span>
        </div>
      </div>

    </section>
  );
}
