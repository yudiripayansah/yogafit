import React, {useRef, useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {LocationContext} from '../context/LocationContext';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LocationModal from './LocationList'
function LocationSelect({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const studio = useContext(LocationContext);
  const locationRef = useRef(null);
  return (
    <>
    <LocationModal locationRef={locationRef} nav={navigation}/>
    <TouchableOpacity style={[t.wp100,t.fRow,t.fjBetween,t.faCenter,{backgroundColor:'#FAFAFA'},t.br13,t.p10]} onPress={() => {locationRef.current?.show();}}>
      <View style={[t.fRow,t.faCenter]}>
        <Image source={img.mapIcon} style={[t.w24,t.h24,{tintColor:'#F08519'}]}/>
        <View style={[t.ms10]}>
          {/* <Text style={[t['p12-400'],t.cwhite]}>Choose Your Studio</Text> */}
          <Text style={[t['h16-400'],{color: '#4A5565'}]}>{studio && studio.deptname}</Text>
        </View>
      </View>
      <Image source={img.chevronDown} style={[t.w24,t.h24]}/>
    </TouchableOpacity>
    </>
  );
}

export default LocationSelect;
