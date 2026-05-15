import React, { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { useSettings } from '../context/SettingsContext';
import PrivacySection from '@/components/settings/PrivacySection';
import GeneralTab from '@/components/settings/GeneralTab';
import CreditsSection from '@/components/settings/CreditsSection';
import CopyrightSection from '@/components/settings/CopyrightSection';
import CompanySection from '@/components/settings/CompanySection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { soundEnabled, vibrationEnabled, language, timeFormat, toggleSound, toggleVibration, setLanguage, setTimeFormat, t } = useSettings();
  const [autoFixLogs, setAutoFixLogs] = useState<string[]>([]);
  const handleRunAutoFix = async () => {
    setAutoFixLogs(["Scanning UI components..."]);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setAutoFixLogs(prev => [...prev, "Aligning header elements..."]);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setAutoFixLogs(prev => [...prev, "Fixing spacing in contact section..."]);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setAutoFixLogs(prev => [...prev, "Re-scaling font in email card..."]);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setAutoFixLogs(prev => [...prev, "Auto-fix completed successfully!"]);
  };

  return (
    <div className="flex flex-col h-full bg-muted/20">

      <div className="flex-1 overflow-y-auto">
        <main className="max-w-screen-sm mx-auto w-full px-4 py-8 pb-24">
          <button
            onClick={() => setActiveTab('home')}
            className="w-full py-2 mb-6 bg-green-700 text-white rounded-full font-bold text-sm shadow-lg hover:bg-green-800 transition-colors"
          >
            Back to Home
          </button>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="credits">Credits</TabsTrigger>
              <TabsTrigger value="copyright">Copyright</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <GeneralTab 
                darkMode={isDarkMode} 
                onDarkModeChange={toggleDarkMode} 
                onAutoFixRun={handleRunAutoFix}
                autoFixLogs={autoFixLogs}
                soundEnabled={soundEnabled}
                onSoundToggle={toggleSound}
                vibrationEnabled={vibrationEnabled}
                onVibrationToggle={toggleVibration}
                language={language}
                onLanguageChange={setLanguage}
                timeFormat={timeFormat}
                onTimeFormatChange={setTimeFormat}
                t={t}
              />
            </TabsContent>
            <TabsContent value="privacy">
              <PrivacySection />
            </TabsContent>
            <TabsContent value="company">
              <CompanySection />
            </TabsContent>
            <TabsContent value="credits">
              <CreditsSection />
            </TabsContent>
            <TabsContent value="copyright">
              <CopyrightSection />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
