import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SettingsProvider } from './context/SettingsContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { SubmissionsProvider } from './context/SubmissionsContext';
import { NotificationProvider } from './context/NotificationContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <SettingsProvider>
        <DarkModeProvider>
          <SubmissionsProvider>
            <App />
          </SubmissionsProvider>
        </DarkModeProvider>
      </SettingsProvider>
    </NotificationProvider>
  </StrictMode>,
);
