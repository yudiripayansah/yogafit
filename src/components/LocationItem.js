import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import img from '../config/Image'
function LocationItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle} = props
  return (
    <View style={[t.bw1,t.bsolid,t.bgreyc,t.p15,t.br10,boxStyle]}>
      <Text style={[t['h30-400'],t.cblack]}>{data.name}</Text>
      <Text style={[t['p14-500'],t.cblack]}>{data.location} | {data.distance} dari kamu</Text>
      <View style={[t.fRow,t.faCenter,t.mt10]}>
        <Image source={img.star} style={[t.w15,t.h15,t.me5,{objectFit:'contain'}]}/>
        <Text style={[t['p14-500'],t.cblack]}>{data.rating}|5 ({data.ratingCount})</Text>
      </View>
      <Image source={data.image} style={[t.wp100,t.h200,t.mt10,t.br5,{objectFit:'cover'}]}/>
      <View style={[t.fRow,t.fjBetween,t.faCenter,t.mt10]}>
        <View style={[t.p5,t.bggreyd,t.br5,t.fRow,t.faCenter]}>
          <Image source={img.signal} style={[t.w10,t.h10,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p10-500'],t.cgrey70]}>{data.freq}</Text>
        </View>
        <View style={[t.p5,t.bggreyd,t.br5,t.fRow,t.faCenter]}>
          <Image source={img.time} style={[t.w10,t.h10,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p10-500'],t.cgrey70]}>{data.time}</Text>
        </View>
        <TouchableOpacity style={[t.p5,t.bggreyd,t.br5,t.fRow,t.faCenter]}>
          <Image source={img.whatsapp} style={[t.w10,t.h10,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p10-500'],t.cgrey70]}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.p5,t.bggreyd,t.br5,t.fRow,t.faCenter]}>
          <Image source={img.edit} style={[t.w10,t.h10,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p10-500'],t.cgrey70]}>More Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LocationItem;
