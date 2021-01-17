import React from 'react';
import { FallbackStyles, MagicScriptTag } from './src/utils/theme';

import { ThemeProvider } from './src/contexts/ThemeContext';

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  setHeadComponents(<FallbackStyles />);
  setPreBodyComponents(<MagicScriptTag />);
};

export const wrapPageElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
