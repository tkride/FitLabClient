import React, { useEffect, useState } from 'react'
import Config from '../config/Config';
import {View, Text} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';

export default function SessionExercise({exercises: sessionExercises}) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { exercises, nanoid } = useData();
  const [images, setImages] = useState({});

  useEffect(() => {
    const loadedImages = {};
    sessionExercises.forEach(exercise => {
      const exerciseName = exercises.find(ex => ex.id === exercise.exerciseId)?.name;
      const fileName = exerciseName?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
      const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
      loadedImages[exerciseName] = { uri: filePath };
    });
    setImages(loadedImages);
  }, [sessionExercises, exercises]);

  return (Object.keys(images).length === 0) ?
    <Text>{translate('loading')}</Text> :
    (sessionExercises.map(exercise => {
      const exerciseName = exercises.find(ex => ex.id === exercise.exerciseId)?.name;
      return (
      <View
        key={nanoid()}
        style={{
          flexDirection: 'column',
          backgroundColor: styles.primary,
          borderRadius: styles.borderRadius,
          padding: 10,
          margin: 4}}
      >
        <View style={{ flexDirection: 'row', marginBottom: 5, }}>
          <View style={{flex:1}}>
            <Avatar.Image size={60} source={{ ...images[exerciseName] }} style={{ maxWidth: 60 }} />
          </View>
          <View style={{flexDirection: 'column', flex: 4}}>
            <Text style={{...styles.textBigger, flex: 2}}>{exerciseName}</Text>
            <View style={{ flexDirection: 'row', marginBottom: 5, }}>
              <Text style={{...styles.textBigger, flex: 1}}>{translate('sets')}: {exercise.sets.length}</Text>
              <Text style={{...styles.textBigger, flex: 1}}>1RM: {exercise.record}</Text>
            </View>
          </View>
        </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...styles.textBig, color: styles.textBigger.color, flex: 1}}>Kg</Text>
          <Text style={{...styles.textBig, color: styles.textBigger.color, flex: 1}}>{translate('reps')}</Text>
          <Text style={{...styles.textBig, color: styles.textBigger.color, flex: 1}}>{translate('rir')}</Text>
          <Text style={{...styles.textBig, color: styles.textBigger.color, flex: 1}}>{translate('durationShort')} (s)</Text>
          <Text style={{...styles.textBig, color: styles.textBigger.color, flex: 1}}>{translate('restShort')} (s)</Text>
        </View>
        {exercise.sets.map((log, index) => {
          return (
            <View key={nanoid()} style={{flexDirection: 'row'}}>
              {/* <Text style={styles.textBig}>{log.weight}kg x {log.reps} @ {log.rir}  ({translate('rest')}: {log.rest}s)</Text> */}
              {/* <Text style={{...styles.textBig, color: styles.primary, flex: 2}}>{log.weight}kg x {log.reps} @ {log.rir}</Text> */}
              <Text style={{...styles.textBig, flex: 1}}>{log.weight}</Text>
              <Text style={{...styles.textBig, flex: 1}}>{log.reps}</Text>
              <Text style={{...styles.textBig, flex: 1}}>{log.rir}</Text>
              <Text style={{...styles.textBig, flex: 1}}>{log.duration}</Text>
              <Text style={{...styles.textBig, flex: 1}}>{log.rest}</Text>
              {/* <Text style={styles.textBig}>{translate('time')}: {toLocaleString(new Date(log.mydateExercise*1000))}</Text> */}
              {/* <Text style={styles.textBig}>{translate('duration')}: {log.duration}min</Text> */}
            </View>
          );
        })}
      </View>
      </View>);
    })
  )
}
