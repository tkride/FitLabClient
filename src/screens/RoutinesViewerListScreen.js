// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import RoutineBrowser from '../Components/RoutineBrowser';
// import { useFocusEffect } from '@react-navigation/native';

export default function RoutinesViewerListScreen({navigation, route}) {
  const { styles } = useTheme();
  const { routines } = useData();
  const { filter } = route?.params ?? {filter: {}};
  // const { favorite } = route?.params ?? {favorite: false};
  
  useEffect(() => {
  }, [routines]);
  
  handleOnSelectRoutine = (routines) => {
    navigation.navigate('Días', { routine: routines[0] });
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
