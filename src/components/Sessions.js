import {View, Text, StyleSheet} from 'react-native';
import { ThemeContext } from '../styles/ThemeProvider';

export default function Sessions() {
  const { styles } = React.useContext(ThemeContext);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análisis registros</Text>
      <Text style={styles.summary}>Resumen de datos relevantes</Text>
    </View>
  );
};

        