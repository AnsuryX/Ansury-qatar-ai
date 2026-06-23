export interface LeadProfile {
  id: string;
  source: 'Property Finder' | 'Bayut' | 'Social Funnels' | 'Direct';
  rawMessage: string;
  parsedName: string;
  contact: string;
  isVerified: boolean;
  intentScore: number; // 0 - 100
  budget: string;
  preferredDistrict: string;
  propertyType: 'Villa' | 'Apartment' | 'Penthouse' | 'Commercial';
  personaType: 'HNW Investor' | 'Corporate Expat' | 'GCC Buyer';
  systemAction: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  client: string;
  duration: string;
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  challenge: string;
  solution: string;
  result: string;
  image: string;
  tags: string[];
}

export interface SyncLog {
  id: string;
  timestamp: string;
  direction: 'Incoming ➔ CRM' | 'CRM ➔ Unified' | 'Verification ➔ Active';
  status: 'SUCCESS' | 'SYNCING' | 'VERIFIED';
  entity: string;
  latencyMs: number;
}
