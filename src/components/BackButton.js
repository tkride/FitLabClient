import React from 'react';
import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { Icon } from '@rneui/themed';

export default BackButton = ({ onPress, style }) => {
  const { styles } = useTheme();

  return (
    // <TouchableHighlight
    //   onPress={onPress}
    //   activeOpacity={styles.backButton.activeOpacity}
    //   underlayColor={styles.backButton.underlayColor}
    //   style={styles.backButton}
    // >
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={styles.backButton.activeOpacity}
      underlayColor={styles.backButton.underlayColor}
      style={styles.backButton}
    >
      <View shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true}>
        <Icon type='entypo' name="chevron-thin-left" color={color=styles.backButton.color} size={20} />
        {/* <Icon type='entypo' name="chevron-thin-left" color={color='red'} size={20} /> */}
      </View>
    </TouchableOpacity>
  );
};
