// SessionAnalysis.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import TableCustom from './TableCustom';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { useTranslator } from '../context/TranslatorProvider';
import ScreenTitle from './ScreenTitle';

const SORT_DESC = -1;
const SORT_NO = 0;
const SORT_ASC = 1;
const MAIN_TABLE = 0;
const SECONDARY_TABLE = 1;

export default function RoutineAnalytics({ navigation, routine }) {
  const { styles } = useTheme();
  const { nanoid, routines } = useData();
  const { language, translate } = useTranslator();
  const [routineData, setRoutineData] = useState({});
  const [headersMain, setHeadersMain] = useState(translate('routineAnalyticsHeaders'));
  const [headersSecondary, setHeadersSecondary] = useState(translate('routineAnalyticsHeaders'));
  const [keyMain, setKeyMain] = useState(0);
  const [keySecondary, setKeySecondary] = useState(0);
  const [mainTableData, setMainTableData] = useState([]);
  const [secondaryTableData, setSecondaryTableData] = useState([]);
  const [headerSortedMain, setHeaderSortedMain] = useState(translate('routineAnalyticsHeaders')[1]);
  const [sortDirectionMain, setSortDirectionMain] = useState(SORT_DESC);
  const [headerSortedSecondary, setHeaderSortedSecondary] = useState(translate('routineAnalyticsHeaders')[1]);
  const [sortDirectionSecondary, setSortDirectionSecondary] = useState(SORT_DESC);


  const sortRows = (rows, headers, header, direction) => {
    const index = headers.indexOf(header);
    const sortedRows = rows.sort((a, b) => {
      if(direction === SORT_ASC) {
        return a[index] > b[index] ? 1 : -1;
      }
      else if(direction === SORT_DESC) {
        return a[index] < b[index] ? 1 : -1;
      }
      else {
        return 0;
      }
    });
    return sortedRows;
  }


  const createTableRows = (muscles) => {
    const rows = [];
    Object.entries(muscles).forEach( ([name, muscle]) => {
      const exercises = muscle?.exercises;
      const sets = muscle?.sets;
      const reps = muscle?.reps;
      const effectiveReps = muscle?.effectiveReps;
      const frequency = muscle?.frequency;
      const intensity = muscle?.intensity;
      if((exercises !== 0) || (sets !== 0) || (reps !== 0) || (effectiveReps !== 0) || (frequency !== 0) || (intensity !== 0)) {
        const row = [translate(name), exercises, sets, reps, effectiveReps, frequency, intensity];
        rows.push(row);
        console.log({row})
      }
    });
    return rows;
  }


  useEffect(() => {
    if(JSON.stringify(headersMain) !== JSON.stringify(translate('routineAnalyticsHeaders'))) {
      setHeadersMain(translate('routineAnalyticsHeaders'));
      setHeadersSecondary(translate('routineAnalyticsHeaders'));
    }

    let rowsMainMuscles = [];
    let headersMainMod = [...translate('routineAnalyticsHeaders')];
    let rowsSecondaryMuscles = [];
    let headersSecondaryMod = [...translate('routineAnalyticsHeaders')];
    
    const routineSel = routines.find( r => r.name === routine);
    setRoutineData(prevData => (routineSel !== prevData) ? routineSel : prevData);

    if(routineData?.analytics) {
      const mainMuscles = routineData.analytics?.mainMuscles;
      if(mainMuscles) {
        rowsMainMuscles.push(...createTableRows(mainMuscles));
      }

      const secondaryMuscles = routineData.analytics?.secondaryMuscles;
      if(secondaryMuscles) {
        rowsSecondaryMuscles.push(...createTableRows(secondaryMuscles));
      }
    }

    if(rowsMainMuscles.length > 0) {
      if(headerSortedMain) {
        rowsMainMuscles = sortRows(rowsMainMuscles, headersMain, headerSortedMain, sortDirectionMain);
      }
      setMainTableData(rowsMainMuscles);
      setHeadersMain(headersMainMod);
    }
    
    if(rowsSecondaryMuscles.length > 0) {
      if(headerSortedSecondary) {
        rowsSecondaryMuscles = sortRows(rowsSecondaryMuscles, headersSecondary, headerSortedSecondary, sortDirectionSecondary);
      }
      setSecondaryTableData(rowsSecondaryMuscles);
      setHeadersSecondary(headersSecondaryMod);
    }
  }, [language, routine, routineData, routines]);


  useEffect(() => {
    if(headerSortedMain) {
      const rowsMainMuscles = sortRows(mainTableData, headersMain, headerSortedMain, sortDirectionMain);
      setMainTableData(rowsMainMuscles);
      // setHeadersMain(headersMainMod);
      setKeyMain(nanoid());
    }
  }, [headerSortedMain, sortDirectionMain, headersMain, mainTableData]);


  useEffect(() => {
    if(headerSortedSecondary) {
      const rowsSecondaryMuscles = sortRows(secondaryTableData, headersSecondary, headerSortedSecondary, sortDirectionSecondary);
      setSecondaryTableData(rowsSecondaryMuscles);
      // index = headersSecondary.indexOf(headerSortedSecondary);
      // headers[index] = `${headerWithoutArrow}\n${direction === SORT_DESC ? '▼' : ((direction === SORT_ASC) ? '▲' : '')}`;
      // setHeadersSecondary(headersSecondaryMod);
      setKeySecondary(nanoid());
    }
  }, [headerSortedSecondary, sortDirectionSecondary, headersSecondary, secondaryTableData]);

  if (!routines || !routineData) {
    return (
        <Text style={styles.text}>{translate('loading')}</Text>
    );
  }

  if ((mainTableData.length === 0) || (secondaryTableData.length === 0)) {
    return (
        <Text style={styles.text}>{translate('loadingTable')}</Text>
    );
  }

  const handleClickHeader = (header, table) => {
    const headerWithoutArrow = header.split('\n')[0];
    if(table === MAIN_TABLE) {
      if(headerSortedMain === headerWithoutArrow) {
        // setSortDirectionMain(prevDirection =>
        //   (prevDirection === SORT_DESC) ? SORT_ASC :
        //   (prevDirection === SORT_ASC) ? SORT_NO :
        //   SORT_DESC );
        setSortDirectionMain(prevDirection =>
          (prevDirection === SORT_DESC) ? SORT_ASC : SORT_DESC);
      }
      else {
        setHeaderSortedMain(headerWithoutArrow);
        setSortDirectionMain(SORT_DESC);
      }
    }
    else {
      if(headerSortedSecondary === headerWithoutArrow) {
        // setSortDirectionSecondary(prevDirection =>
        //   (prevDirection === SORT_DESC) ? SORT_ASC :
        //   (prevDirection === SORT_ASC) ? SORT_NO :
        //   SORT_DESC );
        setSortDirectionSecondary(prevDirection =>
          (prevDirection === SORT_DESC) ? SORT_ASC : SORT_DESC);
      }
      else {
        setHeaderSortedSecondary(headerWithoutArrow);
        setSortDirectionSecondary(SORT_DESC);
      }
    }
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* <Text style={[styles.textBig, {color: styles.title.color}]}>{`${translate('days')}: ${routineData?.analytics?.session?.days} - ${translate('sessions')}: ${routineData?.analytics?.session?.sessions}`}</Text> */}
        <Text style={[styles.textBig, {color: styles.title.color}]}>{`${translate('days')}: ${routineData?.analytics?.session?.days}`}</Text>
        <Text style={[styles.textBig, {color: styles.title.color}]}>{`${translate('sessions')}: ${routineData?.analytics?.session?.sessions}`}</Text>
        <ScreenTitle title={translate('mainMuscles')}/>
        {mainTableData && <TableCustom key={keyMain} headers={headersMain} data={mainTableData} onClickHeader={header => handleClickHeader(header, MAIN_TABLE)}/>}
        <ScreenTitle title={translate('secondaryMuscles')}/>
        {secondaryTableData && <TableCustom key={keySecondary} headers={headersSecondary} data={secondaryTableData} onClickHeader={header => handleClickHeader(header, SECONDARY_TABLE)}/>}
      </View>
    </ScrollView>
  );
}
