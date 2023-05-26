// src\Components\RoutineAnalysis.js

import React from 'react';
import { View, ScrollView } from 'react-native';
import RoutineAnalytics from '../Components/RoutineAnalytics';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';

export default function RoutinesAnalyticsMusclesScreen({ navigation, route }) {
  const { styles } = useTheme();
  const { routine } = route?.params;

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <BackButton onPress={goBack} style={styles.backButton} />
        <ScreenTitle title={routine} />
        <RoutineAnalytics navigation={ navigation } routine={routine} />
      </View>
    </ScrollView>
  ); 
}
