// HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import RoutineBrowser from '../Components/RoutineBrowser';

export default function RoutinesAnalyticsListScreen({ navigation }) {
  const { styles } = useTheme();

  handleOnPressRountine = (routine) => {
    console.log('handleOnSelectRoutine', routine);
    navigation.navigate('AnalyticsTabs', { routine });
  };
  
  return (
    <View style={styles.container}>
      <RoutineBrowser onPress={handleOnPressRountine} />
      {/* <RoutineBrowser navigation={navigation} destination={'AnalyticsTabs'} /> */}
    </View>
  );
}
