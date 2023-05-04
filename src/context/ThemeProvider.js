import React, { createContext, useState } from 'react';
import { styles as stylesFamily } from '../styles/styles';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const styles = theme === 'light' ? stylesFamily.light : stylesFamily.dark;

  return (
    <ThemeContext.Provider value={{ styles, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
