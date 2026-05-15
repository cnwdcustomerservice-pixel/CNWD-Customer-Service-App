import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Eye, Goal, Droplets } from "lucide-react";

export default function CompanySection() {
  return (
    <div className="space-y-6">
      {/* Company Info */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center p-2 border">
              <Droplets className="h-10 w-10 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Company Information</CardTitle>
              <CardDescription>Camarines Norte Water District</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              CNWD is a government-owned and controlled corporation that manages water supply and sanitation services across the province. Established in 1973, it operates the province's water infrastructure and currently serves thousands of active service connections through a 25-year joint venture partnership.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mission, Vision & Goals — Accordion */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Mission, Vision & Goals</CardTitle>
          <CardDescription>Our guiding principles and objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="mission" className="border-b-0">
              <AccordionTrigger className="px-4 py-3 rounded-xl hover:bg-muted/50 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Target className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">Mission</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="ml-7 p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A mandate for water adequacy, a pledge to concessionaires' satisfaction.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="vision" className="border-b-0">
              <AccordionTrigger className="px-4 py-3 rounded-xl hover:bg-muted/50 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">Vision</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="ml-7 p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A dynamic water service provider committed to excellence in service.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="goals" className="border-b-0">
              <AccordionTrigger className="px-4 py-3 rounded-xl hover:bg-muted/50 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Goal className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">Goals</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="ml-7 space-y-2">
                  {[
                    "Improved and more reliable water works operation",
                    "Improved management of water sources",
                    "Expanded Organizational Efficiency",
                    "Improved Financial Stability",
                    "Increased Organizational Efficiency",
                    "Good Governance and Social Responsibility"
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-primary">{idx + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{goal}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
