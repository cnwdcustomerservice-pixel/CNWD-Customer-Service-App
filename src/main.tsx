import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SettingsProvider } from './context/SettingsContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { SubmissionsProvider } from './context/SubmissionsContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <DarkModeProvider>
        <SubmissionsProvider>
          <App />
        </SubmissionsProvider>
      </DarkModeProvider>
    </SettingsProvider>
  </StrictMode>,
);
