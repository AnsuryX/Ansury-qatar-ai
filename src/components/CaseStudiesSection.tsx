import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  Loader2, 
  ArrowRight,
  BookmarkCheck,
  Building,
  Quote
} from 'lucide-react';
import NodeNetwork from './NodeNetwork';
import { useLanguage } from '../LanguageContext';

export default function CaseStudiesSection() {
  const { language, isRtl } = useLanguage();

  const csCopy = {
    en: {
      eyebrow: "PARTNER WITH INTELLIGENCE",
      title: "Precision Industrial Automation",
      subtitle: "Optimizing Qatar's real estate vertical through high-stakes AI integration. Our technical team is ready to blueprint your facility's evolution.",
      upTime: "Operational Uptime",
      effGain: "Efficiency Gain",
      dohaInt: "Doha Integrated",
      dohaIntDesc: "Local support hubs ensuring zero-latency response for critical Qatari real estate infrastructure and direct governmental integrations.",
      bespoke: "Bespoke Blueprints",
      bespokeDesc: "No generic templates. Every single deployment is custom architected mapping directly to your specific portfolio assets.",
      formTitle: "Technical Consultation Request",
      formSubtitle: "Configure a closed-loop regional micro-agent simulation mapped to your local database stack. Initial compliance blueprinting is completed within 4 hours.",
      fullName: "Full Name",
      corpEmail: "Corporate Email",
      phone: "Phone Number",
      phonePlaceholder: "e.g. +974 5555 1234",
      org: "Organization",
      orgPlaceholder: "Entity Name",
      projScale: "Project Scale",
      scales: [
        "Single Asset (Commercial)",
        "Portfolio Management",
        "Industrial District",
        "Governmental Infrastructure"
      ],
      opReq: "Operational Requirements",
      opReqPlaceholder: "Briefly describe your automation goals and current database/CRM setups (e.g. HubSpot, Salesforce, custom API)...",
      submitBtn: "Request Technical Consultation",
      submittingBtn: "Securing Ledger Coordinates...",
      secureLeg: "Secure Protocol: Handled in Compliance with Qatari Legislative Framework",
      successTitle: "Requisition Verified",
      successSubtitle: "ENCRYPTED NODE COMMITTED SUCCESSFUL",
      sovereignKey: "Sovereign Key",
      requester: "Requester",
      entNode: "Enterprise Node",
      regRoute: "Regional Route",
      regRouteVal: "Doha Sector (Lusail Marina)",
      targetPriority: "Target Priority",
      successMsg: "Your technical blueprint profile has been verified. A regional integration architect has been matched to coordinate your audit. Estimated call queue: < 4 hours.",
      resetBtn: "Submit Different Profile Requisition",
      hqBadge: "Ansury HQ - Qatar",
      hqAddress: "Burj Alfardan, Lusail",
      deploymentsTitle: "Active Institutional Deployments",
      deploymentsSubtitle: "Deep technical retrospectives of how Doha's leading brokerages and developers achieved 60-second response latency.",
      caseStudiesList: [
        {
          area: "The Pearl-Qatar",
          client: "United Property Partners",
          stats: "-92% Response Delay",
          title: "Automating 500+ Luxury Leads with HubSpot",
          desc: "By integrating directly with their Property Finder and WhatsApp portals, Ansury Systems qualifies inquiries about off-plan apartments inside 45 seconds, routing verified buyers directly to senior brokers' phones.",
          m1Val: "42s",
          m1Lbl: "Response Latency",
          m2Val: "+24%",
          m2Lbl: "Conversion Rate"
        },
        {
          area: "West Bay, Doha",
          client: "Doha Prestige Group",
          stats: "$5,400 Monthly Savings",
          title: "Zero-Latency Lead Triage for Commercial Tower Pipelines",
          desc: "Commercial assets require complex qualification filters. Ansury Systems filters corporate inquiries, matches space requirements with available stock layouts, and logs leads directly in Salesforce.",
          m1Val: "1,140 hrs",
          m1Lbl: "Broker Hours Reallocated",
          m2Val: "89%",
          m2Lbl: "Automated Classification"
        },
        {
          area: "Lusail Marina/City",
          client: "Al-Khor Developers",
          stats: "78% Qualification",
          title: "Sovereign Arabic Agent Deployment for High-Volume Inbound",
          desc: "With massive Arabic-speaking GCC inbound queries during seasonal launches, our sovereign GCC-dialect optimized agent qualified buyer profiles and budgets natively on Doha servers.",
          m1Val: "< 15s",
          m1Lbl: "Average Response",
          m2Val: "99.98%",
          m2Lbl: "System Uptime"
        }
      ],
      testimonialsTitle: "Authority in Action — Partner Testimonials",
      testimonialsSubtitle: "Hear from managing directors and digital leaders optimizing their real estate pipelines with Ansury Systems.",
      testimonialsList: [
        {
          quote: "Ansury Systems completely changed how we structure recruitment. Instead of hiring agents to browse portals and copy-paste messages, we let Ansury Systems qualify the buyers first inside 60 seconds. Our agents are actually closing deals instead of fighting response lag.",
          author: "Yousef Al-Kuwari",
          role: "Managing Director",
          company: "Lusail Premier Properties"
        },
        {
          quote: "Since deployment on our West Bay campaigns, the bilingual response speed is unbelievable. Customers receive an accurate, polite reply in English or high-context Arabic with proper names and titles before our team can even open the email.",
          author: "Fatimah Al-Thani",
          role: "Head of Client Relations",
          company: "Doha Skyline Group"
        },
        {
          quote: "Sovereign local cloud housing was a non-negotiable directive for our group assets. Ansury Systems operates 100% on a secure Doha-based micro-server stack, delivering immense speed while guaranteeing compliance with Qatari privacy legislation.",
          author: "Abdulrahman Al-Hammadi",
          role: "VP of Enterprise Development",
          company: "Qatar Sovereign Holdings"
        }
      ]
    },
    ar: {
      eyebrow: "الشراكة مع النظم الذكية",
      title: "أتمتة عقارية متناهية الدقة",
      subtitle: "تمكين ودعم القطاع العقاري القطري عبر حلول ذكاء اصطناعي عالية الكفاءة. فريقنا الفني على أتم استعداد لوضع مخطط ارتقاء مؤسستكم.",
      upTime: "جاهزية تشغيلية مستمرة",
      effGain: "معدل زيادة الكفاءة",
      dohaInt: "تكامل مباشر بالدوحة",
      dohaIntDesc: "مراكز دعم فني ومحلي تضمن سرعة استجابة فائقة للبنية التحتية العقارية وإمكانية الدمج الحكومي المباشر.",
      bespoke: "مخططات وهيكلة مخصصة",
      bespokeDesc: "لا نعتمد على القوالب الجاهزة أبداً. كل دمج يتم تصميمه خصيصاً ليتناسب بدقة مع أصول ومحافظ شركتكم الفريدة.",
      formTitle: "طلب استشارة فنية متكاملة",
      formSubtitle: "قم بإعداد اختبار تشغيلي آلي فوري مخصص ومربوط بقواعد البيانات الحالية لديكم. يتم تسليم دراسة الملاءمة الفنية الفورية خلال 4 ساعات.",
      fullName: "الاسم الكامل",
      corpEmail: "البريد الإلكتروني للشركة",
      phone: "رقم الجوال الفني",
      phonePlaceholder: "مثال: 1234 5555 974+",
      org: "الشركة / المؤسسة العقارية",
      orgPlaceholder: "اسم الشركة العقارية",
      projScale: "حجم ونوع المشروع دافع التطوير",
      scales: [
        "أصول فردية (تجاري)",
        "إدارة المحافظ العقارية المتكاملة",
        "الدوائر والمناطق الصناعية",
        "البنية التحتية والحلول الحكومية"
      ],
      opReq: "المتطلبات التشغيلية والفنية المطلوبة",
      opReqPlaceholder: "يرجى وصف أهداف الأتمتة الحالية وأنظمة قواعد البيانات أو الـ CRM المعمول بها لديكم (مثل HubSpot أو Salesforce أو واجهات برمجية خاصة)...",
      submitBtn: "إرسال طلب الاستشارة الفنية",
      submittingBtn: "جاري ربط وتأمين إحداثيات السجل المالي...",
      secureLeg: "بروتوكول آمن: يتم التعامل بالتنسيق التام مع الأطر التشريعية واللوائح بدولة قطر",
      successTitle: "تم تدقيق واعتماد مراجعة الطلب",
      successSubtitle: "تم دمج وتثبيت بيانات الطرف الطالب بنجاح",
      sovereignKey: "مفتاح السيادة المشفر",
      requester: "صاحب الطلب",
      entNode: "مستوى المؤسسة العقارية",
      regRoute: "قناة التوجيه التشغيلية",
      regRouteVal: "قطاع الدوحة (مارينا لوسيل)",
      targetPriority: "الأولوية المستهدفة",
      successMsg: "تم التحقق التدقيقي الكامل من ملف طلبكم العقاري. تم تعيين أحد كبار مهندسي الأنظمة لدينا للتنسيق وتحديد تفاصيل الاستشارة القادمة. فترة الانتظار المقدرة للاتصال الفوري: أقل من 4 ساعات.",
      resetBtn: "تقديم طلب استشارة جديدة لملف آخر",
      hqBadge: "مقر أنسوري الرئيسي - قطر",
      hqAddress: "برج الفردان، لوسيل",
      deploymentsTitle: "عمليات تشغيل نشطة للمؤسسات",
      deploymentsSubtitle: "دراسات فنية متكاملة لكيفية تحقيق كبرى الشركات العقارية والوسطاء بالدوحة لمعدل استجابة في أقل من ٦٠ ثانية.",
      caseStudiesList: [
        {
          area: "اللؤلؤة قطر",
          client: "المتحدة للشركاء العقاريين",
          stats: "تقليص زمن الاستجابة ٩٢٪",
          title: "أتمتة أكثر من ٥٠٠ عميل فاخر مع مزامنة كاملة لـ HubSpot",
          desc: "من خلال التكامل المباشر مع بوابات بروبرتي فايندر وقنوات الواتساب، تقوم أنظمة أنسوري بتأهيل الاستفسارات السكنية في أقل من ٤٥ ثانية، موجهاً المشترين الجادين مباشرة إلى كبار وسطاء المبيعات.",
          m1Val: "٤٢ ثانية",
          m1Lbl: "زمن الاستجابة للطلب",
          m2Val: "+٢٤٪",
          m2Lbl: "معدل تحويل الصفقات"
        },
        {
          area: "الخليج الغربي، الدوحة",
          client: "مجموعة الدوحة المرموقة",
          stats: "توفير شهري ٥،٤٠٠ دولار",
          title: "تصفية وفرز العملاء فوري المزامنة للأبراج التجارية الكبرى",
          desc: "تتطلب الأصول التجارية مرشحات تصفية دقيقة ومعقدة. تقوم أنظمة أنسوري بفرز الاستفسارات وتطابق المساحات المطلوبة بالملفات المتاحة لديهم وتسجيلها مباشرة على Salesforce.",
          m1Val: "١،١٤٠ ساعة",
          m1Lbl: "ساعات عمل موفرة للوسطاء",
          m2Val: "٨٩٪",
          m2Lbl: "التصنيف والفرز التلقائي"
        },
        {
          area: "مارينا لوسيل",
          client: "الخور للمطورين العقاريين",
          stats: "تأهيل بنسبة ٧٨٪",
          title: "دمج عميل عربي سيادي فائق الاستجابة للقنوات العقارية عالية الكثافة",
          desc: "مع كثافة الاستفسارات باللغة العربية مع انطلاق مشاريع المواسم العقارية، نجح عميلنا السيادي المصمم باللهجات الخليجية في تأهيل وفلترة ميزانيات المشترين على خوادم الدوحة السيادية.",
          m1Val: "أقل من ١٥ ثانية",
          m1Lbl: "متوسط سرعة الرد",
          m2Val: "٩٩.٩٨٪",
          m2Lbl: "التواجد التشغيلي المستمر"
        }
      ],
      testimonialsTitle: "كفاءة موثقة — شهادات شركائنا في قطر",
      testimonialsSubtitle: "استمع إلى شهادات المدراء التنفيذيين وقادة التحول الرقمي المطورين لأعمالهم اعتماداً على أنظمة أنسوري الذكية.",
      testimonialsList: [
        {
          quote: "لقد غيّرت أنظمة أنسوري فكرتنا تماماً عن التوظيف العقاري. بدلاً من توظيف وسطاء لتصفح البوابات ونسخ الردود، ندع أنظمة أنسوري تؤهل المشتري أولاً خلال ٦٠ ثانية. وكلاؤنا الآن يبرمون صفقات فعلية بدلاً من محاربة تأخر الردود.",
          author: "يوسف الكواري",
          role: "المدير العام",
          company: "عقارات لوسيل العقارية المتميزة"
        },
        {
          quote: "منذ إطلاق النظام على حملاتنا في الخليج الغربي، كانت سرعة الاستجابة ثنائية اللغة لا تصدق. يتلقى العملاء رداً دقيقاً ومحترماً بالإنجليزية أو العربية الفصحى المناسبة بالألقاب الرسمية قبل أن يتمكن فريقنا المكتبي حتى من فتح البريد الوارد.",
          author: "فاطمة آل ثاني",
          role: "رئيسة علاقات العملاء",
          company: "مجموعة الدوحة لخطوط الأفق"
        },
        {
          quote: "الاستضافة السحابية المحلية السيادية كانت شرطاً لا غنى عنه لأصول مجموعتنا الاستثمارية. يعمل نظام أنسوري بالكامل على خوادم محلية آمنة في الدوحة، مقدماً سرعة ممتازة وممتثلاً لقوانين حماية البيانات والخصوصية القطرية.",
          author: "عبد الرحمن الحمادي",
          role: "نائب رئيس قطاع تطوير المؤسسات",
          company: "قطر السيادية القابضة"
        }
      ]
    }
  }[language];

  // Form State
  const [fullName, setFullName] = useState('Khalid Al-Thani');
  const [email, setEmail] = useState('k.althani@enterprise.qa');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState(isRtl ? 'عقارات قطر القابضة' : 'Entity Name');
  const [projectScale, setProjectScale] = useState(isRtl ? 'إدارة المحافظ العقارية المتكاملة' : 'Portfolio Management');
  const [requirements, setRequirements] = useState('');
  
  // Interaction State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secureHash, setSecureHash] = useState('');

  // Form Submission Simulator
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);

    // Capture and submit to Google Forms in the background
    const savedMapping = localStorage.getItem('ansury_case_studies_gform_mapping');
    let mapping = {
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSew67BxqImdq0wkcA_ReKrcufzqtUy0CGgBKxRdpaEnapeVcg/formResponse',
      firmNameField: 'entry.878293089',
      contactPersonField: 'entry.486856360',
      emailField: 'entry.1855917600',
      phoneField: 'entry.1741765249',
      focusAreaField: 'entry.1305289832',
      volumeField: '',
      portalsField: 'entry.626789171'
    };

    if (savedMapping) {
      try {
        const parsed = JSON.parse(savedMapping);
        if (parsed) {
          mapping = { ...mapping, ...parsed };
        }
      } catch (err) {
        console.error('Error parsing loaded case study mapping:', err);
      }
    }

    if (mapping.formUrl) {
      try {
        let targetUrl = mapping.formUrl.trim();
        if (targetUrl.includes('/viewform')) {
          targetUrl = targetUrl.replace('/viewform', '/formResponse');
        }
        if (!targetUrl.includes('/formResponse') && targetUrl.includes('docs.google.com/forms/d/e/')) {
          const parts = targetUrl.split('?')[0];
          targetUrl = parts + (parts.endsWith('/') ? 'formResponse' : '/formResponse');
        }
        if (targetUrl.includes('?')) {
          targetUrl = targetUrl.split('?')[0];
        }

        const body = new URLSearchParams();
        if (mapping.firmNameField) body.append(mapping.firmNameField, organization || 'Case Study Org');
        if (mapping.contactPersonField) body.append(mapping.contactPersonField, fullName);
        if (mapping.emailField) body.append(mapping.emailField, email);
        if (mapping.phoneField) body.append(mapping.phoneField, phone || '');
        if (mapping.focusAreaField) body.append(mapping.focusAreaField, projectScale || 'Consulting');
        if (mapping.volumeField) body.append(mapping.volumeField, '1');
        if (mapping.portalsField) body.append(mapping.portalsField, requirements || 'Consultation Request');

        await fetch(targetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body.toString()
        });
        
        console.log('Automated case study lead captured and background-submitted to Google Form.');
      } catch (err) {
        console.error('Failed to auto-dispatch case studies lead:', err);
      }
    }
    
    // Simulate real-time cryptographic sovereign ledger registration
    setTimeout(() => {
      const generatedHash = Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('').toUpperCase();
      
      setSecureHash(`ANSURY-DOHA-SYS-${generatedHash}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1400);
  };

  const handleReset = () => {
    setRequirements('');
    setIsSubmitted(false);
  };

  return (
    <div className="py-24 bg-[#111827] relative overflow-hidden min-h-[920px]">
      
      {/* Node Network Background Animation */}
      <NodeNetwork />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Content Column: Value Proposition & Stats */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Header / Brand Assertion */}
            <div className={`space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="font-eyebrow text-xs text-[#06B6D4] uppercase tracking-[0.2em] font-bold block">
                {csCopy.eyebrow}
              </span>
              <h1 className="font-sora text-3xl md:text-[50px] font-bold text-white leading-[1.1] tracking-tight">
                {language === 'ar' ? (
                  <>
                    أتمتة صناعية عقارية <br/>
                    <span className="text-[#06B6D4]">فائقة الدقة والتمكين</span>
                  </>
                ) : (
                  <>
                    Precision Industrial <br/>
                    <span className="text-[#06B6D4]">Automation</span>
                  </>
                )}
              </h1>
              <p className="font-sans text-[#D1D5DB] text-base md:text-lg leading-relaxed max-w-lg">
                {csCopy.subtitle}
              </p>
            </div>

            {/* Micro-Dashboard / Statistics of Case Study Success */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              
              {/* Stat 1 */}
              <div className={`bg-[#20283B] p-8 rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.35)] ${isRtl ? 'border-r-2' : 'border-l-2'} border-[#06B6D4] relative hover:translate-y-[-2px] transition-transform duration-300`}>
                <div className="font-sora text-4xl font-bold text-[#06B6D4] tracking-tight mb-2">
                  {isRtl ? '٩٩.٨٪' : '99.8%'}
                </div>
                <div className="text-[#D1D5DB] font-mono text-[11px] uppercase tracking-wider font-semibold">
                  {csCopy.upTime}
                </div>
              </div>

              {/* Stat 2 */}
              <div className={`bg-[#20283B] p-8 rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.35)] ${isRtl ? 'border-r-2' : 'border-l-2'} border-[#06B6D4] relative hover:translate-y-[-2px] transition-transform duration-300`}>
                <div className="font-sora text-4xl font-bold text-[#06B6D4] tracking-tight mb-2">
                  {isRtl ? '٤٠٪' : '40%'}
                </div>
                <div className="text-[#D1D5DB] font-mono text-[11px] uppercase tracking-wider font-semibold">
                  {csCopy.effGain}
                </div>
              </div>

            </div>

            {/* Industrial Integration Bullet Details */}
            <div className="space-y-8 pt-4">
              
              {/* Bullet Item 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-[#06B6D4] rounded-full flex items-center justify-center shadow-lg shadow-[#06B6D4]/10">
                  <ShieldCheck className="w-6 h-6 text-[#111827] stroke-[2.2]" />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h4 className="font-sora text-lg font-bold text-white mb-1">
                    {csCopy.dohaInt}
                  </h4>
                  <p className="font-sans text-xs text-[#8B95A7] leading-relaxed">
                    {csCopy.dohaIntDesc}
                  </p>
                </div>
              </div>

              {/* Bullet Item 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-[#06B6D4] rounded-full flex items-center justify-center shadow-lg shadow-[#06B6D4]/10">
                  <Cpu className="w-6 h-6 text-[#111827] stroke-[2.2]" />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h4 className="font-sora text-lg font-bold text-white mb-1">
                    {csCopy.bespoke}
                  </h4>
                  <p className="font-sans text-xs text-[#8B95A7] leading-relaxed">
                    {csCopy.bespokeDesc}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Content Column: Secure High-Conversion Interactive Form Box & Map */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="bg-[#1A2333] p-8 md:p-12 rounded-xl shadow-2xl relative overflow-hidden border border-[#2A3650]/40 min-h-[580px] flex flex-col justify-between">
              
              {/* Decorative Subtle Background Stamp */}
              <div className="absolute top-0 right-0 p-6 opacity-[0.02] pointer-events-none">
                <Globe className="w-[180px] h-[180px] text-[#06B6D4]" />
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="consultation-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8 flex-1 flex flex-col justify-between"
                  >
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <h2 className="font-sora text-2xl font-bold text-white mb-2">
                        {csCopy.formTitle}
                      </h2>
                      <p className="text-xs text-[#8B95A7] leading-relaxed">
                        {csCopy.formSubtitle}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      
                      {/* Name */}
                      <div className="space-y-1.5 flex flex-col items-stretch">
                        <label className={`font-mono text-[10px] font-bold text-[#8B95A7] uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                          {csCopy.fullName}
                        </label>
                        <input 
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={`w-full bg-[#111827] border-b border-[#2A3650] text-[#dfe3e9] text-xs px-4 py-3 outline-none focus:border-[#06B6D4] focus:bg-[#111827]/80 rounded transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                          placeholder="Khalid Al-Thani"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5 flex flex-col items-stretch">
                        <label className={`font-mono text-[10px] font-bold text-[#8B95A7] uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                          {csCopy.corpEmail}
                        </label>
                        <input 
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full bg-[#111827] border-b border-[#2A3650] text-[#dfe3e9] text-xs px-4 py-3 outline-none focus:border-[#06B6D4] focus:bg-[#111827]/80 rounded transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                          placeholder="k.althani@enterprise.qa"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5 flex flex-col items-stretch">
                        <label className={`font-mono text-[10px] font-bold text-[#8B95A7] uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                          {csCopy.phone}
                        </label>
                        <input 
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full bg-[#111827] border-b border-[#2A3650] text-[#dfe3e9] text-xs px-4 py-3 outline-none focus:border-[#06B6D4] focus:bg-[#111827]/80 rounded transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                          placeholder={csCopy.phonePlaceholder}
                        />
                      </div>

                      {/* Organization */}
                      <div className="space-y-1.5 flex flex-col items-stretch">
                        <label className={`font-mono text-[10px] font-bold text-[#8B95A7] uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                          {csCopy.org}
                        </label>
                        <input 
                          type="text"
                          required
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          className={`w-full bg-[#111827] border-b border-[#2A3650] text-[#dfe3e9] text-xs px-4 py-3 outline-none focus:border-[#06B6D4] focus:bg-[#111827]/80 rounded transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                          placeholder={csCopy.orgPlaceholder}
                        />
                      </div>

                      {/* Project Scale dropdown selection */}
                      <div className="space-y-1.5 flex flex-col items-stretch">
                        <label className={`font-mono text-[10px] font-bold text-[#8B95A7] uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                          {csCopy.projScale}
                        </label>
                        <div className="relative">
                          <select 
                            value={projectScale}
                            onChange={(e) => setProjectScale(e.target.value)}
                            className={`w-full bg-[#111827] border-b border-[#2A3650] text-[#dfe3e9] text-xs px-4 py-3 pb-3.5 outline-none focus:border-[#06B6D4] focus:bg-[#111827]/80 rounded appearance-none cursor-pointer transition-all ${isRtl ? 'pl-8 pr-4 text-right' : 'pr-8 pl-4 text-left'}`}
                          >
                            {csCopy.scales.map(s => (
                              <option value={s} key={s}>{s}</option>
                            ))}
                          </select>
                          <div className={`absolute inset-y-0 ${isRtl ? 'left-3' : 'right-3'} flex items-center pointer-events-none text-[#8B95A7]`}>
                            <span className="text-[10px]">▼</span>
                          </div>
                        </div>
                      </div>

                      {/* Operational Guidelines Requirements */}
                      <div className="md:col-span-2 space-y-1.5 flex flex-col items-stretch">
                        <label className={`font-mono text-[10px] font-bold text-[#8B95A7] uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                          {csCopy.opReq}
                        </label>
                        <textarea 
                          rows={4}
                          value={requirements}
                          onChange={(e) => setRequirements(e.target.value)}
                          className={`w-full bg-[#111827] border-b border-[#2A3650] text-[#dfe3e9] text-xs px-4 py-3 outline-none focus:border-[#06B6D4] focus:bg-[#111827]/80 rounded transition-all resize-none ${isRtl ? 'text-right' : 'text-left'}`}
                          placeholder={csCopy.opReqPlaceholder}
                        />
                      </div>

                      {/* Submit action */}
                      <div className="md:col-span-2 pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/95 text-[#111827] font-bold py-5 rounded-full text-sm shadow-[0_0_20px_rgba(6,182,212,0.30)] hover:shadow-[0_0_30px_rgba(6,182,212,0.50)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4.5 h-4.5 animate-spin" />
                              <span>{csCopy.submittingBtn}</span>
                            </>
                          ) : (
                            <>
                              <span>{csCopy.submitBtn}</span>
                              <ArrowRight className={`w-4 h-4 stroke-[2.5] ${isRtl ? 'rotate-180' : ''}`} />
                            </>
                          )}
                        </button>
                        
                        <p className="text-center font-mono text-[9px] text-[#8B95A7] uppercase tracking-widest mt-4">
                          {csCopy.secureLeg}
                        </p>
                      </div>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-receipt"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="py-6 flex flex-col justify-between h-full flex-1 gap-6"
                  >
                    
                    {/* Visual Stamp */}
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-[#06B6D4]/15 rounded-full flex items-center justify-center mx-auto border border-[#06B6D4]/35">
                        <CheckCircle2 className="w-9 h-9 text-[#06B6D4]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold font-sora text-white">
                          {csCopy.successTitle}
                        </h3>
                        <p className="text-xs text-[#06B6D4] font-mono tracking-wider font-semibold uppercase">
                          {csCopy.successSubtitle}
                        </p>
                      </div>
                    </div>

                    {/* Receipt Details Box */}
                    <div className="bg-[#111827] rounded-xl p-6 border border-[#2A3650] font-mono space-y-4 text-[11px] leading-relaxed">
                      
                      <div className="flex justify-between pb-3 border-b border-[#2A3650]/40">
                        <span className="text-[#8B95A7] uppercase">{csCopy.sovereignKey}</span>
                        <span className="text-white font-bold select-all">{secureHash}</span>
                      </div>

                      <div className="divide-y divide-[#2A3650]/30 text-xs">
                        <div className="py-2.5 flex justify-between gap-2">
                          <span className="text-[#8B95A7]">{csCopy.requester}</span>
                          <span className="text-white text-right">{fullName}</span>
                        </div>
                        <div className="py-2.5 flex justify-between gap-2">
                          <span className="text-[#8B95A7]">{csCopy.entNode}</span>
                          <span className="text-white text-right">{organization}</span>
                        </div>
                        <div className="py-2.5 flex justify-between gap-2">
                          <span className="text-[#8B95A7]">{csCopy.regRoute}</span>
                          <span className="text-[#06B6D4] font-bold text-right">{csCopy.regRouteVal}</span>
                        </div>
                        <div className="py-2.5 flex justify-between gap-2">
                          <span className="text-[#8B95A7]">{csCopy.targetPriority}</span>
                          <span className="text-white text-right">{projectScale}</span>
                        </div>
                      </div>

                    </div>

                    <p className="text-xs text-[#8B95A7] leading-relaxed text-center max-w-md mx-auto">
                      {csCopy.successMsg}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="w-full bg-[#20283B] hover:bg-[#20283B]/80 text-[#D1D5DB] border border-[#2A3650] text-xs font-bold py-2.5 px-6 rounded-full transition-all focus:outline-none cursor-pointer"
                      >
                        {csCopy.resetBtn}
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Lusail City Dark Neon Map Section */}
            <div className="rounded-xl overflow-hidden grayscale contrast-[1.12] brightness-[0.82] hover:grayscale-0 transition-all duration-700 shadow-2xl border border-[#2A3650]/30 relative group">
              <div 
                className="h-44 w-full bg-cover bg-center flex items-center justify-center scale-100 group-hover:scale-[1.01] transition-transform duration-500 animate-fade-in" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoBJAwP73dBLFaE7D3GnECNkQwg8F9ePPJ8O4OvQGscEosDsNHnCV92qy3ezk8pTB_lE4HrI_ttznxxY223JOGXHK2uVWcL5nMLeWq36Vu3vhetHMzF3H1jwoFTKHDbPElTRuo_InteXgxkzCpsFp_ARlW29tpVrXVcz0fjGjoXLFmOYgZhkKJRfGbtMTPHaNCgGKqjDMRlA4nmN-R2JZA13jXNtkIbCU5imz9GkhNyLkuHVma3irw6TGDevEN2MxtR4bf4-SmrEA')` }}
                referrerPolicy="no-referrer"
              >
                {/* Visual Gradient Fade over map edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-[#111827]/30"></div>

                {/* Overlaid Black Badge with Blue Border */}
                <div className="bg-[#111827]/95 px-6 py-4.5 border border-[#06B6D4]/30 rounded-lg text-center backdrop-blur-sm z-10 shadow-2xl relative min-w-[240px]">
                  <p className="font-mono text-[10px] text-[#06B6D4] font-bold tracking-widest uppercase mb-1">
                    {csCopy.hqBadge}
                  </p>
                  <p className="font-sora text-sm text-white font-bold">
                    {csCopy.hqAddress}
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Testimonials (Operator Quotes) Section */}
        <div className="mt-28 pt-20 border-t border-[#2A3650]/40">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#06B6D4] font-bold uppercase tracking-widest block mb-3">
              {isRtl ? "شهادات الشركاء المعتمدين" : "SOCIAL PROOF & AUTHORITY"}
            </span>
            <h2 className="font-sora text-3xl font-bold text-white mb-4">
              {csCopy.testimonialsTitle}
            </h2>
            <p className="font-sans text-[#8B95A7] text-sm leading-relaxed">
              {csCopy.testimonialsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {csCopy.testimonialsList.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-[#1A2333] rounded-2xl p-8 border border-[#2A3650]/40 flex flex-col justify-between shadow-xl relative hover:translate-y-[-4px] transition-all duration-300 group overflow-hidden animate-fade-in"
              >
                {/* Visual quote accent icon */}
                <div className="absolute top-4 right-4 text-[#06B6D4]/5 group-hover:text-[#06B6D4]/10 transition-colors pointer-events-none">
                  <Quote className="w-16 h-16 transform scale-x-[-1]" />
                </div>

                <div className="relative z-10">
                  {/* Rating Stars mock */}
                  <div className={`flex gap-1 mb-6 ${isRtl ? 'justify-start' : 'justify-start'}`}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#06B6D4] text-xs">★</span>
                    ))}
                  </div>

                  <p className="text-xs text-[#dfe3e9] leading-relaxed italic mb-8 relative">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 relative z-10 border-t border-[#2A3650]/35 pt-5">
                  <div className="w-10 h-10 rounded-full bg-[#20283B] border border-[#06B6D4]/30 flex items-center justify-center shrink-0">
                    <span className="text-[#06B6D4] font-bold text-xs">
                      {t.author.charAt(0)}
                    </span>
                  </div>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h4 className="text-xs font-bold text-white font-sora block">
                      {t.author}
                    </h4>
                    <p className="text-[10px] text-[#8B95A7] font-sans leading-relaxed">
                      {t.role}, <strong className="text-[#06B6D4] font-semibold">{t.company}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Detailed Deployments (Case Studies Section) */}
        <div className="mt-28 pt-20 border-t border-[#2A3650]/40">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-[10px] text-[#06B6D4] font-bold uppercase tracking-widest block mb-3">
              {isRtl ? "مستندات كفاءة النظام والتحول" : "RETROSPECTIVE LEDGER"}
            </span>
            <h2 className="font-sora text-3xl font-bold text-white mb-4">
              {csCopy.deploymentsTitle}
            </h2>
            <p className="font-sans text-[#8B95A7] text-sm leading-relaxed">
              {csCopy.deploymentsSubtitle}
            </p>
          </div>

          <div className="space-y-12">
            {csCopy.caseStudiesList.map((cs, idx) => (
              <div 
                key={idx}
                className="bg-[#1A2333] rounded-2xl border border-[#2A3650]/30 hover:border-[#2A3650]/80 transition-all duration-300 overflow-hidden shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Meta Column */}
                  <div className={`p-8 lg:p-10 lg:col-span-4 bg-[#20283B] flex flex-col justify-between border-[#2A3650]/50 ${isRtl ? 'lg:border-l' : 'lg:border-r'}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                        <span className="font-mono text-[10px] text-[#8B95A7] font-semibold tracking-wider uppercase">
                          {cs.area}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                        <span className="text-xs text-white font-bold max-w-full truncate">
                          {cs.client}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-[#06B6D4] font-mono uppercase bg-[#06B6D4]/5 border border-[#06B6D4]/15 px-3 py-1.5 rounded-md inline-block mt-3">
                        {cs.stats}
                      </h4>
                    </div>

                    {/* Miniature Grid inside case details */}
                    <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#2A3650]/30">
                      <div>
                        <span className="block text-xl font-bold font-sora text-[#06B6D4] mb-0.5">
                          {cs.m1Val}
                        </span>
                        <span className="block text-[9px] text-[#8B95A7] font-mono leading-none lowercase">
                          {cs.m1Lbl}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xl font-bold font-sora text-[#06B6D4] mb-0.5">
                          {cs.m2Val}
                        </span>
                        <span className="block text-[9px] text-[#8B95A7] font-mono leading-none lowercase">
                          {cs.m2Lbl}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Core Story Column */}
                  <div className="p-8 lg:p-10 lg:col-span-8 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-[#06B6D4] font-bold uppercase tracking-widest block mb-2">
                        {isRtl ? `الحالة رقم ٠${idx + 1} — دراسة أداء معتمدة` : `CASE DEPLOYMENT 0${idx + 1} — CERTIFIED PERFORMANCE`}
                      </span>
                      <h3 className="font-sora text-lg md:text-xl font-bold text-white mb-4 leading-snug">
                        {cs.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#8B95A7] leading-relaxed mb-6">
                        {cs.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#06B6D4] font-mono font-bold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{isRtl ? "نظام موثق وقائم بالخدمة بنجاح" : "System verified & actively routing"}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
