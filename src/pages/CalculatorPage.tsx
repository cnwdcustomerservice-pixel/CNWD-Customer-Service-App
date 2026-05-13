import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator, Droplets, Receipt, AlertCircle, WifiOff } from 'lucide-react';

const RATES: Record<string, Record<string, any>> = {
  residential: {
    '1/2"':   { min: 202.00,   r11_20: 24.25, r21_30: 26.35, r31_40: 28.45, over41: 30.55 },
    '3/4"':   { min: 323.00,   r11_20: 24.25, r21_30: 26.35, r31_40: 28.45, over41: 30.55 },
    '1"':     { min: 646.00,   r11_20: 24.25, r21_30: 26.35, r31_40: 28.45, over41: 30.55 },
    '1 1/2"': { min: 1616.00,  r11_20: 24.25, r21_30: 26.35, r31_40: 28.45, over41: 30.55 },
    '2"':     { min: 4039.00,  r11_20: 24.25, r21_30: 26.35, r31_40: 28.45, over41: 30.55 },
    '3"':     { min: 7270.00,  r11_20: 24.25, r21_30: 26.35, r31_40: 28.45, over41: 30.55 },
    '4"':     { min: 14541.00, r11_20: 24.25, r21_30: 26.35, r31_40: 28.45, over41: 30.55 },
  },
  commercial: {
    '1/2"':   { min: 404.00,   r11_20: 48.50, r21_30: 52.70, r31_40: 56.90, over41: 61.10 },
    '3/4"':   { min: 646.00,   r11_20: 48.50, r21_30: 52.70, r31_40: 56.90, over41: 61.10 },
    '1"':     { min: 1292.00,  r11_20: 48.50, r21_30: 52.70, r31_40: 56.90, over41: 61.10 },
    '1 1/2"': { min: 3232.00,  r11_20: 48.50, r21_30: 52.70, r31_40: 56.90, over41: 61.10 },
    '2"':     { min: 8078.00,  r11_20: 48.50, r21_30: 52.70, r31_40: 56.90, over41: 61.10 },
    '3"':     { min: 14540.00, r11_20: 48.50, r21_30: 52.70, r31_40: 56.90, over41: 61.10 },
    '4"':     { min: 29082.00, r11_20: 48.50, r21_30: 52.70, r31_40: 56.90, over41: 61.10 },
  }
};

const PIPE_SIZES = ['1/2"', '3/4"', '1"', '1 1/2"', '2"', '3"', '4"'];

function calculateBill(type: string, pipeSize: string, consumption: string) {
  const cu = parseFloat(consumption);
  if (!type || !pipeSize || isNaN(cu) || cu < 0) return null;

  const rate = RATES[type][pipeSize];
  if (!rate) return null;

  let total = rate.min;
  const breakdown = [
    { label: 'Minimum Charge (First 10 Cu.m)', amount: rate.min }
  ];

  if (cu <= 10) {
    return { total, breakdown, consumption: cu };
  }

  const tier1 = Math.min(cu - 10, 10);
  if (tier1 > 0) {
    const charge = tier1 * rate.r11_20;
    total += charge;
    breakdown.push({ label: `11–20 Cu.m (${tier1} × ₱${rate.r11_20.toFixed(2)})`, amount: charge });
  }

  const tier2 = Math.min(Math.max(cu - 20, 0), 10);
  if (tier2 > 0) {
    const charge = tier2 * rate.r21_30;
    total += charge;
    breakdown.push({ label: `21–30 Cu.m (${tier2} × ₱${rate.r21_30.toFixed(2)})`, amount: charge });
  }

  const tier3 = Math.min(Math.max(cu - 30, 0), 10);
  if (tier3 > 0) {
    const charge = tier3 * rate.r31_40;
    total += charge;
    breakdown.push({ label: `31–40 Cu.m (${tier3} × ₱${rate.r31_40.toFixed(2)})`, amount: charge });
  }

  const tier4 = Math.max(cu - 40, 0);
  if (tier4 > 0) {
    const charge = tier4 * rate.over41;
    total += charge;
    breakdown.push({ label: `Over 41 Cu.m (${tier4} × ₱${rate.over41.toFixed(2)})`, amount: charge });
  }

  return { total, breakdown, consumption: cu };
}

