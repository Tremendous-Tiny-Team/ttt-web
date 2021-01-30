import React from 'react';

import { useTheme } from '../contexts/ThemeContext';

import { THEMES } from '../styles/themes';

/** @type {React.FC} */
const Theme = () => {
  const { colorMode, setColorMode } = useTheme();
  return (
    <select
      value={colorMode}
      onChange={(event) => setColorMode(event.target.value)}
    >
      {THEMES.map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

export { Theme };
