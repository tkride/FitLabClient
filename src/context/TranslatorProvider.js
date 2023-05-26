import React, { createContext, useState } from 'react';
import { translations } from '../translations/translations';

const TranslatorContext = createContext();

export const TranslatorProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const translate = (key) => {
    return translations[language][key] || key; // ||'';
  };
  
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const translatorContextValue = {
    language,
    translate,
    changeLanguage,
  };

  return (
    <TranslatorContext.Provider value={translatorContextValue}>
      {children}
    </TranslatorContext.Provider>
  );
};

export const useTranslator = () => React.useContext(TranslatorContext);
