import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import { Text } from 'react-native';

const TextSmall = ({ children, style }) => {
  const { styles } = useTheme();
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default TextSmall;