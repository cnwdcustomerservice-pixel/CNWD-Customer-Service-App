import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if it's already installed or if user dismissed
    const dismissed = localStorage.getItem('pwa-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 bg-card border border-border shadow-2xl rounded-2xl p-4 z-[60] flex items-center justify-between gap-4 max-w-sm mx-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00c203]/10 flex items-center justify-center shrink-0">
              <img
                src="https://media.base44.com/images/public/69fd3ef12d7f33f085978620/69976b757_Untitleddesign56.png"
                alt="Logo"
                className="w-7 h-7 rounded-lg object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">Save as App</p>
              <p className="text-xs text-muted-foreground">Access CNWD faster from home</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-[#00c203] hover:bg-[#00a802] text-white">
              Install
            </Button>
            <button onClick={handleDismiss} className="p-1 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
