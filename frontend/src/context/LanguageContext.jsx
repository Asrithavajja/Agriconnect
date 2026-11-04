import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('agri_lang') || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('agri_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (keyPath, fallback = '') => {
    const keys = keyPath.split('.');
    let current = translations[language] || translations.en;

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if translation missing in requested language
        let fallbackCurrent = translations.en;
        for (const fKey of keys) {
          if (fallbackCurrent && fallbackCurrent[fKey] !== undefined) {
            fallbackCurrent = fallbackCurrent[fKey];
          } else {
            return fallback || keyPath;
          }
        }
        return fallbackCurrent || fallback || keyPath;
      }
    }

    return typeof current === 'string' ? current : fallback || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
