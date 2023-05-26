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
import RoutinesAnalyticsStack from './RoutinesAnalyticsStack';
import RoutinesAnalyticsTabs from './RoutinesAnalyticsTabs';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();
const ICON_SIZE = 15;

export default function RoutinesTabs() {
    const { styles } = useTheme();
    const { translate } = useTranslator();

    return (
      <>
        <Tab.Navigator screenOptions={styles.navigatorTop}>
          <Tab.Screen
            name={`${translate('visualize')}`}
            component={RoutinesViewerStack}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type='material-community' name="eye" size={ICON_SIZE} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name={`${translate('analyze')}`}
            component={RoutinesAnalyticsStack}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="bar-chart" size={ICON_SIZE} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name={`${translate('create')}`}
            component={CreateRoutineScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="add" size={ICON_SIZE} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  };
  