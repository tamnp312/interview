'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { vi, Translations } from './locales/vi';
import { en } from './locales/en';

export type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'vi',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: vi,
  isEn: false
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app_lang') as Language;
      if (saved === 'en' || saved === 'vi') {
        setLanguageState(saved);
        document.documentElement.setAttribute('lang', saved);
      } else {
        document.documentElement.setAttribute('lang', 'vi');
      }
    } catch (e) {}
    setMounted(true);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('app_lang', newLang);
      document.documentElement.setAttribute('lang', newLang);
      // Dispatch custom event for immediate component updates
      window.dispatchEvent(new Event('app_language_change'));
    } catch (e) {}
  };

  const toggleLanguage = () => {
    const next = language === 'vi' ? 'en' : 'vi';
    setLanguage(next);
  };

  const currentTranslations = language === 'en' ? en : vi;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: currentTranslations,
        isEn: language === 'en'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
