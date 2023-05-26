import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoutinesViewerStack from './RoutinesViewerStack';
import CreateRoutineScreen from '../Screens/RoutineCreateSreen';
// import AnalyzeRoutineScreen from './AnalyzeRoutineScreen';
import { Icon } from '@rneui/themed';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import RoutinesAnalyticsMusclesScreen from '../Screens/RoutinesAnalyticsMusclesScreen';
import { useEffect } from 'react';
// import RoutinesAnalyticsStack from './RoutinesAnalyticsStack';

const Tab = createMaterialTopTabNavigator();
const ICON_SIZE = 15;

export default function RoutinesAnalyticsTabs({ navigation, route }) {
    const { styles } = useTheme();
    const { language, translate } = useTranslator();
    const { routine } = route.params;

    return (
      <>
        <Tab.Navigator screenOptions={styles.navigatorTop} >
          <Tab.Screen
            name={`${translate('zones')}`}
            component={RoutinesAnalyticsMusclesScreen}
            initialParams={{ routine: routine }}
            options={{
              tabBarIcon: ({ color }) => (
                  <Icon type="ionicon" name="barbell" size={ICON_SIZE} color={color} />
                ),
              }}
          />
          <Tab.Screen
            name={`${translate('muscles')}`}
            component={RoutinesAnalyticsMusclesScreen}
            initialParams={{ routine: routine }}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type='material-community' name="arm-flex" size={ICON_SIZE} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name={`${translate('days')}`}
            // component={AnalyzeRoutineScreen}
            component={RoutinesAnalyticsMusclesScreen}
            initialParams={{ routine: routine }}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type="material-community" name="calendar" size={ICON_SIZE} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  };
  