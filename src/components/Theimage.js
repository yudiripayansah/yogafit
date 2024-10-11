import React, {useState,useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import img from '../config/Image'
const Theimage = ({navigation, ...props}) => {
  const [imageError, setImageError] = useState(false);
  const {style, original, placeholder} = props;
  return (
    <Image
      source={imageError ? placeholder : original}
      onError={() => setImageError(true)}
      style={style}
    />
  );
};

export default Theimage;
