import React, {useContext} from 'react';
import {Dimensions, Text, View, TouchableOpacity, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/ThemeContext';
const TeacherList = ({navigation, ...props}) => {
  const t = useContext(ThemeContext);
  const width = Dimensions.get('window').width;
  const {teacher} = props
  const baseOptions = ({
                        vertical: false,
                        width: width / 2,
                        height: width ,
                        style: {
                          width: width,
                        },
                      });
  return (
    <View style={[{flex:1}]}>
      <Text style={[t['p18-500'],t.cblack,t.px20,t.mb20]}>Pilih Personal Trainer Kamu!</Text>
      <View style={[]}>
      <Carousel
        {...baseOptions}
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
        data={teacher}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <TouchableOpacity>
            <View style={[t.mx10,t.bw1,t.bgreyd,t.bsolid,t.br10,t.bgwhite]}>
              <Image source={teacher[index].image} style={[t.wp100,t.hp76,{objectFit: 'contain'}]}/>
              <View style={[t.px10,t.mt5]}>
                <Text style={[t.black,t['p14-600'],t.cblack]}>{teacher[index].name}</Text>
                <Text style={[t.black,t['p10-500'],t.cblack]}>{teacher[index].cat}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
};

export default TeacherList;
