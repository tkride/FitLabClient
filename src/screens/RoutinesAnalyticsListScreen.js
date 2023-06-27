// HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import RoutineBrowser from '../Components/RoutineBrowser';

export default function RoutinesAnalyticsListScreen({ navigation, route }) {
  const { styles } = useTheme();
  const { routines } = useData();
  const { filter } = route?.params ?? {filter: {}};

  handleOnSelectRoutine = (routines) => {
    console.log('handleOnSelectRoutine', routines);
    navigation.navigate('AnalyticsTabs', { routine: routines[0] });
  };
  
  return (
    <View style={styles.container}>
      <RoutineBrowser
        showFavorites={true}
        // filter={favorite ? {favorite} : {}}
        filter={{filter}}
        onSelect={handleOnSelectRoutine}
      />
    </View>
  );
}
