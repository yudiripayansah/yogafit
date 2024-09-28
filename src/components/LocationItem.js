import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image, Linking, Alert} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import img from '../config/Image'
function LocationItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle} = props
  function convertToInternationalFormat(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
      return '+62' + phoneNumber.slice(1);
    }
    return phoneNumber; // If it doesn't start with '0', return the number as is.
  }
  const sendWhatsAppMessage = (number) => {
    const phoneNumber = convertToInternationalFormat(number); // WhatsApp number with country code
    const message = 'Hi Yogafit!'; // Optional: pre-defined message
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed');
        }
      })
      .catch((err) => console.error('Error occurred', err));
  };
  return (
    <View style={[t.bw1,t.bsolid,t.bgreyc,t.p15,t.br10,boxStyle]}>
      <Text style={[t['h30-400'],t.cblack]}>{data.deptname}</Text>
      <Text style={[t['p14-500'],t.cblack]}>{data.alamat} | {data.distance} dari kamu</Text>
      <View style={[t.fRow,t.faCenter,t.mt10]}>
        <Image source={img.star} style={[t.w15,t.h15,t.me5,{objectFit:'contain'}]}/>
        <Text style={[t['p14-500'],t.cblack]}>{data.rating}|5 ({data.ratingCount})</Text>
      </View>
      <Image source={data.image} style={[t.wp100,t.h200,t.mt10,t.br5,{objectFit:'cover'}]}/>
      <View style={[t.fRow,t.fjBetween,t.faCenter,t.mt10]}>
        <View style={[t.p5,t.bggreyd,t.br5,t.fRow,t.faCenter]}>
          <Image source={img.signal} style={[t.w10,t.h10,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p8-500'],t.cgrey70]}>{data.freq}</Text>
        </View>
        <View style={[t.p5,t.bggreyd,t.br5,t.fRow,t.faCenter]}>
          <Image source={img.time} style={[t.w10,t.h10,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p8-500'],t.cgrey70]}>{data.open}</Text>
        </View>
        <TouchableOpacity style={[t.p5,t.bggreyd,t.br5,t.fRow,t.faCenter]} onPress={()=>{sendWhatsAppMessage(data.telp)}}>
          <Image source={img.whatsapp} style={[t.w10,t.h10,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p8-500'],t.cgrey70]}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.p5,t.bggreyd,t.br5,t.fRow,t.faCenter]}>
          <Image source={img.edit} style={[t.w10,t.h10,t.me5,{objectFit:'contain'}]}/>
          <Text style={[t['p8-500'],t.cgrey70]}>More Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LocationItem;
