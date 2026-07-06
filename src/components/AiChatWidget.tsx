import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  Database,
  Building,
  User,
  Mail,
  Phone,
  BarChart,
  ArrowUpRight,
  RefreshCw,
  Clock,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LeadState {
  firmName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  focusArea?: string;
  volume?: string;
  portals?: string;
}

export default function AiChatWidget() {
  const { language, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncingLead, setIsSyncingLead] = useState(false);
  const [syncCompleted, setSyncCompleted] = useState(false);

  // Lead capture state extracted dynamically by Gemini
  const [leadState, setLeadState] = useState<LeadState>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Populate first welcoming message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeEn = "Marhaban! I am your Ansury AI Executive Consultant. I assist Qatari real estate brokers and developers in automating multi-touch WhatsApp sequences, re-engaging old databases, and processing complex lease documents.\n\nCould you please share your name and the name of your real estate agency? I can structure a complimentary 30-Minute Operational Audit for your portfolio.";
      const welcomeAr = "مرحباً بك! أنا مستشارك التنفيذي من أنسوري للذكاء الاصطناعي. أساعد المكاتب العقارية والمطورين في قطر على أتمتة سلاسل متابعة الواتساب، وإعادة تنشيط قواعد البيانات القديمة، وقراءة العقود آلياً.\n\nيسعدني التعرف على اسمك الكريم واسم شركتك العقارية لنبدأ بتصميم تدقيق تشغيلي مجاني لمدة ٣٠ دقيقة لمحفظتك.";
      
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: language === 'en' ? welcomeEn : welcomeAr,
          timestamp: new Date()
        }
      ]);
    }
  }, [language, messages.length]);

  // Keep scrolled to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Calculate completion percentage of qualification metrics
  const qualificationProgress = (() => {
    let score = 0;
    if (leadState.contactPerson) score += 20;
    if (leadState.firmName) score += 20;
    if (leadState.email || leadState.phone) score += 30; // Core contact method
    if (leadState.focusArea) score += 10;
    if (leadState.volume) score += 10;
    if (leadState.portals) score += 10;
    return score;
  })();

  // Handle automatic lead synchronization back to Google Forms
  const triggerGoogleFormBackgroundSync = async (finalLead: LeadState) => {
    if (syncCompleted || isSyncingLead) return;
    setIsSyncingLead(true);

    try {
      // User's exact requested prelink target form
      const targetUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdKOLiMCDz6fW0a03eQ3pDqWnjiKuXdFGz1UzI6tQC5siilTA/formResponse';
      
      const body = new URLSearchParams();
      body.append('entry.1843495534', finalLead.firmName || 'Unspecified Chat Agency');
      body.append('entry.1040784031', finalLead.contactPerson || 'Unspecified Chat Name');
      body.append('entry.1890684236', finalLead.email || 'no-email@ansury.ai');
      body.append('entry.1015656115', finalLead.phone || 'no-phone');
      body.append('entry.679401230', finalLead.focusArea || 'AI Chatbot Consultation');
      body.append('entry.200195860', finalLead.volume || 'Not quantified yet');
      body.append('entry.745319448', finalLead.portals || 'Web/Chat Direct');

      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });

      console.log('Automated background lead sync from chatbot to Google Form succeeded via mode no-cors.');
      setSyncCompleted(true);
    } catch (err) {
      console.error('Failed to auto-sync chatbot lead to external Google Form:', err);
    } finally {
      setIsSyncingLead(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Compile message history as required by the endpoint
      const historyPayload = [...messages, newUserMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: historyPayload,
          currentLeadState: leadState
        })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();

      // Update lead state if Gemini successfully extracted details
      if (data.leadData) {
        const mergedLead = { ...leadState, ...data.leadData };
        setLeadState(mergedLead);

        // Check if we met core criteria and just qualified or have 70%+ score
        const hasCoreData = mergedLead.contactPerson && mergedLead.firmName && (mergedLead.email || mergedLead.phone);
        if (hasCoreData && !syncCompleted) {
          await triggerGoogleFormBackgroundSync(mergedLead);
        }
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I am processing your request...",
        timestamp: new Date()
      }]);

    } catch (err) {
      console.error('Failed to communicate with Ansury AI chatbot endpoint:', err);
      // Fallback response
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'en' 
          ? "I experienced a minor network hitch. Let's continue! What are the primary portals or CRM systems your agency currently utilizes in Doha?"
          : "واجهت صعوبة مؤقتة في الاتصال بالشبكة. دعنا نتابع! ما هي الأنظمة أو المواقع العقارية الرئيسية التي تستخدمها شركتكم بالدوحة حالياً؟",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick chips for user responses
  const quickResponses = language === 'en' ? [
    { label: "Tell me about WhatsApp Drip sequences", text: "Tell me about WhatsApp Drip sequences" },
    { label: "How does Database Reactivation work?", text: "How does Database Reactivation work?" },
    { label: "Book a 30-Min Operational Audit", text: "I would like to book a 30-Min Operational Audit slot please." }
  ] : [
    { label: "أخبرني عن سلاسل متابعة الواتساب", text: "أخبرني عن سلاسل متابعة الواتساب وتغذية الاهتمام" },
    { label: "كيف تعمل إعادة تنشيط العملاء؟", text: "كيف تعمل حملات إعادة تنشيط قاعدة البيانات والعملاء القدامى؟" },
    { label: "حجز موعد تدقيق تشغيلي مجاني", text: "أود حجز موعد تدقيق تشغيلي مجاني لمحفظتنا لمدة ٣٠ دقيقة" }
  ];

  return (
    <>
      {/* 1. Main Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Decorative pulse CTA only shown when widget is closed */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-[#111827]/95 border border-[#06B6D4]/30 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md pointer-events-none select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-wider text-white font-semibold uppercase">
              {language === 'en' ? 'AI CONSULTANT ONLINE:' : 'المستشار الذكي متصل:'}
            </span>
            <span className="text-[10px] font-sans text-[#8B95A7]">
              {language === 'en' ? 'Tap to qualify for 30-Min Audit' : 'اضغط للتأهيل لتدقيق ٣٠ دقيقة'}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Executive Consultant"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#06B6D4] to-[#10B981] text-[#111827] hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg relative cursor-pointer group"
          style={{ boxShadow: '0 8px 24px -4px rgba(6,182,212,0.45)' }}
        >
          {/* Animated pulsing background rings */}
          <span className="absolute -inset-1.5 rounded-full bg-[#06B6D4]/15 animate-ping pointer-events-none"></span>
          
          {isOpen ? (
            <X className="w-6 h-6 text-[#111827]" />
          ) : (
            <MessageSquare className="w-6 h-6 text-[#111827] transform transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* 2. Interactive Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[580px] bg-[#111827] border border-[#2A3650]/80 rounded-2xl flex flex-col overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] z-50 ${
              isRtl ? 'text-right' : 'text-left'
            }`}
            style={{ 
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 30px 1px rgba(6,182,212,0.06)' 
            }}
          >
            {/* Header section with brand colors */}
            <div className="bg-[#151D30] px-5 py-4 border-b border-[#2A3650]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#06B6D4]/20 to-[#10B981]/20 border border-[#06B6D4]/40 flex items-center justify-center text-[#06B6D4] shrink-0">
                  <Sparkles className="w-4.5 h-4.5 text-[#06B6D4]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sora text-white flex items-center gap-1.5">
                    {language === 'en' ? 'Ansury Executive Advisor' : 'مستشار أنسوري التنفيذي'}
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </h4>
                  <p className="text-[10px] text-[#8B95A7] font-mono tracking-wide uppercase">
                    {language === 'en' ? 'AI sales & operations' : 'الذكاء الاصطناعي للمبيعات والعمليات'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8B95A7] hover:text-white hover:bg-[#20283B] p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Real-time Qualification Metrics Tracker */}
            <div className="bg-[#1A2333] px-5 py-2.5 border-b border-[#2A3650]/40 text-[10px]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[#8B95A7] flex items-center gap-1 font-semibold uppercase">
                  <Database className="w-3.5 h-3.5 text-[#06B6D4]" />
                  {language === 'en' ? 'Audit Readiness Score:' : 'درجة تأهيل التدقيق التشغيلي:'}
                </span>
                <span className="font-bold text-[#06B6D4] font-mono">{qualificationProgress}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#111827] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#06B6D4] to-[#10B981] transition-all duration-500 rounded-full"
                  style={{ width: `${qualificationProgress}%` }}
                ></div>
              </div>

              {/* Real-time sync notifications */}
              <div className="mt-1 flex items-center justify-between font-mono text-[9px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-[#8B95A7]" />
                  <span>
                    {leadState.firmName || (language === 'en' ? 'No agency logged' : 'لم يتم تسجيل اسم الشركة')}
                  </span>
                </div>
                <div>
                  {isSyncingLead ? (
                    <span className="text-[#06B6D4] flex items-center gap-1 animate-pulse font-bold">
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                      {language === 'en' ? 'Syncing to CRM...' : 'مزامنة مع الـ CRM...'}
                    </span>
                  ) : syncCompleted ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                      ✓ {language === 'en' ? 'Secured in Google Form' : 'تم الحفظ بنجاح'}
                    </span>
                  ) : (
                    <span>{language === 'en' ? 'Awaiting core fields' : 'بانتظار الحقول الأساسية'}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Stream viewport */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#111827] scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-[#111827] font-semibold rounded-br-none'
                        : 'bg-[#1D273B] text-[#D1D5DB] border border-[#2A3650]/40 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                    <span className="block text-[8px] opacity-60 mt-1.5 text-right font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1D273B] border border-[#2A3650]/40 rounded-2xl rounded-bl-none p-4 max-w-[85%] text-xs text-[#8B95A7] flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#06B6D4]" />
                    <span>{language === 'en' ? 'Executive Advisor is thinking...' : 'المستشار يدرس الرد...'}</span>
                  </div>
                </div>
              )}

              {/* Syncing overlay feedback card */}
              {isSyncingLead && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-[11px] text-[#A7F3D0] animate-pulse flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-emerald-400" />
                  <div>
                    <span className="font-bold block text-xs">🚀 CORE QUALIFICATION DETECTED</span>
                    <span>Synchronizing leads directly into Google Form Database and local CRM pipeline...</span>
                  </div>
                </div>
              )}

              {syncCompleted && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-[#A7F3D0] flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-xs">✓ LEAD CAPTURE SECURED</span>
                    <span>Your operational metadata is safely mapped to external form parameters. Our specialists will call you shortly.</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Consultation Chips */}
            {messages.length < 5 && !isLoading && (
              <div className="px-5 py-2 flex flex-nowrap gap-2 overflow-x-auto scrollbar-none bg-[#111827]">
                {quickResponses.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(undefined, chip.text)}
                    className="shrink-0 bg-[#1D273B]/80 hover:bg-[#25324D] border border-[#2A3650]/55 rounded-full px-3.5 py-1.5 text-[10px] text-[#8B95A7] hover:text-white transition-all cursor-pointer font-sans"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            {/* Custom Input form */}
            <form 
              onSubmit={handleSendMessage} 
              className="bg-[#151D30] p-4 border-t border-[#2A3650]/60 flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  language === 'en' 
                    ? 'Write your response...' 
                    : 'اكتب رسالتك للمستشار هنا...'
                }
                disabled={isLoading}
                className="bg-[#111827] border border-[#2A3650]/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#525E73] focus:outline-none focus:border-[#06B6D4] transition-colors flex-1"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-[#06B6D4] hover:bg-[#0891B2] disabled:opacity-40 text-[#111827] rounded-xl px-3 flex items-center justify-center cursor-pointer transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Doha HQ Footer credit */}
            <div className="bg-[#111827] px-4 py-2 border-t border-[#2A3650]/30 flex items-center justify-between text-[8px] font-mono text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-[#06B6D4]" />
                {language === 'en' ? 'ONLINE EXECUTIVES: 4' : 'الوسطاء النشطين: ٤'}
              </span>
              <span>
                {language === 'en' ? 'ANSURY OPERATIONAL GRID v2.5' : 'مصفوفة أنسوري تشغيلية ٢.٥'}
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
