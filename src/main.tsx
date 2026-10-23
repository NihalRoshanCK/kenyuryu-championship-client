import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { SiteSettingsProvider } from './context/SiteSettings';
import { ChampionshipConfigProvider } from './context/ChampionshipConfig';
import './index.css';
import './satoshi.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <SiteSettingsProvider>
        <ChampionshipConfigProvider>
          <App />
        </ChampionshipConfigProvider>
      </SiteSettingsProvider>
    </Router>
  </React.StrictMode>
);
