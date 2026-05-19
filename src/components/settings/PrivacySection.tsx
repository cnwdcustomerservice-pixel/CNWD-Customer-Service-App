import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone } from "lucide-react";

export default function PrivacySection({ t }: { t: (key: string) => string }) {
  return (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{t('privacyNotice')}</CardTitle>
              <CardDescription>{t('lastUpdated')}: May 2026</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('privacyContent')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Version Information */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{t('versionInformation')}</CardTitle>
              <CardDescription>{t('appBuildDetails')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 p-4 rounded-xl bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('currentVersion')}</span>
              <Badge variant="secondary" className="font-mono">1.0</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('buildDetails')}</span>
              <Badge variant="outline" className="font-mono">v1.00 (Stable)</Badge>
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              {t('provideVersion')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
