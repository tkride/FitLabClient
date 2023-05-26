// HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import RoutineBrowser from '../Components/RoutineBrowser';

export default function RoutinesAnalyticsListScreen({ navigation }) {
  const { styles } = useTheme();

  return (
    <View style={styles.container}>
      <RoutineBrowser navigation={navigation} destination={'AnalyticsTabs'} />
    </View>
  );
}
