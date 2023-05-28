import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { useTranslator } from '../context/TranslatorProvider';
import { Icon } from '@rneui/base';

export default SearchBar = ({onSearch, onCancel, placeholder, style={}, filters, onFilter}) => {
  const { styles } = useTheme();
  const { translate } = useTranslator();
  const [search, setSearch] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = (text) => {
    setSearch(text);
    if(onSearch) onSearch(text);
  };

  const handleOnCancel = () => {
    setSearch('');
    if(onCancel) onCancel();
  };

  const handleOnFilter = (filter) => {
    let filterResult = [];
    if(selectedFilters.includes(filter)) {
      filterResult = selectedFilters.filter(f => f !== filter);
    }
    else {
      filterResult = [...selectedFilters, filter];
    }
    setSelectedFilters(filterResult);
    console.log(filterResult);
    if(onFilter) onFilter(filterResult);
  };

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5, ...style}}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, zIndex: 2}}><Icon type='ant-design' name='search1' color={styles.text.color} /></View>
        <TextInput
          style={{...styles.searchBar, borderRadius: 50, flex: 9, zIndex: 1}}
          placeholderTextColor={styles.placeholderText}
          placeholder={placeholder || translate('search')}
          onChangeText={handleSearch}
          value={search}
        />
        <View style={{flex: 0, right: 40, zIndex: 2}}>
          <TouchableOpacity onPress={handleOnCancel}>
            <Icon name='close' color={styles.text.color} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
        {/* TODO FILTROS */}
        {filters && filters.map(filter => (
          // <View key={filter} style={{...styles.filterTag, flex: 1, zIndex: 2}}>
            <Text
              style={{
                ...styles.filterTag,
                color: (selectedFilters.includes(filter)) ? styles.secondary : styles.filterTag.color,
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 2,
                paddingBottom: 5,
                margin: 5,
                textAlign: 'center',
              }}
              onPress={() => handleOnFilter(filter)}
            >
              {filter}
            </Text>
          // </View>
        ))}
      </View>
    </View>
  );
};
