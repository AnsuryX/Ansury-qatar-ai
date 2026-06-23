import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator, ArrowRight, ShieldCheck, HelpCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const { language, isRtl } = useLanguage();

  const audCopy = {
    en: {
      auditTitle: "Request 30-Minute Audit",
      auditSubtitle: "Get an objective, math-first assessment of your lead response pipeline.",
      firmName: "RE Agency or Developer Name *",
      firmPlaceholder: "e.g. Lusail Premium Properties",
      contactName: "Contact Name",
      contactPlaceholder: "e.g. Yousef Al-Kuwari",
      email: "Business Email *",
      emailPlaceholder: "yousef@developer.qa",
      phone: "Phone Number",
      phonePlaceholder: "e.g. +974 5555 1234",
      region: "Primary Region Focus",
      regions: ["The Pearl-Qatar", "Lusail Marina/City", "West Bay Doha", "Msheireb Downtown"],
      monthlyInquiries: "AVG. Monthly Inbound Leads",
      inboundLeads: "Leads",
      volumeLabel: "AVG. Monthly Inbound Leads",
      portalsLabel: "Integrations Deployed",
      cta: "Book My Free 30-Min System Audit",
      successTitle: "Audit Block Reserved",
      successMsg: "Thank you, {name}. Our Qatari real estate automation specialists at Ansury AI have reserved your 30-minute consultation slot.",
      ledgerTitle: "AUDIT LEDGER DETAILS",
      evVol: "Evaluated Volume:",
      calcCost: "Calculated Manual Cost:",
      projSavings: "Projected Net Savings:",
      paybackTarget: "Projected Payback Target:",
      paybackVal: "3.4 Months",
      closeBtn: "Close Console",
      mathLie: "The Math Doesn't Lie",
      mathLieDesc: "We map your current lead flow, calculate response lag costs, and show you the exact payback period before you commit to anything. No pitch. No pressure. Just the math.",
      manualTriage: "Manual Triage Cost Mapped",
      manualTriageDesc: "Based on manual broker hours spent qualifying",
      targetSavings: "Target Monthly Savings",
      targetSavingsDesc: "Replaces 70% of manual follow-up labor",
      sovereignLabel: "100% Secure cloud housing. Sovereign Doha server.",
      perfTitle: "THE PERFORMANCE AUDIT"
    },
    ar: {
      auditTitle: "طلب تدقيق النظام الفني (30 دقيقة)",
      auditSubtitle: "احصل على تقييم موضوعي مبني على عوائد حسابية دقيقة لتأمين وحوكمة قنوات المبيعات لدورة أعمالك.",
      firmName: "اسم الوكالة أو المطور العقاري *",
      firmPlaceholder: "مثال: عقارات لوسيل الفاخرة",
      contactName: "اسم الشخص المسؤول",
      contactPlaceholder: "مثال: يوسف الكواري",
      email: "البريد الإلكتروني للعمل *",
      emailPlaceholder: "yousef@developer.qa",
      phone: "رقم الجوال أو الهاتف",
      phonePlaceholder: "مثال: 1234 5555 974+",
      region: "المنطقة العقارية الرئيسية للعمل",
      regions: ["اللؤلؤة قطر", "مدينة لوسيل / مارينا", "الخليج الغربي الدوحة", "مشيرب قلب الدوحة"],
      monthlyInquiries: "متوسط العملاء المستهدفين شهرياً",
      inboundLeads: "عميل",
      volumeLabel: "معدل الحجم العقاري المتوقع شهرياً",
      portalsLabel: "بوابات الاستحواذ والانتشار المتاحة",
      cta: "احجز تدقيقاً عقارياً مجانياً فورياً",
      successTitle: "تم حجز وتأكيد موعد التدقيق بنجاح",
      successMsg: "شكراً لك، {name}. لقد قام مستشارو أتمتة العقارات في قطر لدى أنسوري للذكاء الاصطناعي بحجز مقعدك وجدولة دراسة الكفاءة والجدوى المخصصة لمدة 30 دقيقة.",
      ledgerTitle: "تفاصيل السجل المالي والتشغيلي المتوقع",
      evVol: "الحجم الإداري الخاضع للتقييم:",
      calcCost: "الكلفة اليدوية للموارد للتأهيل:",
      projSavings: "صافي التوفير الشهري المؤتمت:",
      paybackTarget: "فترة استرداد التكاليف المكتملة:",
      paybackVal: "3.4 أشهر تقريباً",
      closeBtn: "إغلاق نافذة التحكم",
      mathLie: "الحسابات الرياضية لا تكذب",
      mathLieDesc: "نقوم برصد تدفقات قنواتك بدقة، وحساب خسائر تأخر الاستجابة اليدوية، وتوضيح فترة سداد التكلفة الفعلية قبل بدئك بأي التزام. بدون مبيعات ورقية، بل لغة الأرقام الصرفة.",
      manualTriage: "توزيع التكلفة اليدوية الحالية",
      manualTriageDesc: "معدل الساعات الضائعة للوسطاء في تصنيف وتأهيل العملاء",
      targetSavings: "التوفير المستهدف الشهري الفوري",
      targetSavingsDesc: "يستبدل 70% من جهود الفرز والرد اليدوي للوسطاء",
      sovereignLabel: "تخزين ومعالجة سحابية آمنة 100% داخل حدود دولة قطر.",
      perfTitle: "تفاصيل تدقيق الكفاءة التشغيلية"
    }
  }[language];

  const [formData, setFormData] = useState({
    firmName: '',
    contactPerson: '',
    email: '',
    phone: '',
    focusArea: isRtl ? 'اللؤلؤة قطر' : 'The Pearl-Qatar',
    monthlyInquiries: 150,
    portalsUsed: [] as string[]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ROI Math
  const averageBrokerDelayMinutes = 240; // 4 hours
  const ansuryResponseDelaySeconds = 0.1; // 100ms
  const minutesSavedPerLead = 25; // sorting, filtering, and writing dual bilingual response
  const estimatedHoursSavedMonthly = Math.round((formData.monthlyInquiries * minutesSavedPerLead) / 60);
  const conversionBoostPercent = 14; 

  const togglePortal = (portal: string) => {
    setFormData(prev => {
      const isSelected = prev.portalsUsed.includes(portal);
      return {
        ...prev,
        portalsUsed: isSelected 
          ? prev.portalsUsed.filter(p => p !== portal)
          : [...prev.portalsUsed, portal]
      };
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      monthlyInquiries: parseInt(e.target.value) || 10
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firmName || !formData.email) return;
    setIsSubmitted(true);

    // Capture and submit to Google Forms in the background with a robust default fallback
    const savedMapping = localStorage.getItem('ansury_gform_mapping');
    let mapping = {
      formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdKOLiMCDz6fW0a03eQ3pDqWnjiKuXdFGz1UzI6tQC5siilTA/formResponse',
      firmNameField: 'entry.1843495534',
      contactPersonField: 'entry.1040784031',
      emailField: 'entry.1890684236',
      phoneField: 'entry.1015656115',
      focusAreaField: 'entry.679401230',
      volumeField: 'entry.200195860',
      portalsField: 'entry.745319448'
    };

    if (savedMapping) {
      try {
        const parsed = JSON.parse(savedMapping);
        if (parsed && parsed.formUrl) {
          mapping = { ...mapping, ...parsed };
        }
      } catch (err) {
        console.error('Error parsing loaded gform mapping:', err);
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
        if (mapping.firmNameField) body.append(mapping.firmNameField, formData.firmName);
        if (mapping.contactPersonField) body.append(mapping.contactPersonField, formData.contactPerson || '');
        if (mapping.emailField) body.append(mapping.emailField, formData.email);
        if (mapping.phoneField) body.append(mapping.phoneField, formData.phone || '');
        if (mapping.focusAreaField) body.append(mapping.focusAreaField, formData.focusArea);
        
        // Construct detailed requirements/portals string containing portals & volume
        const portalsStr = formData.portalsUsed.length > 0 ? formData.portalsUsed.join(', ') : 'None';
        const detailStr = `[30-Min Audit Request] Portals: ${portalsStr} | Monthly Volume: ${formData.monthlyInquiries}`;

        if (mapping.volumeField) {
          body.append(mapping.volumeField, String(formData.monthlyInquiries));
          if (mapping.portalsField) {
            body.append(mapping.portalsField, formData.portalsUsed.join(', '));
          }
        } else {
          // If volumeField is empty in the target Google Form, merge both portals & volume into the portalsField
          if (mapping.portalsField) {
            body.append(mapping.portalsField, detailStr);
          }
        }

        await fetch(targetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body.toString()
        });
        
        console.log('Automated background submission completed safely via mode no-cors.');
      } catch (err) {
        console.error('Failed to auto-dispatch lead to external Google Form:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dim */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0f13]/85 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      {/* Main Modal Box */}
      <div 
        dir={isRtl ? 'rtl' : 'ltr'}
        className="bg-[#1A2333] border border-[#2A3650] max-w-[840px] w-full rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-auto max-h-[92vh]"
      >
        
        {/* Left column: Dynamic ROI Calculator & Graphics */}
        <div className={`md:w-[42%] bg-[#111827] p-8 border-b md:border-b-0 ${isRtl ? 'md:border-l' : 'md:border-r'} border-[#2A3650] flex flex-col justify-between`}>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#06B6D4] uppercase tracking-widest mb-2">
              <Calculator className="w-3.5 h-3.5 animate-pulse" />
              <span>{audCopy.perfTitle}</span>
            </div>
            <h3 className="text-xl font-bold font-sora text-white mb-4">
              {audCopy.mathLie}
            </h3>
            <p className="text-[#8B95A7] text-xs leading-relaxed mb-6">
              {audCopy.mathLieDesc}
            </p>

            {/* Graphic ROI Items */}
            <div className="flex flex-col gap-5">
              <div className="bg-[#20283B]/50 p-4 rounded-xl border border-[#2A3650]/60">
                <div className="text-[10px] text-[#8B95A7] font-mono uppercase tracking-wider mb-1">{audCopy.manualTriage}</div>
                <div className="text-3xl font-bold font-sora text-[#06B6D4]">
                  {formData.monthlyInquiries >= 1200 ? '$7,200' : `$${Math.round(formData.monthlyInquiries * 6)}`} / {isRtl ? 'شهرياً' : 'Mo'}
                </div>
                <div className="text-[10px] text-[#8B95A7] italic mt-1">
                  {audCopy.manualTriageDesc}
                </div>
              </div>

              <div className="bg-[#20283B]/50 p-4 rounded-xl border border-[#2A3650]/60">
                <div className="text-[10px] text-[#8B95A7] font-mono uppercase tracking-wider mb-1">{audCopy.targetSavings}</div>
                <div className="text-3xl font-bold font-sora text-[#06B6D4]">
                  {formData.monthlyInquiries >= 1200 ? '$3,540' : `$${Math.round(formData.monthlyInquiries * 2.95)}`} / {isRtl ? 'شهرياً' : 'Mo'}
                </div>
                <div className="text-[10px] text-[#8B95A7] italic mt-1">
                  {audCopy.targetSavingsDesc}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-[#8B95A7] font-mono mt-6 border-t border-[#2A3650]/40 pt-4 flex items-center gap-1.5 italic">
            <ShieldCheck className="w-4 h-4 text-[#06B6D4] shrink-0" />
            <span>{audCopy.sovereignLabel}</span>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="flex-1 p-8 flex flex-col justify-between overflow-y-auto relative">
          {/* Close button */}
          <button 
            onClick={onClose}
            className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} text-[#8B95A7] hover:text-[#06B6D4] transition-colors p-1 cursor-pointer`}
          >
            <X className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 text-xs"
              >
                <div>
                  <h4 className="text-lg font-bold font-sora text-white mb-1">
                    {audCopy.auditTitle}
                  </h4>
                  <p className="text-[#8B95A7] text-xs">
                    {audCopy.auditSubtitle}
                  </p>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">{audCopy.firmName}</label>
                    <input 
                      type="text" 
                      required
                      placeholder={audCopy.firmPlaceholder}
                      value={formData.firmName}
                      onChange={e => setFormData({...formData, firmName: e.target.value})}
                      className={`bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-sans text-xs transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">{audCopy.contactName}</label>
                    <input 
                      type="text" 
                      placeholder={audCopy.contactPlaceholder}
                      value={formData.contactPerson}
                      onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                      className={`bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-sans text-xs transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">{audCopy.email}</label>
                    <input 
                      type="email" 
                      required
                      placeholder={audCopy.emailPlaceholder}
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className={`bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-sans text-xs transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">{audCopy.phone}</label>
                    <input 
                      type="tel" 
                      placeholder={audCopy.phonePlaceholder}
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className={`bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-sans text-xs transition-colors ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">{audCopy.region}</label>
                    <select 
                      value={formData.focusArea}
                      onChange={e => setFormData({...formData, focusArea: e.target.value})}
                      className="w-full bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-sans text-xs transition-colors cursor-pointer"
                    >
                      {audCopy.regions.map(r => (
                        <option value={r} key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Slider: Monthly Inquiries */}
                <div className="flex flex-col gap-2 bg-[#111827] p-4 rounded-xl border border-[#2A3650]">
                  <div className="flex justify-between items-center gap-2">
                    <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">{audCopy.volumeLabel}</label>
                    <span className="text-[#06B6D4] font-bold font-sora text-sm">{formData.monthlyInquiries} {audCopy.inboundLeads}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="10"
                    value={formData.monthlyInquiries}
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-[#20283B] rounded-lg appearance-none cursor-pointer accent-[#06B6D4]"
                  />
                  <div className="flex justify-between text-[10px] text-[#8B95A7] font-mono">
                    <span>10 {audCopy.inboundLeads}</span>
                    <span>500 {audCopy.inboundLeads}</span>
                    <span>1,000 {audCopy.inboundLeads}</span>
                  </div>
                </div>

                {/* Checkbox selector: portals */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">{audCopy.portalsLabel}</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      isRtl ? 'بروبرتي فايندر' : 'Property Finder',
                      isRtl ? 'بيوت قطر' : 'Bayut Qatar',
                      'WhatsApp API'
                    ].map((portal) => (
                      <button
                        type="button"
                        key={portal}
                        onClick={() => togglePortal(portal)}
                        className={`py-2 px-3 rounded-lg border text-center font-bold text-[10px] truncate transition-all cursor-pointer ${
                          formData.portalsUsed.includes(portal)
                            ? 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]'
                            : 'bg-[#111827] text-[#D1D5DB] border-[#2A3650] hover:bg-[#111827]/60'
                        }`}
                      >
                        {portal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit action */}
                <button
                  type="submit"
                  className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#111827] text-xs font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer mt-2"
                >
                  <span>{audCopy.cta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10 px-4"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                
                <h4 className="text-xl font-bold font-sora text-white mb-2">
                  {audCopy.successTitle}
                </h4>
                
                <p className="text-sm text-[#D1D5DB] max-w-md leading-relaxed mb-6 font-sans">
                  {audCopy.successMsg.replace('{name}', formData.contactPerson || formData.firmName)}
                </p>

                {/* Quick breakdown card */}
                <div className="bg-[#111827] rounded-xl p-5 border border-[#2A3650] text-left max-w-md w-full mb-8 flex flex-col gap-3 text-xs">
                  <header className={`border-b border-[#2A3650]/50 pb-2 text-[10px] font-mono text-[#06B6D4] font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
                    {audCopy.ledgerTitle}
                  </header>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[#8B95A7]">{audCopy.evVol}</span>
                    <span className="text-white font-bold">{formData.monthlyInquiries} {audCopy.inboundLeads}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[#8B95A7]">{audCopy.calcCost}</span>
                    <span className="text-white font-bold">{formData.monthlyInquiries >= 1200 ? '$7,200' : `$${Math.round(formData.monthlyInquiries * 6)}`} / {isRtl ? 'شهر' : 'Mo'}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[#8B95A7]">{audCopy.projSavings}</span>
                    <span className="text-emerald-400 font-bold">{formData.monthlyInquiries >= 1200 ? '$3,540' : `$${Math.round(formData.monthlyInquiries * 2.95)}`} / {isRtl ? 'شهر' : 'Mo'}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#2A3650]/45 pt-2 text-[13px] items-center gap-2">
                    <span className="text-white font-semibold">{audCopy.paybackTarget}</span>
                    <span className="text-[#06B6D4] font-bold font-mono">{audCopy.paybackVal}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="bg-[#20283B] hover:bg-[#20283B]/80 text-[#D1D5DB] border border-[#2A3650] text-xs font-bold py-2.5 px-6 rounded-full transition-transform active:scale-95 cursor-pointer"
                >
                  {audCopy.closeBtn}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
