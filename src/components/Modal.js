import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

export default Modal = ({
  style={},
  visible=false,
  top='0%',
  left='0%',
  height='100%',
  width='100%',
  children,
}) => {
  const { styles } = useTheme();
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const convertPercentage = (percentage) => {
    const number = percentage.replace('%', '');
    const res = number == 0 ? 0 : Number(number)/100;
    // console.log('RES', res);
    return res;
  };

  const calcModalTop = (value) => {
    const { height } = Dimensions?.get('window');
    if(typeof value == 'number') return value;
    else {
      if(value == 'center') value = '50%';
      return height * convertPercentage(value);
    }
  };

  const calcModalLeft = (value) => {
    const { width } = Dimensions?.get('window');
    if(typeof value == 'number') return value;
    else {
      if(value == 'center') value = '50%';
      return width * convertPercentage(value);
    }
  };

  const calcModalHeight = (value) => {
    const { height } = Dimensions?.get('window');
    if(typeof value == 'number') return value;
    else {
      return height * convertPercentage(value);
    }
  };

  const calcModalWidth = (value) => {
    const { width } = Dimensions?.get('window');
    if(typeof value == 'number') return value;
    else {
      return width * convertPercentage(value);
    }
  };
  
  const [modalTop, setModalTop] = useState(calcModalTop(top || 0));
  const [modalLeft, setModalLeft] = useState(calcModalLeft(left || 0));
  const [modalHeight, setModalHeight] = useState(calcModalHeight(height || '100%'));
  const [modalWidth, setModalWidth] = useState(calcModalWidth(width || '100%'));

  return (
    <>
      {modalVisible ?
        (<View
            style={{
              ...styles.modal,
              height: modalHeight,
              width: modalWidth,
              top: modalTop,
              left: modalLeft,
              ...style}}
          >
          {children}
        </View>)
        :
        null
      }
    </>
  );
};