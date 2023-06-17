// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight } from 'react-native';
import SessionAnalysis from '../Components/SessionAnalysis';
import ScreenTitle from '../Components/ScreenTitle';
import TableCustom from '../Components/TableCustom';
import { useTheme } from '../context/ThemeProvider';
import BackButton from '../Components/BackButton';
import { Avatar } from 'react-native-paper';
import Config from '../config/Config';
import { requestImage } from '../Services/api';
import { Image } from '@rneui/themed';
import ExerciseBrowser from '../Components/ExerciseBrowser';
import ModalConfirm from '../Components/Text/ModalConfirm';

export default function HomeScreen() {
  const { styles } = useTheme();

  return (
    <SafeAreaView style={ styles.container }>
      <View style={styles.view}>
        <Text style={styles.title} onPress={() => setShowModal(true)}>Bienvenido a Fit Lab</Text>
        <Text style={styles.subtitle}>Tu entrenador personal</Text>
      </View>
      {/* <ExerciseBrowser /> */}
      {/* <TableCustom /> */}
      {/* <SessionAnalysis /> */}
    </SafeAreaView>
  );
}
