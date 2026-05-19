import React, { createContext, useContext, useState } from 'react';
import { translations } from '../lib/i18n';
import { useNotifications } from './NotificationContext';

interface SettingsContextType {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  language: string;
  timeFormat: '12' | '24';
  toggleSound: () => void;
  toggleVibration: () => void;
  setLanguage: (lang: string) => void;
  setTimeFormat: (format: '12' | '24') => void;
  playFeedback: () => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addNotification } = useNotifications();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const setLanguageAndNotify = (lang: string) => {
    setLanguage(lang);
    addNotification("System language settings updated successfully.");
  };

  const setTimeFormatAndNotify = (format: '12' | '24') => {
    setTimeFormat(format);
    addNotification("Account time zone adjusted successfully.");
  };

  const toggleSound = () => setSoundEnabled(prev => !prev);
  const toggleVibration = () => setVibrationEnabled(prev => !prev);

  const playFeedback = () => {
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
    if (soundEnabled) {
      // Simple beep using Web Audio API
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.1);
      }
    }
  };

  return (
    <SettingsContext.Provider value={{ soundEnabled, vibrationEnabled, language, timeFormat, toggleSound, toggleVibration, setLanguage: setLanguageAndNotify, setTimeFormat: setTimeFormatAndNotify, playFeedback, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
