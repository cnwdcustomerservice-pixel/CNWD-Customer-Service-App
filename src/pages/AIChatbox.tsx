import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, Loader2, Bot, User, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import InstallPrompt from '@/components/InstallPrompt';

const SYSTEM_KNOWLEDGE = `
You are the official AI assistant for the Camarines Norte Water District (CNWD). Be helpful, professional, and friendly. Always maintain a professional tone.

CNWD KNOWLEDGE BASE:
- Full Name: Camarines Norte Water District (CNWD)
- General Manager: Engr. Froilindo I. Villaluz
- Address: Vinzons Avenue, Barangay Lag-on, Daet, Camarines Norte
- Phone: 0950-900-4639 / 0992-595-1351
- Telephone: (054) 885-3488
- Email: cnwdcustomerservice@gmail.com
- Facebook: Camarines Norte Water District
- Website: If the user asks about the website, respond: "sorry, the cnwd website is currently underconstruction"
- Office Hours: Monday–Friday, 8:00 AM – 5:00 PM
- History: CNWD was established in 1973 to provide safe, adequate, and reliable water supply to residents of Camarines Norte. From its inception in 1973 to current operations in 2026, CNWD has been committed to public service and infrastructure development, operating under the Local Water Utilities Administration (LWUA) framework.

LANGUAGE CAPABILITY:
- Fluent in English and Tagalog/Filipino.
- If the user interacts in Tagalog or asks for Tagalog, respond in Tagalog. Otherwise, respond in English.

WATER BILL RATES (Effective August 2014, LWUA BOT Resolution No. 058, s. 2014):
Residential/Government:
- 1/2" pipe: Minimum ₱202.00 (first 10 Cu.m), then ₱24.25/Cu.m (11-20), ₱26.35 (21-30), ₱28.45 (31-40), ₱30.55 (over 41)
Commercial/Industrial: Double the residential rates.

WATER & PIPES INFO:
- Water is safe and tested regularly per PNSDW standards.
- Common pipe sizes: 1/2", 3/4", 1", 1-1/2", 2", 3", 4"
- Minimum charge covers the first 10 cubic meters of consumption.

APP MINOR ISSUES YOU CAN HELP FIX (Auto-Fix for minor issues only):
- Calculator not showing results: Ask user to check they selected Customer Type and Pipe Size before entering cubic meters and clicking Calculate.
- Navigation not working: Suggest refreshing the page or clearing the browser cache.
- Page not loading: Ask if they have internet connection. Remind them only Calculator works offline.
- Layout or display issues: Suggest rotating the device or zooming out in the browser.
- Form not submitting: Check that all required fields are filled, Gmail address is valid, and phone number format is correct (+63XXXXXXXXXX or 0XXXXXXXXXX).
- How to use the calculator: Select customer type, pipe size, enter cubic meters, click Calculate.
- How to submit a service request: Go to Customer Service tab, fill all fields, attach photos if needed, click Submit.
- How to contact CNWD: Go to the "Contact Us" tab.
- Offline mode: Only the Calculator works offline. Other tabs require internet.
- Install app: Tap the "Install" popup or use your browser's "Add to Home Screen" option.

NATURE, ENVIRONMENT & WATER CONSERVATION KNOWLEDGE:
- Water conservation: Turn off taps when not in use, fix leaking pipes immediately, use water-efficient appliances, collect rainwater for gardening.
- Importance of clean water: Clean water is essential for drinking, cooking, sanitation, agriculture, and ecosystem health. Access to safe water is a basic human right.
- Water cycle: Water evaporates from oceans/rivers, forms clouds, falls as rain, flows back to oceans through rivers and groundwater. Conserving water protects this cycle.
- Rivers and oceans: Rivers are freshwater lifelines for communities and ecosystems. Oceans cover 71% of Earth and regulate climate. Avoid dumping waste in waterways.
- Trees and forests: Trees absorb CO2, produce oxygen, prevent soil erosion, and help maintain the water cycle. Deforestation leads to floods and water scarcity.
- Climate awareness: Climate change causes irregular rainfall, droughts, and floods — all directly affecting water supply. Reducing carbon footprint helps protect water resources.
- Natural disasters: Typhoons, floods, and landslides can contaminate water sources. During disasters, boil water before drinking unless CNWD confirms it is safe.
- Basic environmental education: Reduce plastic use, segregate waste, plant trees, and conserve electricity and water to protect the environment for future generations.
- Earth and environment: The Earth's freshwater is only about 3% of all water — most is frozen in glaciers. Protecting groundwater and rivers is critical for survival.

IMPORTANT RULES:
- For MINOR app issues (calculator, navigation, form, display), provide helpful step-by-step guidance.
- For MAJOR technical issues (system outages, data loss, billing disputes, server errors, security), always say: "For major concerns, please contact CNWD directly at (054) 885-3488 or email cnwdcustomerservice@gmail.com."
- If you cannot understand a message or cannot help, respond EXACTLY: "Sorry, I can't understand that. For more information, please chat with the CNWD Customer Service."
- Never attempt to fix database, server, security, or critical system issues.
- Always be professional, clear, and concise.
`;

const WELCOME = {
  role: 'assistant',
  content: "Hello! 👋 I'm the CNWD AI Assistant. / Kumusta! 👋 Ako ang CNWD AI Assistant. I can help you with water bill questions, service requests, app guidance, and general CNWD information. How can I assist you today? / Paano kita matutulungan ngayon?",
};

export default function AIChatbox() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // @ts-ignore
  const bottomRef = useRef(null);

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

  useEffect(() => {
    // @ts-ignore
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!isOnline) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const historyForLLM = newMessages.slice(-10).map(m => `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.content}`).join('\n');

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${SYSTEM_KNOWLEDGE}\n\nConversation so far:\n${historyForLLM}\n\nRespond to the customer's latest message. Be concise, friendly, and professional. Use markdown for formatting if helpful.`,
    });

    setMessages(prev => [...prev, { role: 'assistant', content: typeof response === 'string' ? response : response || "I'm sorry, I couldn't quite understand that. For more help, please chat with the CNWD Customer Service at cnwdcustomerservice@gmail.com." }]);
    setLoading(false);
  };

  const handleKey = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {!isOnline && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-amber-700 text-sm">
          <Wifi className="w-4 h-4" />
          You're offline. The AI Helpdesk requires an internet connection.
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto pb-36">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#00c203]/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-[#00c203]" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-[#00c203] text-white rounded-tr-sm'
                  : 'bg-card border border-border text-foreground rounded-tl-sm shadow-sm'
              }`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-[#00c203]/10 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#00c203]" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#00c203]" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
          {/* @ts-ignore */}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border px-4 py-3 z-30">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={isOnline ? "Type your message..." : "No internet connection"}
            disabled={loading || !isOnline}
            className="flex-1 h-11 rounded-xl border-border bg-muted/40"
          />
          <Button
            onClick={sendMessage}
            disabled={loading || !input.trim() || !isOnline}
            className="h-11 w-11 rounded-xl bg-[#00c203] hover:bg-[#00a802] text-white shrink-0 p-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-1.5">
          AI may make mistakes. For major issues, contact CNWD directly.
        </p>
      </div>
    </div>
  );
}
