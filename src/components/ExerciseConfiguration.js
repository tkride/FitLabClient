// Path: src\Components\ExerciseConfiguration.js

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { useTranslator } from '../context/TranslatorProvider';
import ExerciseCard from './ExerciseCard';
import InputLabel from './InputLabel';
import Button from './Button';
import ComboBox from './ComboBox';
import { Switch } from 'react-native-paper';


const ExerciseConfiguration = ({ exercise, onComplete, onCancel }) => {
  const { styles } = useTheme();
  const { translate } = useTranslator();

  const [sets, setSets] = useState(0+'');
  const [executionCountType, setExecutionCountType] = useState('reps'); // 'reps', 'time'
  const [executionTimeLimit, setExecutionTimeLimit] = useState(0+'');
  const [reps, setReps] = useState(0+'');
  const [effortType, setEffortType] = useState('RIR');
  const [effort, setEffort] = useState(0+'');
  const [restAlarm, setRestAlarm] = useState(0+'');
  const [applyToAll, setApplyToAll] = useState(false);
  // const [weightType, setWeightType] = useState('total');
  // const [barbellWeight, setBarbellWeight] = useState(0);

  useEffect(() => {
    console.log('ExerciseConfiguration useEffect', exercise);
    const config = exercise?.configuration;
    if(config) {
      setSets(config?.sets ?? '0');
      setReps(config?.reps ?? '0');
      // setWeightType(config?.weightType ?? 'total');
      // setBarbellWeight(config?.barbellWeight ?? '20');
      setEffortType(exercise?.effortType ?? 'RIR');
      setEffort(config?.effort ?? '0');
      setRestAlarm(config?.restAlarm ?? '0');
      setExecutionTimeLimit(config?.executionTimeLimit ?? '0');
      setApplyToAll(config?.applyToAll ?? false);
    }
  }, [exercise]);
  
  useEffect(() => {
  }, [sets, reps, effortType, effort, restAlarm, executionTimeLimit, applyToAll]);

  const handleOnChangeSets = (value) => {
    setSets(value);
  }

  const handleOnChangeReps = (value) => {
    executionCountType === 'reps' ? setReps(value) : setExecutionTimeLimit(value);
  }

  // const handleOnChangeWeightType = (value) => {
  //   setWeightType(value);
  // }

  // const handleOnChangeBarbellWeight = (value) => {
  //   setBarbellWeight(value);
  // }

  const handleOnChangeEffortType = (value) => {
    setEffortType(value);
    if(value === 'RIR') setEffort('0');
    else setEffort('10');
  }

  const handleOnChangeExecutionCountType = (value) => {
    setExecutionCountType(value === translate('reps') ? 'reps' : 'time');
  }

  const handleOnChangeEffort = (value) => {
    setEffort(value);
  }

  const handleOnChangeRest = (value) => {
    setRestAlarm(value);
  }

  const handleOnComplete = () => {
    const ret = {
      ...exercise,
      configuration: {
        sets,
        reps,
        effortType,
        effort,
        restAlarm,
        executionTimeLimit,
      },
    };
    if(onComplete) onComplete(ret, applyToAll);
  }

  const handleOnCancel = () => {
    if(onCancel) onCancel();
  }

  return (
    <View style={styles.view}>
      <Text style={styles.title}>{translate('configuration')}</Text>
      <View style={{...styles.view}}>
        <ExerciseCard
          exercise={exercise}
          // styleContainer={{flex: 0}}
          styleText={{...styles.textBigger, color: styles.secondary}}
          description={'aaabbbccc'}
          styleDescription={{...styles.text, color: styles.secondary}}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%'}}>
          <Switch
            style={{height: 10, left: 0}}
            value={applyToAll}
            onValueChange={() => setApplyToAll(!applyToAll)}
            thumbColor={applyToAll ? styles.selected.color : styles.grayHeader}
            trackColor={{ false: styles.gray, true: styles.tertiary }}
          />
          <Text style={styles.subtitle}>{translate('applyToAll')}</Text>
        </View>
        <View style={{...styles.card, padding: 20, paddingRight: 60}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', zIndex: 10}}>
            <Text style={{...styles.textBigger, marginRight: 10}}>{translate('sets')}</Text>
            <ComboBox values={[translate('reps'), `${translate('time')}(s)`]} value={translate(executionCountType)} onChange={handleOnChangeExecutionCountType} />
            <ComboBox values={['RIR', 'RPE']} value={effortType} onChange={handleOnChangeEffortType} />
            <Text style={{...styles.textBigger}}>{`${translate('restShort')}(s)`}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <InputLabel
              style={{...styles.textBigger, color: styles.secondary}}
              value={sets}
              isNumeric={true}
              onChange={handleOnChangeSets}
            />
            <InputLabel
              style={{...styles.textBigger, color: styles.secondary}}
              value={executionCountType === 'reps' ? reps : executionTimeLimit}
              isNumeric={true}
              onChange={handleOnChangeReps}
            />
          <InputLabel
            style={{...styles.textBigger, color: styles.secondary}}
            value={effort}
            isNumeric={true}
            onChange={handleOnChangeEffort}
          />
          <InputLabel
            style={{...styles.textBigger, color: styles.secondary}}
            value={restAlarm}
            isNumeric={true}
            onChange={handleOnChangeRest}
          />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            style={{ ...styles.buttonSlim, flex: 1, margin: 10 }}
            styleText={{color: styles.primary}}
            title={translate('save')}
            onPress={handleOnComplete}
          />
          <Button
            style={{ ...styles.buttonSlim, flex: 1, margin: 10 }}
            styleText={{color: styles.primary}}
            title={translate('cancel')}
            onPress={handleOnCancel}
          />
        </View>
      </View>
    </View>
  );
};

export default ExerciseConfiguration;

// TODO EL DESGLOSE ES UNA FORMA DE PRESENTAR LOS DATOS DURANTE EL REGISTRO DE ENTRENAMIENTO O EN EL HISTÓRICO DE SESIONES, NO ES UNA FORMA DE GUARDAR LOS DATOS.
/*
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            justifyContent: 'flex-start',
            width: '100%',
            zIndex: 10
          }}>
          <Text style={{...styles.subtitle, marginRight: 10, zIndex: 100}}>{translate('weightType')}</Text>
          <ComboBox
            values={[translate('total'), translate('breakdown')]}
            value={weightType}
            onChange={handleOnChangeWeightType}
          />
        </View>
        {weightType === translate('breakdown') && (
          <View
            style={{  flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'flex-start', width: '100%', zIndex: 10}}>
            <Text style={{...styles.textBigger, marginRight: 10, zIndex: 100}}>{translate('barbellWeight')}</Text>
            <InputLabel
              style={{...styles.textBigger, color: styles.secondary}}
              value={barbellWeight}
              isNumeric={true}
              onChange={handleOnChangeBarbellWeight}
            />
          </View>
        )}
*/