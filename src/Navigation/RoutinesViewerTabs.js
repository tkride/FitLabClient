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
import RoutinesAnalyticsTypesTabs from './RoutinesAnalyticsTypesTabs';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();
const ICON_SIZE = 15;

export default function RoutinesViewerTabs() {
    const { styles } = useTheme();
    const { translate } = useTranslator();

    return (
      <>
        <Tab.Navigator 
          screenOptions={{...styles.navigatorTop, tabBarStyle: { height: 40 }}}
          initialRouteName={translate('favorites')}
        >
          <Tab.Screen
            name={`${translate('favorites')}`}
            component={RoutinesViewerStack}
            initialParams={{filter: { favorite: true }}}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon type='material-community' name="heart" size={ICON_SIZE} color={color} />
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tab.Screen
            name={`${translate('all')}`}
            component={RoutinesViewerStack}
            initialParams={{ favorite: false }}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="all-inclusive" size={ICON_SIZE} color={color} />
              ),
              tabBarLabel: () => null,
            }}
          />
        </Tab.Navigator>
      </>
    );
  };
  