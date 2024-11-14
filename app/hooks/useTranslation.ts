import { useState, useEffect } from 'react';
import { translations, Language } from '../translations';

type TranslationType = typeof translations.en;
type NestedObject = Record<string, unknown>;

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('languageSelected') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const getNestedValue = (
    obj: Record<string, unknown>,
    path: string
  ): string => {
    return path.split('.').reduce<unknown>((acc: unknown, part: string) => {
      if (acc && typeof acc === 'object') {
        return (acc as Record<string, unknown>)[part];
      }
      return '';
    }, obj) as string;
  };

  const t = (section: keyof TranslationType, key: string, nested?: boolean): string => {
    if (nested) {
      const value = getNestedValue(translations[language][section] as Record<string, unknown>, key);
      const fallback = getNestedValue(translations.en[section] as Record<string, unknown>, key);
      return (value as string) || (fallback as string) || key;
    }
    
    const translation = translations[language][section] as Record<string, string>;
    const fallback = translations.en[section] as Record<string, string>;
    
    return translation[key] || fallback[key] || key;
  };

  const changeLanguage = (newLanguage: Language) => {
    localStorage.setItem('languageSelected', newLanguage);
    setLanguage(newLanguage);
  };

  return { t, language, changeLanguage };
}; 