import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslator } from '../context/TranslatorProvider';
import { useTheme } from '../context/ThemeProvider';


const LanguageSelector = () => {
  const { styles } = useTheme();
  const { language, changeLanguage, translate } = useTranslator();

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{...styles.textBig, marginLeft: 0}}>{translate('language')}</Text>
      <TouchableOpacity style={{marginLeft: 5}} onPress={() => handleLanguageChange('en')}>
        <Text style={[
          styles.textBig,
          language === 'en' ? { fontWeight: 'bold', color: styles.selected.color } :
                            { color: styles.inactive.color }]}>
          English
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft: 5}} onPress={() => handleLanguageChange('es')}>
        <Text style={[
          styles.textBig,
          language === 'es' ? { fontWeight: 'bold', color: styles.selected.color } :
                            { color: styles.inactive.color },
          { marginLeft: 10 }]}>
          Español
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSelector;
