import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { useTranslator } from '../context/TranslatorProvider';
import ScreenTitle from '../Components/ScreenTitle';
import { Icon } from '@rneui/themed';
import { requestLogin,
        requestUser,
        requestRoutines,
        requestSessions,
        requestExercises } from '../Services/api';

const LoginScreen = ({onLogin}) => {
  const { styles } = useTheme();
  const { loadUser, loadRoutines, loadSessions, loadExercises } = useData();
  const { translate } = useTranslator();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if(error) {
      console.log('Error en el login');
    }
  }, [error]);
  
  const handleLogin = async () => {
    let valid = true;
    console.log('handleLogin', username, password);
    try {
      // const valid = await requestLogin(username, password);
      if(valid) {
          console.log({username, password});
          const exercises = await requestExercises(username);
          loadExercises(exercises);
          const routines = await requestRoutines(username);
          loadRoutines(routines);
          const sessions = await requestSessions(username);
          loadSessions(sessions);
          if(onLogin) { onLogin({ username, password }); }
          setError(false);
      }
      else {
        setError(true);
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  const handleLoginError = () => {
    console.log('handleLoginError');
  }

  return (
    <View style={ styles.container }>
      {/* <ScreenTitle title={translate('login')} /> */}
      <View style={styles.loginStyle}>
        <TextInput
          style={styles.input}
          placeholderTextColor={styles.placeholderText}
          placeholder={translate('user')}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={styles.placeholderText}
          placeholder={translate('password')}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={[styles.button, {width: '100%'}]} onPress={handleLogin}>
          <Text style={[styles.title, {textAlign: 'center'}]}>{translate('login')}</Text>
        </TouchableOpacity>
        { error && <Text style={styles.error}>{translate('loginError')}</Text> }
      </View>
    </View>
  );
}

export default LoginScreen;
