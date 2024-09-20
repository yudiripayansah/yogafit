import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
function LocationSelect({navigation, ...props}) {
  const t = useContext(ThemeContext);
  return (
    <TouchableOpacity style={[t.bgorange,t.px10,t.py10,t.br10,t.fRow,t.faCenter,t.fjBetween]} onPress={()=>{navigation.navigate('Location')}}>
      <View style={[t.fRow,t.faCenter]}>
        <Image source={img.mappoint} style={[t.w40,t.h40]}/>
        <View style={[t.ms10]}>
          <Text style={[t['p12-400'],t.cwhite]}>Choose Your Studio</Text>
          <Text style={[t['h24-400'],t.cwhite]}>Yoga Fit Indonesia</Text>
        </View>
      </View>
      <Image source={img.arrowDownWhite} style={[t.w30,t.h30]}/>
    </TouchableOpacity>
  );
}

export default LocationSelect;
