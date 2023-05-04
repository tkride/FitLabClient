// RoutineContent.js
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import { TableCustom } from './TableCustom';
import { ThemeContext } from '../context/ThemeProvider';
import { DataContext } from '../context/DataProvider';
import { TouchableHighlight, TouchableOpacity } from 'react-native';
import Draggable from 'react-native-draggable';
import BackButton from './BackButton';

export default function RoutineDays({ navigation, routine }) {
  const { styles } = useContext(ThemeContext);
  const { routines } = useContext(DataContext);
  const [routineData, setRoutineData] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const rData = routines.filter( r => r.name === routine)?.[0];
    setRoutineData(rData);
  }, []);

  if (!routines) {
    return (
        <Text style={styles.text}>Cargando...</Text>
    );
  }

  const handleSelect = (selectedExercise) => {
    setSelected(selectedExercise);
  }

  // console.log('ROUTINE CONTENT', routineData)
  return (
    <View style={styles.view}>
      <Text style={styles.title}>{routineData.name}</Text>
      <ScrollView style={styles.scrollView}>
        {routineData?.days?.map(day => (
          <TouchableOpacity key={day.name} onPress={() => handleSelect(day.name)}>
            <Card style={[styles.card]}>
              <Card.Title title={day.name} titleStyle={[styles.subtitle, {marginTop: 10}]}/>
              <Card.Content>
                <List.Section>
                  {day?.exercises?.map(exercise => (
                    <List.Item
                      key={exercise.name}
                      titleStyle={[styles.subtitle, { left: -10, flex: 1 }]}
                      title={exercise.name}
                      style={styles.text}
                      descriptionStyle={[styles.text, {fontSize: 14}]}
                      description={
                        <View style={[{ flexDirection: 'row' }]}>
                          {/* <Text style={[styles.subtitle, { flex:1 }]}>{exercise.name}</Text> */}
                          <Text style={[styles.text, { flex: 1, left: -30 }]}>{`${exercise.sets}x${exercise.reps} @RIR:${exercise.rir ?? '0'}`}</Text>
                          <Text style={[styles.text, { flex: 1, left: 60 }]}>{`REST: ${exercise.restAlarm}s`}</Text>
                          {/*<Text style={[styles.text, { left: 30 }]}>{`RIR: ${exercise.rir ?? '0'}`}</Text>*/}
                        </View>
                      }
                    />
                  ))}
                </List.Section>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
