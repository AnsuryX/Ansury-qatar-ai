import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, Database, Shield, RefreshCw } from 'lucide-react';

interface DistrictInfo {
  name: string;
  description: string;
  leadDensity: string;
  avgValue: string;
  developmentStatus: string;
}

const DISTRICTS: DistrictInfo[] = [
  {
    name: "The Pearl-Qatar",
    description: "Premium marine-front residential units, popular with GCC high-net-worth investors.",
    leadDensity: "Very High (38% of luxury leads)",
    avgValue: "QAR 4.5M - 18M",
    developmentStatus: "Fully Operational"
  },
  {
    name: "Lusail Marina",
    description: "Futuristic corporate towers and commercial districts witnessing massive tech-firm demand.",
    leadDensity: "High (29% of corporate leads)",
    avgValue: "QAR 120k - 350k / Month lease",
    developmentStatus: "Accelerating Growth"
  },
  {
    name: "West Bay Core",
    description: "Established financial district of Doha. Primary hub for diplomatic residences and corporate HQ leases.",
    leadDensity: "Moderate (18% of leads)",
    avgValue: "QAR 6M - 12M",
    developmentStatus: "Established"
  },
  {
    name: "Msheireb Downtown",
    description: "Smart city mixed-use luxury apartments combining traditional Qatari design with global tech integrations.",
    leadDensity: "Moderate (15% of lifestyle leads)",
    avgValue: "QAR 3.2M - 7.5M",
    developmentStatus: "Fully Integrated"
  }
];

