import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeProvider';

const ScreenTitle = ({ title, props }) => {
  const { styles } = React.useContext(ThemeContext);

  return (
    <View style={styles.view}>
      <Text style={styles.titleScreen}>{title}</Text>
    </View>
  );
};

export default ScreenTitle;
