import React from 'react';
import { motion } from 'motion/react';
import { Calculator, MessageSquare, Phone, Settings, Bot, Home } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'service', label: 'Customer Service', icon: MessageSquare },
    { id: 'helpdesk', label: 'AI Helper', icon: Bot },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 flex items-center justify-around z-50 safe-area-bottom">
      {tabs.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          onClick={() => setActiveTab(id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-colors duration-200 ${
            activeTab === id
              ? 'text-[#00c203]'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {activeTab === id && (
            <motion.div
              layoutId="nav-active"
              className="absolute -top-1 w-6 h-1 bg-[#00c203] rounded-full"
            />
          )}
          <Icon className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
        </motion.button>
      ))}
    </nav>
  );
}
