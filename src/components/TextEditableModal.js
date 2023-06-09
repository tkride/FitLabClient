import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from './Modal';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import Button from './Button';
import { useEffect } from 'react';

export default function TextEditableModal({ style={}, text, onSave, onCancel }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const [modalVisible, setModalVisible] = useState(false);
  const [editedText, setEditedText] = useState(text);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const handleOnSave = () => {
    setModalVisible(false);
    if(onSave) onSave(editedText);
  };

  const handleOnCancel = () => {
    setModalVisible(false);
    setEditedText(text);
    if(onCancel) onCancel();
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{...styles.subtitle, ...style}}>{editedText}</Text>
      </TouchableOpacity>
      <Modal
        top='30%'
        left='10%'
        width='80%'
        height='18%'
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <TextInput
          style={{...styles.inputText, marginLeft: 10, marginRight: 10, marginTop: 30, marginBottom: 0, ...style}}
          value={editedText}
          onChangeText={setEditedText}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
          <Button
            style={{width: '30%', height: 40, backgroundColor: 'transparent'}}
            styleText={{color: styles.secondary}}
            title={translate('save')}
            onPress={handleOnSave} />
          <Button
            style={{width: '30%', height: 40, backgroundColor: 'transparent'}}
            styleText={{color: styles.secondary}}
            title={translate('cancel')}
            onPress={handleOnCancel} />
        </View>
      </Modal>
    </>
  );
}