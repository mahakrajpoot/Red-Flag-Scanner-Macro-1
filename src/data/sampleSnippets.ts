import type { SnippetAnalysis } from '../types';

export const SAMPLE_SNIPPETS: SnippetAnalysis[] = [
  {
    id: 'snip-1',
    inputSnippet: 'Contractor hereby irrevocably assigns and transfers to Client all right, title, and interest in and to any and all inventions, code, designs, derivative works, and pre-existing intellectual property owned or created by Contractor prior to or during the performance of the project.',
    severity: 'HIGH',
    riskScore: 92,
    category: 'Intellectual Property Seizure',
    riskTags: ['IP Grab', 'Pre-Existing Assets', 'Irrevocable Transfer', 'Uncompensated Assignment'],
    explanation: 'This clause forces you to give up ownership of your pre-existing tools, open-source libraries, code templates, and past work. If you sign this, the client could claim sole legal ownership over code you built years ago!',
    saferAlternative: 'Contractor hereby assigns to Client all right, title, and interest solely in the custom Work Product created exclusively for Client under this SOW. Contractor retains all ownership of pre-existing tools, libraries, and frameworks, granting Client a non-exclusive, perpetual, royalty-free license to use them.'
  },
  {
    id: 'snip-2',
    inputSnippet: 'Contractor shall defend, indemnify, and hold harmless Client, its officers, directors, employees, and affiliates from and against any and all losses, damages, liabilities, settlements, legal fees, and court expenses arising out of any breach or third-party claim without limitation.',
    severity: 'HIGH',
    riskScore: 88,
    category: 'Uncapped Liability & Indemnity',
    riskTags: ['Unlimited Liability', 'No Monetary Cap', 'Third-Party Claims', 'Legal Fees Burden'],
    explanation: 'You are taking on unlimited financial liability. If a third party sues the client over software bugs or server outages, you could be forced to pay millions out-of-pocket, even if the error wasn’t your fault.',
    saferAlternative: 'Contractor agrees to indemnify Client for direct damages caused solely by Contractor gross negligence or willful misconduct, up to a maximum aggregate limit equal to the total fees actually paid to Contractor under this Agreement in the preceding 6 months.'
  },
  {
    id: 'snip-3',
    inputSnippet: 'This Agreement shall automatically renew for additional consecutive 12-month terms unless either party provides written notice of non-renewal at least 90 days prior to the expiration of the current term. Pricing for renewal terms shall increase by 15% automatically.',
    severity: 'MEDIUM',
    riskScore: 65,
    category: 'Auto-Renewal & Price Escalation',
    riskTags: ['Auto-Renew Lock-in', '15% Price Hike', 'Strict 90-Day Window'],
    explanation: 'If you miss the 90-day advance notice window by even one day, you are trapped in another 12-month contract with an automatic 15% price increase.',
    saferAlternative: 'This Agreement may be renewed upon mutual written consent of both parties prior to term expiration. Any proposed price increases must be submitted in writing at least 30 days prior for review and agreement.'
  },
  {
    id: 'snip-4',
    inputSnippet: 'Any controversy or claim arising out of or relating to this contract shall be settled by binding arbitration in London, UK, under the rules of the LCIA. Each party waives all rights to jury trial or local court resolution.',
    severity: 'MEDIUM',
    riskScore: 58,
    category: 'Foreign Arbitration Venue',
    riskTags: ['Jurisdiction Trapping', 'Foreign Court Costs', 'Waiver of Court Rights'],
    explanation: 'Dispute resolution is shifted overseas to London. If the client refuses to pay your invoice, pursuing legal action will require hiring international UK counsel, making enforcement prohibitively expensive.',
    saferAlternative: 'Any dispute arising under this Agreement shall be submitted to mediation in the governing jurisdiction of Contractor local state/country, or adjudicated in local small claims court.'
  }
];
