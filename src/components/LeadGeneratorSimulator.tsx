import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, CheckCircle, Database, Smartphone, 
  MapPin, DollarSign, Award, ArrowRight, RefreshCw, Send, ShieldCheck
} from 'lucide-react';
import { LeadProfile } from '../types';

// Pre-configured mock templates reflecting high-stakes Qatari market
const MOCK_LEADS: { label: string; details: LeadProfile }[] = [
  {
    label: "GCC Villa Investor (Riyadh)",
    details: {
      id: "LD-8821",
      source: "Property Finder",
      rawMessage: "السلام عليكم انا ابحث عن فيلا للبيع في مشروع اللؤلؤة قطر. خمس غرف نوم مع مسبح خاص واطلالة بحرية كاملة. الميزانية حوالي 15-18 مليون ريال قطري. ارجو التواصل واتساب للضرورة وشكرا",
      parsedName: "Abdulaziz Al-Dosari",
      contact: "+966 50 **** 129",
      isVerified: true,
      intentScore: 94,
      budget: "15,000,000 – 18,000,000 QAR",
      preferredDistrict: "The Pearl-Qatar (La Plage/Viva Bahriya)",
      propertyType: "Villa",
      personaType: "GCC Buyer",
      systemAction: "Passed to HNW Sales Executive. Injected Dual Arabic/English VIP Proposal Draft."
    }
  },
  {
    label: "Corporate Commercial Expat (London)",
    details: {
      id: "LD-4309",
      source: "Bayut",
      rawMessage: "Looking for an entire high-floor office block in Lusail Marina District. We need space for 120 staff, at least 1500 sqm, with district cooling. Standard corporate lease, 3-year term. Capital ready. Budget is up to 350k QAR monthly lease. Urgent.",
      parsedName: "Marcus Sterling (Apex Tech Holdings)",
      contact: "+44 7721 *** 642",
      isVerified: true,
      intentScore: 89,
      budget: "350,000 QAR / Month",
      preferredDistrict: "Lusail (Marina District)",
      propertyType: "Commercial",
      personaType: "Corporate Expat",
      systemAction: "Synced to Salesforce CRM. Triggered Geo-Route to Commercial Property Lead."
    }
  },
  {
    label: "HNW Resident Penthouse (Doha)",
    details: {
      id: "LD-1102",
      source: "Social Funnels",
      rawMessage: "Hi, I saw your ad about luxury penthouses in West Bay. I currently live in Doha and want to upgrade to a duplex overlooking the Corniche. Budget around 8,000,000 QAR. Need high privacy and 24/7 security. Send me brochures over WhatsApp",
      parsedName: "Fatma Al-Thani",
      contact: "+974 555* **44",
      isVerified: true,
      intentScore: 97,
      budget: "8,000,000 QAR",
      preferredDistrict: "West Bay (Corniche Front)",
      propertyType: "Penthouse",
      personaType: "HNW Investor",
      systemAction: "Contact VIP status activated. WhatsApp validation complete. Automated brochure dispatched."
    }
  }
];

