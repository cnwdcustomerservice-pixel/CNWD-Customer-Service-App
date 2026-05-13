import React, { createContext, useContext, useState, useEffect } from 'react';

const SubmissionsContext = createContext<any>(null);

export function SubmissionsProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = useState<any[]>(() => {
    const saved = localStorage.getItem('cnwd_submissions');
    return saved ? JSON.parse(saved) : [];
  });
  const [notifications, setNotifications] = useState<any[]>(() => {
    const saved = localStorage.getItem('cnwd_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cnwd_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    const now = Date.now();
    const validNotifications = notifications.filter(
      (n) => now - new Date(n.timestamp || n.id).getTime() < 24 * 60 * 60 * 1000
    );
    if (validNotifications.length !== notifications.length) {
      setNotifications(validNotifications);
    }
    localStorage.setItem('cnwd_notifications', JSON.stringify(validNotifications));
  }, [submissions]); // Run auto-cleanup

  const addSubmission = (data: any) => {
    const now = Date.now();
    const newSubmission = { ...data, id: now, timestamp: new Date().toISOString() };
    setSubmissions(prev => [newSubmission, ...prev]);
    setNotifications(prev => [...prev, { id: now, message: 'Submission Received: Thank you for reaching out to CNWD. Your request has been successfully submitted, and our team will get back to you shortly.', timestamp: new Date().toISOString() }]);
  };

  const deleteSubmission = (id: number) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SubmissionsContext.Provider value={{ submissions, notifications, addSubmission, deleteSubmission, deleteNotification, clearNotifications }}>
      {children}
    </SubmissionsContext.Provider>
  );
}

export const useSubmissions = () => useContext(SubmissionsContext);
