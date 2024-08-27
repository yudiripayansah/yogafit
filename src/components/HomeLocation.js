import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import img from '../config/Image'
function HomeCarousel({navigation, ...props}) {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.wp100,t.bgwhite,t.fRow,t.fjBetween,t.faCenter,t.bgwhite,t.bw1,t.bsolid,t.bgreyd,t.br10,t.p10]}>
      <View style={[t.fRow,t.faCenter]}>
        <Image source={img.buildings} style={[t.w50,t.h50]}/>
        <View style={[t.ms10]}>
          <Text style={[t['p10-400'],t.cgrey90]}>Our Location</Text>
          <Text style={[t['h26-400'],t.corange]}>Yoga Fit Indonesia</Text>
          <Text style={[t['p10-700'],t.black]}>3 Km from your location</Text>
        </View>
      </View>
      <Image source={img.arrowDown} style={[t.w30,t.h30]}/>
    </View>
  );
}

export default HomeCarousel;
