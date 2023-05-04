import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { ThemeContext } from '../context/ThemeProvider';
import { Icon } from '@rneui/themed';

export default BackButton = ({ onPress, style }) => {
  const { styles } = React.useContext(ThemeContext);

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={styles.backButton.activeOpacity}
      underlayColor={styles.backButton.underlayColor}
      style={styles.backButton}
    >
    <Icon type='entypo' name="chevron-thin-left" color={color=styles.backButton.color} size={20} />
    {/* <Icon type='entypo' name="chevron-thin-left" color={color='red'} size={20} /> */}
    </TouchableHighlight>
  );
};
