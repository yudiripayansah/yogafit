import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Pressable, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import img from '../config/Image'
import Theimage from './Theimage';
import Helper from '../config/Helper'
import AutoHeightImage from 'react-native-auto-height-image';
function PackagesCard({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width - 40;
  const {data,boxStyle,onPress} = props
  // {uri:data ? 'https://login.yogafitidonline.com/api/storage/qrcode/'+data.referal_code+'.png': 'xxx'}
  return (
    <Pressable 
      onPress={()=>{onPress(data)}}>
      <View style={[t.relative,boxStyle]}>
        <View style={[t.fRow,t.faCenter,t.fjBetween]}>
          <Text style={[t['p12-600'],t.cgreya,t.mt10]}>Package Name</Text>
          <Text style={[t['p12-600'],t.cblack,t.mt10]}>{data && data.packages_name }</Text>
        </View>
        <View style={[t.fRow,t.faCenter,t.fjBetween]}>
          <Text style={[t['p12-600'],t.cgreya,t.mt10]}>Member Type</Text>
          <Text style={[t['p12-600'],t.cblack,t.mt10]}>{data && data.typeMember }</Text>
        </View>
        <View style={[t.fRow,t.faCenter,t.fjBetween]}>
          <Text style={[t['p12-600'],t.cgreya,t.mt10]}>Start Date</Text>
          <Text style={[t['p12-600'],t.cblack,t.mt10]}>{data && Helper.dateIndo(data.start_date) }</Text>
        </View>
        <View style={[t.fRow,t.faCenter,t.fjBetween]}>
          <Text style={[t['p12-600'],t.cgreya,t.mt10]}>End Date</Text>
          <Text style={[t['p12-600'],t.cblack,t.mt10]}>{data && Helper.dateIndo(data.end_date) }</Text>
        </View>
        <View style={[t.fRow,t.faCenter,t.fjBetween]}>
          <Text style={[t['p12-600'],t.cgreya,t.mt10]}>Total Used Session</Text>
          <Text style={[t['p12-600'],t.cblack,t.mt10]}>{data && data.totalbooking }</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default PackagesCard;
