
import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeTabs from './screens/HomeTabs';
import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import { ThemeProvider, ThemeContext } from './context/ThemeProvider';
import { DataProvider, DataContext } from './context/DataProvider';
import ThemeButton from './components/ThemeButton';

const Stack = createStackNavigator();

const Navigator = ({ loggedIn, userData, routineData, onLogin, onLogout }) => {
  const { styles, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <ThemeButton onPress={ toggleTheme } />
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
            <>
              <Stack.Screen
                name="HomeTabs"
                // component={HomeTabs}
                // initialParams={{user: userData, onLogout: onLogout}}
                options={{ headerShown: false }}
              >
                { props => <HomeTabs {...props} user={userData} onLogout={onLogout} /> }
              </Stack.Screen>
              {/* <Stack.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ headerShown: false }}
              /> */}
            </>
          ) : (
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
            >
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
  const [userData, setUserData] = useState({});
  const [routineData, setRoutineData] = useState({});

  const handleLogin = (userData) => {
    console.log('Login successful!');
    console.log('User data:', userData);
    setUserData({ name: userData.username, email: 'test@gmail.com'});
    setLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('Logout successful!');
    setLoggedIn(false);
    setUserData(null);
  };

  return (
    <DataProvider>
      <ThemeProvider>
        <Navigator
          loggedIn={loggedIn}
          userData={userData}
          routineData={routineData}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </ThemeProvider>
    </DataProvider>
  );
}