const fmt = (n: number) => `₱${Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CalculatorPage() {
  const [customerType, setCustomerType] = useState('');
  const [pipeSize, setPipeSize] = useState('');
  const [consumption, setConsumption] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleCalculate = () => {
    setError('');
    if (!customerType) { setError('Please select a customer type.'); return; }
    if (!pipeSize) { setError('Please select a pipe size.'); return; }
    const cu = parseFloat(consumption);
    if (isNaN(cu) || cu < 0) { setError('Please enter a valid water consumption.'); return; }
    const calc = calculateBill(customerType, pipeSize, consumption);
    setResult(calc);
  };

  const handleReset = () => {
    setCustomerType('');
    setPipeSize('');
    setConsumption('');
    setResult(null);
    setError('');
  };

  return (
    <div className="flex flex-col h-full">
      {!isOnline && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2 flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm">
          <WifiOff className="w-4 h-4 shrink-0" />
          You're offline — calculation works without internet.
        </div>
      )}

      {/* Header */}
      <div className="bg-[#00c203] shrink-0 sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl overflow-hidden shrink-0 bg-[#00a802]">
              <img
                src="https://media.base44.com/images/public/69fd3ef12d7f33f085978620/69976b757_Untitleddesign56.png"
                alt="CNWD Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight leading-tight text-white">
                Water Bill Calculator
              </h1>
              <p className="text-xs mt-0.5 text-white/80">
                Camarines Norte Water District
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Icons removed as requested */}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Input Form */}
            <div className="bg-card border border-border rounded-2xl shadow-sm p-5 sm:p-6 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00c203]/10 flex items-center justify-center shrink-0">
                  <Calculator className="w-6 h-6 text-[#00c203]" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground text-base">Usage Details</h2>
                  <p className="text-muted-foreground text-xs">Enter meter information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-foreground">Customer Type</Label>
                  <Select value={customerType} onValueChange={setCustomerType}>
                    <SelectTrigger className="h-11 bg-muted/40 border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential / Government</SelectItem>
                      <SelectItem value="commercial">Commercial / Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-foreground">Pipe Size (Diameter)</Label>
                  <Select value={pipeSize} onValueChange={setPipeSize}>
                    <SelectTrigger className="h-11 bg-muted/40 border-border">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {PIPE_SIZES.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-foreground">Water Consumption (Cu.m)</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Enter cubic meters used"
                    value={consumption}
                    onChange={e => setConsumption(e.target.value)}
                    className="h-11 bg-muted/40 border-border"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 h-12 bg-[#00c203] hover:bg-[#00a802] text-white font-bold gap-2 text-base shadow-lg shadow-[#00c203]/20"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate
                  </Button>
                  {result && (
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="h-12 px-5 font-semibold border-border"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-2 border-t border-border pt-4">
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Legal Notice & References</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Rates per LWUA BOT Resolution No. 058, s. 2014 — Effective August 2014.
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                  * This calculator provides an estimate only. Actual bill may include environmental charges, arrears, or other fees.
                </p>
              </div>
            </div>

            {/* Result Display */}
            <div className="bg-card border border-border rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col min-h-[300px]">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Droplets className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                    <p className="font-bold text-lg text-foreground mb-1">No Ready Breakdown</p>
                    <p className="text-sm text-muted-foreground max-w-[240px]">
                      Enter your details and click Calculate to see your bill here.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                      <div className="w-10 h-10 rounded-xl bg-[#00c203]/10 flex items-center justify-center">
                        <Receipt className="w-6 h-6 text-[#00c203]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">Bill Summary</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                          {customerType} · {pipeSize} pipe
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#00c203]/5 border border-[#00c203]/10 rounded-xl px-5 py-3 mb-6 flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground/80">Consumption</span>
                      <span className="font-extrabold text-[#00c203] text-lg">{result.consumption} Cu.m</span>
                    </div>

                    <div className="space-y-4 flex-1">
                      {result.breakdown.map((item: any, i: number) => (
                        <div key={i} className="flex items-start justify-between gap-4 text-sm px-1">
                          <span className="text-muted-foreground text-sm leading-tight">{item.label}</span>
                          <span className="font-bold text-foreground tabular-nums whitespace-nowrap">{fmt(item.amount)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t-2 border-border border-dashed">
                      <div className="bg-[#00c203] rounded-2xl px-6 py-5 flex items-center justify-between shadow-lg shadow-[#00c203]/30">
                        <span className="text-white font-bold text-lg">Amount Due</span>
                        <span className="text-white font-black text-2xl tracking-tight">{fmt(result.total)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
