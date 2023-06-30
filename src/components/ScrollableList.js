import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';

function ScrollableList({ style, data, renderItem, scrollPosition }) {
  const ITEMS_OFFSET = 4;
  const scrollViewRef = useRef(null);
  const itemRef = useRef(null);
  const [itemHeight, setItemHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(scrollPosition);
  // const [firstItem, setFirstItem] = useState(0);
  // const [lastItem, setLastItem] = useState(ITEMS_OFFSET);
  const [itemsIdx, setItemsIdx] = useState([0, ITEMS_OFFSET]);

  
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    const handleItemMeasure = (scrollHeight) => {
      itemRef.current.measure((x, y, width, height, pageX, pageY) => {
        setItemHeight(height);
        // setFirstItem(Math.round(currentScrollPosition/height));
        // setLastItem(Math.round((scrollHeight + currentScrollPosition)/height) + ITEMS_OFFSET);
        const firstItemIdx = Math.round(currentScrollPosition/height);
        const lastItemIdx = Math.round((scrollHeight + currentScrollPosition)/height) + ITEMS_OFFSET;
        setItemsIdx([firstItemIdx, lastItemIdx]);
        console.log('ScrollableList::useLayoutEffect: ', itemsIdx[0], ' - ', itemsIdx[1]);
      });
    };

    requestAnimationFrame(() => {
      console.log('requestAnimationFrame');
      scrollViewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setScrollHeight(height);
        handleItemMeasure(height);
      });
    });
  }, []);

  // useEffect(() => {
  //   console.log('useEffect');
  // }, [itemsIdx]);

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    let firstItemIdx = Math.floor(y/itemHeight) - ITEMS_OFFSET;
    if(firstItemIdx < 0) firstItemIdx = 0;
    const lastItemIdx = Math.round((scrollHeight + y)/itemHeight) + ITEMS_OFFSET;
    // setFirstItem((firstItemIdx - ITEMS_OFFSET) < 0 ? 0 : (firstItemIdx - ITEMS_OFFSET));
    // setLastItem(lastItemIdx);
    setItemsIdx([firstItemIdx, lastItemIdx]);
    console.log('ScrollableList::handleScroll: ', itemsIdx[0], ' - ', itemsIdx[1]);
  };

  const handleScrollToPosition = (position) => {
    scrollViewRef.current.scrollTo({ y: position, animated: false });
  };

  const items = data.slice(itemsIdx[0], itemsIdx[1]);
  // const items = data.slice(firstItem, lastItem);
  // const items = data.slice(0, 100);
  // const items = data;
  
  console.log('ScrollableList render');
  
  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      // onMomentumScrollEnd={handleScroll}
      scrollEventThrottle={16}
    >
      {/* <View style={{ height: firstItem * itemHeight }} /> */}
      <View style={{ height: itemsIdx[0] * itemHeight }} />
      {items.map((item, index) => (
        // <TouchableOpacity key={index} onPress={() => handleScrollToPosition(index * itemHeight)}>
          <View key={index} style={{...style}} onLayout={() => {}} ref={index === 0 ? itemRef : null}>
            {renderItem({item})}
          </View>
        // </TouchableOpacity>
      ))}
      {/* <View style={{ height: (data.length - lastItem) * itemHeight }} /> */}
      <View style={{ height: (data.length - itemsIdx[1]) * itemHeight }} />
    </ScrollView>
  );
}

export default ScrollableList;