import React, {useContext} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/ThemeContext';
const TeacherCategory = ({navigation, ...props}) => {
  const t = useContext(ThemeContext);
  const width = Dimensions.get('window').width - 40;
  const {cat} = props
  const baseOptions = ({
                        vertical: false,
                        width: width / 4,
                        height: width / 12,
                        style: {
                          width: width,
                        },
                      });
  return (
    <View style={[{flex:1}]}>
      <Carousel
        {...baseOptions}
        loop={false}
        autoPlay={false}
        autoPlayInterval={3000}
        data={cat}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <View style={[t.pe10]}>
          <TouchableOpacity>
            <Text style={[t.bgorange,t.cwhite,t['p12-500'],t.p5,t.tCenter,t.br5]}>{cat[index]}</Text>
          </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TeacherCategory;
