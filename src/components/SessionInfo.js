import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';

export default function SessionInfo({ info }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();

  return (
    <>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={{...styles.textBigger, color: styles.primary, flex: 1.5}}></Text>
        <Text style={{...styles.textBigger, color: styles.primary, flex: 1}}>{translate('total')}</Text>
        <Text style={{...styles.textBigger, color: styles.primary, flex: 1}}>{translate('rest')}</Text>
        <Text style={{...styles.textBigger, color: styles.primary, flex: 1}}>{translate('wasted')}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={{...styles.textBig, color: styles.primary, flex: 1.5}}>{translate('time')} (min)</Text>
        <Text style={{...styles.textBig, color: styles.primary, flex: 1}}>{(info.totalTime/60).toFixed(1)}</Text>
        <Text style={{...styles.textBig, color: styles.primary, flex: 1}}>{(info.restTime/60).toFixed(1)}</Text>
        <Text style={{...styles.textBig, color: styles.primary, flex: 1}}>{(info.wastedTime/60).toFixed(1)}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-between', margin: 5}}>
        <Text style={{...styles.textBigger, color: styles.primary}}>{translate('exercises')}: {info.totalExercise}</Text>
        <Text style={{...styles.textBigger, color: styles.primary}}>{translate('sessionTotalWeight')}: {info.totalWeight}kg</Text>
      </View>
    </>)
}
