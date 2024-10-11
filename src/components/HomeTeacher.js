import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/ThemeContext';
import Theimage from './Theimage'
import img from '../config/Image'
function HomeTeacher({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const width = Dimensions.get('window').width;
  const {images} = props
  const baseOptions = ({
                        vertical: false,
                        width: width / 4,
                        height: width / 3.5,
                        style: {
                          width: width,
                        },
                      });
  return (
    <View style={{flex: 1}}>
      <Carousel
        {...baseOptions}
        loop
        autoPlay={true}
        autoPlayInterval={3000}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <View
            style={[{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },]}>
              <Theimage original={images[index]} placeholder={img.teacher} style={[{objectFit:'contain'},t.wp90,t.h200]}/>
            </View>
        )}
      />
    </View>
  );
}

export default HomeTeacher;
