import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, Dimensions} from 'react-native';
import img from '../config/Image'
import AutoHeightImage from 'react-native-auto-height-image';

const normalizeSource = (src) => {
  if (!src) return null;
  if (typeof src === 'string') return {uri: src};
  return src;
};

const Theimage = ({navigation, ...props}) => {
  const [validSource, setValidSource] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const {style, original, placeholder} = props;

  useEffect(() => {
    const src = normalizeSource(original);
    if (!src?.uri) {
      setValidSource(placeholder);
      return;
    }

    Image.prefetch(src.uri)
      .then(() => setValidSource(src))
      .catch(() => setValidSource(placeholder));
  }, [original]);

  return (
    <AutoHeightImage
      source={validSource || placeholder}
      style={style}
      width={screenWidth}
    />
  );
};

export default Theimage;
