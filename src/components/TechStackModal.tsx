import { X, Server, BrainCircuit, HardDriveDownload, GitCompare, CheckCircle } from 'lucide-react';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TechStackModal({ isOpen, onClose }: TechStackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay Background */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0f13]/90 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      {/* Main Content Card */}
      <div className="bg-[#1A2333] border border-[#2A3650] max-w-[640px] w-full rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <header className="bg-[#111827] px-6 py-5 border-b border-[#2A3650] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              Ansury Core Tech Stack Specs
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#8B95A7] hover:text-[#06B6D4] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Technical Data Blocks */}
        <div className="p-6 lg:p-8 overflow-y-auto flex flex-col gap-6 text-xs">
          
          {/* Section Description */}
          <div>
            <span className="text-[#06B6D4] font-bold font-mono text-[10px] uppercase block mb-1">
              PLATFORM INFRASTRUCTURE ARCHITECTURE
            </span>
            <p className="text-[#D1D5DB] text-xs leading-relaxed">
              Designed for enterprise scalability, our platform operates at sub-second speeds using specialized geographic indexing and localized translation encoders.
            </p>
          </div>

          {/* Tech Stack Layers */}
          <div className="flex flex-col gap-4">
            
            {/* Layer 1 */}
            <div className="bg-[#111827] p-4 rounded-xl border border-[#2A3650] flex gap-4">
              <div className="w-10 h-10 bg-[#06B6D4]/15 rounded-full flex items-center justify-center shrink-0 border border-[#06B6D4]/10">
                <BrainCircuit className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#06B6D4] uppercase block">
                  LAYER A — LOCALIZED DIALECT ENCODERS
                </span>
                <span className="text-white font-bold text-xs block mt-0.5">
                  Bilingual Regional Micro-Models
                </span>
                <p className="text-[#8B95A7] text-[11px] leading-relaxed mt-1">
                  Custom-wrapped prompt parameters optimized on Qatari administrative districts (Lusail, West Bay, Msheireb) and GCC high-respect honorific hierarchies (Excellency, Sheikh, VIP Royal Family Offices). Consistently yields correct context matching without translation lag.
                </p>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-[#111827] p-4 rounded-xl border border-[#2A3650] flex gap-4">
              <div className="w-10 h-10 bg-[#06B6D4]/15 rounded-full flex items-center justify-center shrink-0 border border-[#06B6D4]/10">
                <Server className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#06B6D4] uppercase block">
                  LAYER B — FULL-STACK WEBHOUSE INGESTION
                </span>
                <span className="text-white font-bold text-xs block mt-0.5">
                  Serverless Event-Driven Portal Pipes
                </span>
                <p className="text-[#8B95A7] text-[11px] leading-relaxed mt-1">
                  Active webhook listeners executing immediate JSON serialization of incoming inquiries from Property Finder, Bayut, and direct social campaigns. Completes ingestion, verification check, and intent score indexing in less than 40ms.
                </p>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-[#111827] p-4 rounded-xl border border-[#2A3650] flex gap-4">
              <div className="w-10 h-10 bg-[#06B6D4]/15 rounded-full flex items-center justify-center shrink-0 border border-[#06B6D4]/10">
                <GitCompare className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#06B6D4] uppercase block">
                  LAYER C — BIDIRECTIONAL SYNC ENGINE
                </span>
                <span className="text-white font-bold text-xs block mt-0.5">
                  Relational PostgreSQL Spatial Database
                </span>
                <p className="text-[#8B95A7] text-[11px] leading-relaxed mt-1">
                  Optimized geographic indices mapping complex coordinates of Doha municipal layouts. Guarantees real-time data replication to HubSpot, Salesforce, or Oracle hubs with a validated 100ms sync latency.
                </p>
              </div>
            </div>

          </div>

          {/* Verification compliance badge */}
          <div className="bg-[#20283B] p-4 rounded-xl border border-[#06B6D4]/20 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-[10px] text-[#8B95A7] font-mono leading-relaxed uppercase">
              Compliance Checked: <span className="text-white font-bold">100% SOVEREIGN CLOUD HOUSING IN DOHA, QATAR</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <footer className="bg-[#111827] border-t border-[#2A3650] px-6 py-4 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="bg-[#20283B] hover:bg-[#20283B]/80 text-[#D1D5DB] border border-[#2A3650] text-xs font-bold py-2 px-5 rounded-full transition-all active:scale-95"
          >
            Close Tech Specs
          </button>
        </footer>
      </div>
    </div>
  );
}
