import { createStackNavigator } from '@react-navigation/stack';
import RoutinesViewerListScreen from '../Screens/RoutinesViewerListScreen';
import RoutinesViewerDaysScreen from '../Screens/RoutinesViewerDaysScreen';
import RoutinesViewerDaysExercisesScreen from '../Screens/RoutinesViewerDaysExercisesScreen';
import RoutinesViewerExerciseScreen from '../Screens/RoutinesViewerExerciseScreen';

const Stack = createStackNavigator();

export default function RoutinesViewerStack({route}) {

  const { filter } = route?.params ?? { filter: {}};
  // const { favorite } = route?.params ?? { favorite: false };

  console.log('RoutinesViewerStack: filter: ', {filter});
  // console.log('RoutinesViewerStack: favorite: ', favorite);
  
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Rutinas" component={RoutinesViewerListScreen} initialParams={{favorite}} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Rutinas" component={RoutinesViewerListScreen} initialParams={{filter: filter}} options={{ headerShown: false }} />
      <Stack.Screen name="Días" component={RoutinesViewerDaysScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ejercicios" component={RoutinesViewerDaysExercisesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ejercicio" component={RoutinesViewerExerciseScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

