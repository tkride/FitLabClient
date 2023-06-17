import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import TextBig from './TextBig';
import { Text } from 'react-native';

const TextSubtitle = ({ children, style }) => {
  const { styles } = useTheme();
  return (
    <TextBig style={[styles.subtitle, style]}>
      <Text>{children}</Text>
    </TextBig>
  );
};

export default TextSubtitle;