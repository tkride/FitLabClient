import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const TagsList = ({ style, tags, onPress, selected }) => {
  const [selectedTags, setSelectedTags] = useState(selected ?? []);

  const handleTagPress = (tag) => {
    const isSelected = selectedTags.includes(tag);

    if (isSelected) {
      // Si la etiqueta ya está seleccionada, se desmarca y se elimina de la lista
      const updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
      setSelectedTags(updatedTags);
      onPress(updatedTags); // Se llama al callback con la lista actualizada de etiquetas seleccionadas
    } else {
      // Si la etiqueta no está seleccionada, se marca y se agrega a la lista
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      onPress(updatedTags); // Se llama al callback con la lista actualizada de etiquetas seleccionadas
    }
  };

  return (
    <View style={style?.container ?? stylesDefault.container}>
      {tags.map((tag, index) => (
        <TouchableOpacity
          key={index}
          // style={[
          //   style?.tag ?? stylesDefault.tagContainer,
          //   selectedTags.includes(tag) && stylesDefault.selectedTagContainer,
          // ]}
          onPress={() => handleTagPress(tag)}
        >
          <Text style={selectedTags.includes(tag) ? (style?.selectedTag ?? stylesDefault.selectedTagText) : (style?.tag ?? stylesDefault.tagText)}>
            {tag}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const stylesDefault = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagContainer: {
    backgroundColor: '#e2e2e2',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  selectedTagContainer: {
    backgroundColor: '#ccc',
  },
  tagText: {
    color: '#333',
  },
  selectedTagText: {
    fontWeight: 'bold',
  },
};

export default TagsList;
