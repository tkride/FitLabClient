// RoutineBrowser.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { TableCustom } from './TableCustom';
import { ThemeContext } from '../context/ThemeProvider';
import { DataContext } from '../context/DataProvider';
import { TouchableHighlight } from 'react-native';
import Draggable from 'react-native-draggable';

export default function RoutineBrowser({ navigation }) {
  const { styles } = useContext(ThemeContext);
  const { user, routines, loadRoutines } = useContext(DataContext);

  const [data, setData] = useState(null);
  const [routineNames, setRoutineNames] = useState([]);
  const [sessions, setSessions] = useState(null);
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    const rNames = routines.map( r => r.name);
    setRoutineNames(rNames);
  }, []);

  if (!routines) {
    return (
        <Text style={styles.text}>Cargando...</Text>
    );
  }

  console.log(routineNames);

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Análisis de rutinas</Text>
      {
        routineNames.map(routine => {
          return (
            <View
              key={routine}
              style={{marginLeft: 20}}>
              <TouchableHighlight
                onPress={() => navigation.navigate('Rutinas', {routine: routine})}
                activeOpacity={styles.buttonRoutine.activeOpacity}
                underlayColor={styles.buttonRoutine.underlayColor}
                style={styles.buttonRoutine}
              >
                <Text style={styles.text}>{routine}</Text>
              </TouchableHighlight>
            </View>
          )
        })
      }
      {/* <TableCustom headers={['Nombre']} data={[['a'], ['d']]}/> */}
      {/* {routineNames.map(routine => <Text>{routine}</Text> )} */}
    </View>
  );
}

/*
      <Draggable x={20} y={50} renderSize={150} renderColor='black' renderText='A'>
        <TouchableHighlight
          activeOpacity={styles.buttonRoutine.activeOpacity}
          underlayColor={styles.buttonRoutine.underlayColor}
          style={styles.buttonRoutine}
        >
          <Text style={styles.text}>Torso-Pierna</Text>
        </TouchableHighlight>
      </Draggable>
 */