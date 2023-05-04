// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import SessionAnalysis from '../components/SessionAnalysis';
import ScreenTitle from '../components/ScreenTitle';
import TableCustom from '../components/TableCustom';
import { ThemeContext } from '../context/ThemeProvider';
import BackButton from '../components/BackButton';

export default function HomeScreen() {
  const { styles } = React.useContext(ThemeContext);
  const [enableBack, setEnableBack] = useState(false);

  const goBack = () => {
    console.log('Go back');
  }

  return (
    <View style={ styles.container }>
      { enableBack && <BackButton onPress={goBack} style={styles.backButton} />}
      <ScreenTitle title='Inicio' />
      <Text style={styles.text}>Bienvenido a Trainning Log</Text>
      {/* <SessionAnalysis /> */}
    </View>
  );
}
