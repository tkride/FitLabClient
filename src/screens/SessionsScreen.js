// HomeScreen.js
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import SessionAnalysis from '../components/SessionAnalysis';
import ScreenTitle from '../components/ScreenTitle';
import TableCustom from '../components/TableCustom';
import { ThemeContext } from '../context/ThemeProvider';

export default function SessionsScreen() {
  const { styles } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <ScreenTitle title='Registro de sesiones' />
      {/* <TableCustom headers={['Nombre', 'Volumen', 'Frecuencia']}/> */}
      {/* <Text style={styles.text}>No hay sesiones registradas</Text> */}
    </View>
  );
}
