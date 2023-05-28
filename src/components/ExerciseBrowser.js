// ExerciseBrowser.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Config from '../config/Config';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import { List, Avatar } from 'react-native-paper';
import SearchBar from './SearchBar';

export default function ExerciseBrowser({ navigation }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { exercises } = useData();
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    setFilteredExercises(exercises);
  }, [exercises]);

  useEffect(() => {
    const loadedImages = {};
    const exerciseImages = filteredExercises || exercises;
    exerciseImages.forEach(exercise => {
      const exerciseName = exercise?.name;
      const fileName = exerciseName?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
      const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
      loadedImages[exerciseName] = { uri: filePath };
    });
    setImages(loadedImages);
  }, [exercises, filteredExercises]);

  const handleSearch = (text) => {
    if (text.length > 0) {
      // Split el texto por espacios y comprueba cada palabra en minúsculas en el nombre del ejercicio
      const filter = text.split(' ');
      console.log('ExerciseBrowser COMPONENT: handleSearch', filter);
      setSearchFilter(filter);
      handleFilter([...tagFilter, ...filter]);
    }
  };

  const handleOnFilter = (filter) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnFilter', filter);
    setTagFilter(filter);
    handleFilter([...searchFilter, ...filter]);
  };

  const handleFilter = (filter) => {
    if (filter.length > 0) {
      const filtered = exercises.filter(exercise => {
        const name = exercise.name.toLowerCase();
        return filter.every(word => name.includes(word.toLowerCase().trim()));
      });
      setFilteredExercises(filtered);
    }
    else {
      setFilteredExercises(exercises);
    }

  };

  const handleOnCancel = () => {
    setFilteredExercises(exercises);
  };
  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('ExerciseBrowser COMPONENT: ', item)
          // navigation.navigate('Ejercicio', { exercise: item })
        }}
      >
        <List.Item
          title={item.name}
          titleStyle={{ ...styles.textBig, color: styles.secondary }}
          // description={item.muscle}
          // left={() => <Text style={{ color: styles.primary, marginRight: 10 }}>{item.weight}kg</Text>}
          left={() => <Avatar.Image size={60} source={images[item.name]} style={{ flex: 1, maxWidth: 60 }} /> }
          // right={() => <Text style={{ ...styles.textBig, marginRight: 10 }}>{item.type}</Text>}
        />
      </TouchableOpacity>
    )
  };

  return (
    // <View style={{ flex: 1, paddingTop: insets.top }}>
    <View style={{ flex: 1, margin: 20 }}>
      <SearchBar
        style={{width: '100%'}}
        onSearch={handleSearch}
        onCancel={handleOnCancel}
        placeholder={translate('exercises')}
        onFilter={handleOnFilter}
        filters={[...translate('zones'), 'type']}
      />
      <FlatList
        data={filteredExercises}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // ItemSeparatorComponent={() => <Text>----</Text>}
      />
    </View>
    );
}


