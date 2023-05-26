// RoutineContent.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Avatar, Card, List } from 'react-native-paper';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import { TouchableOpacity } from 'react-native';
import Config from '../config/Config';
// import Draggable from 'react-native-draggable';
// import { Platform } from 'react-native';

export default function DayExercises({ navigation, routine, day }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { nanoid, routines } = useData();
  const [dayData, setDayData] = useState(day);
  const [exercises, setExercises] = useState(null);
  const [images, setImages] = useState([]);

  const handleSelect = (exercise) => {
    navigation.navigate('Ejercicio', { routine, day, exercise });
  }

  useEffect(() => {
    const loadedImages = dayData?.exercises?.map(exercise => {
      const fileName = exercise?.name?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
      const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
      return filePath;
    });
    setImages(loadedImages);
  }, []);

  if (!routines) {
    return (
        <Text style={styles.subtitle}>{`${translate('loading')}`}</Text>
    );
  }

  return (
    // <View style={styles.view} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true}>
    <ScrollView
      shouldRasterizeIOS={true}
      renderToHardwareTextureAndroid={true}
      style={{...styles.scrollView, height: '80%'}}>
      {/* <Text style={styles.title}>{dayData.name}</Text> */}
      {
        dayData?.exercises?.map((exercise, i) => {
          return (
            <View
              key={exercise?.name + nanoid()}
              shouldRasterizeIOS={true}
              renderToHardwareTextureAndroid={true}
              style={{marginLeft: 0}}>
              <TouchableOpacity key={exercise.name} onPress={() => handleSelect(exercise)}>
                <Card style={styles.card}>
                  <Card.Content>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Avatar.Image size={60} source={{ uri: images[i] }} style={{ flex: 1, maxWidth: 60 }} />
                      <View style={{flexDirection: 'column', flex: 4, marginLeft: 10}}>
                        <Text style={styles.title}>{exercise.name}</Text>
                        <View style={[{flexDirection: 'row'}]}>
                          <Text style={[styles.text, { flex: 1, left: 0 }]}>{`${exercise.sets}x${exercise.reps} @RIR:${exercise.rir ?? '0'}`}</Text>
                          <Text style={[styles.text, { flex: 1, left: 0 }]}>{`REST: ${exercise.restAlarm}s`}</Text>
                        </View>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </View>
          )
        })

/*
                  <List.Item
                    description={`${routine.days.length}`}
                    left={(props) => (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar.Image
                        size={50}
                        source={{ uri: 'https://mi-imagen.com/avatar.jpg' }}
                        style={{ borderRadius: 25 }}
                      />
                      <List.Subheader style={[styles.title, { marginLeft: 10 }]}>{routine.name}</List.Subheader>
                    </View>
                    )}
                  />
*/
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
    {/* </View> */}
    </ScrollView>
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

