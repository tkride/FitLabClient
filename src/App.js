
import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeTabs from './Navigation/HomeTabs';
import LoginScreen from './Screens/LoginScreen';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import { DataProvider, DataContext } from './context/DataProvider';
import { SafeAreaView } from 'react-native';
import { TranslatorProvider } from './context/TranslatorProvider';

const Stack = createStackNavigator();

const Navigator = ({ loggedIn, userData, routineData, onLogin, onLogout }) => {
  const { styles } = useTheme();

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
              { props => <HomeTabs {...props} user={userData} onLogout={onLogout} /> }
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Login" options={{ ...styles.navigatorBottom, }} >
              {props => <LoginScreen {...props} user={userData} onLogin={onLogin} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({name: 'Ruben', email: 'rubenprojectsoftware@gmail.com'});
  const [routineData, setRoutineData] = useState({});

  const handleLogin = (userData) => {
    console.log('Login successful!');
    console.log('User data:', userData);
    setUserData({ name: userData.username, email: 'rubenprojectsoftware@gmail.com'});
    setLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('Logout successful!');
    setLoggedIn(false);
    setUserData(null);
  };

  return (
    <TranslatorProvider>
      <DataProvider>
        <ThemeProvider>
          <SafeAreaView style={{marginTop: 25, flex: 1}}>
            <Navigator
              loggedIn={loggedIn}
              userData={userData}
              routineData={routineData}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          </SafeAreaView>
        </ThemeProvider>
      </DataProvider>
    </TranslatorProvider>
  );
}
