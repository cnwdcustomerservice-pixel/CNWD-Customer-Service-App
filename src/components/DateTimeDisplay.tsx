import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

const DateTimeDisplay: React.FC = () => {
  const { timeFormat, language } = useSettings();
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format using Philippines Timezone, but with user's language
  const philippineTime = new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja-JP' : language === 'ko' ? 'ko-KR' : 'en-PH', {
    timeZone: 'Asia/Manila',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: timeFormat === '12',
  }).format(dateTime);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-mono text-white text-center">
      {philippineTime}
    </div>
  );
};

export default DateTimeDisplay;
