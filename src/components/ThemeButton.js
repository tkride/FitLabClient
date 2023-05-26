import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { Icon } from '@rneui/themed';

export default ThemeButton = ({ onPress }) => {
  const { styles, theme } = useTheme();

  return (
    <View style={styles.buttonTheme} >
      <TouchableHighlight
        onPress={onPress}
        activeOpacity={styles.buttonTheme.activeOpacity}
        underlayColor={styles.buttonTheme.underlayColor}
      >
        {theme === 'light' ?
        <Icon type='entypo' name="moon" color={color=styles.buttonTheme.color} size={20} />:
        <Icon type='entypo' name="light-up" color={color=styles.buttonTheme.color} size={20} />}
      </TouchableHighlight>
    </View>
  );
};
