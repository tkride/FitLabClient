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

export default function HomeScreen() {
  const { styles } = useTheme();

  return (
    <SafeAreaView style={ styles.container }>
      <Text style={styles.text}>Bienvenido a Fit Lab</Text>
      {/* <TableCustom /> */}
      {/* <SessionAnalysis /> */}
    </SafeAreaView>
  );
}
