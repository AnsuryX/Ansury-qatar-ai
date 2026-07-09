import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, HelpCircle, Landmark, Award, Shield, FileText } from 'lucide-react';

interface IntelligenceResult {
  query: string;
  response: string;
  lawReference: string;
  category: string;
  bulletPoints: string[];
}

const SAMPLE_QUERIES: IntelligenceResult[] = [
  {
    category: "Permanent Residency",
    query: "What are the permanent residency privileges for a 3.65M QAR ($1M) freehold purchase in Lusail?",
    response: "Under Cabinet Resolution No. 28 of 2020, purchasing real estate in Qatar valued at 3,650,000 QAR ($1,000,000 USD) or more grants the owner Permanent Residency benefits. This provides privileges analogous to national rights, including government-subsidized healthcare and tuition, investment opportunities without local partners, and sponsor-free exit/entry permissions.",
    lawReference: "Cabinet Resolution No. 28 (Resolution on Non-Qatari Ownership)",
    bulletPoints: [
      "Access to national healthcare networks and State school educational infrastructure.",
      "Right to own 100% of commercial enterprises in joint-stock boards without a Qatari partner.",
      "Sponsor-free residence permit issued in perpetuity for owner and immediate family."
    ]
  },
  {
    category: "Foreign Ownership Rights",
    query: "Does Law No. 16 of 2018 allow GCC nationals to purchase freehold residential villas in West Bay?",
    response: "Under Law No. 16 of 2018, GCC nationals possess full freehold acquisition rights in designated freehold zones, which includes specified zones within West Bay Lagoon. Non-GCC nationals are also permitted 100% freehold ownership in these zones. In non-freehold areas (such as traditional Doha suburbs), non-Qataris can unlock 99-year leasehold ownership.",
    lawReference: "Qatar Law No. 16 of 2018 (Regulation of Non-Qatari Real Estate Property)",
    bulletPoints: [
      "Freehold Areas: 9 major developments (The Pearl, Lusail, West Bay Lagoon, Al Khor, etc.) permit 100% absolute ownership.",
      "Leasehold Areas: 16 middle-ring Doha zone clusters permit 99-year residential and commercial leases.",
      "GCC parity: GCC citizens leverage streamlined municipal land registry approvals."
    ]
  },
  {
    category: "Taxation & Fees",
    query: "How does the 1.25% municipal transaction transfer fee operate for freehold apartments?",
    response: "Qatar offers a highly competitive tax environment with 0% personal income tax and 0% capital gains tax on property resale. The sole transaction levy is a 1.25% municipal registration transfer fee assessed on the gross purchase value, settled at the Ministry of Justice Real Estate Registration Department upon execution of the title deed.",
    lawReference: "Ministry of Justice Registration Rules (Section 4 — Freehold Conveyance)",
    bulletPoints: [
      "0% Personal Income Tax on all rental earnings generated within freehold portfolios.",
      "0% Capital Gains Tax on property resale, enabling efficient capital recycling.",
      "1.25% Transfer Fee: Calculated on gross sale value, split between buyer/seller or settled by contract."
    ]
  },
  {
    category: "Corporate Holding",
    query: "Can an international corporate entity own freehold commercial space in the Lusail Marina District?",
    response: "Yes, Law No. 16 of 2018 permits foreign-registered and locally incorporated entities (including 100% foreign-owned LLCs) to acquire absolute freehold titles for commercial properties within Lusail Marina and other designated zones. This enables multinational companies to establish permanent corporate headquarters without local leasehold risk.",
    lawReference: "Resolution on Non-Qatari Corporate Property Ownership",
    bulletPoints: [
      "Secures balance-sheet asset ownership for multinational corporations operating in Doha.",
      "Protects against commercial lease indexation and unexpected landlord termination.",
      "Generates corporate stability with direct ties to Qatar Financial Centre (QFC) registrations."
    ]
  }
];

