import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import img from '../config/Image'
function ClassItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle} = props
  return (
    <View style={[t.bw1,t.bsolid,t.bblack,t.p10,t.br10,t.fRow,t.faCenter,boxStyle]}>
      <View style={[t.faCenter,t.fjCenter,t.pe10]}>
        <Text style={[t['p12-600'],t.cblack,t.tCenter]}>{data.time}</Text>
        <Text style={[t['p12-600'],t.cgrey90,t.tCenter]}>{data.duration}</Text>
      </View>
      <View style={[{flex:1}]}>
        <View style={[t.fRow,t.fjBetween,t.faStart]}>
          <Text style={[t['h16-400'],t.corange]}>{data.location}</Text>
          <Text style={[t['p12-800'],(data.type == 'Hot') ? t.cdanger : t.cblack]}>{data.type}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faEnd,t.mt5]}>
          <View style={[]}>
            <Text style={[t['h18-400'],t.cskyblue]}>{data.name}</Text>
            <Text style={[t['p14-600'],t.cblack]}>{data.teacher}</Text>
          </View>
          <View style={[t.fRow,t.faCenter]}>
            <Image source={img.fire} style={[t.w20,t.h20,t.me5,{objectFit:'contain'}]}/>
            <Text style={[t['p12-400'],t.corange]}>{data.spot_left}</Text>
          </View>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faEnd,t.mt10]}>
          <TouchableOpacity>
            <Text style={[t.bggrey90,t.py5,t.px10,t.bw1,t.bblack,t.bsolid,t.br100,t.cblack,t['p12-700']]}>Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[t.bgorange,t.py5,t.px10,t.bw1,t.borange,t.bsolid,t.br100,t.cwhite,t['p12-700']]}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ClassItem;
