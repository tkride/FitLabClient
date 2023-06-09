// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import DayExercises from '../Components/DayExercises';
import { useEffect } from 'react';

export default function RoutinesViewerDaysExercisesScreen({ navigation, route }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { routine, day } = route.params;

  const goBack = () => {
    navigation.goBack();
  }

  const handleOnPressDay = (day, exercise) => {
    console.log('handleOnPressDay', day);
    navigation.navigate('Ejercicio', { routine, day, exercise });
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={goBack} style={styles.backButton} />
      <ScreenTitle title={`${translate('days')} / ${translate('exercises')}`} />
      <Text style={[styles.subtitle, { marginLeft: 15 }]}>{routine + ' / ' + day?.name}</Text>
        <DayExercises onPress={handleOnPressDay} day={day} />
    </View>
  );
}
