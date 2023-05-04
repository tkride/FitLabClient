// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { ThemeContext } from '../context/ThemeProvider';
import RoutineBrowser from '../components/RoutineBrowser';
import RoutineDays from '../components/RoutineDays';

export default function RoutinesScreen({navigation, route}) {
  const { styles } = React.useContext(ThemeContext);
  const { routine: routineSelected } = route.params ?? {};
  const [routine, setRoutine] = useState(routineSelected);
  
  useEffect(() => {
    if (routineSelected) {
      setRoutine(routineSelected);
    }
  }, [routineSelected]);

  const goBack = () => {
    // navigation.goBack();
    setRoutine(null);
    navigation.navigate('Rutinas', {routine: null})
  }
  
  return (
    <View style={styles.container}>
      { routine && <BackButton onPress={goBack} style={styles.backButton} />}
      <ScreenTitle title='Rutinas' />
      {routine ?
        (<RoutineDays navigation={navigation} routine={routine} />) :
        (<RoutineBrowser navigation={navigation} />)
      }
    </View>
  );
}
