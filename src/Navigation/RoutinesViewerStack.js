import { createStackNavigator } from '@react-navigation/stack';
import RutinesListScreen from '../Screens/RoutinesViewerListScreen';
import RoutinesViewerDaysScreen from '../Screens/RoutinesViewerDaysScreen';
import RoutinesViewerDaysExercisesScreen from '../Screens/RoutinesViewerDaysExercisesScreen';
import RoutinesViewerExerciseScreen from '../Screens/RoutinesViewerExerciseScreen';

const Stack = createStackNavigator();

export default function RoutinesViewerStack() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rutinas" component={RutinesListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Días" component={RoutinesViewerDaysScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ejercicios" component={RoutinesViewerDaysExercisesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ejercicio" component={RoutinesViewerExerciseScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

