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

  useEffect(() => {
    const exerciseName = exercise?.name;
    const fileName = exerciseName?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
    const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
    setImage({ uri: filePath });
  }, [exercise]);

  useEffect(() => {
  }, [selected]);

  const handleOnPress = (exercise) => {
    if(onPress) onPress(exercise);
  };

  const handleOnSwipeStart = (event) => {
    if(onSwipeStart) onSwipeStart(event);
  };

  const handleOnSwipe = (event) => {
    if(onSwipe) onSwipe(event);
  };

  const handleOnSwipeEnd = (event) => {
    if(onSwipeEnd) onSwipeEnd(event);
  };

  const handleOnSelect = () => {
    console.log('ExerciseCard::handleOnSelect', !selected);
    setSelected(!selected);
    if(onSelect) onSelect(exercise);
  };

  return (
    <View>
      <SwipableView
        style={{
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginTop: 5,
          // marginBottom: 5,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: styles.primary,
          borderRadius: 10,
          zIndex: 10,
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
          {/* <Icon type='material-community' name='drag-vertical-variant' color={styles.grayHeader} size={25} /> */}
          <Icon type='material-icons' name='drag-indicator' color={styles.grayHeader} size={25} />
        </View>
        }
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
        {selectable &&
          <TouchableOpacity onPress={handleOnSelect}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Icon
                type='ant-design'
                // style={{flex: 0}}
                // name={selected.map(e=>e.id).includes(item.id) ? 'checkcircle' : 'checkcircleo'}
                // color={selected.map(e=>e.id).includes(item.id) ? styles.secondary : styles.gray} />
                name={selected ? 'checkcircle' : 'checkcircleo'}
                color={selected ? styles.secondary : styles.gray} />
            </View>
          </TouchableOpacity>
        }
      </SwipableView>
      {enableSwipe.length > 0 &&
      <View style={{position: 'absolute', right: 10, top: '15%', flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 0}}>
        <Icon name='delete' color={styles.error.color} size={25} />
      </View>
      }
    </View>
  );
};

export default ExerciseCard;
