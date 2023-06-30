// RoutineNew.js

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { useTranslator } from '../context/TranslatorProvider';
// import { useAuth } from '../context/AuthProvider';
import { createRoutine } from '../Services/api';
import { Icon } from '@rneui/base';
import ExerciseBrowser from './ExerciseBrowser';
import TextInputCustom from './Text/TextInputCustom';
import Button from './Button';
// import Draggable from 'react-native-draggable';
// import { DraxProvider, DraxView } from 'react-native-drax';
import DayExercisesCard from './DayExercisesCard'; // Importar el nuevo componente
import ModalConfirm from './Text/ModalConfirm';
import ExerciseConfiguration from './ExerciseConfiguration';


export default function RoutineNew({ onCreate }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  // const { user } = useAuth();
  const { routines, nanoid } = useData();
  const [routineName, setRoutineName] = useState('');
  const [routineDays, setRoutineDays] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const [showExerciseBrowser, setShowExerciseBrowser] = useState(false);
  const [exerciseConfiguration, setExerciseConfiguration] = useState(false);
  const [lastExerciseConfiguration, setLastExerciseConfiguration] = useState(null);
  const [deleteExercise, setDeleteExercise] = useState(null);
  const [deleteDay, setDeleteDay] = useState(null);

  const AddDay = (
    <View style={{flexDirection: 'row'}}>
      <Icon name='add' color={styles.secondary}/>
      <Text style={{...styles.textBigger, marginLeft: 10, color: styles.secondary}}>{translate('day')}</Text>
    </View>
  );

  useEffect(() => {
  }, [routineName, routineDays, showExerciseBrowser, deleteExercise]);

  const handleAddDay = () => {
    console.log('handleAddDay:', routineDays);
    const dayId = Object.values(routineDays).length ? Math.max(...Object.values(routineDays).map(d=>d.id)) + 1 : 1;
    let newDay = {
      id: dayId,
      name: `Día ${dayId}`,
      exercises: []
    };
    console.log('handleAddDay new:', {...routineDays, newDay});
    setRoutineDays({...routineDays, [newDay.name]: newDay});
  };

  const handleOnChangeDayName = (day, name) => {
    console.log('handleOnChangeDayName', day, name);
    const currentDays = {...routineDays};
    currentDays[name] = {...currentDays[day.name]};
    currentDays[name].name = name;
    delete currentDays[day.name];
    setRoutineDays({...currentDays});
  };

  const handleConfirmDeleteDay = ({reply, data}) => {
    setDeleteDay(null);
    console.log('handleConfirmDeleteDay', reply, data);
    if(reply) {
      handleDeleteDay(data);
    }
  };

  const handleDeleteDay = (day) => {
    console.log('handleDeleteDay', day);
    const currentDays = {...routineDays};
    delete currentDays[day?.name];
    setRoutineDays({...currentDays});
  };

  const handleAddExercise = (day) => {
    console.log('handleAddExercise', day);
    setCurrentDay(day.name);
    setShowExerciseBrowser(true);
  };

  const handleConfigExercise = (day, exercise, index) => {
    console.log('handleConfigExercise', exercise);
    setExerciseConfiguration({day, exercise, index});
  };

  const handleOnCompleteExerciseConfiguration = ({day, exercise, applyToAll, index}) => {
    console.log('handleOnCompleteExerciseConfiguration', applyToAll);
    const currentExercises = routineDays[day.name]?.exercises || [];
    if(applyToAll) {
      currentExercises.forEach(e => {
        e.configuration = exercise.configuration;
      });
    } else {
      currentExercises[index] = exercise;
    }
    setLastExerciseConfiguration(exercise.configuration)
    routineDays[day.name].exercises = currentExercises;
    setRoutineDays({...routineDays});
    setExerciseConfiguration(null);
  }

  const handleConfirmDeleteExercise = ({reply, data}) => {
    setDeleteExercise(null);
    console.log('handleConfirmDeleteExercise', reply, data);
    if(reply) {
      const {day, index} = data;
      handleDeleteExercise(day, index);
    };
  };

  const handleDeleteExercise = (day, index) => {
    const currentExercises = routineDays[day.name].exercises || [];
    currentExercises.splice(index, 1);
    routineDays[day.name].exercises = currentExercises;
    setRoutineDays({...routineDays});
  };

  const handleOnSelectExercises = (exercises) => {
    console.log('handleOnSelectExercises', exercises.map(e=>e.name));
    exercises.forEach(e => {
      if(!e.configuration) {
        if(lastExerciseConfiguration) {
          e.configuration = lastExerciseConfiguration;
        }
        else {
          e.configuration = {
            sets: '0',
            reps: '0',
            effortType: 'RIR',
            effort: '0',
            executionTimeLimit: '0',
            restAlarm: '0',
            // tempo: '2-0-2', // TODO: AGREGAR TEMPO A CONFIGURACION
          }
        }
      }
    });
    console.log('handleOnSelectExercises', exercises.map(e=>e.configuration));

    setShowExerciseBrowser(false);
    console.log('---------------------------------');
    console.log('currentDay', currentDay);
    const currentExercises = routineDays[currentDay].exercises || [];
    currentExercises.push(...exercises);
    routineDays[currentDay].exercises = currentExercises;
    setRoutineDays({...routineDays});
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
    setRoutineDays({});
    setCurrentDay({});
  };

  const handleOnReceiveDragDrop = (item, payload, index) => {
    const dayExercises = routineDays[item.name].exercises || [];
    const draggedExercise = dayExercises[payload.index];
  
    // Removes the item from the array
    dayExercises.splice(payload.index, 1);
    // Inserts the dragged item into the array at destination index
    dayExercises.splice(index, 0, draggedExercise);
    routineDays[item.name].exercises = dayExercises;
    setRoutineDays({...routineDays});
  };

  // console.log('routineDays', routineDays);

  console.log('RoutineNew:render');
  if(showExerciseBrowser)
  return (
    <ExerciseBrowser
      multipleSelection={true}
      onSelect={handleOnSelectExercises}
      onCancel={() => setShowExerciseBrowser(false)}
    />);

  if(exerciseConfiguration) {
    return (
    <ExerciseConfiguration
      exercise={exerciseConfiguration.exercise}
      onComplete={(newExercise, applyToAll) => handleOnCompleteExerciseConfiguration({...exerciseConfiguration, exercise: newExercise, applyToAll})}
      onCancel={() => setExerciseConfiguration(null)} />
    );
  }

  return (
    <View style={styles.container}>
      <TextInputCustom
        style={{margin: 15}}
        onChangeText={(text) => setRoutineName(text)}
        value={routineName}
        placeholderTextColor={styles.placeholderText}
        placeholder={translate('routineName')}
      />
      {
        (deleteExercise != null) &&
        <ModalConfirm
          title={translate('deleteExerciseMsgTitle')}
          message={translate(deleteExercise?.day.exercises[deleteExercise?.index].name) + `\n` +
                    translate('deleteExerciseMsgExerciseNumber') + Number(deleteExercise?.index + 1) + `\n` +
                    translate('deleteExerciseMsgDay') + deleteExercise?.day?.name}
          data={deleteExercise}
          onAccept={(e) => handleConfirmDeleteExercise(e)}
          onCancel={(e) => setDeleteExercise(null)} />
      }
      {
        (deleteDay != null) &&
        <ModalConfirm
          title={translate('deleteDayMsgTitle')}
          message={`${translate('deleteDayMsgDay')} (${deleteDay?.id}) ${deleteDay?.name}`}
          data={deleteDay}
          onAccept={(e) => handleConfirmDeleteDay(e)}
          onCancel={(e) => setDeleteDay(null)} />
      }
      <ScrollView style={{ ...styles.scrollView, height: '80%' }}>
        {Object.values(routineDays).map((item) => {
          return (
            <DayExercisesCard
              key={item.id}
              day={item}
              editable={true}
              onChangeDayName={(name) => handleOnChangeDayName(item, name)}
              onPressExercise={(exercise, index) => handleConfigExercise(item, exercise, index)}
              onDeleteDay={() => setDeleteDay(item)}
              onAddExercise={handleAddExercise}
              onDeleteExercise={(day, index) => setDeleteExercise({day, index})}
              // onApplyToAll={(exercise, index) => handleOnCompleteExerciseConfiguration(item, exercise, index)}
              onApplyToAll={(exercise, index) => handleOnCompleteExerciseConfiguration({...{day: item, index}, exercise, applyToAll: true})}
              onReceiveDragDrop={handleOnReceiveDragDrop}
            />
          );
        })}
      </ScrollView>

      <Button
        style={{...styles.buttonSlim, backgroundColor: styles.primary, color: styles.secondary, margin: 10}}
        styleText={{color: styles.secondary}}
        title={AddDay}
        onPress={handleAddDay}
      />
      
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{...styles.buttonSlim, flex: 1, margin: 10}} onPress={handleCreateRoutine}>{translate('create')}</Text>
        <Text style={{...styles.buttonSlim, flex: 1, margin: 10}} onPress={handleDeleteRoutineData}>{translate('clear')}</Text>
      </View>
    </View>
  );
}
