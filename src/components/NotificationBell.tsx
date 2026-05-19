import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationBell() {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (unreadCount > 0) {
      markAllAsRead();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className="p-2 text-white hover:bg-green-700 rounded-full transition-colors relative"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-green-600" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-0 border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
                <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full font-medium">
                  {unreadCount} New
                </span>
            )}
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm italic p-4 text-center">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={`p-3 rounded-lg text-sm transition-colors ${n.read ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : 'bg-green-50 dark:bg-green-900/20'}`}>
                  <p className={`font-medium ${n.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>{n.message}</p>
                  <span className="text-xs text-gray-400 mt-1 block">{n.timestamp.toLocaleTimeString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
