import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SessionsScreen from './SessionsScreen';
import CreateRoutineScreen from './CreateRoutineScreen';
import RoutinesScreen from './RoutinesScreen';
import { Icon } from '@rneui/themed';
import { ThemeContext } from '../context/ThemeProvider';
import React, { useContext, useEffect } from 'react';
import { TouchableHighlight } from 'react-native';
import UserScreen from './UserScreen';
import RoutinesStack from './RoutinesStack';

const Tab = createBottomTabNavigator();

export default function HomeTabs({navigation, user, onLogout}) {
  const { styles } = useContext(ThemeContext);

  useEffect(() => {
    console.log('User data changed to:', user);
  }, [user]);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: styles.selected.color,
          tabBarInactiveTintColor: styles.inactive.color,
          style: { backgroundColor: styles.container.backgroundColor },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<Icon type='entypo' name="home" color={color} size={size} />)
          }}
        />
        <Tab.Screen
          name="Sesiones"
          component={SessionsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) =>
            (<Icon type='entypo' name="calendar" size={size} color={color} />),
          }}
        />
        <Tab.Screen
          name="Crear"
          component={CreateRoutineScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<Icon type='entypo' name="edit" color={color} size={size} />),
          }}
        />
        <Tab.Screen
          name="Rutinas"
          // component={RoutinesScreen}
          component={RoutinesStack}
          options={{
            headerShown: false,
            // tabBarIcon: ({ color, size }) => (<Icon type='entypo' name="pie-chart" color={color} size={size} />),
            tabBarIcon: ({ color, size }) => (<Icon type='material-community' name="dumbbell" color={color} size={size} />),
          }}
        />
        <Tab.Screen
          name="Usuario"
          // component={UserScreen}
          // initialParams={{user, onLogout}}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<Icon type='entypo' name="user" color={color} size={size} />),
          }}
        >
          { props => <UserScreen {...props} user={user} onLogout={onLogout} /> }
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}
