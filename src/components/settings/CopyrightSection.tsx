import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copyright } from "lucide-react";

export default function CopyrightSection() {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Copyright className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Copyright</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              © {new Date().getFullYear()} Camarines Norte Water District. All rights reserved. No part of this application may be reproduced or transmitted without express written permission.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
