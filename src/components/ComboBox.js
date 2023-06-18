
// crea un componente de tipo ComboBox
// Muestra un texto y un icono de flecha hacia abajo.
// Al hacer click en el componente se muestra un listado de opciones.
// Al seleccionar una opción se cierra el listado y se muestra la opción seleccionada.
// El componente recibe un listado de opciones y una función para actualizar la opción seleccionada.
// El componente recibe un valor seleccionado.

// Path: src\Components\ComboBox.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { Icon } from '@rneui/base';

const ComboBox = ({ values, value, onChange }) => {
  const { styles } = useTheme();
  const { translate } = useTranslator();

  const [valueSelected, setValueSelected] = useState(value);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnPress = (v) => {
    setShowOptions(false);
    setValueSelected(v);
    if(onChange) {
      onChange(v);
    }
  }

  useEffect(() => {
    console.log('ComboBox useEffect', value, 'valueSelected', valueSelected);
    setValueSelected(value);
  }, [value]);

  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{...styles.textBigger}} onPress={() => setShowOptions(!showOptions)}>{valueSelected}</Text>
      <Icon
        type='entypo'
        name="chevron-small-down"
        size={24}
        color={styles.secondary}
        onPress={() => setShowOptions(!showOptions)}
      />
      {showOptions &&
        <View style={{position: 'absolute', top: '100%', backgroundColor: styles.overBack}}>
          {values.map((v, i) => (
            <Text
              key={i}
              style={{...styles.textBig, color: styles.secondary, padding: 5}}
              onPress={() => handleOnPress(v)}
            >
              {translate(v)}
            </Text>
          ))}
        </View>
      }
    </View>
  );
}

export default ComboBox;
