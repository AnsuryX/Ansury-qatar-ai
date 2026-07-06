import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function WhatsAppButton() {
  const { language, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');

  // Pre-filled target WhatsApp details
  const whatsappNumber = '+97455001760'; // Doha, Qatar demonstration/real operator pipeline
  
  const defaultMessageEn = "Marhaban, I am interested in deploying Ansury AI for our real estate portfolio in Doha. Please share the integration requirements.";
  const defaultMessageAr = "مرحباً، أود الاستفسار عن تفعيل أنظمة أنسوري للذكاء الاصطناعي لمحفظتنا العقارية في الدوحة. يرجى تزويدنا بمتطلبات الدمج.";

  const handleOpenChat = (msgText: string) => {
    const finalMsg = encodeURIComponent(msgText || (language === 'en' ? defaultMessageEn : defaultMessageAr));
    window.open(`https://wa.me/${whatsappNumber}?text=${finalMsg}`, '_blank');
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    handleOpenChat(typedMessage);
    setTypedMessage('');
    setIsOpen(false);
  };

  return (
    <div id="whatsapp-persistent-container" className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      
      {/* Quick Interactive Tooltip Popover */}
      {isOpen && (
        <div 
          className="mb-3 w-80 max-w-[calc(100vw-2rem)] bg-[#111827] border border-[#25D366]/40 rounded-2xl p-5 shadow-2xl animate-fade-in text-white"
          style={{ boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5), 0 0 15px 1px rgba(37,211,102,0.15)' }}
        >
          {/* Popover Header */}
          <div className="flex items-center justify-between border-b border-[#2A3650]/55 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></div>
              <div>
                <h4 className="text-xs font-bold font-sora text-white">
                  {language === 'en' ? 'Ansury AI Direct Line' : 'الخط المباشر لأنسوري'}
                </h4>
                <p className="text-[10px] text-[#8B95A7] font-sans text-left">
                  {language === 'en' ? 'Doha HQ — Response < 2m' : 'مقر الدوحة — استجابة فورية'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#8B95A7] hover:text-white hover:bg-[#20283B] transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick actions/templates */}
          <div className="space-y-2 mb-4">
            <p className="text-[10px] font-mono text-[#8B95A7] uppercase tracking-wider block mb-1 text-left">
              {language === 'en' ? 'Select Quick Consultation Template:' : 'اختر نموذج استشارة سريع:'}
            </p>
            
            <button
              onClick={() => {
                handleOpenChat(language === 'en' ? 'Hi Ansury, we would like a live demo for our brokerage firm in Lusail.' : 'مرحباً أنسوري، نود الحصول على عرض توضيحي مباشر لشركتنا العقارية في لوسيل.');
                setIsOpen(false);
              }}
              className="w-full text-left bg-[#1A2333] hover:bg-[#20293D] border border-[#2A3650]/40 rounded-lg p-2.5 text-[11px] text-[#D1D5DB] hover:text-white transition-all duration-200 flex items-center justify-between group"
            >
              <span className="truncate pr-2 text-left">
                {language === 'en' ? 'Request live Lusail brokerage demo' : 'طلب عرض توضيحي لعقارات لوسيل'}
              </span>
              <Sparkles className="w-3 h-3 text-[#25D366] shrink-0" />
            </button>

            <button
              onClick={() => {
                handleOpenChat(language === 'en' ? 'Can we receive technical API documentation for Property Finder Qatar sync?' : 'هل يمكننا الحصول على وثائق واجهة البرمجة (API) للربط مع بروبرتي فايندر قطر؟');
                setIsOpen(false);
              }}
              className="w-full text-left bg-[#1A2333] hover:bg-[#20293D] border border-[#2A3650]/40 rounded-lg p-2.5 text-[11px] text-[#D1D5DB] hover:text-white transition-all duration-200 flex items-center justify-between group"
            >
              <span className="truncate pr-2 text-left">
                {language === 'en' ? 'Request Property Finder API details' : 'طلب تفاصيل ربط بروبرتي فايندر'}
              </span>
              <Sparkles className="w-3 h-3 text-[#25D366] shrink-0" />
            </button>
          </div>

          {/* Custom Message input */}
          <form onSubmit={handleSubmitCustom} className="flex gap-2">
            <input 
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder={language === 'en' ? 'Type your message...' : 'اكتب استفسارك هنا...'}
              className="bg-[#1A2333] border border-[#2A3650]/50 rounded-xl px-3 py-2 text-xs w-full text-white placeholder-[#525E73] focus:outline-none focus:border-[#25D366] transition-colors"
            />
            <button 
              type="submit"
              className="bg-[#25D366] text-[#111827] rounded-xl p-2 flex items-center justify-center hover:bg-[#20ba59] active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="flex items-center gap-3 flex-row-reverse">
        {/* Sleek CTA pill showing only on desktop */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-[#111827] border border-[#25D366]/30 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md pointer-events-none select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-wider text-white font-semibold">
              {language === 'en' ? 'WHATSAPP ACTIVE:' : 'الواتساب نشط:'}
            </span>
            <span className="text-[10px] font-sans text-[#8B95A7]">
              {language === 'en' ? 'Ask a regional expert' : 'تحدث مع خبير إقليمي'}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contact via WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] text-[#111827] hover:bg-[#20ba59] active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg relative cursor-pointer group"
          style={{ boxShadow: '0 8px 24px -4px rgba(37,211,102,0.45)' }}
        >
          {/* Animated glow rings */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none"></span>
          
          <MessageCircle className="w-7 h-7 text-[#111827] transform transition-transform group-hover:scale-110 duration-300" />
        </button>
      </div>

    </div>
  );
}
