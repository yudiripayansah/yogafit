import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {LocationContext} from '../context/LocationContext';
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
function HomeLocation({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const studio = useContext(LocationContext);
  let {onPress} = props
  return (
    <TouchableOpacity style={[t.wp100,t.fRow,t.fjBetween,t.faCenter,{backgroundColor:'#FAFAFA'},t.br13,t.p10]} onPress={()=>{onPress()}}>
      <View style={[t.fRow,t.faCenter]}>
        <Image source={img.mapIcon} style={[t.w24,t.h24,{tintColor:'#F08519'}]}/>
        <View style={[t.ms10]}>
          {/* <Text style={[t['p10-400'],t.cgrey90]}>Our Location</Text> */}
          <Text style={[t['h16-400'],{color: '#4A5565'}]}>{studio && studio.deptname}</Text>
          {/* <Text style={[t['p10-700'],t.black]}>{studio && studio.distance} from your location</Text> */}
        </View>
      </View>
      <Image source={img.chevronDown} style={[t.w24,t.h24]}/>
    </TouchableOpacity>
  );
}

export default HomeLocation;
