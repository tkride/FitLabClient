// RoutineContent.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { TableCustom } from './TableCustom';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import { TouchableOpacity } from 'react-native';
// import Draggable from 'react-native-draggable';
import Config from '../config/Config';
import ImageSequence from './ImageSequence';


export default function Exercise({ exercise }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { nanoid } = useData();
  const [exerciseSteps, setExerciseSteps] = useState([]);
  const [targetedMusclesImage, setTargetedMusclesImage] = useState();

  // TODO IMPLEMENTAR UN BELONGS TO ROUTINE ?

  useEffect(() => {
    console.log('Exercise COMPONENT:', exercise)
    const fileNameES1 = exercise?.name?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
    const exerciseStep1URI = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileNameES1;

    const fileNameES2 = exercise?.name?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_2_FILE_APPEND;
    const exerciseStep2URI = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileNameES2;
    setExerciseSteps([exerciseStep1URI, exerciseStep2URI]);

    const fileNameTM = exercise?.name?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.TARGETED_MUSCLES_FILE_APPEND;
    const targetedMusclesURI = Config.REQUESTS.IMAGES_TARGETED_MUSCLES + '/' + fileNameTM;
    setTargetedMusclesImage(targetedMusclesURI);
  }, []);

  useEffect(() => {
  }, [exerciseSteps]);

  const translateMuscles = (muscles) => {
    const musclesTranslated = muscles.split(',').map(muscle => {
      return translate(muscle);
    }).join(', ');
    return musclesTranslated;
  }

  if (!exercise) {
    return (
        <Text style={styles.subtitle}>{`${translate('loading')}`}</Text>
    );
  }

  return (
    <View style={styles.view} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true}>
      {
        <ScrollView
          key={exercise?.name + nanoid()}
          shouldRasterizeIOS={true}
          renderToHardwareTextureAndroid={true}
          style={{...styles.scrollView, height: '80%'}}>
          <Card style={{...styles.card }}>
            <Card.Title title={exercise.name} titleStyle={[styles.title]}/>
            <Card.Content>
              <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 15 }}>

                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                  <Text style={[styles.textBig, {color: styles.subtitle.color, textAlign: 'center', flex: 1 }]}>{`${translate('exercise')}`}</Text>
                  <Text style={[styles.textBig, { color: styles.subtitle.color, textAlign: 'center', flex: 0.75 }]}>{`${translate('targetedMuscles')}`}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                  {exerciseSteps &&
                    <ImageSequence
                      images={exerciseSteps}
                      time={1000}
                      styleImage={{ flex: 1, height: 200, borderRadius: 10 }}
                      resizeMode={'cover'}
                    />}
                  {targetedMusclesImage &&
                  <Image source={{ uri: targetedMusclesImage }} style={{ flex: 0.75, height: 200, borderRadius: 10, marginLeft: 10, zIndex: 1 }} resizeMode='stretch' />}
                </View>

                <View style={{ flexDirection: 'column', flex: 1, alignContent: 'flex-start' }}>

                  {exercise.mainMuscles &&
                   <View style={{flexDirection: 'row'}}>
                      <Text style={{...styles.textBigger,  color: styles.subtitle.color}}>{`${translate('zones')}:`}</Text>
                      <Text style={{...styles.textBigger, color: styles.subtitle.color, marginLeft: 10}}>{translateMuscles(exercise.mainMuscles)}</Text>
                    </View>
                  }

                  {exercise.mainMuscles &&
                    <View style={{ flexDirection: 'row'}}>
                      <Text style={{...styles.textBigger, color: styles.subtitle.color}}>{`${translate('mainMuscles')}:`}</Text>
                      <Text style={{...styles.textBigger, color: styles.subtitle.color, marginLeft: 10}}>{translateMuscles(exercise.mainMuscles)}</Text>
                    </View>
                  }

                  {exercise.secondaryMuscles &&
                    <View style={{ flexDirection: 'row'}}>
                      <Text style={{...styles.textBigger, color: styles.subtitle.color}}>{`${translate('secondaryMuscles')}:`}</Text>
                      <Text style={{...styles.textBigger, color: styles.subtitle.color, marginLeft: 10}}>{translateMuscles(exercise.secondaryMuscles)}</Text>
                    </View>
                  }
                  
                </View>

              </View>
            </Card.Content>
          </Card>
        </ScrollView>
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
    </View>
  );
}

/*
      <Draggable
        x={0}
        minX={0}
        // maxX={0}
        y={index*65}
        minY={0}
        // maxY={200}
        onDragRelease={() => handleOnPressRoutine('Torso-Pierna')}
        renderSize={150}
        renderColor='transparent'
      x={20}
      y={50}
      renderSize={150}
      renderColor='black'
      renderText='A'
      >
        <TouchableHighlight
          activeOpacity={styles.buttonRoutine.activeOpacity}
          underlayColor={styles.buttonRoutine.underlayColor}
          style={styles.buttonRoutine}
        >
          <Text style={styles.text}>Torso-Pierna</Text>
        </TouchableHighlight>
      </Draggable>
 */

