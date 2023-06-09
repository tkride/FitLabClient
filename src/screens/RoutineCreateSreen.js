// HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import SessionAnalysis from '../Components/SessionAnalysis';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import ExerciseBrowser from '../Components/ExerciseBrowser';
import { getExercises } from '../Services/api';
import RoutineNew from '../Components/RoutineNew';

export default function RoutineCreateSreen({ navigation }) {
  const { styles } = useTheme();

  handleOnPressExercise = (exercise) => {
    console.log('handleOnPressExercise', exercise);
    navigation.navigate('Ejercicio', { exercise });
  };

  handleOnCreateRoutine = (routine) => {
    console.log('handleOnCreateRoutine', routine);
    
  };
  
  return (
    <View style={styles.container}>
      {/* <ScreenTitle title='Creación' /> */}
      {/* <ExerciseBrowser navigation={navigation}/> */}
      <RoutineNew onCreate={handleOnCreateRoutine} />
      {/* <ExerciseBrowser onPress={handleOnPressExercise}/> */}
    </View>
  );
}
