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
    <TouchableOpacity style={[t.wp100,t.bgwhite,t.fRow,t.fjBetween,t.faCenter,t.bgwhite,t.bw1,t.bsolid,t.bgreyd,t.br10,t.p10]} onPress={()=>{onPress()}}>
      <View style={[t.fRow,t.faCenter]}>
        <Image source={img.buildings} style={[t.w50,t.h50]}/>
        <View style={[t.ms10]}>
          <Text style={[t['p10-400'],t.cgrey90]}>Our Location</Text>
          <Text style={[t['h26-400'],t.corange]}>{studio && studio.deptname}</Text>
          <Text style={[t['p10-700'],t.black]}>{studio && studio.distance} from your location</Text>
        </View>
      </View>
      <Image source={img.arrowDown} style={[t.w30,t.h30]}/>
    </TouchableOpacity>
  );
}

export default HomeLocation;
