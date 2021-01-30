import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';

/** @type {React.FC<PageProps>} */
const PageWrapper = ({ children, pageContext, location }) => {
  return (
    <LanguageProvider pathname={location.href} {...pageContext}>
      {children}
    </LanguageProvider>
  );
};

export default PageWrapper;

/**
 * @typedef {Object} PageProps
 *
 * @prop {React.FC} children
 * @prop {any} pageContext
 * @prop {Location} location
 */

/**
 * @typedef {Object} LanguageContext
 *
 * @prop {string} currentLanguageCode
 * @prop {string} defaultLanguageCode
 * @prop {Array<Language>} languages
 */

/**
 * @typedef {Object} Language
 * @prop {string} code
 * @prop {string} path
 */
