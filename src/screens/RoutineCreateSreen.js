// HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import SessionAnalysis from '../Components/SessionAnalysis';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import ExerciseBrowser from '../Components/ExerciseBrowser';

export default function RoutineCreateSreen({ navigation }) {
  const { styles } = useTheme();
  
  return (
    <View style={styles.container}>
      {/* <ScreenTitle title='Creación' /> */}
      <ExerciseBrowser navigation={navigation}/>
    </View>
  );
}
