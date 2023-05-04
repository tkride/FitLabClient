import { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeProvider';
import { DataContext } from '../context/DataProvider';
import ScreenTitle from '../components/ScreenTitle';
import { Icon } from '@rneui/themed';
import { requestLogin,
        requestUser,
        requestRoutines,
        requestSessions,
        requestExercises } from '../services/api';

const LoginScreen = ({onLogin}) => {
  const { styles } = useContext(ThemeContext);
  const { loadUser, loadRoutines, loadSessions, loadExercises } = useContext(DataContext);
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
      <ScreenTitle title='Login' />
      <View style={customStyle.loginStyle}>
        <TextInput
          style={styles.input}
          placeholderTextColor={styles.placeholderText}
          placeholder="Usuario"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={styles.placeholderText}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={customStyle.button} onPress={handleLogin}>
          <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold'}}>Iniciar sesión</Text>
        </TouchableOpacity>
        { error && <Text style={styles.error}>Usuario o contraseña incorrectos</Text> }
      </View>
    </View>
  );
}

const customStyle = StyleSheet.create({
  loginStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0057a3',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
