import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Pressable} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import img from '../config/Image'
import Theimage from './Theimage';
import Helper from '../config/Helper'
function ContractItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle,onPress} = props
  return (
    <Pressable 
      onPress={()=>{onPress({uri:data ? 'https://login.yogafitidonline.com/api/storage/qrcode/'+data.referal_code+'.png': 'xxx'})}}>
      <Text style={[t['h30-400'],t.corange,t.pb10,t.bbw1,t.bsolid,t.bgreyd]}>{data && data.name}</Text>
      <View style={[t.fRow,t.fjBetween,t.faStart,t.mt10]}>
        <View style={[]}>
          <Text style={[t['p14-600'],t.cgreya]}>Class Name</Text>
          <Text style={[t['p14-600'],t.cblack]}>{data && data.class_name}</Text>
          <Text style={[t['p14-600'],t.cgreya,t.mt10]}>Tanggal Booking</Text>
          <Text style={[t['p14-600'],t.cblack]}>{data && Helper.dateIndo(data.tgl_schedule)}</Text>
          <Text style={[t['p14-600'],t.cgreya,t.mt10]}>Time</Text>
          <Text style={[t['p14-600'],t.cblack]}>{data && data.start_time} -  {data && data.end_time}</Text>
          <Text style={[t['p14-600'],t.cgreya,t.mt10]}>Teacher</Text>
          <Text style={[t['p14-600'],t.cblack]}>{data && data.teacher}</Text>
          <Text style={[t['p14-600'],t.cgreya,t.mt10]}>Studio</Text>
          <Text style={[t['p14-600'],t.cblack]}>{data && data.deptname}</Text>
        </View>
        <View style={[t.px10,t.py5,t.bgorange,t.br5]}>
          <Text style={[t['p10-500'],t.cwhite,t.tCenter,t.mb5]}>Scan QR</Text>
          <Theimage original={{uri:data ? 'https://login.yogafitidonline.com/api/storage/qrcode/'+data.referal_code+'.png': 'xxx'}} placeholder={img.placeholder} style={[t.w80,t.h80,{objectFit:'contain'}]}/>
          <Text style={[t['p10-500'],t.cwhite,t.tCenter,t.mt5]}>Klik Disini</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ContractItem;
