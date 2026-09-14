export interface ScanRecord {
  id: string;
  documentName: string;
  type: string;
  riskScore: number;
  riskLevel: "high" | "medium" | "low";
  date: Date;
  fileSize: string;
  status: "completed" | "in-progress" | "failed";
}

export interface RedFlag {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  section: string;
}

export interface ProConItem {
  id: string;
  text: string;
}

export interface CounterClause {
  id: string;
  original: string;
  suggested: string;
  reason: string;
}

export interface RiskBreakdown {
  category: string;
  percentage: number;
  color: string;
}

export interface AnalysisResult {
  id: string;
  documentName: string;
  fileSize: string;
  scannedAt: Date;
  overallScore: number;
  riskLevel: "high" | "medium" | "low";
  riskBreakdown: RiskBreakdown[];
  redFlags: RedFlag[];
  pros: ProConItem[];
  cons: ProConItem[];
  counterClauses: CounterClause[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citation?: string;
  timestamp: Date;
}

export interface ClauseScanResult {
  riskLevel: "high" | "medium" | "low";
  plainEnglish: string;
  whyItMatters: string;
  saferRevision: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: Date;
}

export const scanRecords: ScanRecord[] = [
  {
    id: "influencer-agreement",
    documentName: "Influencer_Agreement.pdf",
    type: "Contract",
    riskScore: 78,
    riskLevel: "high",
    date: new Date("2025-06-10"),
    fileSize: "2.4 MB",
    status: "completed",
  },
  {
    id: "vendor-agreement",
    documentName: "Vendor_Agreement.pdf",
    type: "Contract",
    riskScore: 56,
    riskLevel: "medium",
    date: new Date("2025-06-08"),
    fileSize: "1.8 MB",
    status: "completed",
  },
  {
    id: "employment-contract",
    documentName: "Employment_Contract.pdf",
    type: "Contract",
    riskScore: 23,
    riskLevel: "low",
    date: new Date("2025-06-05"),
    fileSize: "3.1 MB",
    status: "completed",
  },
  {
    id: "nda-document",
    documentName: "NDA_Document.pdf",
    type: "NDA",
    riskScore: 16,
    riskLevel: "low",
    date: new Date("2025-06-03"),
    fileSize: "0.8 MB",
    status: "completed",
  },
  {
    id: "service-agreement",
    documentName: "Service_Agreement.pdf",
    type: "Contract",
    riskScore: 47,
    riskLevel: "medium",
    date: new Date("2025-07-02"),
    fileSize: "2.1 MB",
    status: "completed",
  },
];

export const demoAnalysis: AnalysisResult = {
  id: "influencer-agreement",
  documentName: "Influencer_Agreement.pdf",
  fileSize: "2.4 MB",
  scannedAt: new Date("2025-06-10T12:43:00"),
  overallScore: 78,
  riskLevel: "high",
  riskBreakdown: [
    { category: "Legal Liability", percentage: 35, color: "#ef4444" },
    { category: "Payment Terms", percentage: 25, color: "#f97316" },
    { category: "IP Rights", percentage: 20, color: "#eab308" },
    { category: "Termination", percentage: 12, color: "#a855f7" },
    { category: "Compliance", percentage: 8, color: "#6366f1" },
  ],
  redFlags: [
    {
      id: "rf1",
      title: "Uncapped liability clause",
      description:
        "The contract contains an uncapped liability clause that could expose you to unlimited financial risk. Section 4.2 states that the party shall be liable for all damages without any monetary cap.",
      severity: "high",
      section: "Section 4.2",
    },
    {
      id: "rf2",
      title: "Broad non-compete clause",
      description:
        "The non-compete clause in Section 5.3 restricts you from working with any competing business for 2 years after termination. This is overly broad and may not be enforceable in many jurisdictions.",
      severity: "high",
      section: "Section 5.3",
    },
    {
      id: "rf3",
      title: "Automatic renewal clause",
      description:
        "The contract automatically renews for successive 12-month periods unless terminated with 90 days written notice. This lock-in period is significantly longer than industry standard.",
      severity: "medium",
      section: "Section 8.1",
    },
  ],
  pros: [
    { id: "p1", text: "Clear payment structure" },
    { id: "p2", text: "IP ownership defined" },
    { id: "p3", text: "Termination with notice" },
    { id: "p4", text: "Dispute resolution process" },
    { id: "p5", text: "Confidentiality protections" },
  ],
  cons: [
    { id: "c1", text: "High penalty for breach" },
    { id: "c2", text: "Vague deliverables" },
    { id: "c3", text: "Limited termination rights" },
    { id: "c4", text: "One-sided indemnification" },
    { id: "c5", text: "No force majeure clause" },
  ],
  counterClauses: [
    {
      id: "cc1",
      original:
        "The party shall be liable for all damages arising from breach of this agreement without limitation.",
      suggested:
        "Add a liability cap (e.g., 12 months\u2019 value), carve-out for consequential damages, and include a mutual limitation of liability.",
      reason:
        "Uncapped liability exposes you to disproportionate financial risk.",
    },
    {
      id: "cc2",
      original:
        "The employee shall not work for any competing business for a period of 2 years after termination.",
      suggested:
        "Reduce non-compete to 6 months, narrow geographic scope, and limit to directly competing roles only.",
      reason:
        "A 2-year blanket non-compete is overly restrictive and may be unenforceable.",
    },
    {
      id: "cc3",
      original:
        "This agreement shall automatically renew for successive 12-month periods unless terminated with 90 days prior written notice.",
      suggested:
        "Change to 30-day notice for non-renewal, add option for either party to terminate at renewal date.",
      reason:
        "90-day notice requirement creates an extended lock-in period.",
    },
  ],
};

export const demoChatMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "What is the notice period for termination?",
    timestamp: new Date("2025-06-10T12:50:00"),
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "The contract specifies a 30-day notice period for termination by either party. However, for automatic renewal prevention, a 90-day notice is required before the renewal date.",
    citation: "Ref: Section 7.2",
    timestamp: new Date("2025-06-10T12:50:05"),
  },
  {
    id: "m3",
    role: "user",
    content: "Are there any non-compete clauses in the agreement?",
    timestamp: new Date("2025-06-10T12:51:00"),
  },
  {
    id: "m4",
    role: "assistant",
    content:
      "Yes. Section 5.3 contains a non-compete clause. The employee agrees not to engage in any business that competes with the Company for a period of 2 years after the termination of the Agreement. This is flagged as a high-risk clause due to its broad scope and extended duration.",
    citation: "Ref: Section 5.3",
    timestamp: new Date("2025-06-10T12:51:08"),
  },
];

