import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';

function ScrollableList({ style, data, renderItem, scrollPosition }) {
  const scrollViewRef = useRef(null);
  const itemRef = useRef(null);
  const [itemHeight, setItemHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(scrollPosition);
  const [firstItem, setFirstItem] = useState(0);
  const ITEMS_OFFSET = 5;
  const [lastItem, setLastItem] = useState(ITEMS_OFFSET);

  
  useLayoutEffect(() => {
    const handleItemMeasure = (scrollHeight) => {
      itemRef.current.measure((x, y, width, height, pageX, pageY) => {
        setItemHeight(height);
        setFirstItem(Math.round(currentScrollPosition/height));
        setLastItem(Math.round((scrollHeight + currentScrollPosition)/height) + ITEMS_OFFSET);
      });
    };

    requestAnimationFrame(() => {
      scrollViewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setScrollHeight(height);
        handleItemMeasure(height);
      });
    });
  }, []);

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    const firstItemIdx = Math.floor(y/itemHeight);
    setFirstItem((firstItemIdx - ITEMS_OFFSET) < 0 ? 0 : (firstItemIdx - ITEMS_OFFSET));
    const lastItemIdx = Math.round((scrollHeight + y)/itemHeight);
    setLastItem(lastItemIdx + ITEMS_OFFSET);
  };

  const handleScrollToPosition = (position) => {
    scrollViewRef.current.scrollTo({ y: position, animated: false });
  };

  const items = data.slice(firstItem, lastItem);

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      onMomentumScrollEnd={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={{ height: firstItem * itemHeight }} />
      {items.map((item, index) => (
        // <TouchableOpacity key={index} onPress={() => handleScrollToPosition(index * itemHeight)}>
          <View key={index} style={{...style}} onLayout={() => {}} ref={index === 0 ? itemRef : null}>
            {renderItem({item})}
          </View>
        // </TouchableOpacity>
      ))}
      <View style={{ height: (data.length - lastItem) * itemHeight }} />
    </ScrollView>
  );
}

export default ScrollableList;