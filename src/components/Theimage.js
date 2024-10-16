import React, {useState,useEffect} from 'react';
import {Image, View, StyleSheet, Dimensions} from 'react-native';
import img from '../config/Image'
import AutoHeightImage from 'react-native-auto-height-image';
const Theimage = ({navigation, ...props}) => {
  const [imageError, setImageError] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const {style, original, placeholder} = props;
  return (
    <AutoHeightImage
      source={imageError ? placeholder : original}
      onError={() => setImageError(true)}
      style={style}
      width={screenWidth}
    />
  );
};

export default Theimage;
