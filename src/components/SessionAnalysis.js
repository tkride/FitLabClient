// SessionAnalysis.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import TableCustom from './TableCustom';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';

export default function SessionAnalysis() {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { nanoid, routines } = useData();
  const [routineData, setRoutineData] = useState({});

  const [data, setData] = useState(null);
  // const [routineNames, setRoutineNames] = useState([]);
  // const [sessions, setSessions] = useState(null);
  // const [exercises, setExercises] = useState(null);
  // const [sets, setSets] = useState(null);
  // const [reps, setReps] = useState(null);
  // const [weights, setWeights] = useState(null);
  // const [times, setTimes] = useState(null);

  // if (!data) {
  //   return (
  //       <Text style={styles.text}>{`${translate('loading')}`}</Text>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Análisis de sesiones:</Text>
      {/* <TableCustom headers={['Nombre']} data={[['a'], ['d']]}/> */}
      {/* {routineNames.map(routine => <Text>{routine}</Text> )} */}
    </View>
  );
}
