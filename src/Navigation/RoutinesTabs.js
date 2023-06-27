import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateRoutineScreen from '../Screens/RoutineCreateSreen';
import { Icon } from '@rneui/themed';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import RoutinesViewerTabs from './RoutinesViewerTabs';
import RoutinesAnalyticsTabs from './RoutinesAnalyticsTabs';

const Tab = createMaterialTopTabNavigator();
const ICON_SIZE = 15;

export default function RoutinesTabs() {
    const { styles } = useTheme();
    const { translate } = useTranslator();

    return (
      <>
        <Tab.Navigator screenOptions={styles.navigatorTop} swipeEnabled={false}>
          <Tab.Screen
            name={`${translate('visualize')}`}
            // component={RoutinesViewerStack}
            component={RoutinesViewerTabs}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type='material-community' name="eye" size={ICON_SIZE} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name={`${translate('analyze')}`}
            component={RoutinesAnalyticsTabs}
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
  