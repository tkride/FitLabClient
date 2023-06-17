import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

export default Modal = ({
  style={},
  visible=false,
  // top='0%',
  // left='0%',
  // height='100%',
  // width='100%',
  top,
  left,
  height,
  width,
  children,
}) => {
  const viewRef = useRef(null);
  const { styles } = useTheme();
  const [modalVisible, setModalVisible] = useState(visible);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const [measuredWidth, setMeasuredWidth] = useState(0);
  
  const onLayout = () => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setMeasuredHeight(height);
        setMeasuredWidth(width);
      });
    }
  };

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const convertPercentage = (percentage) => {
    if(!percentage) return 0;
    const number = percentage.replace('%', '');
    const res = number == 0 ? 0 : Number(number)/100;
    return res;
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
  
  const [modalHeight, setModalHeight] = useState(calcModalHeight(height));
  const [modalWidth, setModalWidth] = useState(calcModalWidth(width));

  const calcModalTop = (value) => {
    const { height } = Dimensions?.get('window');
    if(typeof value == 'number') return value;
    else {
      if(value == 'center') {
        value = ((height/2)-(measuredHeight/2))*100/height + '%';
      }
      return height * convertPercentage(value);
    }
  };

  const calcModalLeft = (value) => {
    const { width } = Dimensions?.get('window');
    if(typeof value == 'number') return value;
    else {
      if(value == 'center') {
        value = ((width/2)-(measuredWidth/2))*100/width + '%';
      }
      return width * convertPercentage(value);
    }
  };

  const [modalTop, setModalTop] = useState(calcModalTop(top || 0));
  const [modalLeft, setModalLeft] = useState(calcModalLeft(left || 0));


  // Need to recalculate modalTop and modalLeft when measuredHeight or measuredWidth changes
  useEffect(() => {
    setModalTop(calcModalTop(top || 0));
    setModalLeft(calcModalLeft(left || 0));
  }, [measuredHeight, measuredWidth, top, left]);

  if(!modalVisible) return null;

  return (
    <View
    ref={viewRef}
      style={[
        styles.modal,
        modalHeight && { height: modalHeight },
        modalWidth && { width: modalWidth },
        { flex: 1,
          top: modalTop,
          left: modalLeft,
        },
        style
      ]}
        onLayout={onLayout}
    >
    {children}
  </View>
  );
};