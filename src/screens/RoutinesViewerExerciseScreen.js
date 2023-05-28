// HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import Exercise from '../Components/Exercise';

export default function RoutinesViewerExerciseScreen({ navigation, route }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { routine, day, exercise } = route.params;

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <BackButton onPress={goBack} style={styles.backButton} />
      <ScreenTitle title={`${translate('days')} / ${translate('exercises')} / ${translate('exercise')}`} />
      {/* <ScreenTitle title={routine + ' / ' + day.name} /> */}
      <Text style={[styles.subtitle, { marginLeft: 15 }]}>{routine + ' / ' + day?.name}</Text>
      {/* <ScreenTitle title={'... / ' + day.name} /> */}
        <Exercise navigation={navigation} routine={routine} day={day} exercise={exercise} />
    </View>
  );
}
