// ExerciseBrowser.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Config from '../config/Config';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import { List, Avatar } from 'react-native-paper';
import SearchBar from './TextInputCustom';
import TagsList from './TagsList';
import Accordion from './Accordion';
import { Icon } from '@rneui/base';
import ExerciseCard from './ExerciseCard';
import TextEditableModal from './TextEditableModal';

export default function ExerciseBrowser({ onPress, onSelect, onCancel, multipleSelection=false, selectedExercises=[] }) {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const { exercises, nanoid } = useData();
  const [textSearch, setTextSearch] = useState('');
  const [zonesMarked, setZonesMarked] = useState([]);
  const [mainMusclesMarked, setMainMusclesMarked] = useState([]);
  const [secondaryMusclesMarked, setSecondaryMusclesMarked] = useState([]);
  const [equipmentMarked, setEquipmentMarked] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [images, setImages] = useState({});
  const [selected, setSelected] = useState(selectedExercises);

  useEffect(() => {
    setFilteredExercises(exercises);
  }, [exercises]);

  useEffect(() => {
    const loadedImages = {};
    const exerciseImages = filteredExercises || exercises;
    // console.log('BROWSER: ', exercises);
    exerciseImages.forEach(exercise => {
      const exerciseName = exercise?.name;
      const fileName = exerciseName?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
      const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
      loadedImages[exerciseName] = { uri: filePath };
    });
    setImages(loadedImages);
    // console.log({filteredExercises});
  }, [exercises, filteredExercises]);

  const handleSearch = (text) => {
    console.log('ExerciseBrowser COMPONENT: handleSearch', text);
    setTextSearch(text);
    const filtered = updateTagsMarked({text});
    setFilteredExercises(filtered);
  };

  const handleOnCancelSearch = () => {
    handleSearch('');
  };

  const handleOnTagZones = (tags) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnTagZones', tags);
    setZonesMarked(tags);
    const filtered = updateTagsMarked({zones: tags});
    setFilteredExercises(filtered);
  };

  const handleOnTagMainMuscles = (tags) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnTagMainMuscles', tags);
    setMainMusclesMarked(tags);
    const filtered = updateTagsMarked({mainMuscles: tags});
    setFilteredExercises(filtered);
  };

  const handleOnTagSecondaryMuscles = (tags) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnTagSecondaryMuscles', tags);
    setSecondaryMusclesMarked(tags);
    const filtered = updateTagsMarked({secondaryMuscles: tags});
    setFilteredExercises(filtered);
  };

  const handleOnTagEquipment = (tags) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnTagEquipment', tags);
    setEquipmentMarked(tags);
    const filtered = updateTagsMarked({equipment: tags});
    setFilteredExercises(filtered);
  };

  const updateTagsMarked = ({
    text=textSearch,
    zones=zonesMarked,
    mainMuscles=mainMusclesMarked,
    secondaryMuscles=secondaryMusclesMarked,
    equipment=equipmentMarked}) => {
    let filtered = zones ? handleFilter(exercises, 'zone', zones) : exercises;
    filtered = mainMuscles ? handleFilter(filtered, 'mainMuscles', mainMuscles) : filtered;
    filtered = secondaryMuscles ? handleFilter(filtered, 'secondaryMuscles', secondaryMuscles) : filtered;
    filtered = equipment ? handleFilter(filtered, 'equipment', equipment) : filtered;
    filtered = text ? handleFilter(filtered, 'name', text.split(' ')) : filtered;
    return filtered;
  };

  const handleFilter = (data, field, filter=[]) => {
  console.log('ExerciseBrowser COMPONENT: handleFilter: ', field, filter);
  if (filter.length > 0) {
    const filtered = data?.filter(exercise => {
      const name = exercise[field];
      if(!name) return false;
      const translatedName = name.split(',').map(n => translate(n.trim()))
      const res = filter.every(word => translatedName.some(translatedWord => translatedWord.toLowerCase().includes(word.toLowerCase().trim())));
      if(res) console.log('**** name:', exercise.name, '  -  ', translatedName, '   /   ', filter);
      return res;
    });
    return filtered;
  }
  else {
    return data;
  }
};

  const handleOnPressExercise = (exercise) => {
    console.log('------ ExerciseBrowser COMPONENT: handleOnPress: ', exercise);
    if(multipleSelection) {
      const index = selected.findIndex(e => e.id === exercise.id);
      if(index >= 0) {
        const newSelected = [...selected];
        newSelected.splice(index, 1);
        setSelected(newSelected);
      }
      else setSelected([...selected, exercise]);
      console.log('+++++++++++++++++++++++++++++++++++');
      console.log('--------------------------------- ', [...selected, exercise]);
      console.log('+++++++++++++++++++++++++++++++++++');
      
    }
    else handleOnSelect(exercise);
  };

  const handleOnSelect = (exercise) => {
    console.log('ExerciseBrowser COMPONENT: handleOnSelect: ', exercise);
    const ret = exercise ? [exercise] : selected;
    console.log('ExerciseBrowser COMPONENT: handleOnSelect: ', ret);
    if(onSelect) onSelect(ret);
  };

  const handleOnCancel = () => {
    console.log('ExerciseBrowser COMPONENT: handleOnCancel.');
    if(onCancel) onCancel();
  };

  const renderItem = ({ item }) => {
    const ItemTitle = translate(item.name);

    const ItemDescription = (
      <View
        styles={{
          backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={{...styles.textBig, flex: 0}} >{translate(item.zone)}, </Text>
          {/* <Text style={{...styles.textBig, flex: 0}} >{translate(item.mainMuscles)}</Text> */}
          <Text style={{...styles.textBig, flex: 0}} >{translate(item.secondaryMuscles)}</Text>
        </View>
        <Text style={{...styles.textBig, flex: 0}} >{translate(item.equipment)}</Text>
      </View>
    );

    return (
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={() => handleOnPressExercise(item)}>
        <List.Item
        style={{flex: 1}}
          title={ItemTitle}
          titleStyle={{ ...styles.textBig, color: styles.secondary }}
          description={ItemDescription}
          descriptionStyle={{ ...styles.textBig, color: styles.secondary }}
          left={() => <Avatar.Image size={60} source={images[item.name]} style={{ flex: 1, maxWidth: 60 }} /> }
        />
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 0}}>
          <Icon
            type='ant-design'
            style={{flex: 0, alignItems: 'center'}}
            name={selected.map(e=>e.id).includes(item.id) ? 'checkcircle' : 'checkcircleo'}
            color={selected.map(e=>e.id).includes(item.id) ? styles.secondary : styles.gray} />
        </View>
      </TouchableOpacity>
      // <ExerciseCard key={item.id+nanoid()} exercise={item} onPress={() => handleOnPress(item)}/>
    )
  };

  return (
    <>
    <View style={{ flexDirection: 'column', flex: 1, margin: 15 }}>
      <SearchBar
        onChangeText={handleSearch}
        onCancel={handleOnCancelSearch}
        placeholder={translate('exercises')}
        leftIcon={{type:'ant-design', name:'search1'}}
      />
      <Accordion
        title={translate('zones')}
        foldSymbol={<Icon type='entypo' name='chevron-up' />}
        unfoldSymbol={<Icon type='entypo' name='chevron-down' />}
        styleContainer={{backgroundColor: 'transparent', marginBottom: 2}}
        content={
        <View>
          <TagsList
            style={{...{tag: styles.tagFilter, selectedTag: styles.selectedTag }}}
            tags={translate('bodyZones').sort()}
            selected={zonesMarked}
            onPress={handleOnTagZones}
          />
        </View>}
      />
      {/* <Accordion
        title={translate('mainMuscles')}
        styleContainer={{backgroundColor: 'transparent', marginBottom: 2}}
        foldSymbol={<Icon type='entypo' name='chevron-up' />}
        unfoldSymbol={<Icon type='entypo' name='chevron-down' />}
        content={
          <View>
            <TagsList
              style={{...{tag: styles.tagFilter, selectedTag: styles.selectedTag }}}
              tags={translate('musclesList')?.sort()}
              selected={mainMusclesMarked}
              onPress={handleOnTagMainMuscles}
            />
          </View>}
      />
      <Accordion
        title={translate('secondaryMuscles')}
        styleContainer={{backgroundColor: 'transparent', marginBottom: 2}}
        foldSymbol={<Icon type='entypo' name='chevron-up' />}
        unfoldSymbol={<Icon type='entypo' name='chevron-down' />}
        content={
          <View>
            <TagsList
              style={{...{tag: styles.tagFilter, selectedTag: styles.selectedTag }}}
              tags={translate('musclesList')?.sort()}
              selected={secondaryMusclesMarked}
              onPress={handleOnTagSecondaryMuscles}
            />
          </View>}
      /> */}
      <Accordion
        title={translate('equipment')}
        styleContainer={{backgroundColor: 'transparent', marginBottom: 2}}
        foldSymbol={<Icon type='entypo' name='chevron-up' />}
        unfoldSymbol={<Icon type='entypo' name='chevron-down' />}
        content={
          <View>
            <TagsList
              style={{...{tag: styles.tagFilter, selectedTag: styles.selectedTag }}}
              tags={translate('equipmentList')?.sort()}
              selected={equipmentMarked}
              onPress={handleOnTagEquipment}
            />
          </View>}
      />
      <FlatList
        data={filteredExercises}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
    {multipleSelection &&
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...styles.buttonSlim, flex: 1, margin: 10}} onPress={() => handleOnSelect()}>{`${translate('accept')} ${selected.length ? `(${selected.length})` : ''}`}</Text>
      <Text style={{...styles.buttonSlim, flex: 1, margin: 10}} onPress={handleOnCancel}>{translate('cancel')}</Text>
    </View>}
    </>
    );
}


