// SessionAnalysis.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { TableCustom } from './TableCustom';
import { ThemeContext } from '../context/ThemeProvider';

export default function SessionAnalysis() {
  const { styles } = useContext(ThemeContext);

  const [data, setData] = useState(null);
  const [routineNames, setRoutineNames] = useState([]);
  const [sessions, setSessions] = useState(null);
  const [exercises, setExercises] = useState(null);
  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [weights, setWeights] = useState(null);
  const [times, setTimes] = useState(null);

  const REQ_ADDRESS = 'http://192.168.1.129:5000/v1/routines';

  // useEffect(() => {
  //   async function fetchData() {
  //     const method = 'GET';
  //     const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
  //     const sessionData = await fetch(REQ_ADDRESS, { method, headers })
  //     // console.log(sessionData);
  //     const session = await sessionData.json();

  //     // Extrae datos de la estructura de datos y los almacena en variables
  //     // Las rutinas llegan en un array de objetos, y su nombre dentro de 'name'
  //     console.log(session.map(routine => routine.name))
  //     // setRoutineNames(session.map(routine => routine.name));
  //     setRoutineNames([['a', 'b', 'c'], ['d', 'e', 'f']]);
  //     setData(session);
  //   }
  //   fetchData();
  // }, []);

  if (!data) {
    return (
        <Text style={styles.text}>Cargando...</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Análisis de sesiones:</Text>
      {/* <TableCustom headers={['Nombre']} data={[['a'], ['d']]}/> */}
      {/* {routineNames.map(routine => <Text>{routine}</Text> )} */}
    </View>
  );
}
