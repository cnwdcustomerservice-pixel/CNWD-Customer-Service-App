import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone } from "lucide-react";

export default function PrivacySection() {
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
              <CardTitle className="text-lg">Privacy Notice</CardTitle>
              <CardDescription>Last Updated: May 2026</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This application is committed to protecting your personal data. We collect information necessary to facilitate water service requests, including your name, contact details, and service address. We do not sell your data to third parties. Your information is used solely for service fulfillment, billing, and system improvements. By using this app, you consent to our data management practices in accordance with local data protection laws.
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
              <CardTitle className="text-lg">Version Information</CardTitle>
              <CardDescription>App build details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 p-4 rounded-xl bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Version</span>
              <Badge variant="secondary" className="font-mono">1.0</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Build Details</span>
              <Badge variant="outline" className="font-mono">v1.00 (Stable)</Badge>
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Please provide this version number when contacting support for troubleshooting.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
