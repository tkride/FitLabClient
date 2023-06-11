// HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import RoutineBrowser from '../Components/RoutineBrowser';

export default function RoutinesAnalyticsListScreen({ navigation }) {
  const { styles } = useTheme();
  const { routines } = useData();

  handleOnSelectRoutine = (routines) => {
    console.log('handleOnSelectRoutine', routines);
    navigation.navigate('AnalyticsTabs', { routine: routines[0] });
  };
  
  return (
    <View style={styles.container}>
      <RoutineBrowser onSelect={handleOnSelectRoutine} />
    </View>
  );
}
