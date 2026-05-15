import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun, Wrench, Volume2, Smartphone, Globe, Clock3 } from "lucide-react";

export default function GeneralTab({ darkMode, onDarkModeChange, onAutoFixRun, autoFixLogs, soundEnabled, onSoundToggle, vibrationEnabled, onVibrationToggle, language, onLanguageChange, timeFormat, onTimeFormatChange, t }: any) {
  return (
    <div className="space-y-6">
      {/* Auto-Fix */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{t('autoFixApp') || 'Auto-Fix App'}</CardTitle>
              <CardDescription>{t('fixUiUxIssues') || 'Fix UI/UX issues'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={onAutoFixRun} className="w-full flex items-center gap-2">
            <Wrench className="h-4 w-4" /> {t('runAutoFix') || 'Run Auto-Fix'}
          </Button>
          
          {autoFixLogs.length > 0 && (
            <div className="p-3 bg-muted rounded-xl text-xs font-mono text-muted-foreground max-h-40 overflow-y-auto space-y-1">
              {autoFixLogs.map((log: string, idx: number) => (
                <div key={idx}>{`> ${log}`}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* General Settings: Language & Time */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{t('generalPreferences') || 'General Preferences'}</CardTitle>
              <CardDescription>{t('languageAndTimeFormat') || 'Language and time format'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language-select">{t('language') || 'Language'}</Label>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger id="language-select">
                <SelectValue placeholder={t('selectLanguage') || 'Select language'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (US)</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time-format-select">{t('timeFormat') || 'Time Format'}</Label>
            <Select value={timeFormat} onValueChange={onTimeFormatChange}>
              <SelectTrigger id="time-format-select">
                <SelectValue placeholder={t('selectTimeFormat') || 'Select time format'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">{t('12Hour') || '12 Hour'}</SelectItem>
                <SelectItem value="24">{t('24Hour') || '24 Hour'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Volume2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{t('feedback') || 'Feedback'}</CardTitle>
              <CardDescription>{t('hapticAndSound') || 'Haptic and sound settings'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div className="space-y-1">
              <Label htmlFor="sound-toggle" className="text-sm font-medium flex items-center gap-2">
                <Volume2 className="h-4 w-4" /> {t('sound') || 'Sound'}
              </Label>
            </div>
            <Switch
              id="sound-toggle"
              checked={soundEnabled}
              onCheckedChange={onSoundToggle}
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div className="space-y-1">
              <Label htmlFor="vibration-toggle" className="text-sm font-medium flex items-center gap-2">
                <Smartphone className="h-4 w-4" /> {t('vibration') || 'Vibration'}
              </Label>
            </div>
            <Switch
              id="vibration-toggle"
              checked={vibrationEnabled}
              onCheckedChange={onVibrationToggle}
            />
          </div>
        </CardContent>
      </Card>
 
      {/* Appearance */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-lg">{t('appearance') || 'Appearance'}</CardTitle>
              <CardDescription>{t('customizeLookFeel') || 'Customize the look and feel'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div className="space-y-1">
              <Label htmlFor="dark-mode" className="text-sm font-medium">
                {t('darkMode') || 'Dark Mode'}
              </Label>
              <p className="text-xs text-muted-foreground max-w-sm">
                {t('darkModeDescription') || 'Switch between light and dark themes for better visibility in different lighting conditions'}
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={onDarkModeChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
