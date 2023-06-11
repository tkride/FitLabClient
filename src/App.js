import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeTabs from './Navigation/HomeTabs';
import LoginScreen from './Screens/LoginScreen';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import { DataProvider, useData } from './context/DataProvider';
import { SafeAreaView } from 'react-native';
import { TranslatorProvider } from './context/TranslatorProvider';

const Stack = createStackNavigator();

const Navigator = () => {
  const { styles } = useTheme();
  const { saveToStorage, loadFromStorage, removeFromStorage } = useData();
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  const loadUserData = async () => {
    const loadedUserData = await loadFromStorage(['userData']);
    if(loadedUserData) {
      const { userData } = loadedUserData;
      const storedUserData = JSON.parse(userData);
      console.log('storedUserData', storedUserData);
      setUserData(storedUserData);
      setUserDataLoaded(true);
    }
  }
  
  useEffect(() => {
    try {
      loadUserData();
    }
    catch(err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log('userData', userData);
  }, [userData]);

  const handleLogin = (userData) => {
    console.log('Login successful!');
    console.log('User data:', userData);
    
    if(userData.rememberMe) saveToStorage({userData: JSON.stringify(userData)});
    else removeFromStorage(['userData']);

    setUserData({ name: userData.username, email: 'rubenprojectsoftware@gmail.com'});
    setLoggedIn(true);
    setUserDataLoaded(true);
  };

  const handleLogout = () => {
    console.log('Logout successful!');
    setLoggedIn(false);
    setUserData(null);
  };

  // Mostrar la pantalla de inicio de sesión solo si los datos del usuario se han cargado correctamente
  if (!userDataLoaded) {
    return null; // O cualquier otro componente de carga
  }

  return (
    <View style={styles.container}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: styles.selected.color,
            card: styles.container.backgroundColor,
            border: styles.border.borderColor,
          },
        }}
      >
        <Stack.Navigator initialRouteName='HomeTabs'>
          {loggedIn ? (
            <Stack.Screen name="HomeTabs"
              options={{ ...styles.navigatorBottom, headerShown: false }}
            >
              { props => <HomeTabs {...props} user={userData} onLogout={handleLogout} /> }
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Login" options={{ ...styles.navigatorBottom, }} >
              {props => <LoginScreen {...props} user={userData} onLogin={handleLogin} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default function App() {

  return (
    <TranslatorProvider>
      <DataProvider>
        <ThemeProvider>
          <SafeAreaView style={{marginTop: 25, flex: 1}}>
            <Navigator />
          </SafeAreaView>
        </ThemeProvider>
      </DataProvider>
    </TranslatorProvider>
  );
}
