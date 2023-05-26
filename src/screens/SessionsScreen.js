// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SessionAnalysis from '../Components/SessionAnalysis';
import ScreenTitle from '../Components/ScreenTitle';
import TableCustom from '../Components/TableCustom';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
// import StackedBarChart from '../Components/StackedBarChart';
import Sessions from '../Components/Sessions';

export default function SessionsScreen({ navigation }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();

  return (
    <View style={styles.container}>
      <ScreenTitle title={`${translate('sessions')}`}/>
      <Sessions />
      {/* <StackedBarChart /> */}
      {/* <ScreenTitle title='Registro de sesiones' /> */}
      {/* <TableCustom headers={['Nombre', 'Volumen', 'Frecuencia']}/> */}
      {/* <Text style={styles.text}>No hay sesiones registradas</Text> */}

      {/* <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true },
        }}
      /> */}

    </View>
  );
}