export const aiResponses: Record<string, { content: string; citation: string }> = {
  "what is the payment terms": {
    content:
      "The payment terms are defined in Section 3.1. The company agrees to pay a fixed monthly fee of $5,000, payable within 30 days of invoice receipt. Late payments incur a 1.5% monthly interest charge. Additionally, performance bonuses are outlined in Schedule B.",
    citation: "Ref: Section 3.1, Schedule B",
  },
  "who owns the intellectual property": {
    content:
      "According to Section 6.1, all intellectual property created during the term of the agreement shall be owned by the Company. The contractor retains rights to pre-existing IP but grants the Company a perpetual, non-exclusive license to use it. Work-for-hire provisions apply to all deliverables.",
    citation: "Ref: Section 6.1",
  },
  "what happens if there is a breach": {
    content:
      "Section 9.2 covers breach remedies. The non-breaching party must provide written notice of the breach and allow a 30-day cure period. If the breach is not cured, the non-breaching party may terminate the agreement and seek damages. The contract includes an uncapped liability clause, which is flagged as a red flag.",
    citation: "Ref: Section 9.2",
  },
  "is there a confidentiality clause": {
    content:
      "Yes, Section 10 contains comprehensive confidentiality provisions. Both parties agree to maintain strict confidentiality of proprietary information for a period of 5 years following termination. The definition of confidential information is broad and includes business strategies, client lists, and technical data.",
    citation: "Ref: Section 10.1-10.4",
  },
  default: {
    content:
      "Based on my analysis of the Influencer Agreement, I can help you understand specific clauses, identify risks, and suggest improvements. Could you please ask about a specific section or clause you'd like me to review?",
    citation: "Ref: General Analysis",
  },
};

export const clauseExamples: Record<string, string> = {
  "Non-Compete":
    "The employee shall not work for any competing business for a period of 2 years after termination.",
  "Indemnification":
    "The contractor shall indemnify and hold harmless the company from any and all claims, damages, and expenses arising from contractor's performance.",
  "Termination":
    "Either party may terminate this agreement with 30 days written notice. Upon termination, all outstanding payments shall become immediately due.",
  "Payment Terms":
    "Payment shall be made within 60 days of invoice receipt. Late payments shall accrue interest at 2% per month.",
};

