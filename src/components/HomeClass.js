import React, {useEffect, useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
function HomeClass({navigation, ...props}) {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.wp100,t.fRow,t.fjBetween,t.faCenter]}>
      <View style={[t.fRow,t.wp45,t.faCenter,t.br10,t.bw1,t.bsolid,t.bgreyd,t.bgwhite,t.p10]}>
        <TouchableOpacity style={[t.fRow]}>
          <Image style={[t.w40,t.h40,t.me10]} source={img.yogaRed}/>
          <Text style={[{textWrap: 'break-word'},t['h18-400'],t.cblack,t.wp60]}>Normal Yoga Class</Text>
        </TouchableOpacity>
      </View>
      <View style={[t.fRow,t.wp45,t.faCenter,t.br10,t.bw1,t.bsolid,t.bgreyd,t.bgwhite,t.p10]}>
        <TouchableOpacity style={[t.fRow]}>
          <Image style={[t.w40,t.h40,t.me10]} source={img.yogaHot}/>
          <Text style={[{textWrap: 'break-word'},t['h18-400'],t.cblack,t.wp60]}>Hot Yoga Class</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeClass;
