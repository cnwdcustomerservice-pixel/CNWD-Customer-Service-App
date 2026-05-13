import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfirmationDialog({ open, onClose }: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border-none p-0 overflow-hidden">
        <div className="bg-[#00c203] p-10 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl animate-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 text-[#00c203]" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">Thank you!</h2>
          <p className="text-white/80 text-sm font-medium">Your details have been successfully submitted.</p>
        </div>
        <div className="p-8 bg-card flex flex-col items-center space-y-4">
          <p className="text-center text-muted-foreground text-sm leading-relaxed">
            A confirmation email has been sent to your inbox. Our team will review your concern and reach out to you via call or email soon.
          </p>
          <Button 
            onClick={onClose} 
            className="w-full h-12 bg-[#00c203] hover:bg-[#00a802] text-white font-bold rounded-2xl"
          >
            Got it, Thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
