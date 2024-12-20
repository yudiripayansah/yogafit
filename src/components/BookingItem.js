import React, {useContext} from 'react';
import {
  View, TouchableOpacity, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import img from '../config/Image'
import Helper from '../config/Helper'
const BookingItem = ({navigation, ...props}) => {
  const t = useContext(ThemeContext);
  const {data,boxStyle} = props
  return (
    <View style={[t.fRow,t.faCenter,t.fjBetween,t.bsolid,t.bw1,t.bgreya,t.p10,t.br10,boxStyle]}>
      <View style={[t.wp48,t.faStart]}>
        <Text style={[t['p12-600'],t.mt5,t.corange]}>{data.deptname}</Text>
        <Text style={[t['p12-500'],t.mt5,t.cgrey30]}>{data.class_name}</Text>
        <Text style={[t['h20-400'],t.mt5,t.cblack]}>{data.name}</Text>
        {/* <TouchableOpacity style={[t.bw1,t.bsolid,t.bblack,t.br100,t.mt5,t.py3,t.px10,{display:'inline-block',width:'auto'}]} onPress={()=>{navigation.navigate('DetailClass',{theClass:data})}}>
            <Text style={[t['p10-700'],t.cblack]}>Detail Class</Text>
        </TouchableOpacity> */}
      </View>
      <View style={[t.faEnd,t.wp48]}>
        <Text style={[t['p12-600'],t.mt5,t.corange]}>{data.class_kat}</Text>
        <Text style={[t['p10-700'],t.mt5,t.cblack]}>{Helper.dateFormatId(data.start_date)} - {Helper.dateFormatId(data.end_date)}</Text>
        <Text style={[t['p10-700'],t.mt5,t.cblack]}>{data.start_time} - {data.end_time}</Text>
        {data.status_shedule == 1 && (
        <Text style={[t['h20-400'],t.mt5,t.cleafGreen]}>{data.attendance}</Text>
        )}
        {data.status_booking == 0 && (
          <TouchableOpacity style={[t.bw1,t.bsolid,t.bdanger,t.br100,t.mt5,t.bgdanger,t.py3,t.px10,{display:'inline-block',width:'auto'}]}>
             <Text style={[t['p10-700'],t.cwhite]}>Cancel Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BookingItem;
