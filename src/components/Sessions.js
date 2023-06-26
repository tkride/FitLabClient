import { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from './Accordion';
import { Icon } from '@rneui/base';
import SessionInfo from './SessionInfo';
import SessionExercise from './SessionExercise';

export default function Sessions({ navigation }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { sessions, nanoid, toLocaleString } = useData();
  const [selectedSession, setSelectedSession] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [enableRangeSelection, setEnableRangeSelection] = useState(false);
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  
  useEffect(() => {
    const month = new Date(currentMonth).getMonth();
    const year = new Date(currentMonth).getFullYear();
    const currentMonthSessions = sessions.filter(session => {
      const sessionDate = new Date(session.info.startTime*1000);
      return (sessionDate.getMonth() === month && sessionDate.getFullYear() === year);
    });
    
    const sessionDays = currentMonthSessions.map(session => {
      return {
        date: new Date(session.info.startTime*1000),
        style: { backgroundColor: 'transparent', borderWidth: 1, borderColor: styles.tertiary },
        textStyle: { color: styles.calendarSessionMark.color },
      }
    });
    setCustomDatesStyles(sessionDays);

  }, [currentMonth, sessions]);

  const handleOnDateChange = (date, type) => {
    console.log({date});
    const selDate = new Date(date);
    const selSessions = sessions.filter(session => {
      const sessionDate = new Date(session.info.startTime*1000);
      return (sessionDate.getDate() === selDate.getDate() && sessionDate.getMonth() === selDate.getMonth() && sessionDate.getFullYear() === selDate.getFullYear());
    });

    // console.log(selSessions)
    setSelectedSession(selSessions);
  };

  const handleOnMonthChange = (month) => {
    setCurrentMonth(month);
  };

  return (
    <ScrollView
      shouldRasterizeIOS={true}
      renderToHardwareTextureAndroid={true}
      style={{...styles.scrollView, height: '80%'}}>
      <View style={styles.calendarStyle}>
        <CalendarPicker
          style={{backgroundColor: styles.primary, margin: 10, marginTop: -20}}
          startFromMonday={true}
          allowRangeSelection={enableRangeSelection}
          weekdays={translate('dayNamesShort')}
          months={translate('monthNames')}
          previousTitle={translate('previous')}
          nextTitle={translate('next')}
          todayBackgroundColor='transparent'
          // TODO: POR ALGUN MOTIVO ACTUALIZA MAL EL ESTILO DEL DIA ACTUAL, LA CONDICION DE ABAJO ESTA INVERTIDA
          // todayTextStyle={{ color: new Date().toDateString() === new Date(selectedDate).toDateString() ? styles.primary : styles.tertiary, fontWeight: 'bold'}}
          todayTextStyle={{ color: styles.tertiary, fontWeight: 'bold'}}
          selectedDayColor={styles.secondary}
          selectedDayTextColor={styles.primary}
          selectedDayStyle={{backgroundColor: styles.secondary, borderWidth: 0}}
          textStyle={{color: styles.title.color}}
          onDateChange={handleOnDateChange}
          onMonthChange={handleOnMonthChange}
          customDatesStyles={customDatesStyles}
          // height={350}
          // width={400}
        />
      </View>
      <View style={styles.view}>
        {(selectedSession.length > 0) && <Text style={{...styles.textBigger, marginLeft: 10}}>{translate('sessions')}: {selectedSession.length}</Text>}
        {(selectedSession.length > 0) &&
          selectedSession.map(session => (
          <Accordion
            key={nanoid()}
            foldSymbol={<Icon type='entypo' name='chevron-up' />}
            unfoldSymbol={<Icon type='entypo' name='chevron-down' />}
            expandedDefault={true}
            styleContainer={{backgroundColor: styles.backMain}}
            styleHeader={{backgroundColor: styles.secondary}}
            title={
              <View style={{flexDirection: 'row'}}>
                <Text style={{...styles.subtitle, color: styles.primary, flex: 1}}>{toLocaleString(new Date(session.info.startTime*1000)).split(' ')?.[1]}</Text>
                <Text style={{...styles.subtitle, color: styles.primary, flex: 1}}>   -   </Text>
                <Text style={{...styles.subtitle, color: styles.primary, flex: 1}}>{toLocaleString(new Date(session.info.endTime*1000)).split(' ')?.[1]}</Text>
              </View>
            }
            styleTitle={{textAlign: 'center'}}
            content={
              <View>
                <SessionInfo info={session.info} />
                <SessionExercise exercises={session.exercises} />
                </View>
              }
            styleContent={{margin: 10}}
          />)
          // <Card style={styles.card}>
          //   {/* <Text style={{...styles.subtitle, marginLeft: 10}}>{toLocaleString(new Date(session.info.startTime*1000))}</Text> */}
          //   <Card.Title title={`${toLocaleString(new Date(session.info.startTime*1000)).split(' ')?.[1]} - ${toLocaleString(new Date(session.info.endTime*1000)).split(' ')?.[1]}`} titleStyle={[styles.title]}/>
          //   <Card.Content>
          //     <Text style={styles.textBigger}>{translate('sessionTotalTime')}: {(session.info.totalTime/60).toFixed(1)}min</Text>
          //     <Text style={styles.textBigger}>{translate('exercises')}: {session.info.totalExercise}</Text>
          //     <Text style={styles.textBigger}>{translate('sessionRestTime')}: {(session.info.restTime/60).toFixed(1)}min</Text>
          //     <Text style={styles.textBigger}>{translate('sessionWastedTime')}: {(session.info.wastedTime/60).toFixed(1)}min</Text>
          //     <Text style={styles.textBigger}>{translate('sessionTotalWeight')}: {session.info.totalWeight}kg</Text>
          //     {session.exercises.map(exercise => {
          //       const exerciseName = exercises.find(ex => ex.id === exercise.exerciseId)?.name;
          //       return (
          //       <>
          //       <View key={nanoid()} style={{...styles.view, flexDirection: 'row'}}>
          //         {/* logTimeExercise, mydateExercise, sets, record, */}
          //         <Text style={{...styles.textBigger, flex: 2}}>{exerciseName}</Text>
          //         <Text style={{...styles.textBigger, flex: 1}}>1RM:{exercise.record}</Text>
          //       </View>
          //       <View style={styles.view}>
          //         {exercise.sets.map((log, index) => {
          //           return (
          //             <View key={nanoid()} style={{...styles.view, flexDirection: 'row'}}>
          //               {/* <Text style={styles.textBig}>{log.weight}kg x {log.reps} @ {log.rir}  ({translate('rest')}: {log.rest}s)</Text> */}
          //               <Text style={{...styles.textBig, flex: 2}}>{log.weight}kg x {log.reps} @ {log.rir}</Text>
          //               <Text style={{...styles.textBig, flex: 1}}>{log.duration}s</Text>
          //               <Text style={{...styles.textBig, flex: 1}}>{translate('rest')}: {log.rest}s</Text>
          //               {/* <Text style={styles.textBig}>{translate('time')}: {toLocaleString(new Date(log.mydateExercise*1000))}</Text> */}
          //               {/* <Text style={styles.textBig}>{translate('duration')}: {log.duration}min</Text> */}
          //             </View>
          //           );
          //         })}
          //       </View>
          //       </>);
          //     })}
          //   </Card.Content>
          // </Card>)
        )}
      </View>
    </ScrollView>
  );
};

        