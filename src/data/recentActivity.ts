import type { RecentActivityItem } from '../types';

export const RECENT_ACTIVITY_DATA: RecentActivityItem[] = [
  {
    id: 'act-1',
    date: 'Oct 24, 14:32',
    documentUrl: 'NDA_AcmeCorp_v2.pdf',
    toolUsed: 'Document Scanner',
    riskScore: 12,
    riskLevel: 'Low',
    fileType: 'pdf'
  },
  {
    id: 'act-2',
    date: 'Oct 24, 11:15',
    documentUrl: 'Indemnification_Clause_Extract',
    toolUsed: 'Snippet Scan',
    riskScore: 45,
    riskLevel: 'Moderate',
    fileType: 'snippet'
  },
  {
    id: 'act-3',
    date: 'Oct 23, 09:45',
    documentUrl: 'vendor-portal-login.net',
    toolUsed: 'Website Checker',
    riskScore: 89,
    riskLevel: 'High',
    fileType: 'url'
  },
  {
    id: 'act-4',
    date: 'Oct 22, 16:20',
    documentUrl: 'MSA_GlobalTech_Draft.docx',
    toolUsed: 'Document Scanner',
    riskScore: 5,
    riskLevel: 'Low',
    fileType: 'docx'
  }
];
