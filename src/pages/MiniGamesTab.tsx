import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Gamepad2, ChevronRight } from 'lucide-react';

export default function MiniGamesTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { t } = useSettings();

  const games = [
    { id: 'water-catch', label: t('cnwdWaterCatch') || 'CNWD Water Catch' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">{t('miniGames')}</h2>
      <div className="space-y-4">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveTab(game.id)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-700 rounded-xl">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="font-semibold text-green-900">{game.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-green-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
