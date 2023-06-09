import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from './Modal';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import Button from './Button';
import { useEffect } from 'react';

export default function TextEditable({ style={}, text, onSave, onCancel }) {
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

  const handleSubmit = () => {
    console.log('handleSubmit');
    setModalVisible(false);
    if(onSave) onSave(editedText);
  };

  return (
    <>
      {modalVisible ?
        <TextInput
          autoFocus
          style={{borderBottomWidth: 1, borderColor: styles.secondary, ...style}}
          value={editedText}
          onChangeText={setEditedText}
          onSubmitEditing={handleSubmit}
        />
        :
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{...styles.subtitle, ...style}}>{editedText}</Text>
      </TouchableOpacity>
      }
    </>
  );
}