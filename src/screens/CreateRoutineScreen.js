// HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import SessionAnalysis from '../components/SessionAnalysis';
import ScreenTitle from '../components/ScreenTitle';
import { ThemeContext } from '../context/ThemeProvider';

export default function CreateRoutineSreen() {
  const { styles } = React.useContext(ThemeContext);
  
  return (
    <View style={styles.container}>
      <ScreenTitle title='Crear rutina' />
      <SessionAnalysis />
    </View>
  );
}
