// ImageSequence.js

import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

export default function ImageSequence({ images, time, styleImage, resizeMode }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('ImageSequence: setInterval: imageIndex: ', imageIndex);
      setImageIndex(prevIndex => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    }, time);

    const intervalInit = setInterval(() => {
      // console.log('ImageSequence: setTimeout: imageIndex: ', imageIndex);
      setImageIndex(prevIndex => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
      if(imageIndex === 0) {
        setIsLoaded(true);
        clearInterval(intervalInit);
      }
    }, 1);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // console.log('ImageSequence: useEffect: imageIndex: ', imageIndex);
    if(imageIndex < images.length) {
      const newImage = typeof images[imageIndex] === 'string' ? {uri: images[imageIndex]} : images[imageIndex];
      setImage(newImage);
    }
    else {
      setImageIndex(0);
    }
  }, [imageIndex]);

  return (
    <>
      {image && <Image source={image} style={{...styleImage, opacity: isLoaded ? 1 : 0}} resizeMode={resizeMode ?? "cover"} />}
      {/* {image && <Image source={image} style={styleImage} resizeMode={resizeMode ?? "cover"} />} */}
    </>
  );
}
