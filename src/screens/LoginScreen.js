import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { useTranslator } from '../context/TranslatorProvider';
// import ScreenTitle from '../Components/ScreenTitle';
// import { Icon } from '@rneui/themed';
// import { requestLogin,
//         requestUser,
//         getRoutines,
//         getSessions,
//         getExercises } from '../Services/api';
import { Switch } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({user, onLogin}) => {
  const { styles } = useTheme();
  const {
    loadUserInfo,
    loadUser,
    loadRoutines,
    loadSessions,
    loadExercises } = useData();
  const { loadServerTranslations, translate } = useTranslator();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  useEffect(() => {
    console.log('LoginScreen: useEffect: user:', user);
    
    if(user) {
      const { username: storedUsername, password: storedPassword, rememberMe: storedRememberMe } = user;
      if (storedUsername) {// && storedPassword) {
        setUsername(storedUsername);
        setPassword(storedPassword);
        setRememberMe(storedRememberMe);
        loadUser(user);
        setAutoLogin(true);
      }
    }

    // const getStoredCredentials = async () => {
    //   const { username: storedUsername, password:storedPassword } = await loadFromStorage(['username', 'password']);
    //   console.log('getStoredCredentials', storedUsername, storedPassword);
      
    //   if (storedUsername) {// && storedPassword) {
    //     setUsername(storedUsername);
    //     setPassword(storedPassword);
    //     setRememberMe(true);
    //     setAutoLogin(true);
    //   }
    // };
    // getStoredCredentials();
  }, []);

  useEffect(() => {
    if(username) {// && password) {
      console.log('autoLogin', username);
      handleLogin();
    }
  }, [autoLogin]);

  useEffect(() => {
    if(error) {
      console.log('Error en el login');
    }
  }, [error]);
  
  const handleLogin = async () => {
    let valid = true;
    console.log('handleLogin', username, password);
    try {
      // if (rememberMe) {
      //   await saveToStorage({ username, password });
      // }
      // else {
      //   await removeFromStorage(['username', 'password']);
      // }
      // const valid = await requestLogin(username, password);
      if(valid) {
          console.log({username, password});
          await loadUserInfo(username);
          await loadServerTranslations();
          if(onLogin) { onLogin({ username, password, rememberMe }); }
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
      <View style={styles.loginStyle}>
        <TextInput
          style={styles.input}
          placeholderTextColor={styles.placeholderText}
          placeholder={translate('user')}
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={styles.placeholderText}
          placeholder={translate('password')}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%'}}>
          <Switch
            style={{height: 10, left: 0}}
            value={rememberMe}
            onValueChange={setRememberMe}
            thumbColor={rememberMe ? styles.selected.color : styles.grayHeader}
            trackColor={{ false: styles.gray, true: styles.tertiary }}
          />
          <Text style={styles.subtitle}>{translate('rememberMe')}</Text>
        </View>
        <TouchableOpacity style={{...styles.button, marginTop: 10, width: '100%'}} onPress={handleLogin}>
          <Text style={[styles.title, {textAlign: 'center'}]}>{translate('login')}</Text>
        </TouchableOpacity>
        { error && <Text style={styles.error}>{translate('loginError')}</Text> }
      </View>
    </View>
  );
}

export default LoginScreen;