export const clauseScanResults: Record<string, ClauseScanResult> = {
  "Non-Compete": {
    riskLevel: "high",
    plainEnglish:
      "This clause prevents you from working for any competitor for 2 years after leaving. This is very restrictive and could limit your career options significantly.",
    whyItMatters:
      "Non-compete clauses of this duration are often considered overly broad. In many jurisdictions, courts have limited enforcement of non-competes exceeding 6-12 months. This could affect your ability to earn a living in your field.",
    saferRevision:
      "\"The employee agrees not to directly solicit the company's existing clients or work in a substantially similar role at a directly competing firm within a 25-mile radius for a period of 6 months after termination. The company will provide reasonable compensation during the non-compete period.\"",
  },
  "Indemnification": {
    riskLevel: "medium",
    plainEnglish:
      "This clause makes you financially responsible for any legal problems that come up because of your work. You'd have to pay for the company's legal fees and damages, even if the issue wasn't entirely your fault.",
    whyItMatters:
      "One-sided indemnification can expose you to significant financial liability. Without a cap or mutual indemnification, you could be held responsible for costs far exceeding your contract value.",
    saferRevision:
      "\"Each party shall indemnify the other against claims arising from their own negligence or willful misconduct. Total indemnification liability shall not exceed the total fees paid under this agreement in the 12 months preceding the claim.\"",
  },
  "Termination": {
    riskLevel: "low",
    plainEnglish:
      "Either side can end the agreement by giving 30 days notice. When the contract ends, any money owed must be paid right away.",
    whyItMatters:
      "This is a fairly standard termination clause. The 30-day notice period is reasonable, and the immediate payment requirement protects the service provider. Consider adding provisions for termination due to breach.",
    saferRevision:
      "\"Either party may terminate this agreement with 30 days written notice. In case of material breach, the non-breaching party may terminate immediately upon written notice. All outstanding payments shall be settled within 15 business days of termination.\"",
  },
  "Payment Terms": {
    riskLevel: "medium",
    plainEnglish:
      "You'll get paid within 60 days of sending an invoice, and if they're late, they'll owe extra interest. However, 60 days is a long wait for payment.",
    whyItMatters:
      "60-day payment terms can create cash flow issues, especially for small businesses or freelancers. The 2% monthly interest on late payments is reasonable but the long base period is concerning.",
    saferRevision:
      "\"Payment shall be made within 30 days of invoice receipt. Invoices not disputed within 10 business days shall be deemed accepted. Late payments shall accrue interest at 1.5% per month from the due date.\"",
  },
};

export const userProfile: UserProfile = {
  name: "Mahak Rajpoot",
  email: "mahak.rajpoot@email.com",
  avatar: "MR",
  memberSince: new Date("2025-04-01"),
};

export const dashboardStats = {
  totalScans: 18,
  highRisk: 3,
  avgRiskScore: 42,
  timeSaved: 18.4,
};

export const riskDistribution = [
  { name: "High", value: 3, percentage: 17, color: "#ef4444" },
  { name: "Medium", value: 7, percentage: 39, color: "#f59e0b" },
  { name: "Low", value: 8, percentage: 44, color: "#10b981" },
];

export interface PhishingThreatAlert {
  title: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  description: string;
}

