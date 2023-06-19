import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';

const SwipableView = ({
  style,
  onSwipeStart,
  onSwipe,
  onSwipeEnd,
  enableSwipe=[],
  enableFreeSwipe=false,
  children,
  panResponder,
  props
}) => {
  const SWIPE_HORIZONTAL = 1;
  const SWIPE_VERTICAL = 2;
  const SWIPE_LEFT = 3;
  const SWIPE_RIGHT = 4;
  const SWIPE_UP = 5;
  const SWIPE_DOWN = 6;

  const DIRECTION_STRING = {
    [SWIPE_HORIZONTAL]: 'horizontal',
    [SWIPE_VERTICAL]: 'vertical',
  };

  const SENSE_STRING = {
    [SWIPE_LEFT]: 'left',
    [SWIPE_RIGHT]: 'right',
    [SWIPE_UP]: 'up',
    [SWIPE_DOWN]: 'down'
  };

  const enableLeft = enableSwipe.includes('left');
  const enableRight = enableSwipe.includes('right');
  const enableUp = enableSwipe.includes('up');
  const enableDown = enableSwipe.includes('down');

  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeSense, setSwipeSense] = useState(null);
  let moveDirection = null;
  let moveSense = null;

  const pan = useRef(new Animated.ValueXY()).current;
  const _panResponder = panResponder || useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        if(onSwipeStart) {
          onSwipeStart({children});
        }
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        if(enableSwipe.length > 0) {
          if(!moveDirection) {
            const { dx, dy } = gestureState;
            moveDirection = (Math.abs(dx) > Math.abs(dy)) ? SWIPE_HORIZONTAL : SWIPE_VERTICAL;
            moveSense = (moveDirection === SWIPE_HORIZONTAL) ?
              (gestureState.dx < 0 ? SWIPE_LEFT : SWIPE_RIGHT) :
              (gestureState.dy < 0 ? SWIPE_UP : SWIPE_DOWN);
            setSwipeDirection(moveDirection);
            setSwipeSense(moveSense);
          }
          else {
            moveSense = (moveDirection === SWIPE_HORIZONTAL) ?
              (gestureState.dx < 0 ? SWIPE_LEFT : SWIPE_RIGHT) :
              (gestureState.dy < 0 ? SWIPE_UP : SWIPE_DOWN);
            setSwipeSense(moveSense);
          }
          
          if(onSwipe) {
            onSwipe({
              direction: DIRECTION_STRING[moveDirection],
              sense: SENSE_STRING[moveSense],
              dx: pan.x.__getValue(),
              dy: pan.y.__getValue(),
              children });
          }
        }

        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        if(onSwipeEnd) {
          onSwipeEnd({
            direction: DIRECTION_STRING[moveDirection],
            sense: SENSE_STRING[moveSense],
            dx: pan.x.__getValue(),
            dy: pan.y.__getValue(),
            children });
        }
        moveDirection = null;
        moveSense = null;
        setSwipeDirection(null);
        setSwipeSense(null);
      },
    })
  ).current;

  const getTransform = (direction) => {
    if(enableFreeSwipe)
      return [{ translateX: pan.x }, { translateY: pan.y }];
    
    const clipx = pan.x.interpolate({
      inputRange: [-Infinity, 0, Infinity],
      outputRange: [enableLeft ? -Infinity : 0, 0, enableRight ? Infinity : 0],
      extrapolate: 'clamp',
    });

    const clipy = pan.y.interpolate({
      inputRange: [-Infinity, 0, Infinity],
      outputRange: [enableUp ? -Infinity : 0, 0, enableDown ? Infinity : 0],
      extrapolate: 'clamp',
    });

    switch (direction) {
      case SWIPE_HORIZONTAL:
        return [{ translateX: clipx }];
      case SWIPE_VERTICAL:
        return [{ translateY: clipy }];
      default:
        // return [{ translateX: pan.x }, { translateY: pan.y }];
        return [{ translateX: 0 }, { translateY: 0 }];
    }
  };

  useEffect(() => {
  }, [style]);

  return (
    <Animated.View
      style={{ transform: getTransform(swipeDirection), ...style }}
        {..._panResponder.panHandlers}
        {...props}
    >
      {children}
    </Animated.View>
  );
};

export default SwipableView;
