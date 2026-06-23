import { useState } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGetStarted: () => void;
}

export default function Header({ activeTab, setActiveTab, onGetStarted }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t, isRtl } = useLanguage();

  const navItems = [
    { id: 'solutions', label: t('solutions') },
    { id: 'case-studies', label: t('caseStudies') },
    { id: 'intelligence', label: t('intelligence') },
    { id: 'answers', label: t('answers') },
  ];

  return (
    <header className="w-full top-0 sticky z-50 bg-[#111827]/90 backdrop-blur-md shadow-[0_3px_8px_0_rgba(0,0,0,0.25)] border-b border-[#2A3650]/50 transition-all duration-300">
      <nav className="max-w-[1280px] mx-auto flex justify-between items-center px-8 py-5">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('solutions')}
          className="text-2xl font-bold text-[#06B6D4] tracking-tight cursor-pointer font-sora select-none flex items-center gap-2"
        >
          <span>Ansury AI</span>
          <span className="text-[9px] font-mono tracking-widest text-[#8B95A7] border border-[#2A3650] px-1.5 py-0.5 rounded uppercase hidden sm:inline-block">
            {isRtl ? 'ذكاء عقاري' : 'QA·INTEL'}
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`font-sans text-[15px] font-medium transition-all duration-300 relative pb-1 ${
                activeTab === item.id
                  ? 'text-[#06B6D4] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#06B6D4] after:rounded-full'
                  : 'text-[#D1D5DB] hover:text-[#06B6D4]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Controls & Language Selector (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#2A3650] bg-[#1A2333]/80 hover:border-[#06B6D4] text-xs font-semibold text-[#D1D5DB] hover:text-white transition-all cursor-pointer"
            title={language === 'en' ? 'تحويل للعربية' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button
            onClick={onGetStarted}
            className="group bg-[#06B6D4] text-[#111827] font-bold text-sm py-2 px-6 rounded-full scale-95 active:scale-90 hover:bg-[#06B6D4]/90 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>{t('requestAudit')}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center p-2 rounded-full border border-[#2A3650] bg-[#1A2333]/80 text-[#D1D5DB] hover:text-[#06B6D4]"
            title={language === 'en' ? 'تحويل للعربية' : 'Switch to English'}
          >
            <Globe className="w-4 h-4 text-[#06B6D4]" />
          </button>

          <button
            onClick={onGetStarted}
            className="bg-[#06B6D4] text-[#111827] font-bold text-xs py-1.5 px-4 rounded-full active:scale-95 transition-all text-center"
          >
            {isRtl ? 'ابدأ' : 'Get Started'}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#D1D5DB] hover:text-[#06B6D4] p-1.5"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#111827] border-b border-[#2A3650] py-6 px-8 flex flex-col gap-5 shadow-2xl animate-in fade-in-50 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`text-left font-sans text-base font-medium py-1 ${
                activeTab === item.id ? 'text-[#06B6D4]' : 'text-[#D1D5DB]'
              } ${isRtl ? 'text-right' : 'text-left'}`}
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className={`flex items-center gap-2 text-base font-medium py-1 text-[#D1D5DB] hover:text-[#06B6D4] ${isRtl ? 'justify-end' : 'justify-start'}`}
          >
            <Globe className="w-4 h-4 text-[#06B6D4]" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
