import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import { Icon } from '@rneui/base';
import ExerciseCard from './ExerciseCard';
import Button from './Button';
// import { DraxProvider, DraxView } from 'react-native-drax';
import TextEditable from './Text/TextEditable';


const DayExercisesCard = ({
  day,
  editable=false,
  onChangeDayName,
  onPressExercise,
  onDeleteDay,
  onAddExercise,
  onDeleteExercise,
  onApplyToAll,
  onReceiveDragDrop
}) => {
  const DELETE_DRAG_THRESHOLD = 40;
  const APPLY_TO_ALL_DRAG_THRESHOLD = 40;

  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { nanoid } = useData();

  useEffect(() => {
  }, [day]);

  const handleOnChangeDayName = (name) => {
    console.log('handleOnChangeDayName', name);
    if(onChangeDayName) {
      onChangeDayName(name);
    }
  };

  const handleDeleteDay = (day) => {
    console.log('handleDeleteDay', day);
    if(onDeleteDay) {
      onDeleteDay(day);
    }
  };

  const handleAddExercise = (day) => {
    if(onAddExercise) {
      onAddExercise(day);
    }
  };

  const handleDeleteExercise = (day, exercise) => {
    if(onDeleteExercise) {
      onDeleteExercise(day, exercise);
    }
  }

  const handleOnSwipe = (event, day, index) => {
    if(event.direction === 'horizontal') {
       if(event.sense === 'left' &&
        Math.abs(event.dx) > DELETE_DRAG_THRESHOLD) {
          handleDeleteExercise(day, index);
       }
       else if(event.sense === 'right' &&
        Math.abs(event.dx) > APPLY_TO_ALL_DRAG_THRESHOLD) {
          handleApplyToAll(day?.exercises[index], index);
       }
    }
  };

  const handleOnPressExercise = (exercise, index) => {
    if(onPressExercise) {
      onPressExercise(exercise, index);
    }
  };

  const handleApplyToAll = (exercise, index) => {
    if(onApplyToAll) {
      onApplyToAll(exercise, index);
    }
  };

  const addExercise = (
    <View style={{flexDirection: 'row'}}>
      <Icon name='add' color={styles.buttonSlim.color}/>
      <Text style={{...styles.textBigger, marginLeft: 10, color: styles.buttonSlim.color}}>{translate('exercise')}</Text>
    </View>
  );

  console.log('DayExercisesCard', day);
  const DayExercisesItems = day.exercises?.map((exercise, index) => {
    const conf = exercise?.configuration;
    const ExerciseConfiguration = (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{...styles.text, marginRight: 5}}>{conf?.sets ?? 0}</Text>
        <Text style={{...styles.text, marginRight: 5}}>x</Text>
        <Text style={{...styles.text, marginRight: 5}}>{conf?.executionCountType === 'time' ? `${conf?.executionTime ?? 0}s` : conf?.reps ?? 0}</Text>
        <Text style={{...styles.text, marginRight: 5}}>@</Text>
        <Text style={{...styles.text, marginRight: 30}}>{`${conf?.effortType ?? 'RIR'}: ${conf?.effort ?? (conf?.effortType === 'RPE' ? 10 : 0)}`}</Text>
        <Text style={{...styles.text}}>{`${translate('restShort').toUpperCase()}: `}{conf?.restAlarm ?? 0}{'s'}</Text>
      </View>
    );
    {/* TODO AGREGAR INFO DEL EJERCICIO, SI NO ES EDITABLE */}
    const ExerciseItem = (
        <ExerciseCard 
          key={exercise.id + index + nanoid()}
          exercise={exercise}
          styleText={{...styles.textBigger, color: styles.secondary}}
          // description={`${translate(exercise.mainMuscles)}\n${translate(exercise.secondaryMuscles)}`}
          description={ExerciseConfiguration}
          onPress={() => handleOnPressExercise(exercise, index)}
          enableSwipe={['left', 'right', 'up', 'down']}
          // selectable={true}
          onSelect={() => console.log('onSelect')}
          onSwipeEnd={(e) => handleOnSwipe(e, day, index)} />
    );

    return (ExerciseItem);
  });

  return (
    <View key={day.id} style={styles.card}>
      <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
        <TextEditable
          style={{ ...styles.textBigger, color: styles.secondary, flex: 1 }}
          text={day.name}
          onSave={handleOnChangeDayName}
        />
        {editable &&
        <Button
          style={{ ...styles.buttonSlim, backgroundColor: styles.primary, flex: 0 }}
          title={<Icon name='close' color={styles.grayHeader} />}
          onPress={() => handleDeleteDay(day)}
        />}
      </View>

      {DayExercisesItems}

      <Button
        style={{ ...styles.buttonSlim, margin: 10 }}
        styleText={{ color: styles.primary }}
        title={addExercise}
        onPress={() => handleAddExercise(day)}
      />
    </View>
  );
};

export default DayExercisesCard;
