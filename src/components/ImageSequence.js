// Crea componente que muestrea un array de imagenes en secuencia con un tiempo de pausa entre ellas
// Toma como parametros un array de imagenes y un tiempo de pausa

import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

export default function ImageSequence({ images, time, styleImage, resizeMode }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [image, setImage] = useState(images[imageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    }, time);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
      {image ? <Image source={image} style={styleImage} resizeMode={resizeMode ?? "cover"} /> : null}
    </>
  );
}
