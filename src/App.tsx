import React, { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { SubmissionsProvider } from './context/SubmissionsContext';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import CustomerService from './pages/CustomerService';
import ContactUs from './pages/ContactUs';
import SettingsTab from './pages/SettingsTab';
import InstallPrompt from './components/InstallPrompt';
import AIChatbox from './pages/AIChatbox';
import { SettingsProvider } from './context/SettingsContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { playFeedback } = useSettings();

  const handleSetActiveTab = (tab: string) => {
    playFeedback();
    setActiveTab(tab);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={handleSetActiveTab} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />;
      case 'calculator':
        return <CalculatorPage />;
      case 'service':
        return <CustomerService />;
      case 'helpdesk':
        return <AIChatbox />;
      case 'contact':
        return <ContactUs />;
      case 'settings':
        return <SettingsTab setActiveTab={handleSetActiveTab} />;
      default:
        return <HomePage setActiveTab={handleSetActiveTab} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />;
    }
  };

  return (
    <SettingsProvider>
    <DarkModeProvider>
      <SubmissionsProvider>
        <div className="flex flex-col h-screen bg-background text-foreground transition-colors duration-300 overflow-hidden">
          {activeTab !== 'home' && (
            <header className="h-16 flex items-center px-4 bg-green-600 border-b border-green-700">
              <button 
                onClick={() => { handleSetActiveTab('home'); setIsMenuOpen(true); }} 
                className="flex items-center gap-2 px-4 py-2 bg-[#00c203] text-white rounded-full font-semibold hover:bg-[#00a802] transition-colors shadow-sm"
              >
                <span>←</span>
                Menu
              </button>
            </header>
          )}
          <main className="flex-1 min-h-0 relative">
            {renderTab()}
          </main>
          
          <InstallPrompt />
          
        </div>
      </SubmissionsProvider>
    </DarkModeProvider>
    </SettingsProvider>
  );
}
