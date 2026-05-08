import React, {useEffect,useState, useContext, useRef} from 'react';
import {Dimensions, Text, View, Image, Pressable} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/ThemeContext';
import Theimage from './Theimage'
import img from '../config/Image'
function HomeCarousel({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const width = Dimensions.get('window').width;
  const {images} = props
  return (
    <View style={[{flex: 1},t.relative]}>
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={width / 1.7}
        autoPlay={true}
        autoPlayInterval={3000}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
              <Theimage original={images[index]} placeholder={img.banner1} style={[{objectFit:'cover'},t.wp100,t.hp100]} />
              <View style={[t.absolute,{top:0,left:0,right:0,bottom:0},t.bgblack,{opacity:.2}]}></View>
              <View style={[t.absolute,{top:0,left:0,right:0,bottom:0},t.fjCenter,t.p20]}>
                <Text style={[t['p23-700'],{color:'#FF7133'}]}>Find Your Balance</Text>
                <Text style={[t['p23-700'],{color: '#314B3E'}]}>in Every Move</Text>
                <Text style={[t['p10-400'],t.w225]}>Join Yoga Fit and discover a calm, mindful journey wherever you are.</Text>
              </View>
            </View>
        )}
      />
      <View style={[t.absolute,t.bottom16,t.left20,t.fRow,{columnGap: 6,zIndex:99}]}>
        {images.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => {
              carouselRef.current?.scrollTo({
                index,
                animated: true,
              });
              setActiveIndex(index);
            }}
          >
            <View
              key={index}
              style={[
                t.h6,t.br100,
                activeIndex === index ? {backgroundColor: '#456A58'} : {backgroundColor:'#BABABA80'},
                activeIndex === index ? t.w24 : t.w6
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default HomeCarousel;
