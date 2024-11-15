import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/ThemeContext';
import Theimage from './Theimage'
import img from '../config/Image'
function HomeCarousel({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const width = Dimensions.get('window').width;
  const {images} = props
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 1.7}
        autoPlay={true}
        autoPlayInterval={3000}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
              <Theimage original={images[index]} placeholder={img.banner1} style={[{objectFit:'cover'},t.wp100,t.hp100]} />
              <View style={[t.absolute,t.wp100,t.hp100,t.bgblack,{opacity:.2}]}></View>
            </View>
        )}
      />
    </View>
  );
}

export default HomeCarousel;
