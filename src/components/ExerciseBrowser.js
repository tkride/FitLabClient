// ExerciseBrowser.js

import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Config from '../config/Config';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { useData } from '../context/DataProvider';
import { List, Avatar } from 'react-native-paper';
import SearchBar from './Text/TextInputCustom';
import TagsList from './TagsList';
import Accordion from './Accordion';
import { Icon } from '@rneui/base';
import ExerciseCard from './ExerciseCard';
import ModalTextEditable from './Text/ModalTextEditable';
import ScrollableList from './ScrollableList';

export default function ExerciseBrowser({ onSelect, onCancel, multipleSelection=false, selectedExercises=[] }) {
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
  const [onlySelectedMarked, setOnlySelectedMarked] = useState(false);

  // let selected = [];
  // const setSelected = (se) => {
  //   console.log('ExerciseBrowser COMPONENT: setSelected', se);
  //   selected = se;
  // };

  useEffect(() => {
    setFilteredExercises(exercises);
  }, [exercises]);

  // useEffect(() => {
  //   const loadedImages = {};
  //   const exerciseImages = filteredExercises || exercises;
  //   exerciseImages.forEach(exercise => {
  //     const exerciseName = exercise?.name;
  //     const fileName = exerciseName?.toLowerCase().replace(/\s/g, '-') + Config.IMAGES.EXERCISE_STEP_1_FILE_APPEND;
  //     const filePath = Config.REQUESTS.IMAGES_EXERCISE_STEPS + '/' + fileName;
  //     loadedImages[exerciseName] = { uri: filePath };
  //   });
  //   setImages(loadedImages);
  //   console.log({filteredExercises});
  // }, [exercises, filteredExercises]);

  useEffect(() => {
    if (selectedExercises.length > 0) {
      setSelected(selectedExercises);
      setOnlySelectedMarked(true);
      updateTagsMarked({onlySelected: true});
    }
  }, [selectedExercises]);

  useEffect(() => {
    if (multipleSelection && onlySelectedMarked) {
      updateTagsMarked({onlySelected: onlySelectedMarked});
    }
  }, [selected]);

  const handleSearch = (text) => {
    console.log('ExerciseBrowser COMPONENT: handleSearch', text);
    setTextSearch(text);
    updateTagsMarked({text});
  };

  const handleOnCancelSearch = () => {
    handleSearch('');
  };

  const handleOnTagZones = (tags) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnTagZones', tags);
    setZonesMarked(tags);
    updateTagsMarked({zones: tags});
  };

  const handleOnTagMainMuscles = (tags) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnTagMainMuscles', tags);
    setMainMusclesMarked(tags);
    updateTagsMarked({mainMuscles: tags});
  };

  const handleOnTagSecondaryMuscles = (tags) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnTagSecondaryMuscles', tags);
    setSecondaryMusclesMarked(tags);
    updateTagsMarked({secondaryMuscles: tags});
  };

  const handleOnTagEquipment = (tags) => {
    console.log('ExerciseBrowser COMPONENT: handleFilter: handleOnTagEquipment', tags);
    setEquipmentMarked(tags);
    updateTagsMarked({equipment: tags});
  };

  const updateTagsMarked = ({
    text=textSearch,
    zones=zonesMarked,
    mainMuscles=mainMusclesMarked,
    secondaryMuscles=secondaryMusclesMarked,
    equipment=equipmentMarked,
    onlySelected=onlySelectedMarked
  }) => {
    if(onlySelected) {
      setFilteredExercises(selected);
      return selected;
    }

    let filtered = zones ? handleFilter(exercises, 'zone', zones) : exercises;
    filtered = mainMuscles ? handleFilter(filtered, 'mainMuscles', mainMuscles) : filtered;
    filtered = secondaryMuscles ? handleFilter(filtered, 'secondaryMuscles', secondaryMuscles) : filtered;
    filtered = equipment ? handleFilter(filtered, 'equipment', equipment) : filtered;
    filtered = text ? handleFilter(filtered, 'name', text.split(' ')) : filtered;
    setFilteredExercises(filtered);
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
    if(multipleSelection) {
      const index = selected.findIndex(e => e.id === exercise.id);
      if(index >= 0) {
        const newSelected = [...selected];
        newSelected.splice(index, 1);
        setSelected(newSelected);
      }
      else setSelected([...selected, exercise]);

      if(onlySelectedMarked) {
        updateTagsMarked({onlySelected: onlySelectedMarked});
      }
    }
    else handleOnSelect(exercise);
  };

  const handleOnSelect = (exercise) => {
    const ret = exercise ? [exercise] : selected;
    if(onSelect) onSelect(ret);
  };

  const handleOnCancel = () => {
    if(onCancel) onCancel();
  };

  const renderItem = ({ item }) => {

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

    const newRet = (
      <ExerciseCard
        key={item.id+nanoid()}
        styleContainer={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          marginTop: 15,
          backgroundColor: styles.mainBack}}
        styleText={{ ...styles.textBig, color: styles.secondary }}
        exercise={item}
        description={ItemDescription}
        selectable={multipleSelection}
        isSelected={selected.map(e=>e.id).includes(item.id)}
        onSelect={() => handleOnPressExercise(item)}
      /> );

    return newRet;

    const ItemTitle = translate(item.name);
    const oldRet = (
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
      </TouchableOpacity> );
    return oldRet;
  };

  const handleOnOnlySelected = () => {
    setOnlySelectedMarked(!onlySelectedMarked);
    updateTagsMarked({onlySelected: !onlySelectedMarked});
  };

  console.log('ExerciseBrowser COMPONENT: render');

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
      <ScrollableList
        data={filteredExercises}
        scrollPosition={0}
        renderItem={renderItem}
      />
      {/* <ScrollView>
        <View>
          {console.log('ExercuseBrowser::filteredExercises.length', filteredExercises.length)}
          {filteredExercises.slice(0, 100).map( (item, i) => {
            return renderItem({item});
          } )}
          {console.log('ExercuseBrowser::filteredExercises end')}
        </View>
      </ScrollView> */}
    </View>
    {multipleSelection &&
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...styles.buttonSlim, flex: 1, margin: 10}} onPress={() => handleOnSelect()}>{`${translate('accept')} ${selected.length ? `(${selected.length})` : ''}`}</Text>
      <Text style={{...styles.buttonSlim, flex: 1, margin: 10}} onPress={handleOnCancel}>{translate('cancel')}</Text>
      <View style={{flex: 0.35}}>
        <Icon
          type='ant-design'
          style={{alignItems: 'center'}}
          name={onlySelectedMarked ? 'checkcircle' : 'checkcircleo'}
          color={onlySelectedMarked ? styles.secondary : styles.gray}
          onPress={handleOnOnlySelected}
        />
      </View>
    </View>}
    </>
    );
}


