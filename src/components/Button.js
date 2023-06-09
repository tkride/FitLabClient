import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

export default function Button({ title, style={}, styleText={}, onPress }) {
  const { styles } = useTheme();

  return (
    <TouchableOpacity style={{...styles.button, ...style}} onPress={onPress}>
    {typeof title === 'string' ?
      <Text style={{...styles.textBigger, ...styleText}}>{title}</Text>
        :
        title
    }
    </TouchableOpacity>
  );
}