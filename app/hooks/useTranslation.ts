import { useState, useEffect } from 'react';
import { translations, Language } from '../translations';

type TranslationType = typeof translations.en;
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('languageSelected') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj) as string;
  };

  const t = (section: keyof TranslationType, key: string, nested?: boolean): string => {
    if (nested) {
      const value = getNestedValue(translations[language][section], key);
      const fallback = getNestedValue(translations.en[section], key);
      return value || fallback || key;
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