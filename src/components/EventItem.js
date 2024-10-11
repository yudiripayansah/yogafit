import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Theimage from './Theimage'
import img from '../config/Image'
function ClassItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle} = props
  return (
    <View style={[t.br10,t.relative,{overflow:'hidden'},boxStyle]}>
      <Theimage original={{uri:data.gambar}} placeholder={img.event} style={[t.wp100,t.h200,t.br10,{objectFit:'cover'}]}/>
      <View style={[t.absolute,{backgroundColor:'rgba(0,0,0,.4)'},t.wp100,t.hp100,t.left0,t.top0,t.bottom0]}></View>
      <View style={[t.fRow,t.fjBetween,t.faCenter,t.mt10,t.absolute,t.bottom0,t.left0,t.wp100,t.p10]}>
        <View style={[t.pe20]}>
          <Text style={[t['p18-700'],t.cwhite]}>{data.desc_event}</Text>
          <Text style={[t['p12-600'],t.cwhite]}>{data.tanggal}</Text>
        </View>
        <TouchableOpacity>
          <Text style={[t.bgorange,t.py5,t.px10,t.bw1,t.borange,t.bsolid,t.br100,t.cwhite,t['p12-700']]}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ClassItem;
