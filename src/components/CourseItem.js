import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import img from '../config/Image'
function CourseItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle} = props
  return (
    <View style={[t.bw1,t.bsolid,t.bblack,t.p10,t.br10,t.fRow,t.faCenter,boxStyle]}>
      <View style={[t.faCenter,t.fjCenter,t.pe20,t.wp20]}>
        <Text style={[t['p12-600'],t.cblack,t.tCenter]}>{data.tanggal}</Text>
      </View>
      <View style={[{flex:1}]}>
        <Text style={[t['h20-400'],t.corange]}>{data.course}</Text>
        <Text style={[t['p12-400'],t.greya]}>{data.studio}</Text>
        <Text style={[t['p13-600'],t.cblack,t.mt10]}>{data.durasi}</Text>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.mt5]}>
          <Text style={[t['p12-600'],t.cblack]}>with {data.teacher}</Text>
          <TouchableOpacity>
            <Text style={[t.bgorange,t.py3,t.px10,t.bw1,t.borange,t.bsolid,t.br100,t.cwhite,t['p12-700']]}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CourseItem;
