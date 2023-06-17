import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import TextSubtitle from './TextSubtitle';
import { Text } from 'react-native';

const TextTitle = ({ children, style }) => {
  const { styles } = useTheme();
  return (
    <TextSubtitle style={[styles.title, style]}>
      <Text>{children}</Text>
    </TextSubtitle>
  );
};

export default TextTitle;