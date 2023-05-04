import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { ThemeContext } from '../context/ThemeProvider';
import { Icon } from '@rneui/themed';

export default ThemeButton = ({ onPress }) => {
  const { styles, theme } = React.useContext(ThemeContext);

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={styles.buttonTheme.activeOpacity}
      underlayColor={styles.buttonTheme.underlayColor}
      style={styles.buttonTheme}
    >
      {theme === 'light' ?
      <Icon type='entypo' name="moon" color={color=styles.buttonTheme.color} size={20} />:
      <Icon type='entypo' name="light-up" color={color=styles.buttonTheme.color} size={20} />}
    </TouchableHighlight>
  );
};
