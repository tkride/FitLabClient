import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';

export default function SessionInfo({ info, style }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();

  return (
    <>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={{...styles.textBigger, flex: 1.5}}></Text>
        <Text style={{...styles.textBigger, flex: 1}}>{translate('total')}</Text>
        <Text style={{...styles.textBigger, flex: 1}}>{translate('restShort')}</Text>
        <Text style={{...styles.textBigger, flex: 1}}>{translate('wasted')}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={{...styles.textBig, flex: 1.5}}>{translate('time')} (min)</Text>
        <Text style={{...styles.textBig, flex: 1}}>{(info.totalTime/60).toFixed(1)}</Text>
        <Text style={{...styles.textBig, flex: 1}}>{(info.restTime/60).toFixed(1)}</Text>
        <Text style={{...styles.textBig, flex: 1}}>{(info.wastedTime/60).toFixed(1)}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-between', margin: 5}}>
        <Text style={{...styles.textBig}}>{translate('exercises')}: {info.totalExercise}</Text>
        <Text style={{...styles.textBig}}>{translate('sessionTotalWeight')}: {info.totalWeight}kg</Text>
      </View>
    </>)
}
