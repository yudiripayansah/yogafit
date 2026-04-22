import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, ActivityIndicator} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Helper from '../config/Helper'// assets
import img from '../config/Image';
import Theimage from './Theimage';
function ClassItem({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {onBookPress,onDetailPress,data,boxStyle,hidebtn,loading} = props
  return (
    <TouchableOpacity style={[t.bw1,t.bsolid,t.bgreye,t.br14,{overflow:'hidden'},boxStyle]} onPress={()=>{onDetailPress(data, navigation)}}>
      <View style={[t.faCenter,t.fjCenter]}>
        <Theimage
          original={data.gambar}
          placeholder={img.classimage}
          style={{
            width: '100%',
          }}
        />
        <Text style={[t['p10-400'],t.py2,t.px8,t.br100,t.absolute,t.top12,t.left12,{color:'#DA7917', backgroundColor:'#FEF3E8'}]}>{data.capacity - data.status_booking} Spots Left</Text>
      </View>
      <View style={[{flex:1},t.p12]}>
        <View style={[t.fRow,t.fjStart,t.faStart,{columnGap:5}]}>
          <Text style={[t['h12-400'],t.py2,t.px8,t.br100,{color:'#007D2F', backgroundColor:'#D5FFD5'}]}>{data.class_level}</Text>
          <Text style={[t['h12-400'],t.py2,t.px8,t.br100,{color:'#007D2F', backgroundColor:'#ECF0EE'},(data.class_kat == 'Hot') ? t.cdanger : {color:'#3F6050'}]}>{data.class_kat}</Text>
        </View>
        <Text style={[t['h14-400'],t.cblack,t.mt4]}>{data.class_name}</Text>
        <Text style={[t['h12-400'],t.cgrey30]}>{data.name}</Text>
        <Text style={[t['h12-500'],{color:'#456A58'}]}>{data.open}</Text>
        {!hidebtn ? (
          <TouchableOpacity onPress={()=>{onBookPress(data)}} style={[t.bgorange,t.py7,t.px10,t.bw1,t.borange,t.bsolid,t.br7,t.faCenter,t.mt12]}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ): (
            <Text style={[t.cwhite,t['h12-400']]}>Book Now</Text>
            )}
          </TouchableOpacity>
        ): (
          <Text style={[t['p12-700'],t.cblack,t.mt5]}>{Helper.dateIndo(data.tgl_schedule)}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ClassItem;
