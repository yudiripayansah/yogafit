import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import Theimage from './Theimage'
import img from '../config/Image'
function ClassItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle,textStyle} = props
  return (
    <View style={[t.br10,t.fRow,t.fjBetween,boxStyle,t.relative,{overflow:'hidden'}]}>
      <Theimage original={{uri:data.file}} placeholder={img.placeholder} style={[t.wp100,t.br10,t.h200,{objectFit:'cover'}]}/>
      <View style={[t.absolute,t.right0,t.top0,t.wp15,t.hp100,t.fjCenter,t.faCenter]}>
        <Text style={[t['p15-700'],t.w200,t.py20,t.fjCenter,t.faCenter,t.cwhite,t.tCenter,data.textStyle,{transform: [{rotate: '270deg'}]}]}>
          {data.class_name}
        </Text>
      </View>
    </View>
  );
}

export default ClassItem;
