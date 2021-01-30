import React, { createContext, useContext } from 'react';

/** @type {React.Context<ContextValue>} */
const LanguageContext = createContext({
  currentLanguageCode: undefined,
  defaultLanguageCode: undefined,
  pathname: undefined,
  languages: [],
});

/** @type {React.FC<ContextValue>} */
const LanguageProvider = ({
  currentLanguageCode,
  defaultLanguageCode,
  pathname,
  languages,
  children,
}) => {
  return (
    <LanguageContext.Provider
      value={{
        currentLanguageCode,
        defaultLanguageCode,
        pathname,
        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  return useContext(LanguageContext);
};

/**
 * @typedef {Object} ContextValue
 * @prop {string} currentLanguageCode
 * @prop {string} defaultLanguageCode
 * @prop {string} pathname
 * @prop {Array<Language>} languages
 */

/**
 * @typedef {Object} Language
 * @prop {string} code
 * @prop {string} path
 */

export { LanguageProvider, useLanguage };
