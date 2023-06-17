import React from 'react';
import { useTheme } from '../../context/ThemeProvider';
import TextSmall from './TextSmall';
import { Text } from 'react-native';

const TextRegular = ({ children, style }) => {
  const { styles } = useTheme();
  return (
  <TextSmall style={[styles.textBig, style]}>
    <Text>{children}</Text>
  </TextSmall>);
};

export default TextRegular;