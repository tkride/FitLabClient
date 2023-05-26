import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

const ScreenTitle = ({ title, maxLength, onPress }) => {
  const { styles } = useTheme();
  const [maxLen] = React.useState(maxLength ?? 999);

  const handleOnPress = () => {
    if(onPress) {
      onPress();
    }
  }
  
  return (
    <View style={styles.view}>
      <Text style={styles.titleScreen} onPress={handleOnPress}>{
        title.length > maxLen ? title.substring(0, maxLen - 3) + '...' : title
      }</Text>
    </View>
  );
};

export default ScreenTitle;