export interface PhishingInspectionResult {
  url: string;
  hostname: string;
  trustScore: number;
  status: "SAFE" | "SUSPICIOUS" | "DANGEROUS";
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

export const sampleDomains: PhishingInspectionResult[] = [
  {
    url: "https://paypa1-security-login-verify.com/auth/login.php",
    hostname: "paypa1-security-login-verify.com",
    trustScore: 12,
    status: "DANGEROUS",
    domainAgeDays: 3,
    domainCreatedDate: "2026-08-20",
    sslValid: false,
    sslIssuer: "Let's Encrypt (Self-Signed / Untrusted Domain)",
    sslExpiresDays: 14,
    typosquattingDetected: true,
    targetBrandSpoofed: "PayPal",
    registrar: "NameCheap / Anonymous Offshore Proxy LLC",
    ipAddress: "185.220.101.45",
    country: "Panama (Offshore Hosting)",
    threatsFound: [
      {
        title: "Typosquatting & Brand Spoofing Detected",
        severity: "HIGH",
        description:
          'Domain replaces "l" with digit "1" (paypa1 instead of paypal) designed to deceive users into entering financial credentials.',
      },
      {
        title: "High Risk Domain Age (< 7 Days)",
        severity: "HIGH",
        description:
          "Domain was registered only 3 days ago. Over 94% of malicious phishing portals are hosted on newly registered domains.",
      },
      {
        title: "Invalid / Mismatched SSL Certificate",
        severity: "HIGH",
        description:
          "The SSL certificate SAN does not match the parent host domain and uses temporary 14-day short-lived key pair.",
      },
      {
        title: "Credential Harvesting Pattern Identified",
        severity: "MEDIUM",
        description:
          "URL path contains standard phishing signatures (/auth/login.php) flagged by Google Safe Browsing heuristics.",
      },
    ],
    recommendations: [
      "DO NOT enter any passwords, credit card numbers, or OTP codes on this page.",
      "Close this browser tab immediately and clear cached browser session tokens.",
      "Report URL to APWG (Anti-Phishing Working Group) and US-CERT.",
    ],
  },
  {
    url: "https://wellsfarg0-account-update.net/customer-portal",
    hostname: "wellsfarg0-account-update.net",
    trustScore: 18,
    status: "DANGEROUS",
    domainAgeDays: 5,
    domainCreatedDate: "2026-08-18",
    sslValid: false,
    sslIssuer: "Free SSL Authority (Domain Validated Only)",
    sslExpiresDays: 30,
    typosquattingDetected: true,
    targetBrandSpoofed: "Wells Fargo",
    registrar: "Porkbun / Privacy Guard Inc.",
    ipAddress: "194.165.16.89",
    country: "Seychelles",
    threatsFound: [
      {
        title: "Zero-Substitution Homograph Attack",
        severity: "HIGH",
        description:
          'Domain replaces letter "o" with digit "0" (wellsfarg0) to impersonate Wells Fargo Bank online portal.',
      },
      {
        title: "Suspicious TLD & Host Reputation",
        severity: "HIGH",
        description:
          "Host IP address has 14 prior reports on AbuseIPDB for hosting malware payload drop zones.",
      },
    ],
    recommendations: [
      "Do NOT log into your banking account through links received via SMS or email.",
      "Navigate to official wellsfargo.com directly by typing into address bar.",
    ],
  },
  {
    url: "https://github.com/organization/red-flag-scanner",
    hostname: "github.com",
    trustScore: 98,
    status: "SAFE",
    domainAgeDays: 6890,
    domainCreatedDate: "2007-10-09",
    sslValid: true,
    sslIssuer: "DigiCert TLS Hybrid ECC SHA384 2020 CA1",
    sslExpiresDays: 280,
    typosquattingDetected: false,
    targetBrandSpoofed: null,
    registrar: "MarkMonitor Inc.",
    ipAddress: "140.82.121.4",
    country: "United States",
    threatsFound: [],
    recommendations: [
      "Official verified domain owned by GitHub / Microsoft Corporation.",
      "Valid extended validation SSL certificate & clean security history.",
    ],
  },
  {
    url: "https://freelance-client-invoicing-app.io/pay",
    hostname: "freelance-client-invoicing-app.io",
    trustScore: 54,
    status: "SUSPICIOUS",
    domainAgeDays: 42,
    domainCreatedDate: "2026-07-12",
    sslValid: true,
    sslIssuer: "Cloudflare Inc ECC CA-3",
    sslExpiresDays: 85,
    typosquattingDetected: false,
    targetBrandSpoofed: null,
    registrar: "NameSilo LLC",
    ipAddress: "104.21.48.91",
    country: "United States (Cloudflare CDN)",
    threatsFound: [
      {
        title: "Recently Created Domain (< 60 Days)",
        severity: "MEDIUM",
        description:
          "Domain was created 42 days ago. Exercise caution when submitting payment credentials to newly established web portals.",
      },
      {
        title: "Unverifiable Corporate Identity",
        severity: "LOW",
        description:
          "Domain uses WHOIS privacy protection hiding company ownership details.",
      },
    ],
    recommendations: [
      "Verify contractor invoice details through a secondary channel (e.g. phone call or Slack) before submitting payment.",
      "Use secure credit cards or escrow services with fraud protection.",
    ],
  },
];