export default function CrmSyncVisualizer() {
  const [activeDistrict, setActiveDistrict] = useState<DistrictInfo>(DISTRICTS[0]);
  const [latency, setLatency] = useState(100);
  const [isSyncing, setIsSyncing] = useState(false);

  // Micro-simulation of minor network variations to represent authentic performance
  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(prev => {
        const offset = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const nextVal = prev + offset;
        return nextVal < 85 ? 85 : nextVal > 115 ? 115 : nextVal;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const triggerSyncDemo = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="py-12 bg-[#111827] relative">
      <div className="max-w-[1280px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="font-eyebrow text-xs text-[#06B6D4] block mb-2 font-bold tracking-widest uppercase">
            CENTRALIZED CONTROL
          </span>
          <h2 className="font-headline-md text-2xl md:text-3xl font-bold font-sora text-white">
            CRM &amp; Intelligence Synchronization
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4 h-auto lg:h-[600px]">
          
          {/* Main Stat Card: Bidirectional Sync */}
          <div className="lg:col-span-2 lg:row-span-2 bg-[#20283B] rounded-2xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#06B6D4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div>
              <span className="text-[10px] font-mono text-[#06B6D4] font-bold tracking-widest uppercase mb-4 block">
                INTELLIGENT RECOGNITION FLOW
              </span>
              <h3 className="text-2xl font-bold font-sora text-white mb-4">
                Bidirectional Data Integrity
              </h3>
              <p className="text-[#D1D5DB] text-[15px] leading-relaxed mb-6">
                Our synchronization framework ensures that every client interaction is mirrored across your tech stack instantly. Leads received from Property Finder, WhatsApp, and physical brochures are consolidated into HubSpot or Salesforce, completely removing duplicates, client gaps, or timing conflicts.
              </p>
              
              {/* Sync Diagram */}
              <div className="my-6 bg-[#111827]/80 rounded-xl p-4 border border-[#2A3650]/85 flex items-center justify-around">
                <div className="text-center">
                  <span className="text-[10px] font-mono block text-[#8B95A7]">PORTALS</span>
                  <span className="text-xs font-semibold text-white">Bayut / Finder</span>
                </div>
                <div className="flex items-center gap-1.5 px-4">
                  <div className={`w-1.5 h-1.5 rounded-full bg-[#06B6D4] ${isSyncing ? 'animate-ping' : ''}`}></div>
                  <div className="h-[2px] w-12 bg-[#2A3650] relative overflow-hidden">
                    <div className={`absolute top-0 left-0 h-full w-1/2 bg-[#06B6D4] rounded ${isSyncing ? 'animate-[shimmer_1s_infinite]' : ''}`}></div>
                  </div>
                  <RefreshCw className={`w-4 h-4 text-[#06B6D4] ${isSyncing ? 'animate-spin' : ''}`} />
                  <div className="h-[2px] w-12 bg-[#2A3650] relative overflow-hidden">
                    <div className={`absolute top-0 right-0 h-full w-1/2 bg-[#06B6D4] rounded ${isSyncing ? 'animate-[shimmer_1s_infinite_reverse]' : ''}`}></div>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full bg-[#06B6D4] ${isSyncing ? 'animate-ping' : ''}`}></div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-mono block text-[#8B95A7]">CORE SYSTEM</span>
                  <span className="text-xs font-semibold text-white">Ansury Systems</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[42px] font-bold font-sora text-[#06B6D4] leading-none transition-all duration-300">
                  {latency}ms
                </span>
                <span className="text-xs font-semibold text-[#8B95A7] uppercase tracking-wider">
                  SYNC LATENCY
                </span>
              </div>
              <button
                onClick={triggerSyncDemo}
                disabled={isSyncing}
                className="bg-[#20283B] border border-[#06B6D4]/30 hover:border-[#06B6D4] hover:bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-bold py-2 px-4 rounded-full transition-all duration-300 w-full sm:w-auto text-center"
              >
                {isSyncing ? 'Synchronizing CRM...' : 'Trigger Sync Check'}
              </button>
            </div>
          </div>

          {/* Integration Card: Map Mapping */}
          <div className="lg:col-span-2 lg:row-span-1 bg-[#1A2333] rounded-2xl p-6 border border-[#2A3650] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg">
            <div className="flex-1">
              <span className="text-[10px] font-mono text-[#06B6D4] tracking-widest uppercase mb-1.5 block font-bold">
                GEO-REFERENCED DATASETS
              </span>
              <h4 className="text-lg font-bold font-sora text-white mb-2">
                Local Market Mapping
              </h4>
              <p className="text-[#D1D5DB] text-xs leading-relaxed max-w-md mb-4">
                Granular coordinates linking Doha municipal sub-districts directly into standard CRM data pools. Click on different regions below to view properties.
              </p>

              {/* District Select Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {DISTRICTS.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveDistrict(item)}
                    className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all ${
                      activeDistrict.name === item.name
                        ? 'bg-[#06B6D4] text-[#111827]'
                        : 'bg-[#20283B] text-[#D1D5DB] hover:bg-[#20283B]/80'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro-rendered Mini Info Pane */}
            <div className="h-36 w-full md:w-48 bg-[#111827]/80 rounded-xl p-4 border border-[#2A3650] flex flex-col justify-between relative overflow-hidden group shadow-inner shrink-0">
              <div className="absolute right-2 top-2 text-[#06B6D4]/20 group-hover:text-[#06B6D4]/40 transition-colors pointer-events-none">
                <Map className="w-10 h-10" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDistrict.name}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className="h-full flex flex-col justify-between text-[11px]"
                >
                  <div className="truncate">
                    <span className="block text-[#06B6D4] font-bold font-mono text-[10px] uppercase">ACTIVE SECTOR</span>
                    <span className="font-bold text-white uppercase text-xs">{activeDistrict.name}</span>
                  </div>
                  <p className="text-[10px] text-[#8B95A7] line-clamp-2 leading-relaxed my-1">
                    {activeDistrict.description}
                  </p>
                  <div>
                    <div className="text-white mt-0.5">
                      <span className="text-[#8B95A7] font-mono">Value range:</span> <span className="font-bold">{activeDistrict.avgValue}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Tech Feature 1: SQL Optimized */}
          <div className="bg-[#1A2333] rounded-2xl p-6 border border-[#2A3650] hover:border-[#06B6D4]/40 transition-all duration-300 flex flex-col justify-center items-center text-center group shadow-md cursor-pointer">
            <div className="w-10 h-10 bg-[#06B6D4]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#06B6D4]/25 transition-all">
              <Database className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <span className="font-mono text-xs font-bold text-[#06B6D4] tracking-widest uppercase mb-1">
              SQL OPTIMIZED
            </span>
            <p className="text-[11px] text-[#8B95A7] leading-relaxed max-w-xs px-2">
              PostgreSQL geographic indexes for near-instant geospatial query performance.
            </p>
          </div>

          {/* Tech Feature 2: AES-256 Encrypted */}
          <div className="bg-[#1A2333] rounded-2xl p-6 border border-[#2A3650] hover:border-[#06B6D4]/40 transition-all duration-300 flex flex-col justify-center items-center text-center group shadow-md cursor-pointer">
            <div className="w-10 h-10 bg-[#06B6D4]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#06B6D4]/25 transition-all">
              <Shield className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <span className="font-mono text-xs font-bold text-[#06B6D4] tracking-widest uppercase mb-1">
              AES-256 ENCRYPTED
            </span>
            <p className="text-[11px] text-[#8B95A7] leading-relaxed max-w-xs px-2">
              All broker communication and proprietary buyer profiles secured by hardware decryption modules.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
