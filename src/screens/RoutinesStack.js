import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import RutinasScreen from './RoutinesScreen';
// import DetalleRutinaScreen from './DetalleRutinaScreen';
// import DetalleDiaScreen from './DetalleDiaScreen';

const Stack = createStackNavigator();

export default function RoutinesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rutinas"
        component={RutinasScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="DetalleRutina" component={DetalleRutinaScreen} /> */}
      {/* <Stack.Screen name="DetalleDia" component={DetalleDiaScreen} /> */}
    </Stack.Navigator>
  );
};

