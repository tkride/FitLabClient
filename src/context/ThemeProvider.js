import React, { createContext, useEffect, useState } from 'react';
import { styles as stylesFamily } from '../Styles/styles';
import { StatusBar } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    StatusBar.setBarStyle( `${theme}-content`, true);
  };

  useEffect(() => {
    StatusBar.setBarStyle( `${theme}-content`, true);
  }, [theme]);

  const styles = theme === 'light' ? stylesFamily.light : stylesFamily.dark;

  return (
    <ThemeContext.Provider value={{ styles, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => React.useContext(ThemeContext);