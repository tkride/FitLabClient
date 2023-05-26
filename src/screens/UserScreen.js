// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import ScreenTitle from '../Components/ScreenTitle';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import LanguageSelector from '../Components/LanguageSelector';
import ThemeButton from '../Components/ThemeButton';
import { Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function UserScreen({navigation, user, onLogout}) {
  const { styles, toggleTheme } = useTheme();
  const { translate } = useTranslator();
  // const { user, onLogout } = route.params;

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={[styles.textBig, {marginTop: 10 }]}>{`${translate('user')}:`} {user?.name}</Text>
        <Text style={styles.textBig}>{`${translate('email')}:`} {user?.email}</Text>
        <ThemeButton onPress={ handleToggleTheme } />
        <LanguageSelector />
        <View style={[styles.view, {
          // maginLeft: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          top: 10,
          width: '100%',
        }]}>
          <View style={[styles.view, {
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
          }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={ () => { if(onLogout) { onLogout(); } }}>
              <Icon type="material-community" name='location-exit' size={20} color={'#fff'} />
              <Text style={[styles.text, {color: '#fff'}]}>{translate('closeSession')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
