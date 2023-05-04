// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { ThemeContext } from '../context/ThemeProvider';
import BackButton from '../components/BackButton';

export default function UserScreen({navigation, user, onLogout}) {
  const { styles } = React.useContext(ThemeContext);
  // const { user, onLogout } = route.params;


  // const goBack = () => {
  //   console.log('Go back');
  //   navigation.goBack();
  // }

  return (
    <View style={ styles.container }>
      {/* <BackButton onPress={goBack} style={styles.BackButton} /> */}
      <ScreenTitle title='Usuario' />
      <Text style={styles.text}>Usuario: {user?.name}</Text>
      <Button style={styles.button} title='Cerrar sesión' onPress={ () => {
        if(onLogout) { onLogout(); }
        navigation.goBack();
      }} />
    </View>
  );
}
