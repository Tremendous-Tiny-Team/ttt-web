import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';

const PageWrapper = ({ children, pageContext, location }) => {
  return (
    <LanguageProvider pathname={location.href} {...pageContext}>
      {children}
    </LanguageProvider>
  );
};

export default PageWrapper;
