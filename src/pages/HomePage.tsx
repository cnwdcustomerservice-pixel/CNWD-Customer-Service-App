import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { useDarkMode } from '../context/DarkModeContext';
import { 
  Calculator, 
  MessageSquare, 
  Bot, 
  Phone, 
  Settings, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

export default function HomePage({ setActiveTab, isMenuOpen, setIsMenuOpen }: { setActiveTab: (tab: string) => void, isMenuOpen: boolean, setIsMenuOpen: (o: boolean) => void }) {
  const { t } = useSettings();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const menuItems = [
    { id: 'calculator', label: t('calculator'), icon: Calculator },
    { id: 'service', label: t('customerService'), icon: MessageSquare },
    { id: 'helpdesk', label: t('aiHelpdesk'), icon: Bot },
    { id: 'contact', label: t('contact'), icon: Phone },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <div className={`flex flex-col items-center justify-between h-full p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      {!isMenuOpen ? (
        <div className="flex flex-col items-center justify-center flex-1 space-y-8 w-full">
          <div className="flex flex-col items-center">
            <h1 className={`text-3xl font-extrabold text-center tracking-tighter leading-tight ${isDarkMode ? 'text-white' : 'text-green-950'}`}>
              CAMARINES NORTE<br />WATER DISTRICT
            </h1>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-full max-w-xs py-4 bg-green-700 text-white rounded-full font-bold text-lg shadow-lg hover:bg-green-800 transition-colors"
          >
            {t('getStarted')}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md pt-4 flex flex-col flex-1 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold text-center flex-1 ${isDarkMode ? 'text-white' : 'text-green-900'}`}>{t('exploreServices')}</h2>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-green-100 text-green-800'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`w-full py-3 mb-6 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
          >
            ← {t('backToHome') || 'Back to Home'}
          </button>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700 text-green-400' : 'bg-green-100 text-green-700'}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-green-900'}`}>{item.label}</span>
                </div>
                <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-green-400'}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
