import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import type { TabType, DocumentAnalysisReport, ChatMessage, UserProfile, NotificationItem } from './types';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OverviewDashboard } from './components/Dashboard/OverviewDashboard';
import { DocumentScannerView } from './components/DocumentScanner/DocumentScannerView';
import { SnippetFastScanView } from './components/SnippetScanner/SnippetFastScanView';
import { AiAssistantView } from './components/LegalChatbot/AiAssistantView';
import { HistoryWorkspace } from './components/History/HistoryWorkspace';
import { PhishingInspectorView } from './components/PhishingInspector/PhishingInspectorView';
import { AuthModalView } from './components/Auth/AuthModalView';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic User Profile State (Logged In User)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Mahak Rajpoot',
    email: 'mahak.rajpoot@security-ai.com',
    role: 'Security Analyst',
    initials: 'MR'
  });

  // Dual Mode State (Real Mode Default vs Presentation Demo Mode)
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Real Scanned Documents Array (Starts empty in Real Mode)
  const [realDocuments, setRealDocuments] = useState<DocumentAnalysisReport[]>([]);
  const [currentDoc, setCurrentDoc] = useState<DocumentAnalysisReport>(SAMPLE_DOCUMENTS[0]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'High Risk Flagged',
      message: 'Uncapped liability clause detected in NDA_Acme_Corp.pdf requiring legal review.',
      timestamp: '10m ago',
      read: false,
      type: 'critical'
    },
    {
      id: 'notif-2',
      title: 'Security Scan Complete',
      message: 'Service_Agreement.docx scanned successfully. 42/100 risk score assigned.',
      timestamp: '1h ago',
      read: true,
      type: 'info'
    }
  ]);

  // Search Query State
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Effective Documents List (Real Documents or Demo Sample Documents if Demo Mode Active)
  const effectiveDocuments = isDemoMode
    ? (realDocuments.length > 0 ? realDocuments : SAMPLE_DOCUMENTS)
    : realDocuments;

  // Sync activeTab with pathname
  const getActiveTabFromPath = (path: string): TabType => {
    if (path.includes('/login')) return 'login';
    if (path.includes('/scanner')) return 'scanner';
    if (path.includes('/snippet-scan')) return 'snippet-scan';
    if (path.includes('/ai-assistant')) return 'ai-assistant';
    if (path.includes('/history')) return 'history';
    if (path.includes('/website-checker')) return 'website-checker';
    return 'dashboard';
  };

  const activeTab = getActiveTabFromPath(location.pathname);

  const handleTabChange = (tab: TabType) => {
    switch (tab) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'scanner':
      case 'doc-scanner':
        navigate('/scanner');
        break;
      case 'snippet-scan':
        navigate('/snippet-scan');
        break;
      case 'ai-assistant':
        navigate('/ai-assistant');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'website-checker':
        navigate('/website-checker');
        break;
      case 'login':
      case 'auth':
        navigate('/login');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Initial Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'user',
      text: 'What is the liability cap in the active Master Service Agreement?',
      timestamp: '10:46 AM'
    },
    {
      id: 'msg-init-2',
      sender: 'ai',
      text: `Based on the uploaded ${currentDoc.fileName}, the liability cap is detailed in Section 3.2. Note that indirect consequential damages are uncapped in Section 3.1.`,
      timestamp: '10:46 AM',
      sectionQuote: {
        title: 'Section 3.2: Limitation of Liability Cap',
        quote: `"Provider's total aggregate liability under this Agreement shall not exceed the amount actually paid by Client in the preceding 3 months."`
      },
      clauseReferences: ['Section 3.1', 'Section 3.2']
    }
  ]);

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let replyText = `I have scanned "${text}" against vector store for ${currentDoc.fileName}.`;
      let sectionQuote = undefined;
      let clauseReferences = undefined;
      const lower = text.toLowerCase();
      
      if (lower.includes('termination') || lower.includes('cancel')) {
        replyText = `Under Section 2, either party may terminate immediately upon written notice without cause. Counter-clause tip: push for a 30-day advance notice requirement.`;
        sectionQuote = {
          title: 'Section 2: Term and Termination',
          quote: '"Either party may terminate this Agreement immediately upon written notice, without cause, and without penalty."'
        };
        clauseReferences = ['Section 2.1'];
      } else if (lower.includes('non-compete') || lower.includes('solicit')) {
        replyText = `Section 9 outlines a 36-month non-solicitation restriction on employee recruitment. This is far longer than standard 12-month industry norms.`;
        clauseReferences = ['Section 9.1'];
      } else if (lower.includes('governing law') || lower.includes('jurisdiction')) {
        replyText = `The agreement is governed under Delaware state law with exclusive jurisdiction in local courts.`;
        clauseReferences = ['Section 4.1'];
      } else if (lower.includes('liability') || lower.includes('cap')) {
        replyText = `Liability is capped at 3 months of fees paid (${currentDoc.redFlags[1]?.originalText || 'Section 3.2'}). AI Recommendation: Demand trailing 12-month cap.`;
        clauseReferences = ['Section 3.2'];
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sectionQuote,
        clauseReferences
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const handleCustomUpload = (fileName: string, text: string) => {
    const customReport: DocumentAnalysisReport = {
      id: `custom-${Date.now()}`,
      fileName,
      fileType: fileName.endsWith('.pdf') ? 'pdf' : fileName.endsWith('.docx') ? 'docx' : 'txt',
      contractType: 'Uploaded Legal Contract',
      uploadDate: 'Just Now',
      overallRiskScore: 74,
      riskLevel: 'HIGH',
      summary: `AI Scan completed for uploaded contract "${fileName}". 3 critical risk exposure clauses identified requiring legal review before signing.`,
      proList: [
        {
          id: 'cp1',
          type: 'pro',
          title: 'Standard Payment Terms',
          description: 'Payment due within 30 days of invoice.'
        }
      ],
      conList: [
        {
          id: 'cc1',
          type: 'con',
          title: 'Unilateral Indemnity Clause',
          description: 'Contractor bears full indemnification burden for third-party claims.'
        }
      ],
      redFlags: [
        {
          id: 'crf-1',
          title: 'Unilateral Broad Indemnification',
          clauseNumber: 'Uploaded Section 1',
          originalText: text.slice(0, 220) || 'Indemnification text uploaded by user.',
          severity: 'HIGH',
          category: 'Liability',
          plainEnglish: 'The text contains blanket indemnification terms requiring you to cover legal costs for the counterparty.',
          actionableTip: 'Negotiation Tip: Insert a fee cap limiting your liability to fees received in the prior 6 months.'
        }
      ],
      documentSections: [
        {
          sectionTitle: 'UPLOADED CONTRACT PREVIEW',
          text: text.slice(0, 450),
          isFlagged: true,
          severity: 'HIGH'
        }
      ],
      documentText: text
    };

    setRealDocuments((prev) => [customReport, ...prev]);
    setCurrentDoc(customReport);

    // Add a new real notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Scan Completed',
      message: `Analysis report for "${fileName}" generated with risk score 74.`,
      timestamp: 'Just now',
      read: false,
      type: 'critical'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    navigate('/scanner');
  };

  const handleDeleteDocument = (docId: string) => {
    setRealDocuments((prev) => prev.filter(d => d.id !== docId));
    if (currentDoc.id === docId && realDocuments.length > 1) {
      setCurrentDoc(realDocuments.find(d => d.id !== docId) || SAMPLE_DOCUMENTS[0]);
    }
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  const handleLoginSuccess = (updatedUser: UserProfile) => {
    setUserProfile(updatedUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans antialiased">
      
      {/* Top Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenChat={() => navigate('/ai-assistant')}
        chatMessageCount={chatMessages.length}
        userProfile={userProfile}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Layout: Sidebar + Canvas */}
      <div className="flex flex-1 min-w-0">
        
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          onNewScan={() => navigate('/scanner')}
        />

        {/* Route Canvas */}
        <main className="flex-1 min-w-0 bg-[#070A12] min-h-[calc(100vh-64px)] overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route
              path="/dashboard"
              element={
                <OverviewDashboard
                  userProfile={userProfile}
                  documents={realDocuments}
                  isDemoMode={isDemoMode}
                  onToggleDemoMode={setIsDemoMode}
                  onSelectTab={handleTabChange}
                  onSelectDocumentForScanner={(doc) => {
                    setCurrentDoc(doc);
                    navigate('/scanner');
                  }}
                />
              }
            />
            <Route
              path="/scanner"
              element={
                <DocumentScannerView
                  currentDoc={currentDoc}
                  allDocs={effectiveDocuments.length > 0 ? effectiveDocuments : SAMPLE_DOCUMENTS}
                  onSelectDoc={setCurrentDoc}
                  onBackToDashboard={() => navigate('/dashboard')}
                  onCustomUpload={handleCustomUpload}
                  onNavigateToChat={(doc) => {
                    setCurrentDoc(doc);
                    navigate('/ai-assistant');
                  }}
                />
              }
            />
            <Route
              path="/snippet-scan"
              element={<SnippetFastScanView onNavigate={handleTabChange} />}
            />
            <Route
              path="/ai-assistant"
              element={
                <AiAssistantView
                  documents={effectiveDocuments.length > 0 ? effectiveDocuments : SAMPLE_DOCUMENTS}
                  currentDoc={currentDoc}
                  onSelectDoc={setCurrentDoc}
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                />
              }
            />
            <Route
              path="/history"
              element={
                <HistoryWorkspace
                  documents={effectiveDocuments.length > 0 ? effectiveDocuments : SAMPLE_DOCUMENTS}
                  onSelectDocument={(doc) => setCurrentDoc(doc)}
                  onNavigate={handleTabChange}
                  onDeleteDocument={handleDeleteDocument}
                />
              }
            />
            <Route
              path="/website-checker"
              element={
                <div className="p-6">
                  <PhishingInspectorView />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <AuthModalView
                  currentUserProfile={userProfile}
                  onLoginSuccess={handleLoginSuccess}
                />
              }
            />
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </main>

      </div>

    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
