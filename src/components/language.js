import React from 'react';
import { navigate } from 'gatsby';

import { useLanguage } from '../contexts/LanguageContext';
import URI from 'urijs';

/** @type {React.FC} */
const Language = () => {
  const { currentLanguageCode, pathname, languages } = useLanguage();

  /**
   *
   * @param {event} event
   * @param {Array<Language>} languages
   */
  const updateLanguage = (event, languages) => {
    const languageCode = event.target.value;
    const language = languages.find(l => l.code === languageCode);
    const path = new URI(pathname)
      .directory(`/${language.path ? language.code : language.path}`)
      .pathname();
    navigate(path);
  };

  return (
    <select
      value={currentLanguageCode}
      onChange={event => updateLanguage(event, languages)}
    >
      {languages.map(language => {
        return (
          <option key={language.code} value={language.code}>
            {language.code}
          </option>
        );
      })}
    </select>
  );
};

/**
 * @typedef {Object} Language
 * @prop {string} code
 * @prop {string} path
 */

export { Language };
