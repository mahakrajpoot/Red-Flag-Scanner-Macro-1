export type TabType = 
  | 'dashboard'
  | 'scanner'
  | 'doc-scanner'
  | 'snippet-scan'
  | 'ai-assistant'
  | 'website-checker'
  | 'history'
  | 'login'
  | 'auth';

export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface RecentActivityItem {
  id: string;
  date: string;
  documentUrl: string;
  toolUsed: 'Document Scanner' | 'Snippet Scan' | 'Website Checker' | 'AI Assistant';
  riskScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  fileType?: 'pdf' | 'docx' | 'url' | 'snippet';
}

export interface RedFlagItem {
  id: string;
  title: string;
  clauseNumber: string;
  originalText: string;
  severity: RiskLevel;
  plainEnglish: string;
  actionableTip: string;
  category: 'Liability' | 'Termination' | 'IP Rights' | 'Payment' | 'Privacy' | 'Jurisdiction';
}

export interface ProConItem {
  id: string;
  type: 'pro' | 'con';
  title: string;
  description: string;
}

export interface DocumentAnalysisReport {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'txt' | 'docx';
  contractType: string;
  uploadDate: string;
  overallRiskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  summary: string;
  proList: ProConItem[];
  conList: ProConItem[];
  redFlags: RedFlagItem[];
  documentSections: {
    sectionTitle: string;
    text: string;
    isFlagged: boolean;
    severity?: RiskLevel;
  }[];
  documentText: string;
}

export interface SnippetAnalysis {
  id: string;
  inputSnippet: string;
  severity: RiskLevel;
  riskScore: number;
  category: string;
  riskTags: string[];
  explanation: string;
  saferAlternative: string;
}

export interface PhishingThreatAlert {
  title: string;
  severity: RiskLevel;
  description: string;
}

export interface PhishingInspectionResult {
  url: string;
  hostname: string;
  trustScore: number;
  status: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  domainAgeDays: number;
  domainCreatedDate: string;
  sslValid: boolean;
  sslIssuer: string;
  sslExpiresDays: number;
  typosquattingDetected: boolean;
  targetBrandSpoofed: string | null;
  registrar: string;
  ipAddress: string;
  country: string;
  threatsFound: PhishingThreatAlert[];
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sectionQuote?: {
    title: string;
    quote: string;
  };
  clauseReferences?: string[];
  pageNumber?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  initials: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'critical' | 'warning' | 'info' | 'success';
}

