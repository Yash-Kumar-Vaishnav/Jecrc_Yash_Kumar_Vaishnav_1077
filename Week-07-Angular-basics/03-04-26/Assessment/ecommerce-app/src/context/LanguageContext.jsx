import { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en';
import hi from '../i18n/hi';
import fr from '../i18n/fr';
import ar from '../i18n/ar';

// All supported languages
export const LANGUAGES = [
  { code: 'en', label: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी',    flag: '🇮🇳', dir: 'ltr' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'العربية',  flag: '🇸🇦', dir: 'rtl' },
];

const translations = { en, hi, fr, ar };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  // Persist choice and update <html dir> for RTL support
  useEffect(() => {
    localStorage.setItem('lang', lang);
    const meta = LANGUAGES.find(l => l.code === lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = meta?.dir || 'ltr';
  }, [lang]);

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook — use this everywhere instead of useContext directly
export function useLang() {
  return useContext(LanguageContext);
}
