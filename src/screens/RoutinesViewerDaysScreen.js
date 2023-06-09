// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import RoutineDays from '../Components/RoutineDays';
import { useEffect } from 'react';


export default function RoutinesViewerDaysScreen({ navigation, route }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { routine } = route.params;

  const goBack = () => {
    navigation.goBack();
  }

  const handleOnPressDay = (day) => {
    console.log('handleOnPressDay', day);
    navigation.navigate('Ejercicios', { routine, day });
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={goBack} style={styles.backButton} />
      <ScreenTitle title={`${translate('days')}`} />
      <Text style={[styles.subtitle, { marginLeft: 15 }]}>{routine}</Text>
        <RoutineDays onPress={handleOnPressDay} routine={routine} />
    </View>
  );
}
