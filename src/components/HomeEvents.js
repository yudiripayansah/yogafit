import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Pressable} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/ThemeContext';
import Theimage from './Theimage'
import img from '../config/Image'
function HomeEvents({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const width = Dimensions.get('window').width;
  const {events} = props
  const baseOptions = ({
      vertical: false,
      width: width / 2,
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
        data={events}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <Pressable
          onPress={()=>{navigation.navigate('Detail',{image:events[index].image,title:events[index].data.desc_event,text:events[index].data.tanggal})}}
            style={[{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },]}>
              <Theimage original={events[index].image} placeholder={img.event} style={[{objectFit:'cover'},t.wp95,t.h100]}/>
            </Pressable>
        )}
      />
    </View>
  );
}

export default HomeEvents;
