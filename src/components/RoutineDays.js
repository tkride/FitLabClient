// RoutineContent.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Avatar, Card, List } from 'react-native-paper';
import { nanoid } from 'nanoid'
import { TableCustom } from './TableCustom';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { TouchableHighlight, TouchableOpacity } from 'react-native';
import Draggable from 'react-native-draggable';
import BackButton from './BackButton';
import Config from '../config/Config';
import { useTranslator } from '../context/TranslatorProvider';

export default function RoutineDays({ navigation, routine }) {
  const { styles } = useTheme();
  const { language, translate } = useTranslator();
  const { nanoid, routines } = useData();

  const [routineData, setRoutineData] = useState({});
  const [images, setImages] = useState({});

  useEffect(() => {
    const rData = routines.filter( r => r.name === routine)?.[0];
    setRoutineData(rData);
    const daysImages = {};
    rData?.days?.forEach(day => {
      const loadedImages = day?.exercises?.forEach(exercise => {
        if(!exercise) return;
        if(daysImages[exercise.name]) return;
        const fileName = exercise?.name?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
        const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
        daysImages[exercise.name] = { uri: filePath };
      });
    });

    setImages(daysImages);
  }, []);

  useEffect(() => {
  }, [images, language])

  if (!routines) {
    return (
        <Text style={styles.text}>{`${translate('loading')}`}</Text>
    );
  }

  const handleSelect = (day) => {
    navigation.navigate('Ejercicios', { routine: routineData.name, day });
  }

  const calcDuration = (day) => {
    let duration = 0;
    day?.exercises?.forEach(exercise => {
      duration += exercise.sets * ( (exercise.reps * 2) + exercise.restAlarm );
    });
    duration = parseFloat(duration / 60).toFixed(1);
    return duration;
  }

  return (
    <View style={styles.view} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true}>
      {/* <Text style={styles.title}>{routineData.name}</Text> */}
      <ScrollView style={{...styles.scrollView, height: '80%'}}>
        {routineData?.days?.map(day => (
          <TouchableOpacity key={day.name + nanoid()} onPress={() => handleSelect(day)}>
            <Card style={[styles.card]}>
              <Card.Content style={{marginBottom: 5}}>
                <Text style={{...styles.title}}>{day.name}</Text>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                  <Text style={{...styles.textBig}}>{`${translate('exercises')}: ${day.exercises.length}`}</Text>
                  <Text style={{...styles.textBig, marginLeft: 10}}>{`${translate('duration')}: ${calcDuration(day)} ${translate('minutes')}`}</Text>
                </View>
                <View style={{marginTop: 10}}>
                  {day?.exercises?.map(exercise => (
                      <Text key={exercise.name + nanoid()} style={{...styles.subtitle, fontSize: styles.textBig.fontSize }}>{exercise.name}</Text>
                  ))}
                </View>
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

