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
    <LocationModal locationRef={locationRef}/>
    <TouchableOpacity style={[t.bgorange,t.px10,t.py10,t.br10,t.fRow,t.faCenter,t.fjBetween]} onPress={() => {locationRef.current?.show();}}>
      <View style={[t.fRow,t.faCenter]}>
        <Image source={img.mappoint} style={[t.w40,t.h40]}/>
        <View style={[t.ms10]}>
          <Text style={[t['p12-400'],t.cwhite]}>Choose Your Studio</Text>
          <Text style={[t['h24-400'],t.cwhite]}>{studio.deptname}</Text>
        </View>
      </View>
      <Image source={img.arrowDownWhite} style={[t.w30,t.h30]}/>
    </TouchableOpacity>
    </>
  );
}

export default LocationSelect;
