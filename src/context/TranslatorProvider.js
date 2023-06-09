import React, { createContext, useState } from 'react';
import { getTranslations } from '../Services/api';
// TODO ELIMINAR TRADUCCIONES CONSTANTES
import { translations as constTranslations } from '../translations/translations';

const TranslatorContext = createContext();

export const TranslatorProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const [translations, setTranslations] = useState({});

  const translate = (key) => {
    // console.log('translate(', language, ') ', key, ':', constTranslations[language][key]);
    // console.log('translate ', key, ':', translations?.[language]?.[key]);
    // console.log(`translate (${key}): `, constTranslations[language][key] || translations?.[language]?.[key] || key);
    return constTranslations[language][key] || translations?.[language]?.[key] || key; // ||'';
  };
  
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const loadTranslations = (translations) => {
    setTranslations(translations);
  };

  const loadServerTranslations = async () => {
    const translations = await getTranslations();
    // console.log('-------------------------------------------')
    // console.log(translations);
    // console.log('-------------------------------------------')
    setTranslations(translations);
  };
  
  const translatorContextValue = {
    language,
    translate,
    changeLanguage,
    loadTranslations,
    loadServerTranslations,
  };

  return (
    <TranslatorContext.Provider value={translatorContextValue}>
      {children}
    </TranslatorContext.Provider>
  );
};

export const useTranslator = () => React.useContext(TranslatorContext);
