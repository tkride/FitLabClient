import { createStackNavigator } from '@react-navigation/stack';
import RoutinesAnalyticsListScreen from '../Screens/RoutinesAnalyticsListScreen';
import RoutinesAnalyticsMusclesScreen from '../Screens/RoutinesAnalyticsMusclesScreen';
import RoutinesViewerDaysExercisesScreen from '../Screens/RoutinesViewerDaysExercisesScreen';
import RoutinesAnalyticsTypesTabs from './RoutinesAnalyticsTypesTabs';

const Stack = createStackNavigator();

export default function RoutinesAnalyticsStack({route}) {

  const { filter } = route?.params ?? { filter: {}};

  return (
    <Stack.Navigator>
      <Stack.Screen name="Routines" component={RoutinesAnalyticsListScreen} initialParams={{filter: filter}} options={{ headerShown: false }} />
      <Stack.Screen name="AnalyticsTabs" component={RoutinesAnalyticsTypesTabs} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Músculos" component={RoutinesViewerDaysExercisesScreen} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="Días" component={AnalyticsRoutineScreen} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="Ejercicios" component={RoutinesViewerDaysExercisesScreen} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
};

