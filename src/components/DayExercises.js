// RoutineContent.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TableCustom } from './TableCustom';
import { ThemeContext } from '../context/ThemeProvider';
import { DataContext } from '../context/DataProvider';
import { TouchableHighlight } from 'react-native';
import Draggable from 'react-native-draggable';
import BackButton from './BackButton';

export default function DayExercises({ navigation, routine }) {
  const { styles } = useContext(ThemeContext);
  const { routines } = useContext(DataContext);
  const [routineData, setRoutineData] = useState({});
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    const rData = routines.filter( r => r.name === routine)?.[0];
    setRoutineData(rData);
  }, []);

  if (!routines) {
    return (
        <Text style={styles.text}>Cargando...</Text>
    );
  }

  console.log('ROUTINE CONTENT', routineData)
  return (
    <View style={styles.view}>
      <BackButton onPress={() => navigation.navigate('Rutinas')} style={stylesCustom.backButton} />
      <Text style={styles.title}>{routineData.name}</Text>
      {
        routineData?.days?.map(day => {
          return (
            <View
              key={day?.name}
              style={{marginLeft: 40}}>
                <TouchableHighlight
                activeOpacity={styles.buttonRoutine.activeOpacity}
                underlayColor={styles.buttonRoutine.underlayColor}
                style={styles.buttonRoutine}
                >
                  <Text>{day?.name + "JAJAJ" ?? ''}</Text>
              </TouchableHighlight>
            </View>
          )
        })

        // (routineData != undefined) &&
        // Object.keys(routineData).length &&
        // routineData.map(routine => {
        //   return (
        //     <View 
        //       key={routine?.name}
        //       style={{marginLeft: 20}}>
        //       <Text>{routine?.name ?? ''}</Text>
        //       {/* <Text>{routine?.days.map(day => {
        //         return (
        //           <View>
        //           <Text>{day?.name ?? ''}</Text>
        //           <Text>{day?.sets ?? ''}</Text>
        //           </View>
        //         )}
        //       )}</Text> */}
        //     </View>
        //   )
        // })
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

const stylesCustom = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: 20,
    width: 20,
    margin: 5,
    activeOpacity: 0.5,
    underlayColor: 'transparent',
    zIndex: 1,
  },
});
