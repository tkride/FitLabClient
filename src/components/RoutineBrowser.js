// RoutineBrowser.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import { TouchableOpacity } from 'react-native';
// importa la api para obtener las rutinas

// import Draggable from 'react-native-draggable';
// import ScreenTitle from './ScreenTitle';

// export default function RoutineBrowser({ navigation, destination }) {
export default function RoutineBrowser({ onPress }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { user, routines, nanoid } = useData();

  // const [data, setData] = useState(null);
  const [routineNames, setRoutineNames] = useState([]);
  // const [exercises, setExercises] = useState(null);

  const handleSelect = (routine) => {
    // navigation.navigate(destination, {routine});
    if(onPress) onPress(routine);
  }

  useEffect(() => {
    const rNames = routines?.map( r => r ? r.name : '');
    setRoutineNames(rNames);
  }, []);

  if (!routines) {
    return (
        <Text style={styles.text}>{`${translate('loading')}`}</Text>
    );
  }

  console.log(routineNames);

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
      {
        routines.map(routine => {
          return (
            <View
              key={routine.name + nanoid()}
              shouldRasterizeIOS={true}
              renderToHardwareTextureAndroid={true}
            >
              <TouchableOpacity key={routine.name + nanoid()} onPress={() => handleSelect(routine.name)}>
                <Card style={[styles.card, { backgroundColor: styles.cardBackRoutine }]}>
                  <Card.Title title={routine.name} titleStyle={[styles.cardContent]}/>
                  <Card.Content>
                    <View style={[{ flexDirection: 'row' }]} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true}>
                      <Text style={[styles.text, { flex: 1, left: 10 }]}>{`${routine?.analytics?.session?.days} ${translate('days')}`}</Text>
                      <Text style={[styles.text, { flex: 1, left: 60 }]}>{`${translate('sessions')}: ${routine?.analytics?.session?.sessions}`}</Text>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </View>
          )
        })
      }
      </ScrollView>
      {/* <TableCustom headers={['Nombre']} data={[['a'], ['d']]}/> */}
      {/* {routineNames.map(routine => <Text>{routine}</Text> )} */}
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