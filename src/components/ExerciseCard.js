import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Config from '../config/Config';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { Icon } from '@rneui/base';
import SwipableView from './SwipableView';

const ExerciseCard = ({
  styleContainer,
  styleText,
  exercise,
  styleDescription,
  description,
  onPress,
  onSwipeStart,
  onSwipe,
  onSwipeEnd,
  enableSwipe=[],
  selectable=false,
  isSelected=false,
  onSelect,
  props
}) => {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const [image, setImage] = useState({});
  const [selected, setSelected] = useState(isSelected);
  const [zIndexSwipe, setZIndexSwipe] = useState(10);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeSense, setSwipeSense] = useState(null);

  useEffect(() => {
    const exerciseName = exercise?.name;
    const fileName = exerciseName?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
    const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
    setImage({ uri: filePath });
  }, [exercise]);

  useEffect(() => {
  }, [selected]);

  useEffect(() => {
  }, [zIndexSwipe, swipeDirection, swipeSense]);

  const handleOnPress = (exercise) => {
    if(onPress) onPress(exercise);
  };

  const handleOnSwipeStart = (event) => {
    setZIndexSwipe(99999);
    if(onSwipeStart) onSwipeStart(event);
  };

  const handleOnSwipe = (event) => {
    if(event.direction !== swipeDirection) {
      setSwipeDirection(event.direction);
    }
    if(event.sense !== swipeSense) {
      setSwipeSense(event.sense);
    }
    if(onSwipe) onSwipe(event);
  };

  const handleOnSwipeEnd = (event) => {
    setZIndexSwipe(10);
    setSwipeDirection(null);
    setSwipeSense(null);
    if(onSwipeEnd) onSwipeEnd(event);
  };

  const handleOnSelect = () => {
    setSelected(!selected);
    if(onSelect) onSelect(exercise);
  };

  const ExerciseInfo = (
    <>
      <Avatar.Image size={60} source={image} style={{ flex: 1, maxWidth: 60, marginRight: 10 }} />
      <TouchableOpacity style={{flex: 1}} onPress={() => handleOnPress(exercise)} >
        <Text
          style={{ ...styles.textBig, flex: 1, color: styles.secondary, maxWidth: '100%', ...styleText }}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {translate(exercise.name)}
        </Text>
        {description &&
        <Text style={{ ...styles.textBig, color: styles.grayHeader, maxWidth: '100%', ...styleDescription }}>
          {description}
        </Text>
        }
      </TouchableOpacity>
    </>
  );

  return (
    <View style={{zIndex: zIndexSwipe}}>
      <View style={{zIndex: zIndexSwipe}}>
        <SwipableView
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: styles.primary,
            borderRadius: 10,
            ...styleContainer
          }}
          onSwipeStart={handleOnSwipeStart}
          onSwipe={handleOnSwipe}
          onSwipeEnd={handleOnSwipeEnd}
          enableSwipe={enableSwipe}
          {...props}
        >
          {enableSwipe.length > 0 &&
          <View style={{flexDirection: 'row', width: 25, alignItems: 'center', zIndex: 10}}>
            <Icon type='material-community' name='drag-vertical-variant' color={styles.grayHeader} size={25} />
            {/* <Icon type='material-icons' name='drag-indicator' color={styles.grayHeader} size={25} /> */}
          </View>
          }
          {ExerciseInfo}
          {selectable &&
            <TouchableOpacity onPress={handleOnSelect}>
              <View style={{alignItems: 'center', flex: 1}}>
                <Icon
                  type='ant-design'
                  name={selected ? 'checkcircle' : 'checkcircleo'}
                  color={selected ? styles.secondary : styles.gray} />
              </View>
            </TouchableOpacity>
          }
        </SwipableView>
      </View>
      {enableSwipe.length > 0 && swipeDirection === 'horizontal' && swipeSense === 'left' &&
      <View style={{
        position: 'absolute',
        right: 0,
        height: 80,
        width: '50%',
        zIndex: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: styles.error.color}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <Icon name='delete' color={styles.primary} size={30} />
          </View>
      </View>
      }
      {enableSwipe.length > 0 && swipeDirection === 'horizontal' && swipeSense === 'right' &&
      <View style={{
        position: 'absolute',
        left: 0,
        height: 80,
        width: '50%',
        zIndex: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: styles.secondary}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', margin: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 1}}>
              <Icon name='all-inclusive' color={styles.primary} size={30} />
              <Text style={{...styles.text, fontSize: 11, color: styles.primary}}>{translate('applyToAll')}</Text>
            </View>
          </View>
      </View>
      }
      {
        enableSwipe.length > 0 && swipeDirection === 'vertical' &&
        <View style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 0,
          borderRadius: 10,
          backgroundColor: styles.gray,
          opacity: 0.3}}>
            <View style={{flexDirection: 'row'}}>
              {ExerciseInfo}
            </View>
        </View>
      }
    </View>
  );
};

export default ExerciseCard;
