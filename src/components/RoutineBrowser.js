// RoutineBrowser.js

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import { TouchableOpacity } from 'react-native';
import TextEditable from './TextEditable';
import { Icon } from '@rneui/base';
import { useFocusEffect } from '@react-navigation/native';
// import Draggable from 'react-native-draggable';
// import ScreenTitle from './ScreenTitle';

export default function RoutineBrowser({
  filter={},
  showFavorites=false,
  multipleSelection=false,
  selectedRoutines=[],
  onSelect,
  onCancel,
 }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { routines, addFavorite, deleteFavorite, nanoid } = useData();
  const [selected, setSelectedRoutines] = useState(selectedRoutines);
  const [routinesUpdated, setRoutinesUpdated] = useState(false);
  
  useEffect(() => {
  }, [routinesData, routinesUpdated]);
  
  useFocusEffect(
    React.useCallback(() => {
      setRoutinesUpdated(!routinesUpdated);
      setRoutinesData(filterRoutines());
    }, [])
  );

  const filterRoutines = () => {
    const { filter: filters } = filter;
    if(!filters) return routines;
    const fields = [...Object.keys(filters).map(k => [k, filters[k]])];
    
    if(fields.length === 0) return routines;
    
    const filteredRoutines = routines.filter(r => {
      let ret = true;
      fields.forEach(f => {
        const [k, v] = f;
        ret = ret && (r?.[k] == v ?? false);
      });
      return ret;
    });

    return filteredRoutines;
  };
  const [routinesData, setRoutinesData] = useState(filterRoutines());

  if (!routines) {
    return (
        <Text style={styles.text}>{`${translate('loading')}`}</Text>
    );
  }

  const handleOnPressRoutine = (routine) => {
    if(multipleSelection) {
      if(selected.includes(routine)) setSelectedRoutines(selected.filter(r => r !== routine));
      else setSelectedRoutines([...selected, routine]);
    }
    else handleOnSelect(routine);
  }

  const handleOnSelect = (routine) => {
    const ret = routine ? [routine] :selected;
    if(onSelect) onSelect(ret);
  };

  const handleOnCancel = () => {
    if(onCancel) onCancel();
  };

  const handleToggleFavorite = async (routine) => {
    let res = false;
    if(routine?.favorite) {
      res = await deleteFavorite({routine: routine.id});
      routine.favorite = res ? false : routine.favorite;
    }
    else {
      res = await addFavorite({routine: routine.id});
      routine.favorite = res ? true : routine.favorite;
    }
    setRoutinesData(filterRoutines());
    setRoutinesUpdated(!routinesUpdated);
  };

  return (
    <View style={styles.view}>
      <ScrollView style={{...styles.scrollView, height: multipleSelection ? '92%' : styles.scrollView.height}}>
      {
        routinesData.map(routine => {
          const RoutineTitle = (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{marginRight:10}}
                activeOpacity={0.7}
                useForeground={false}
                onPress={() => handleToggleFavorite(routine)}
              >
                {
                  showFavorites ?
                    (routine?.favorite ?
                      <Icon type='materialIcons' name="favorite" size={15} color={styles.secondary} />
                      :
                      <Icon type='materialIcons' name="favorite-outline" size={15} color={styles.gray} />
                    ) : null
                }
              </TouchableOpacity>
              <TextEditable text={routine.name} style={{...styles.textBigger, color: styles.secondary, flex: 1}} />
            </View>
          );

          return (
            <View
              key={routine.name + nanoid()}
              shouldRasterizeIOS={true}
              renderToHardwareTextureAndroid={true}
            >
              <TouchableOpacity key={routine.name + nanoid()} onPress={() => handleOnPressRoutine(routine.name)}>
                <Card style={[styles.card, { backgroundColor: styles.cardBackRoutine }]}>
                  {/* <Card.Title title={routine.name} titleStyle={[styles.cardContent]}/> */}
                  <Card.Title title={RoutineTitle} titleStyle={[styles.cardContent]}/>
                  <Card.Content>
                    <View style={[{ flexDirection: 'row' }]} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true}>
                      <Text style={[styles.text, { flex: 1, left: 10 }]}>{`${routine?.analytics?.session?.days} ${translate('days')}`}</Text>
                      {multipleSelection &&
                      <Icon
                        type='ant-design'
                        name={selected.map(e=>e).includes(routine.name) ? 'checkcircle' : 'checkcircleo'}
                        color={selected.map(e=>e).includes(routine.name) ? styles.secondary : styles.gray}
                      />}
                    </View>
                      <Text style={[styles.text, { flex: 1, left: 10 }]}>{`${translate('sessions')}: ${routine?.analytics?.session?.sessions}`}</Text>
                  </Card.Content>
                  {/* <Card.Actions style={{ justifyContent: 'flex-end' }}>
                    <Text style={[styles.text, { flex: 1, left: 10 }]}>{`${translate('lastSession')}: ${routine?.analytics?.session?.lastSession}`}</Text>
                  </Card.Actions> */}
                </Card>
              </TouchableOpacity>
            </View>
          )
        })
      }
      </ScrollView>

      {multipleSelection &&
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{...styles.buttonSlim, flex: 1, margin: 10}} onPress={() => handleOnSelect()}>{`${translate('accept')} ${selected.length ? `(${selected.length})` : ''}`}</Text>
        <Text style={{...styles.buttonSlim, flex: 1, margin: 10}} onPress={handleOnCancel}>{translate('cancel')}</Text>
      </View>}
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