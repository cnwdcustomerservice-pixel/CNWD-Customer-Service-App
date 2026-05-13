import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, ClipboardList, PhoneCall, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface SubmissionSummaryProps {
  data: any;
  onNewRequest: () => void;
}

export default function SubmissionSummary({ data, onNewRequest }: SubmissionSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#00c203]/10 text-[#00c203] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Submission Successful</h2>
        <p className="text-muted-foreground mt-2">Thank you for letting us know.</p>
      </div>

      <Card className="border-[#00c203]/20 bg-[#00c203]/5 overflow-hidden rounded-3xl">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col items-center text-center pb-6 border-b border-[#00c203]/10">
            <p className="text-[10px] font-bold text-[#00c203] uppercase tracking-[0.2em] mb-1">Reference Number</p>
            <p className="text-3xl font-black text-foreground tracking-widest">{data.reference_number}</p>
            <p className="text-xs text-muted-foreground mt-2">Please keep this number for your records.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border">
                <ClipboardList className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Customer Details</p>
                <div className="text-sm text-foreground font-medium space-y-1">
                  <p><span className="text-muted-foreground font-normal">Name:</span> {data.full_name}</p>
                  <p><span className="text-muted-foreground font-normal">Address:</span> {data.complete_address}</p>
                  {data.account_number && <p><span className="text-muted-foreground font-normal">Account:</span> {data.account_number}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Contact Information</p>
                <div className="text-sm text-foreground font-medium space-y-1">
                  <p><span className="text-muted-foreground font-normal">Phone:</span> {data.contact_number}</p>
                  <p><span className="text-muted-foreground font-normal">Email:</span> {data.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Concerns / Complaints</p>
                <p className="text-sm text-foreground font-medium leading-relaxed">{data.concerns}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3 pt-4">
        <Button
          onClick={onNewRequest}
          variant="outline"
          className="w-full h-12 rounded-2xl font-bold gap-2 border-border"
        >
          <ArrowLeft className="w-4 h-4" />
          Submit Another Request
        </Button>
      </div>

      <div className="bg-muted/30 rounded-2xl p-4 text-center">
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          Our standard response time is 2-3 business days. For urgent water line leaks, please call our hotline immediately.
        </p>
      </div>
    </motion.div>
  );
}
