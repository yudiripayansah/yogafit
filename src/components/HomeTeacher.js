import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/ThemeContext';
import Theimage from './Theimage'
import img from '../config/Image'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
function HomeTeacher({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const width = Dimensions.get('window').width;
  const {teacher} = props
  const baseOptions = ({
                        vertical: false,
                        width: width / 4,
                        height: width / 3.5,
                        style: {
                          width: width
                        },
                      });
  return (
    <View style={{flex: 1}}>
      <Carousel
        {...baseOptions}
        loop
        autoPlay={true}
        autoPlayInterval={3000}
        data={teacher}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <Pressable 
            onPress={()=>{navigation.navigate('Detail',{image:teacher[index].image,title:teacher[index].name,text:teacher[index].text})}}
            style={[{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            },]}>
              <Theimage original={teacher[index].image} placeholder={img.teacher} style={[{objectFit:'cover'},t.wp90,t.h200]}/>
          </Pressable>
        )}
      />
    </View>
  );
}

export default HomeTeacher;
