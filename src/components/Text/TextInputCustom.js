import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { useTranslator } from '../../context/TranslatorProvider';
import { Icon } from '@rneui/base';
import { useEffect } from 'react';

export default InputTextCustom = ({onChangeText, value, onCancel, placeholder, leftIcon, style={}}) => {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const [textValue, setTextValue] = useState(value || '');

  useEffect(() => {
    setTextValue(value || '');
  }, [value]);

  const handleTextChange = (text) => {
    setTextValue(text);
    if(onChangeText) onChangeText(text);
  };

  const handleOnCancel = () => {
    setTextValue('');
    if(onCancel) onCancel();
  };

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5, ...style}}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{position: 'absolute', flex: 0, left: 15}}>
          {/* <Icon type='ant-design' name='search1' color={styles.inputText.borderColor} /> */}
          <Icon {...leftIcon} color={styles.inputText.borderColor} />
        </View>
        <TextInput
          style={{...styles.inputText, flex: 1, paddingLeft: leftIcon ? 45 : 15}}
          placeholderTextColor={styles.placeholderText}
          placeholder={placeholder || translate('search')}
          onChangeText={handleTextChange}
          value={textValue}
        />
        <View style={{position: 'absolute', flex: 0, right: 15}}>
          <TouchableOpacity onPress={handleOnCancel}>
            <Icon name='close' color={styles.inputText.borderColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
