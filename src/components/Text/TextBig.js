import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import TextRegular from './TextRegular';
import { Text } from 'react-native';

const TextBig = ({ children, style }) => {
  const { styles } = useTheme();
  return (
  <TextRegular style={[styles.textBig, style]}>
    <Text>{children}</Text>
  </TextRegular>);
};

export default TextBig;