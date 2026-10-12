import React, { createContext, useContext, useEffect, useState } from 'react';
import { axiosInstanceNoToken } from '../axios/config';

export interface SiteSettings {
  championshipName: string;
  logo: string;
  sidebarLogo: string;
  loginImage: string;
  favicon: string;
}

const STORAGE_KEY = 'siteSettings';

// Used until the backend answers, and for any image not uploaded yet
const defaultSettings: SiteSettings = {
  championshipName: 'CHIKUBUKAI NATIONAL OPEN KARATE CHAMPIONSHIP 2025',
  logo: '/static/images/new_logo_karate___2_-removebg-preview.png',
  sidebarLogo: '/static/images/kumite (1).jpg',
  loginImage: '/static/images/TAKESH-removebg-preview.png',
  favicon: '/static/images/SANKUKAI LOGO.png',
};

const readCache = (): SiteSettings => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? { ...defaultSettings, ...JSON.parse(cached) } : defaultSettings;
  } catch (error) {
    return defaultSettings;
  }
};

const SiteSettingsContext = createContext<SiteSettings>(defaultSettings);

export const SiteSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  // Render straight away from the cached copy, then refresh it in the background
  const [settings, setSettings] = useState<SiteSettings>(readCache);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data }: any = await axiosInstanceNoToken.get('/api/site-settings/');
        const fresh: SiteSettings = {
          championshipName: data.championship_name || defaultSettings.championshipName,
          logo: data.logo || defaultSettings.logo,
          sidebarLogo: data.sidebar_logo || defaultSettings.sidebarLogo,
          loginImage: data.login_image || defaultSettings.loginImage,
          favicon: data.favicon || defaultSettings.favicon,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
        setSettings((current) =>
          JSON.stringify(current) === JSON.stringify(fresh) ? current : fresh,
        );
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    document.title = settings.championshipName;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.removeAttribute('type');
    link.href = settings.favicon;
    // Warm the browser cache so the images are ready when a page needs them
    [settings.logo, settings.sidebarLogo, settings.loginImage].forEach((src) => {
      new Image().src = src;
    });
  }, [settings]);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
