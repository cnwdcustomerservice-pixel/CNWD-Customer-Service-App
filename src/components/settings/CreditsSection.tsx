import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Package, Copyright } from "lucide-react";

export default function CreditsSection() {
  return (
    <div className="space-y-6">
      {/* Development Team */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Development Team</CardTitle>
              <CardDescription>Credits & acknowledgments</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { role: "UI/UX Design", name: "Vince G. Pagdagdagan" },
              { role: "Lead Developers", name: "Camarines Norte Water District" },
              { role: "Project Management", name: "Camarines Norte Water District" },
            ].map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <span className="text-sm text-muted-foreground">{member.role}</span>
                <span className="text-sm font-medium">{member.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Open-Source Libraries */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Open-Source Libraries</CardTitle>
              <CardDescription>Third-party technologies used</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-muted/50">
            {[
              "Base44 UI Framework",
              "React Native / Flutter Core",
              "Lucide Icons"
            ].map((lib, idx) => (
              <Badge key={idx} variant="secondary" className="px-3 py-1.5 text-xs font-medium">
                {lib}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
