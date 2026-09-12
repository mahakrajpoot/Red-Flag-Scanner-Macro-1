import type { PhishingInspectionResult } from '../types';

export const SAMPLE_DOMAINS: PhishingInspectionResult[] = [
  {
    url: 'https://paypa1-security-login-verify.com/auth/login.php',
    hostname: 'paypa1-security-login-verify.com',
    trustScore: 12,
    status: 'DANGEROUS',
    domainAgeDays: 3,
    domainCreatedDate: '2026-08-20',
    sslValid: false,
    sslIssuer: "Let's Encrypt (Self-Signed / Untrusted Domain)",
    sslExpiresDays: 14,
    typosquattingDetected: true,
    targetBrandSpoofed: 'PayPal',
    registrar: 'NameCheap / Anonymous Offshore Proxy LLC',
    ipAddress: '185.220.101.45',
    country: 'Panama (Offshore Hosting)',
    threatsFound: [
      {
        title: 'Typosquatting & Brand Spoofing Detected',
        severity: 'HIGH',
        description: 'Domain replaces "l" with digit "1" (paypa1 instead of paypal) designed to deceive users into entering financial credentials.'
      },
      {
        title: 'High Risk Domain Age (< 7 Days)',
        severity: 'HIGH',
        description: 'Domain was registered only 3 days ago. Over 94% of malicious phishing portals are hosted on newly registered domains.'
      },
      {
        title: 'Invalid / Mismatched SSL Certificate',
        severity: 'HIGH',
        description: 'The SSL certificate SAN does not match the parent host domain and uses temporary 14-day short-lived key pair.'
      },
      {
        title: 'Credential Harvesting Pattern Identified',
        severity: 'MEDIUM',
        description: 'URL path contains standard phishing signatures (/auth/login.php) flagged by Google Safe Browsing heuristics.'
      }
    ],
    recommendations: [
      'DO NOT enter any passwords, credit card numbers, or OTP codes on this page.',
      'Close this browser tab immediately and clear cached browser session tokens.',
      'Report URL to APWG (Anti-Phishing Working Group) and US-CERT.'
    ]
  },
  {
    url: 'https://wellsfarg0-account-update.net/customer-portal',
    hostname: 'wellsfarg0-account-update.net',
    trustScore: 18,
    status: 'DANGEROUS',
    domainAgeDays: 5,
    domainCreatedDate: '2026-08-18',
    sslValid: false,
    sslIssuer: 'Free SSL Authority (Domain Validated Only)',
    sslExpiresDays: 30,
    typosquattingDetected: true,
    targetBrandSpoofed: 'Wells Fargo',
    registrar: 'Porkbun / Privacy Guard Inc.',
    ipAddress: '194.165.16.89',
    country: 'Seychelles',
    threatsFound: [
      {
        title: 'Zero-Substitution Homograph Attack',
        severity: 'HIGH',
        description: 'Domain replaces letter "o" with digit "0" (wellsfarg0) to impersonate Wells Fargo Bank online portal.'
      },
      {
        title: 'Suspicious TLD & Host Reputation',
        severity: 'HIGH',
        description: 'Host IP address has 14 prior reports on AbuseIPDB for hosting malware payload drop zones.'
      }
    ],
    recommendations: [
      'Do NOT log into your banking account through links received via SMS or email.',
      'Navigate to official wellsfargo.com directly by typing into address bar.'
    ]
  },
  {
    url: 'https://github.com/organization/red-flag-scanner',
    hostname: 'github.com',
    trustScore: 98,
    status: 'SAFE',
    domainAgeDays: 6890,
    domainCreatedDate: '2007-10-09',
    sslValid: true,
    sslIssuer: 'DigiCert TLS Hybrid ECC SHA384 2020 CA1',
    sslExpiresDays: 280,
    typosquattingDetected: false,
    targetBrandSpoofed: null,
    registrar: 'MarkMonitor Inc.',
    ipAddress: '140.82.121.4',
    country: 'United States',
    threatsFound: [],
    recommendations: [
      'Official verified domain owned by GitHub / Microsoft Corporation.',
      'Valid extended validation SSL certificate & clean security history.'
    ]
  },
  {
    url: 'https://freelance-client-invoicing-app.io/pay',
    hostname: 'freelance-client-invoicing-app.io',
    trustScore: 54,
    status: 'SUSPICIOUS',
    domainAgeDays: 42,
    domainCreatedDate: '2026-07-12',
    sslValid: true,
    sslIssuer: 'Cloudflare Inc ECC CA-3',
    sslExpiresDays: 85,
    typosquattingDetected: false,
    targetBrandSpoofed: null,
    registrar: 'NameSilo LLC',
    ipAddress: '104.21.48.91',
    country: 'United States (Cloudflare CDN)',
    threatsFound: [
      {
        title: 'Recently Created Domain (< 60 Days)',
        severity: 'MEDIUM',
        description: 'Domain was created 42 days ago. Exercise caution when submitting payment credentials to newly established web portals.'
      },
      {
        title: 'Unverifiable Corporate Identity',
        severity: 'LOW',
        description: 'Domain uses WHOIS privacy protection hiding company ownership details.'
      }
    ],
    recommendations: [
      'Verify contractor invoice details through a secondary channel (e.g. phone call or Slack) before submitting payment.',
      'Use secure credit cards or escrow services with fraud protection.'
    ]
  }
];