export default function LeadGeneratorSimulator() {
  const [selectedLead, setSelectedLead] = useState<LeadProfile>(MOCK_LEADS[0].details);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'idle' | 'capturing' | 'analyzing' | 'verifying' | 'complete'>('idle');
  const [progressVal, setProgressVal] = useState(0);

  const startPipeline = (lead: LeadProfile) => {
    setSelectedLead(lead);
    setIsProcessing(true);
    setStep('capturing');
    setProgressVal(5);

    setTimeout(() => {
      setStep('analyzing');
      setProgressVal(40);
      
      setTimeout(() => {
        setStep('verifying');
        setProgressVal(75);

        setTimeout(() => {
          setStep('complete');
          setProgressVal(100);
          setIsProcessing(false);

          // Auto post simulated leads to Google Forms if mapping is configured
          const savedMapping = localStorage.getItem('ansury_gform_mapping');
          if (savedMapping) {
            try {
              const mapping = JSON.parse(savedMapping);
              if (mapping.formUrl) {
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
                if (mapping.firmNameField) body.append(mapping.firmNameField, `Simulated: ${lead.personaType}`);
                if (mapping.contactPersonField) body.append(mapping.contactPersonField, lead.parsedName);
                if (mapping.emailField) body.append(mapping.emailField, 'simulation-ingest@ansury.ai');
                if (mapping.phoneField) body.append(mapping.phoneField, lead.contact);
                if (mapping.focusAreaField) body.append(mapping.focusAreaField, `${lead.preferredDistrict} (Budget: ${lead.budget})`);
                if (mapping.volumeField) body.append(mapping.volumeField, '1');
                if (mapping.portalsField) body.append(mapping.portalsField, lead.source);

                fetch(targetUrl, {
                  method: 'POST',
                  mode: 'no-cors',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: body.toString()
                }).then(() => {
                  console.log('Simulation lead auto-forwarded to Google Form.');
                }).catch((err) => {
                  console.error('Failed to submit simulation lead:', err);
                });
              }
            } catch (err) {
              console.error('Error auto-dispatching simulated lead to Google Form:', err);
            }
          }
        }, 1200);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="bg-[#1A2333] border border-[#2A3650]/80 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Console Bar */}
      <div className="bg-[#111827] px-6 py-4 border-b border-[#2A3650] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
          <span className="text-xs font-mono font-bold text-[#06B6D4] tracking-widest uppercase">
            LIVE PREVIEW PIPELINE ENGINE
          </span>
        </div>
        <div className="text-xs font-mono text-[#8B95A7]">
          MODULE STATE: <span className="text-[#06B6D4] font-bold">READY</span>
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Raw Inputs & Interactions */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider block mb-1">
              Select Ingestion Scenario
            </span>
            <p className="text-[#8B95A7] text-xs mb-3">
              Observe how messy multi-lingual, multi-channel inputs are normalized instantly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {MOCK_LEADS.map((item, index) => (
                <button
                  key={index}
                  disabled={isProcessing}
                  onClick={() => startPipeline(item.details)}
                  className={`px-4 py-2.5 rounded-lg text-left text-xs transition-all border ${
                    selectedLead.id === item.details.id
                      ? 'bg-[#20283B] text-[#06B6D4] border-[#06B6D4]'
                      : 'bg-[#111827] text-[#D1D5DB] border-[#2A3650] hover:border-[#8B95A7]/40 hover:bg-[#1b2537]'
                  }`}
                >
                  <div className="font-bold mb-0.5 truncate">{item.label}</div>
                  <div className="text-[10px] text-[#8B95A7] font-mono flex items-center gap-1">
                     <span>{item.details.source}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mesh Raw Data Field */}
          <div className="flex flex-col flex-1 bg-[#111827] rounded-xl p-5 border border-[#2A3650] relative overflow-hidden">
            <span className="text-[11px] font-mono text-[#8B95A7] mb-2 block uppercase tracking-widest">
              [Raw Ingested Data Feed]
            </span>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/20 p-2 rounded border border-emerald-950/50 mb-3 flex items-center justify-between">
              <span>Source: {selectedLead.source}</span>
              <span>Status: Ingestion Event Detected</span>
            </div>
            
            <p className="text-sm font-sans text-white leading-relaxed whitespace-pre-line italic border-l-2 border-[#06B6D4] pl-4 py-1 flex-1">
              "{selectedLead.rawMessage}"
            </p>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-[#2A3650]/50">
              <span className="text-[10px] font-mono text-[#8B95A7]">
                Latency: <span className="text-[#06B6D4]">0.08ms</span>
              </span>
              <button
                onClick={() => startPipeline(selectedLead)}
                disabled={isProcessing}
                className="w-full sm:w-auto bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#111827] font-bold text-xs py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Run Verification Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Processing & Output Visuals */}
        <div className="flex flex-col bg-[#111827] rounded-xl p-6 border border-[#2A3650] relative">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#2A3650]/70">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[#06B6D4]" />
              <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                Ansury Intelligent Router
              </span>
            </div>
            <div className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#20283B] text-[#06B6D4] border border-[#06B6D4]/30">
              ID: {selectedLead.id}
            </div>
          </div>

          {/* Dynamic Progress Indicator */}
          {isProcessing ? (
            <div className="flex-1 flex flex-col justify-center items-center py-12 text-center">
              <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-[#06B6D4] animate-spin mb-4"></div>
              <div className="text-sm font-mono text-white mb-2">
                {step === 'capturing' && "CAPTURING STREAM..."}
                {step === 'analyzing' && "APPLYING HYPER-CONTEXTUAL NLP..."}
                {step === 'verifying' && "VERIFYING VIA WHATSAPP OTP..."}
              </div>
              <p className="text-xs text-[#8B95A7] max-w-xs">
                {step === 'capturing' && "Reading unstructured parameters and translating to JSON properties."}
                {step === 'analyzing' && "Scoring intent index and identifying Qatari district, size, and type."}
                {step === 'verifying' && "Checking contact data via active ping protocols."}
              </p>
              
              {/* Progress Line */}
              <div className="w-full max-w-xs bg-[#20283B] h-1.5 rounded-full mt-6 overflow-hidden">
                <div 
                  className="bg-[#06B6D4] h-full transition-all duration-300"
                  style={{ width: `${progressVal}%` }}
                ></div>
              </div>
            </div>
          ) : step === 'idle' ? (
            <div className="flex-1 flex flex-col justify-center items-center py-16 text-center text-[#8B95A7]">
              <Database className="w-12 h-12 text-[#2A3650] mb-3 animate-pulse" />
              <p className="text-xs font-mono text-white mb-1">PIPELINE STANDBY</p>
              <p className="text-[11px] max-w-xs">
                Select an ingestion scenario on the left or press "Run Verification" to trigger the automated automation cycle.
              </p>
            </div>
          ) : (
            // Full Normalized Output Page
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col gap-4 text-xs"
            >
              {/* Intent Level Head */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#20283B]/50 border border-[#06B6D4]/30">
                <div className="flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-[#06B6D4]" />
                  <div>
                    <div className="font-bold text-white text-[11px] uppercase tracking-wide">Intent Score Indicator</div>
                    <div className="text-[10px] text-[#8B95A7]">Autonomous rating computed in real-time</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-sora text-[#06B6D4]">{selectedLead.intentScore}%</span>
                  <span className="text-[9px] block text-emerald-400 font-mono">HIGH PROPENSITY</span>
                </div>
              </div>

              {/* Grid of parsed info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#20283B]/30 p-3 rounded-lg border border-[#2A3650] flex flex-col">
                  <span className="text-[10px] text-[#8B95A7] uppercase tracking-wider mb-1 font-mono">Parsed Prospect</span>
                  <span className="text-white font-bold truncate text-[13px]">{selectedLead.parsedName}</span>
                  <span className="text-[10px] text-[#8B95A7] font-mono mt-0.5">{selectedLead.contact}</span>
                </div>

                <div className="bg-[#20283B]/30 p-3 rounded-lg border border-[#2A3650] flex flex-col">
                  <span className="text-[10px] text-[#8B95A7] uppercase tracking-wider mb-1 font-mono">Verified Check</span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mt-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>99.8% ACCURATE</span>
                  </div>
                </div>

                <div className="bg-[#20283B]/30 p-3 rounded-lg border border-[#2A3650] flex flex-col">
                  <span className="text-[10px] text-[#8B95A7] uppercase tracking-wider mb-1 font-mono">Doha Location Mapping</span>
                  <span className="text-white font-bold truncate flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                    <span>{selectedLead.preferredDistrict.split(' (')[0]}</span>
                  </span>
                  <span className="text-[9px] text-[#8B95A7] truncate mt-0.5">
                    {selectedLead.preferredDistrict.includes('(') ? selectedLead.preferredDistrict.split('(')[1].replace(')', '') : 'Mapped'}
                  </span>
                </div>

                <div className="bg-[#20283B]/30 p-3 rounded-lg border border-[#2A3650] flex flex-col">
                  <span className="text-[10px] text-[#8B95A7] uppercase tracking-wider mb-1 font-mono">Financial Capacity</span>
                  <span className="text-white font-bold truncate flex items-center gap-1 mt-0.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span>{selectedLead.budget}</span>
                  </span>
                </div>
              </div>

              {/* Profile Tags */}
              <div className="flex flex-wrap gap-1.5 py-1">
                <span className="bg-[#20283B] text-[#D1D5DB] px-2.5 py-1 rounded text-[10px] font-mono border border-[#2A3650]">
                  TYPE: {selectedLead.propertyType}
                </span>
                <span className="bg-[#20283B] text-[#D1D5DB] px-2.5 py-1 rounded text-[10px] font-mono border border-[#2A3650]">
                  PORTFOLIO: {selectedLead.personaType}
                </span>
                <span className="bg-[#20283B] text-[#06B6D4] px-2.5 py-1 rounded text-[10px] font-bold font-mono border border-[#06B6D4]/35">
                  INGESTED: {selectedLead.source}
                </span>
              </div>

              {/* Real-time automated system action */}
              <div className="mt-2 bg-[#09141d] p-3 rounded-lg border border-[#2A3650] flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#06B6D4] font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>INTELLIGENT ROUTER DECISION</span>
                </div>
                <p className="text-[#D1D5DB] text-xs font-medium leading-relaxed italic">
                  "{selectedLead.systemAction}"
                </p>
              </div>

              {/* Micro-interaction notice */}
              <div className="text-[10px] text-[#8B95A7] italic text-center mt-2 font-mono flex items-center justify-center gap-1">
                <Smartphone className="w-3 h-3 text-[#06B6D4]" />
                <span>Contact validated automatically via SMS/WhatsApp with no broker lag.</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
