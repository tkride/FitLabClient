// HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import RoutineBrowser from '../Components/RoutineBrowser';

export default function RoutinesViewerListScreen({ navigation }) {
  const { styles } = useTheme();

  handleOnPressRoutine = (routine) => {
    console.log('handleOnSelectRoutine', routine);
    navigation.navigate('Días', { routine });
  };

  return (
    <View style={styles.container}>
      {/* <RoutineBrowser navigation={navigation} destionation={'Días'} /> */}
      <RoutineBrowser onPress={handleOnPressRoutine} />
    </View>
  );
}
