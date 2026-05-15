import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { 
  Calculator, 
  MessageSquare, 
  Bot, 
  Phone, 
  Settings, 
  ChevronRight 
} from 'lucide-react';

export default function HomePage({ setActiveTab, isMenuOpen, setIsMenuOpen }: { setActiveTab: (tab: string) => void, isMenuOpen: boolean, setIsMenuOpen: (o: boolean) => void }) {
  const { t } = useSettings();

  const menuItems = [
    { id: 'calculator', label: t('calculator'), icon: Calculator },
    { id: 'service', label: t('customerService'), icon: MessageSquare },
    { id: 'helpdesk', label: t('aiHelpdesk'), icon: Bot },
    { id: 'contact', label: t('contact'), icon: Phone },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  return (
    <div className="flex flex-col items-center justify-between h-full bg-green-50 p-6">
      {!isMenuOpen ? (
        <div className="flex flex-col items-center justify-center flex-1 space-y-8">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-green-950 text-center tracking-tighter leading-tight">
              CAMARINES NORTE<br />WATER DISTRICT
            </h1>
          </div>
          
          <div className="text-center text-green-800 space-y-2">
            <p className="font-semibold text-lg">{t('servingSince')}</p>
            <p className="text-sm opacity-80 max-w-sm">{t('providingReliableWater')}</p>
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
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">{t('exploreServices')}</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-full py-3 mb-6 bg-green-100 text-green-800 rounded-full font-bold text-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
          >
            ← {t('backToHome') || 'Back to Home'}
          </button>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-green-900">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-green-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
