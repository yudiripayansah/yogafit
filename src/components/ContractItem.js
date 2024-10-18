import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Pressable} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import img from '../config/Image'
import Theimage from './Theimage';
function ContractItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {data,boxStyle,onPress} = props
  return (
    <Pressable 
      style={[t.bgwhite,t.bw5,t.bsolid,t.borange,t.p10,t.br10,t.fRow,t.fjBetween,boxStyle]}
      onPress={()=>{onPress({uri:data ? 'https://login.yogafitidonline.com/api/storage/qrcode/'+data.referal_code+'.png': 'xxx'})}}>
      <View>
        <Text style={[t['h30-400'],t.cblack]}>{data && data.name}</Text>
        <Text style={[t['p14-600'],t.cblack,t.mt10]}>{data && data.no_telp}</Text>
        <Text style={[t['p14-600'],t.cblack]}>{data && data.packages_name}</Text>
        <Text style={[t['p14-500'],t.cgrey3,t.mt10]}>Studio: {data && data.deptname}</Text>
        <Text style={[t['p14-500'],t.cgrey3]}>Exp Member: {data && data.end_date}</Text>
        <View style={[t.fRow,t.mt10]}>
        <Text style={[t['p14-600'],t.cblack]}>Status:</Text>
        <Text style={[t['p14-600'],t.ms5,data && data.status_contract ? t.cleafGreen : t.cdanger]}>{data && data.status_contract ? 'Active' : 'Non Active'}</Text>
        </View>
      </View>
      <Theimage original={{uri:data ? 'https://login.yogafitidonline.com/api/storage/qrcode/'+data.referal_code+'.png': 'xxx'}} placeholder={img.placeholder} style={[t.w50,t.h50,{objectFit:'contain'}]}/>
    </Pressable>
  );
}

export default ContractItem;
