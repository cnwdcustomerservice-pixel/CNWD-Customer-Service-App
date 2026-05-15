import { useState } from 'react';
import { usePwaInstall } from '../hooks/usePwaInstall';
import { Button } from './ui/button';

export function PwaInstallPrompt() {
  const { deferredPrompt, installApp } = usePwaInstall();
  const [dismissed, setDismissed] = useState(false);

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-xl border border-green-200 z-50 flex items-center justify-between">
      <div>
        <p className="font-bold text-green-900">Install CNWD App</p>
        <p className="text-sm text-green-700">Get quick access from your home screen.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" className="text-green-700" onClick={() => setDismissed(true)}>Later</Button>
        <Button className="bg-green-700 hover:bg-green-800" onClick={installApp}>Install</Button>
      </div>
    </div>
  );
}
