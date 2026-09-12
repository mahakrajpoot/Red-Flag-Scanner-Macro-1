import type { DocumentAnalysisReport } from '../types';

export const SAMPLE_DOCUMENTS: DocumentAnalysisReport[] = [
  {
    id: 'doc-msa-1',
    fileName: 'Master Service Agreement.pdf',
    fileType: 'pdf',
    contractType: 'Master Service Agreement',
    uploadDate: 'Aug 28, 2026',
    overallRiskScore: 78,
    riskLevel: 'HIGH',
    summary: 'Critical Issues Detected: Uncapped indirect damages exclusions, short 3-month liability limits, and immediate termination without cause clause requiring negotiation.',
    proList: [
      {
        id: 'p1',
        type: 'pro',
        title: 'Standard Payment Window',
        description: '30-day invoice settlement period with clear net-30 terms.'
      },
      {
        id: 'p2',
        type: 'pro',
        title: 'Mutual Confidentiality',
        description: 'Reciprocal protection for trade secrets for 3 years post-termination.'
      }
    ],
    conList: [
      {
        id: 'c1',
        type: 'con',
        title: 'Uncapped Consequential Liabilities',
        description: 'Contractor bears full indemnification burden for indirect third-party claims.'
      },
      {
        id: 'c2',
        type: 'con',
        title: 'Asymmetrical Audit Rights',
        description: 'Vendor retains right to inspect client facilities with only 24 hours notice.'
      }
    ],
    redFlags: [
      {
        id: 'rf-1',
        title: 'Uncapped Indirect Damages Exclusion',
        clauseNumber: 'Section 3.1',
        originalText: 'IN NO EVENT SHALL PROVIDER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT.',
        severity: 'HIGH',
        category: 'Liability',
        plainEnglish: 'The provider disclaims responsibility for consequential losses, exposing your business to indirect operational damages.',
        actionableTip: 'Negotiation Tip: Request mutual exclusion and specific carve-outs for breach of confidentiality or gross negligence.'
      },
      {
        id: 'rf-2',
        title: 'Aggressive 3-Month Liability Cap',
        clauseNumber: 'Section 3.2',
        originalText: "Provider's total aggregate liability under this Agreement shall not exceed the amount actually paid by Client in the preceding 3 months.",
        severity: 'MEDIUM',
        category: 'Liability',
        plainEnglish: 'Limits total recovery to only 3 months of fees paid, which is far lower than standard commercial 12-month norms.',
        actionableTip: 'Negotiation Tip: Push for a 12-month trailing cap or a fixed minimum threshold (e.g., $1M) appropriate for the contract value.'
      },
      {
        id: 'rf-3',
        title: 'Immediate Termination Without Cause',
        clauseNumber: 'Section 2.1',
        originalText: 'Either party may terminate this Agreement immediately upon written notice, without cause, and without penalty or further obligation.',
        severity: 'MEDIUM',
        category: 'Termination',
        plainEnglish: 'Allows cancellation without advance notice window, creating operational instability.',
        actionableTip: 'Negotiation Tip: Require 30 days advance written notice prior to termination without cause.'
      }
    ],
    documentSections: [
      {
        sectionTitle: 'MASTER SERVICE AGREEMENT',
        text: 'This Master Service Agreement (this "Agreement") is entered into as of the Effective Date by and between Provider Corp and Client Systems Inc.',
        isFlagged: false
      },
      {
        sectionTitle: '1. SERVICES & DELIVERABLES',
        text: 'Provider agrees to perform the professional engineering services described in each applicable Statement of Work ("SOW") executed by both parties.',
        isFlagged: false
      },
      {
        sectionTitle: '2. TERM AND TERMINATION',
        text: 'This Agreement shall commence on the Effective Date and continue until terminated.\n\nEither party may terminate this Agreement immediately upon written notice, without cause, and without penalty or further obligation.',
        isFlagged: true,
        severity: 'MEDIUM'
      },
      {
        sectionTitle: '3. LIMITATION OF LIABILITY',
        text: 'IN NO EVENT SHALL PROVIDER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT.\n\nProvider\'s total aggregate liability under this Agreement shall not exceed the amount actually paid by Client in the preceding 3 months.',
        isFlagged: true,
        severity: 'HIGH'
      },
      {
        sectionTitle: '4. GOVERNING LAW',
        text: 'This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.',
        isFlagged: false
      }
    ],
    documentText: `MASTER SERVICE AGREEMENT

This Master Service Agreement (this "Agreement") is entered into as of the Effective Date by and between Provider Corp and Client Systems Inc.

1. SERVICES & DELIVERABLES
Provider agrees to perform the professional engineering services described in each applicable Statement of Work ("SOW") executed by both parties.

2. TERM AND TERMINATION
This Agreement shall commence on the Effective Date and continue until terminated.
Either party may terminate this Agreement immediately upon written notice, without cause, and without penalty or further obligation.

3. LIMITATION OF LIABILITY
IN NO EVENT SHALL PROVIDER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT.
Provider's total aggregate liability under this Agreement shall not exceed the amount actually paid by Client in the preceding 3 months.

4. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.`
  },
  {
    id: 'doc-sla-2',
    fileName: 'Vendor_SLA_Subscription.docx',
    fileType: 'docx',
    contractType: 'SaaS Service Level Agreement',
    uploadDate: 'Aug 24, 2026',
    overallRiskScore: 54,
    riskLevel: 'MEDIUM',
    summary: 'Moderate Risk: Low 99.0% SLA uptime threshold without automatic service credit remedies and automatic annual fee escalation of 10%.',
    proList: [
      {
        id: 'p3',
        type: 'pro',
        title: 'SOC-2 Compliance Guaranteed',
        description: 'Vendor commits to annual SOC-2 Type II audit report delivery.'
      }
    ],
    conList: [
      {
        id: 'c3',
        type: 'con',
        title: 'Manual Credit Request Required',
        description: 'Client must claim SLA downtime credits within 5 business days or forfeit remedies.'
      }
    ],
    redFlags: [
      {
        id: 'rf-4',
        title: 'Automatic 10% Annual Price Escalation',
        clauseNumber: 'Section 5.3',
        originalText: 'Subscription fees shall automatically increase by 10% upon each annual renewal without prior notice or right to opt-out.',
        severity: 'MEDIUM',
        category: 'Payment',
        plainEnglish: 'Fees auto-compound every year without requirement for prior renegotiation.',
        actionableTip: 'Negotiation Tip: Cap annual increases to CPI or a maximum of 3% per annum.'
      },
      {
        id: 'rf-5',
        title: 'Exclusion of Scheduled Maintenance from Uptime',
        clauseNumber: 'Section 4.1',
        originalText: 'Vendor guarantees 99.0% uptime excluding emergency and unannounced maintenance windows up to 24 hours per month.',
        severity: 'MEDIUM',
        category: 'Liability',
        plainEnglish: 'Excludes up to 24 hours of maintenance from uptime calculation, lowering effective availability to 96.6%.',
        actionableTip: 'Negotiation Tip: Require 48 hours advance notice for maintenance and cap window to 4 hours per month.'
      }
    ],
    documentSections: [
      {
        sectionTitle: 'SAAS SERVICE LEVEL AGREEMENT',
        text: 'This SLA governs the performance and availability of the Cloud SaaS Platform provided to Subscriber.',
        isFlagged: false
      },
      {
        sectionTitle: '4. SERVICE AVAILABILITY & MAINTENANCE',
        text: 'Vendor guarantees 99.0% uptime excluding emergency and unannounced maintenance windows up to 24 hours per month.',
        isFlagged: true,
        severity: 'MEDIUM'
      },
      {
        sectionTitle: '5. RENEWAL & FEES',
        text: 'Subscription fees shall automatically increase by 10% upon each annual renewal without prior notice or right to opt-out.',
        isFlagged: true,
        severity: 'MEDIUM'
      }
    ],
    documentText: `SAAS SERVICE LEVEL AGREEMENT
This SLA governs the performance and availability of the Cloud SaaS Platform.
Vendor guarantees 99.0% uptime excluding emergency maintenance up to 24 hours per month. Fees automatically increase by 10% upon each renewal.`
  },
  {
    id: 'doc-nda-3',
    fileName: 'Mutual_NDA_Standard.pdf',
    fileType: 'pdf',
    contractType: 'Non-Disclosure Agreement',
    uploadDate: 'Aug 19, 2026',
    overallRiskScore: 18,
    riskLevel: 'LOW',
    summary: 'Low Risk: Balanced mutual NDA with standard 2-year confidentiality window and clear exclusions for public information.',
    proList: [
      {
        id: 'p4',
        type: 'pro',
        title: 'Mutual & Equal Obligations',
        description: 'Both parties are held to identical standards of care.'
      },
      {
        id: 'p5',
        type: 'pro',
        title: 'Defend Trade Secrets Act Notice Included',
        description: 'Full statutory protections for whistleblowers.'
      }
    ],
    conList: [],
    redFlags: [
      {
        id: 'rf-6',
        title: 'Indefinite Trade Secret Definition',
        clauseNumber: 'Section 2.4',
        originalText: 'Trade secrets shall remain confidential perpetually until disclosed publicly by disclosing party.',
        severity: 'LOW',
        category: 'Privacy',
        plainEnglish: 'Trade secrets remain protected indefinitely, which is standard for proprietary IP.',
        actionableTip: 'Negotiation Tip: Standard clause; ensure internal data governance reflects perpetual protection.'
      }
    ],
    documentSections: [
      {
        sectionTitle: 'MUTUAL NON-DISCLOSURE AGREEMENT',
        text: 'This Mutual Non-Disclosure Agreement is executed to evaluate potential business collaboration.',
        isFlagged: false
      },
      {
        sectionTitle: '2. CONFIDENTIALITY OBLIGATIONS',
        text: 'Each party agrees to hold the other party\'s Confidential Information in strict confidence for 2 years.\nTrade secrets shall remain confidential perpetually until disclosed publicly by disclosing party.',
        isFlagged: true,
        severity: 'LOW'
      }
    ],
    documentText: `MUTUAL NON-DISCLOSURE AGREEMENT
This Mutual NDA is executed between parties to evaluate business collaboration.
Each party agrees to hold Confidential Information in strict confidence for 2 years. Trade secrets remain protected perpetually.`
  },
  {
    id: 'doc-license-4',
    fileName: 'Enterprise_Software_License.pdf',
    fileType: 'pdf',
    contractType: 'Software License Agreement',
    uploadDate: 'Aug 12, 2026',
    overallRiskScore: 86,
    riskLevel: 'HIGH',
    summary: 'Critical Risk: Broad IP assignment trap, aggressive non-solicitation, and unrestricted access to client telemetry data.',
    proList: [
      {
        id: 'p6',
        type: 'pro',
        title: 'High Performance SLA',
        description: '99.99% uptime guarantee with direct tier-3 support access.'
      }
    ],
    conList: [
      {
        id: 'c4',
        type: 'con',
        title: '36-Month Non-Solicitation Restriction',
        description: 'Prohibits hiring any staff or contractor associated with vendor for 3 years.'
      }
    ],
    redFlags: [
      {
        id: 'rf-7',
        title: 'Feedback IP Assignment Clause',
        clauseNumber: 'Section 7.2',
        originalText: 'Client hereby assigns all right, title, and interest in any modifications, feedback, or derivative works to Licensor unconditionally.',
        severity: 'HIGH',
        category: 'IP Rights',
        plainEnglish: 'Any feedback or custom integration code created by your team automatically becomes property of the vendor.',
        actionableTip: 'Negotiation Tip: Change assignment to a non-exclusive, royalty-free license to feedback only, retaining IP rights to custom work.'
      },
      {
        id: 'rf-8',
        title: '36-Month Non-Solicitation Covenant',
        clauseNumber: 'Section 9.1',
        originalText: 'Neither party shall solicit, recruit, or hire any employee or contractor of the other party during the term and for 36 months thereafter.',
        severity: 'HIGH',
        category: 'Termination',
        plainEnglish: '3-year prohibition on recruiting talent is excessively long and unenforceable in many jurisdictions.',
        actionableTip: 'Negotiation Tip: Reduce non-solicit window to 12 months and limit scope to direct team members.'
      }
    ],
    documentSections: [
      {
        sectionTitle: 'ENTERPRISE SOFTWARE LICENSE AGREEMENT',
        text: 'Licensor grants Licensee a non-transferable enterprise license.',
        isFlagged: false
      },
      {
        sectionTitle: '7. INTELLECTUAL PROPERTY & FEEDBACK',
        text: 'Client hereby assigns all right, title, and interest in any modifications, feedback, or derivative works to Licensor unconditionally.',
        isFlagged: true,
        severity: 'HIGH'
      },
      {
        sectionTitle: '9. NON-SOLICITATION',
        text: 'Neither party shall solicit, recruit, or hire any employee or contractor of the other party during the term and for 36 months thereafter.',
        isFlagged: true,
        severity: 'HIGH'
      }
    ],
    documentText: `ENTERPRISE SOFTWARE LICENSE AGREEMENT
Licensor grants Licensee an enterprise license. Client assigns all rights in derivative works and feedback. Neither party shall solicit employees for 36 months.`
  }
];
