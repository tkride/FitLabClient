import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoutinesViewerStack from './RoutinesViewerStack';
import { Icon } from '@rneui/themed';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';

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
                <Icon name='all-inclusive' size={ICON_SIZE} color={color} />
              ),
              tabBarLabel: () => null,
            }}
          />
        </Tab.Navigator>
      </>
    );
  };
  