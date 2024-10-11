import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
function ClassesSelect({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {onPress,level} = props
  return (
    <TouchableOpacity style={[t.bgfreshorange,t.px10,t.py10,t.br10,t.fRow,t.faCenter,t.fjBetween]} onPress={()=>{onPress()}}>
      <View style={[t.fRow,t.faCenter]}>
        <Text style={[t['p20-600'],t.cwhite]}>{level}</Text>
      </View>
      <Image source={img.arrowDownWhite} style={[t.w30,t.h30]}/>
    </TouchableOpacity>
  );
}

export default ClassesSelect;
