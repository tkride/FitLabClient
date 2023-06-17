import React, { useState } from 'react';
import { View } from 'react-native';
import { useData } from '../context/DataProvider';
import Draggable from 'react-native-draggable';

function ReorderableList({ items }) {
  const { nanoid } = useData();
  const [dragIndex, setDragIndex] = useState(null);

  console.log('items', items);

  const handleDragStart = (event, index) => {
    setDragIndex(index);
  };

  const handleDragEnd = (event, index) => {
    const newIndex = index;
    if (newIndex !== dragIndex) {
      // Reorder items
      const newItems = [...items];
      const [removed] = newItems.splice(dragIndex, 1);
      newItems.splice(newIndex, 0, removed);
      setItems(newItems);
    }
    setDragIndex(null);
  };

  return (
    <View style={{flex:1}}>
      <Draggable
        onDragStart={(event) => handleDragStart(event, index)}
        onDragEnd={(event) => handleDragEnd(event, index)}
      >
        {items.map(item => (
          <View key={item.id+nanoid()}>
            {item}
          </View>
        ))}
      </Draggable>
    </View>
  );
}

export default ReorderableList;