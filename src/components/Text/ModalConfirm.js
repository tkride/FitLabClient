import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Modal from '../Modal';
import { useTheme } from '../../context/ThemeProvider';
import { useTranslator } from '../../context/TranslatorProvider';
import Button from '../Button';

export default function ModalConfirm({ style={}, title, data, message, onAccept, onCancel }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();

  const handleOnAccept = () => {
    if(onAccept) onAccept({reply: true, data});
  };

  const handleOnCancel = () => {
    if(onCancel) onCancel({reply: false, data});
  };

  return (
    <Modal
      top='center'
      left='center'
      visible={true}
      onClose={() => setModalVisible(false)}
    >
      <View style={styles.modalTitle}>
        <Text style={{
          ...styles.subtitle,
          ...style}}>
          {title}
        </Text>
      </View>
      <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>
        <Text
          style={{...styles.textBigger,
          color: styles.grayHeader,
          textAlign: 'left',
          marginTop: 15,
          marginLeft: 30,
          marginRight: 30,
          flex: 1,
          ...style}}>
          {message}
        </Text>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', width: '100%'}}>
          <Button
            style={{width: '30%', backgroundColor: 'transparent'}}
            styleText={{color: styles.secondary}}
            title={translate('accept')}
            onPress={handleOnAccept} />
          <Button
            style={{width: '30%', backgroundColor: 'transparent'}}
            styleText={{color: styles.secondary}}
            title={translate('cancel')}
            onPress={handleOnCancel} />
        </View>
      </View>
    </Modal>
  );
}