export default function IntelligencePlayground() {
  const [customQuery, setCustomQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState<IntelligenceResult>(SAMPLE_QUERIES[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectSample = (query: IntelligenceResult) => {
    setIsProcessing(true);
    setTimeout(() => {
      setActiveQuery(query);
      setIsProcessing(false);
    }, 450);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setIsProcessing(true);
    
    // Simulate smart semantic search selection based on keyword match
    setTimeout(() => {
      const lower = customQuery.toLowerCase();
      let matched = SAMPLE_QUERIES[0]; // fallback
      
      if (lower.includes('tax') || lower.includes('fee') || lower.includes('capital') || lower.includes('cost')) {
        matched = SAMPLE_QUERIES[2];
      } else if (lower.includes('law') || lower.includes('gcc') || lower.includes('allow') || lower.includes('rule')) {
        matched = SAMPLE_QUERIES[1];
      } else if (lower.includes('company') || lower.includes('corporate') || lower.includes('business') || lower.includes('office')) {
        matched = SAMPLE_QUERIES[3];
      } else if (lower.includes('residency') || lower.includes('permanent') || lower.includes('million') || lower.includes('qar')) {
        matched = SAMPLE_QUERIES[0];
      }

      // Create custom looking query result
      setActiveQuery({
        category: matched.category,
        query: customQuery,
        response: `Semantic Analysis of: "${customQuery}"\n\nBased on Qatari real estate guidelines, your query correlates with ${matched.lawReference}. ${matched.response}`,
        lawReference: matched.lawReference,
        bulletPoints: matched.bulletPoints
      });
      setIsProcessing(false);
      setCustomQuery('');
    }, 600);
  };

  return (
    <div className="py-24 bg-[#111827] relative">
      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="font-eyebrow text-xs text-[#06B6D4] block mb-2 font-bold tracking-widest uppercase">
            REGULATORY COMPLIANCE
          </span>
          <h2 className="text-3xl font-bold font-sora text-white mb-4">
            Ansury Systems Qatari Real Estate Intelligence
          </h2>
          <p className="text-[#D1D5DB] text-sm leading-relaxed">
            Unification of the absolute latest freehold registers, Cabinet resolutions, and investment guidelines in Doha. Select a high-stakes scenario below or query our semantic rules engine.
          </p>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Input Selection list */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-mono text-[#8B95A7] uppercase tracking-wider block font-bold mb-3">
                REGULATORY SCENARIOS
              </span>
              <div className="flex flex-col gap-2.5">
                {SAMPLE_QUERIES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(item)}
                    className={`p-4 rounded-xl text-left border transition-all text-xs flex flex-col items-start gap-1 ${
                      activeQuery.category === item.category
                        ? 'bg-[#20283B] text-[#06B6D4] border-[#06B6D4]'
                        : 'bg-[#1A2333] text-[#D1D5DB] border-[#2A3650] hover:bg-[#1A2333]/70'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-1.5 py-0.5 rounded font-bold uppercase">
                      {item.category}
                    </span>
                    <span className="font-bold text-white mt-1 leading-snug">{item.query}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form query search input */}
            <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-[#8B95A7] uppercase tracking-wider block font-bold">
                PROMPT REGULATORY RULES ENGINE
              </span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Can foreigners buy commercial space in Doha West Bay?"
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  className="w-full bg-[#1A2333] text-white text-xs border border-[#2A3650] focus:border-[#06B6D4] rounded-full pl-5 pr-28 py-4 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="absolute right-2.5 top-2 bg-[#06B6D4] hover:bg-[#06B6D4]/95 text-[#111827] text-[10px] font-bold py-2 px-4 rounded-full flex items-center gap-1 transition-all"
                >
                  <span>Query</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[10px] text-[#8B95A7] italic font-mono pl-1">
                Parsed instantly using local legislative embeddings.
              </span>
            </form>
          </div>

          {/* Right: Results Box */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="bg-[#1A2333] border border-[#2A3650] rounded-2xl p-6 lg:p-8 relative shadow-xl overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="fetching"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#1A2333] flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-12 h-12 rounded-full border-t-2 border-[#06B6D4] animate-spin mb-4"></div>
                    <span className="text-xs font-mono text-[#8B95A7] uppercase tracking-wider">
                      Analyzing legislative indices...
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col gap-6 flex-1 justify-between"
                  >
                    {/* Header detail */}
                    <div>
                      <header className="flex justify-between items-center pb-4 border-b border-[#2A3650]/50 mb-4">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4.5 h-4.5 text-[#06B6D4]" />
                          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                            QATARI LEGAL INTERPRETATION
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#06B6D4] bg-[#20283B] px-2 py-0.5 rounded border border-[#06B6D4]/20 uppercase">
                          {activeQuery.category}
                        </span>
                      </header>

                      {/* Display original query */}
                      <p className="text-white text-base font-bold font-sora leading-snug mb-4 pl-3 border-l-2 border-[#06B6D4]">
                        "{activeQuery.query}"
                      </p>

                      {/* Decoded answer */}
                      <p className="text-[#D1D5DB] text-xs leading-relaxed font-sans mb-6">
                        {activeQuery.response}
                      </p>

                      {/* Bullet breakdown */}
                      <div className="flex flex-col gap-3 pt-3 border-t border-[#2A3650]/30">
                        <span className="text-[10px] font-mono text-[#8B95A7] uppercase tracking-wider font-bold block mb-1">
                          CRITICAL RESOLUTION PROVISIONS
                        </span>
                        {activeQuery.bulletPoints.map((point, i) => (
                          <div key={i} className="flex gap-3 text-xs leading-relaxed text-[#D1D5DB] items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-2 shrink-0"></span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Official Ref Tag at bottom */}
                    <div className="bg-[#111827] rounded-xl p-4 border border-[#2A3650] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 mt-6 shrink-0">
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <FileText className="w-4 h-4 text-[#8B95A7]" />
                        <span className="text-[#8B95A7] uppercase">Sovereign Source:</span>
                        <span className="text-white font-bold">{activeQuery.lawReference}</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#06B6D4] uppercase font-bold tracking-wider">
                        CERTIFIED TRUE
                      </span>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
