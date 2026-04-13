import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image, Linking, Alert} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import Theimage from './Theimage'
import img from '../config/Image'
import helper from '../config/Helper'
function LocationItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle,onSelectLocation,onDetailLocation,nav} = props
  function convertToInternationalFormat(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
      return '+62' + phoneNumber.slice(1);
    }
    return phoneNumber; // If it doesn't start with '0', return the number as is.
  }
  return (
    <TouchableOpacity onPress={() => {onSelectLocation(data)}} style={[t.bw1,t.bsolid,t.bgreyc,t.p15,t.br10,boxStyle]}>
      <Text style={[t['h24-600'],t.cblack]}>{data.deptname}</Text>
      {/* <Text style={[t['p14-500'],t.cblack]}>{data.alamat} | {data.distance} dari kamu</Text> */}
      <View style={[t.fRow,t.fjBetween,t.faCenter,t.mt10]}>
        <View style={[t.fRow,t.faCenter]}>
          <Image source={img.mappin} style={[t.w20,t.h20,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p14-500'],t.cgrey70]}>Jakarta</Text>
        </View>
        <View style={[t.fRow,t.faCenter]}>
          <Image source={img.clock} style={[t.w20,t.h20,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['h14-500'],t.cgrey70]}>{data.open}</Text>
        </View>
      </View>
      <View style={[t.fRow,t.fjStart,t.faCenter,t.mt10,{columnGap: 8}]}>
        <View style={[t.fRow,t.faCenter,t.py2,t.px8, t.bggreye, t.br100]}>
          <Text style={[t['h12-500'],t.cgrey70]}>Hot Yoga</Text>
        </View>
        <View style={[t.fRow,t.faCenter,t.py2,t.px8, t.bggreye, t.br100]}>
          <Text style={[t['h12-500'],t.cgrey70]}>Basic Yoga</Text>
        </View>
        <View style={[t.fRow,t.faCenter,t.py2,t.px8, t.bggreye, t.br100]}>
          <Text style={[t['h12-500'],t.cgrey70]}>Swing Yoga</Text>
        </View>
        <View style={[t.fRow,t.faCenter,t.py2,t.px8, t.br100]}>
          <Text style={[t['p12-700'],t.cgrey50,{fontStyle:'italic'}]}>30++ More</Text>
        </View>
      </View>
      <View style={[t.fRow,t.fjBetween,t.faCenter,t.mt10]}>
        <TouchableOpacity style={[t.px25,t.py5,t.bgorange,t.br5,t.fRow,t.faCenter]} onPress={()=>{helper.sendWhatsapp(`Hi Yogafit i want to know more about ${data.deptname}`,data.telp)}}>
          <Image source={img.whatsapp} style={[t.w20,t.h20,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['h12-500'],t.cwhite]}>Chat Via Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.p5,t.fRow,t.faCenter,t.wp83,t.tCenter, t.fjCenter]} onPress={()=>{onDetailLocation(data)}}>
          <Text style={[t['h12-500'],t.cgrey70, t.tCenter]}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default LocationItem;
