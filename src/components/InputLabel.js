// Crea un componente que permite entrada de texto con una etiqueta, y devuelve el valor ingresado mediante el callback onChange.
// El componente recibe una etiqueta y un callback onChange.
//
// Path: src\Components\RoutineNew.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useData } from '../context/DataProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { createRoutine } from '../Services/api';
import { Icon } from '@rneui/base';

const InputLabel = ({ label, value, isNumeric, styleLabel, styleInput, onChange }) => {
  const { styles } = useTheme();

  const [valueInput, setValueInput] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setValueInput(value ?? 0);
  }, [value]);

  const handleOnChange = (v) => {
    setValueInput(v);
    if(onChange) {
      onChange(v);
    }
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {label && <Text style={{...styles.textBigger, ...styleLabel}}>{label}</Text>}
      <TextInput
        style={[styles.inputLabel, isFocused && {borderBottomWidth: 2}, {textAlign: 'center'}, styleInput]}
        onChangeText={handleOnChange}
        value={valueInput}
        onFocus={(e) => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        selectTextOnFocus={true}
        keyboardType={isNumeric ? 'numeric' : 'default'}
      />
    </View>
  );
}

export default InputLabel;