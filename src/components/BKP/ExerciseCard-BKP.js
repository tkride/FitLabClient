import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Config from '../../config/Config';
import { useTheme } from '../../context/ThemeProvider';
import { useTranslator } from '../../context/TranslatorProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { List, Avatar } from 'react-native-paper';

const ExerciseCard = ({ styleContainer, styleText, exercise, onPress, onSwipe }) => {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const fileName = exercise?.name?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
  const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
  const [image, setImage] = useState({});

  useEffect(() => {
    const exerciseName = exercise?.name;
    const fileName = exerciseName?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
    const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
    setImage({ uri: filePath });
  }, [exercise]);

  return (
    // <TouchableOpacity onPress={onPress}>
    //   <View style={styles.card}>
    //     <View style={{...styles.cardContent, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
    //       <Avatar.Image size={50} source={image} style={{ flex: 0, maxWidth: 50 }} />
    //       <Text style={{...styles.textBigger, marginLeft: 10, ...style}}>{translate(exercise.name)}</Text>
    //     </View>
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity style={styleContainer} onPress={() => onPress(exercise)} >
    <List.Item
      // title={translate(exercise.name)}
      title={(<Text style={styleText ?? {...styles.textBig, color: styles.secondary}}>{translate(exercise.name)}</Text>)}
      titleStyle={styleText ?? { ...styles.textBig, color: styles.secondary }}
      // description={item.muscle}
      // left={() => <Text style={{ color: styles.primary, marginRight: 10 }}>{item.weight}kg</Text>}
      left={() => <Avatar.Image size={50} source={image} style={{ flex: 1, maxWidth: 50 }} /> }
      // right={() => <Text style={{ ...styles.textBig, marginRight: 10 }}>{item.type}</Text>}
    />
  </TouchableOpacity>
  );
};

ExerciseCard.defaultProps = {
  onPress: () => {},
};

export default ExerciseCard;