import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Notification = {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
};

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (message: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => {
      const updated = [newNotification, ...prev];
      return updated.slice(0, 10);
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
