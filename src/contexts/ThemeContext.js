import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  COLORS,
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
} from 'styles/themes';

/** @type {React.Context<ContextValue>} */
const ThemeContext = createContext({
  colorMode: null,
  setColorMode: null,
});

/** @type {React.FC} */
const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(undefined);

  useEffect(() => {
    const root = window.document.documentElement;
    /**
     * Because colors matter so much for the initial page view, we're
     * doing a lot of the work in gatsby-ssr. That way it can happen before
     * the React component tree mounts.
     */
    const initialColorValue = root.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    );

    rawSetColorMode(initialColorValue);
  }, []);

  const contextValue = useMemo(() => {
    /** @param {string} newValue */
    const setColorMode = (newValue) => {
      const root = window.document.documentElement;

      localStorage.setItem(COLOR_MODE_KEY, newValue);

      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;

        root.style.setProperty(cssVarName, colorByTheme[newValue]);
      });

      rawSetColorMode(newValue);
    };

    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
    return useContext(ThemeContext);
};

/**
 * @typedef {Object} ContextValue
 * @prop {string} colorMode
 * @prop {(newValue: string) => void} setColorMode
 */

export { ThemeProvider, useTheme };
