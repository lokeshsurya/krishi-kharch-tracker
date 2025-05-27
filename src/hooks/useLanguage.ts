
import { useState, useEffect } from 'react';
import { Language, translations } from '@/types/language';

const LANGUAGE_STORAGE_KEY = 'farmassist_language';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'mr')) {
      setLanguage(savedLanguage);
      setIsLanguageSelected(true);
    }
  }, []);

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageSelected(true);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const t = language ? translations[language] : translations.en;

  return {
    language,
    isLanguageSelected,
    selectLanguage,
    t
  };
};
