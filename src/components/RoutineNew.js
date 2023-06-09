// RoutineNew.js

// Crea una nueva rutina
// Muestra un formulario para crear una nueva rutina formado por nombre, un icono para agregar días, y dentro de los días un control para agregar ejercicios
// Al crear una rutina se debe enviar al servidor y actualizar la lista de rutinas
// Al agregar un día se debe agregar un nuevo día a la rutina
// Al agregar un ejercicio se debe agregar un nuevo ejercicio al día
// Al agregar un ejercicio se debe mostrar un modal con un buscador de ejercicios
// Al seleccionar un ejercicio se debe agregar a la rutina


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { useTranslator } from '../context/TranslatorProvider';
// import { useAuth } from '../context/AuthProvider';
import { createRoutine } from '../Services/api';
import { Icon } from '@rneui/base';
import ExerciseBrowser from './ExerciseBrowser';
import TextInputCustom from './TextInputCustom';
import { Card, Paragraph } from 'react-native-paper';
import ExerciseCard from './ExerciseCard';
import Button from './Button';
import TextEditableModal from './TextEditableModal';
import TextEditable from './TextEditable';

export default function RoutineNew({ onCreate }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  // const { user } = useAuth();
  const { routines, nanoid } = useData();
  const [routineName, setRoutineName] = useState('');
  const [routineDays, setRoutineDays] = useState([]);
  const [currentDay, setCurrentDay] = useState('');
  const [daysExercises, setDaysExercises] = useState({});
  const [showExerciseBrowser, setShowExerciseBrowser] = useState(false);

  const AddDay = (
    <View style={{flexDirection: 'row'}}>
      <Icon name='add' color={styles.secondary}/>
      <Text style={{...styles.textBigger, marginLeft: 10, color: styles.secondary}}>{translate('day')}</Text>
    </View>
  );

  const AddExercise = (
    <View style={{flexDirection: 'row'}}>
      <Icon name='add' color={styles.primary}/>
      <Text style={{...styles.textBigger, marginLeft: 10, color: styles.primary}}>{translate('exercise')}</Text>
    </View>
  );

  useEffect(() => {
  }, [routineName, routineDays, daysExercises, showExerciseBrowser]);

  const handleAddDay = () => {
    console.log('handleAddDay:', routineDays);
    const dayId = routineDays.length ? Math.max(...routineDays.map(d=>d.id)) + 1 : 1;
    let newDay = {
      id: dayId,
      name: `Día ${dayId}`,
      exercises: []
    };
    console.log([...routineDays, newDay]);
    // console.log('Max: ', Math.max(routineDays.map(d=>d.id)));
    setRoutineDays([...routineDays, newDay]);
  };

  const handleDeleteDay = (day) => {
    console.log('handleDeleteDay', day);
    const currentDays = routineDays;
    currentDays.splice(day.id - 1, 1);
    setRoutineDays([...currentDays]);
  };

  const handleAddExercise = (day) => {
    console.log('handleAddExercise', day);
    setCurrentDay(day.name);
    setShowExerciseBrowser(true);
  };

  const handleConfigExercise = (day, exercise, index) => {
    console.log('handleConfigExercise', day, index);
  };

  const handleDeleteExercise = (day, index) => {
    console.log('handleDeleteExercise', day, index);
    const currentExercises = daysExercises[day.name] || [];
    currentExercises.splice(index, 1);
    setDaysExercises({[day.name]: currentExercises});
  };

  const handleOnPressExercise = (exercises) => {
    console.log('handleOnPressExercise', exercises);
    setShowExerciseBrowser(false);
    let newExercise = {...exercises};
    //   id: exercise.id,
    //   name: exercise.name,
    //   description: exercise.description,
    //   image: exercise.image,
    //   video: exercise.video,
    //   sets: exercise.sets,
    //   reps: exercise.reps,
    //   rest: exercise.rest,
    //   weight: exercise.weight,
    //   intensity: exercise.intensity
    // };
    console.log('---------------------------------');
    console.log('daysExercises', daysExercises);
    console.log('currentDay', currentDay);
    const currentExercises = daysExercises[currentDay] || [];
    console.log('currentExercises', currentExercises);
    // daysExercises[currentDay] = [...currentExercises, newExercise];
    daysExercises[currentDay] = [...currentExercises, ...exercises];
    setDaysExercises({...daysExercises});
  };
  
  const handleCreateRoutine = () => {
    console.log('handleCreateRoutine');
    let newRoutine = {
      id: routines.length + 1,
      name: routineName,
      days: routine
    };
    setRoutines([...routines, newRoutine]);
    createRoutine(user, newRoutine);
    onCreate(newRoutine);
  };

  const handleDeleteRoutineData = () => {
    console.log('handleDelete');
    setRoutineName('');
    setRoutineDays([]);
    setCurrentDay({});
    setDaysExercises({});
  };

  return (
    <View style={styles.container}>
      {showExerciseBrowser ?
        <ExerciseBrowser
          multipleSelection={true}
          onSelect={handleOnPressExercise}
          onCancel={() => setShowExerciseBrowser(false)}
        />
        : 
      <>
        <TextInputCustom
          style={{margin: 15}}
          onChangeText={(text) => setRoutineName(text)}
          value={routineName}
          placeholderTextColor={styles.placeholderText}
          placeholder={translate('routineName')}
        />
        {routineDays.map((item) => {          
          return (
          <Card key={item.id+nanoid()} style={styles.card}>
            <Card.Content>
              <>
                <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between'}}>
                  {/* <TextEditableModal style={{...styles.textBigger, color: styles.secondary, textDecorationLine: 'underline', flex: 1}} text={item.name} /> */}
                  <TextEditable style={{...styles.textBigger, color: styles.secondary, flex: 1}} text={item.name} />
                  <Button
                    style={{...styles.buttonSlim, flex: 0}}
                    title={<Icon name='close' color={styles.grayHeader}/>}
                    onPress={() => handleDeleteDay(item)}
                  />
                  {/* <TouchableOpacity style={{flex: 0}} onPress={() => handleDeleteDay(item)}>
                    <Icon name='close' color={styles.grayHeader}/>
                  </TouchableOpacity> */}
                </View>
                {daysExercises[item.name]?.map((exercise, index) => (
                  // <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  //   <Text style={{...styles.textBigger, margin: 15}}>{translate(exercise.name)}</Text>
                  //   <TouchableOpacity onPress={() => handleDeleteExercise(item, index)}>
                  //     <Icon name='delete' color='red'/>
                  //   </TouchableOpacity>
                  // </View>
                  <View key={exercise.id+nanoid()} style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', maxHeight: 65, justifyContent: 'space-between', alignItems: 'center' }}>
                      <ExerciseCard styleContainer={{flex: 9}} styleText={styles.textBigger}  key={exercise.id+nanoid()} exercise={exercise} onPress={() => handleConfigExercise(item, index)}/>
                      <TouchableOpacity style={{flex: 1}} onPress={() => handleDeleteExercise(item, index)}>
                        <Icon name='delete' color={styles.error.color}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                <Button
                  style={{...styles.buttonSlim, backgroundColor: styles.secondary}}
                  styleText={{color: styles.primary}}
                  title={AddExercise}
                  onPress={() => handleAddExercise(item)}
                />
              </>
            </Card.Content>
            {/* <Card.Actions>
              <TouchableOpacity
                style={{borderRadius: 50, backgroundColor: styles.secondary, padding: 5, margin: 5 }}
                onPress={() => handleAddExercise(item)}
              >
                <Icon name='add' color={styles.primary}/>
              </TouchableOpacity>
            </Card.Actions> */}
          </Card>
        )})}
        {/* <FlatList
          data={routineDays}
          renderItem={({item}) => (
            <View style={{ flexDirection: 'column', margin: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.textBigger}>{item.name}</Text>
                <TouchableOpacity onPress={() => handleAddExercise(item)}>
                  <Icon name='add' color='red'/>
                </TouchableOpacity>
              </View>
              <FlatList
                data={daysExercises[item.name] || []}
                renderItem={({item, index}) => (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{...styles.textBig, margin: 15}}>{item.name}</Text>
                    <TouchableOpacity onPress={() => handleDeleteExercise(item, index)}>
                      <Icon name='delete' color='red'/>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => `${item.id} ${nanoid()}`}
              />
            </View>
          )}
          keyExtractor={item => `${item.id} ${nanoid()}`}
        /> */}
        <Button
          style={{...styles.buttonSlim, margin: 10}}
          styleText={{color: styles.secondary}}
          title={AddDay}
          onPress={handleAddDay}
        />
        
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{...styles.button, flex: 1, margin: 10}} onPress={handleCreateRoutine}>{translate('create')}</Text>
          <Text style={{...styles.button, flex: 1, margin: 10}} onPress={handleDeleteRoutineData}>{translate('delete')}</Text>
        </View>
      </>}
    </View>
  );
}
