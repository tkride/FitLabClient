import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import SessionsScreen from '../Screens/SessionsScreen';
import CreateRoutineScreen from '../Screens/RoutineCreateSreen';
import { Icon } from '@rneui/themed';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import React, { useEffect } from 'react';
import UserScreen from '../Screens/UserScreen';
// import RoutinesStack from './RoutinesStack';
import RoutinesTabs from './RoutinesTabs';
import ScreenTitle from '../Components/ScreenTitle';

const Tab = createBottomTabNavigator();

export default function HomeTabs({navigation, user, onLogout}) {
  const { styles } = useTheme();
  const { translate } = useTranslator();

  useEffect(() => {
    console.log('User data changed to:', user);
  }, [user]);

  return (
    <>
      <Tab.Navigator screenOptions={styles.navigatorBottom}>
        <Tab.Screen
          name={`${translate('home')}`}
          component={HomeScreen}
          options={{ tabBarIcon: ({ color, size }) =>
            (<Icon type='entypo' name="home" color={color} size={size} />),
          }}
        />
        <Tab.Screen
          name={`${translate('workout')}`}
          component={CreateRoutineScreen}
          options={{ tabBarIcon: ({ color, size }) =>
            (<Icon type='material-community' name="weight-lifter" color={color} size={size} />)
           }}
        />
        <Tab.Screen
          name={`${translate('sessions')}`}
          // name={`Sessions`}
          component={SessionsScreen}
          options={{ tabBarIcon: ({ color, size }) =>
            (<Icon type='font-awesome' name="calendar" size={size} color={color} />) }}
        />
        <Tab.Screen
          name={`${translate('routines')}`}
          component={RoutinesTabs}
          options={{
            // tabBarLabel: 'Rutinas',
            headerTitle: 'Rutinas',
            tabBarIcon: ({ color, size }) =>
            (<Icon type='material-community' name="dumbbell" color={color} size={size} />)

          }}
        />
        <Tab.Screen
          name={`${translate('user')}`}
          // component={UserScreen}
          // initialParams={{user, onLogout}}
          options={{ tabBarIcon: ({ color, size }) =>
            (<Icon type='entypo' name="user" color={color} size={size} />)  }}
        >
          { props => <UserScreen {...props} user={user} onLogout={onLogout} /> }
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}
