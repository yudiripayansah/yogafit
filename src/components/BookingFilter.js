import React, {useContext} from 'react';
import {
  View, TouchableOpacity, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import img from '../config/Image'
const BookingFilter = ({navigation, ...props}) => {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.fRow,t.faCenter,t.fjBetween]}>
      <TouchableOpacity style={[t.bsolid,t.bw1,t.borange,t.py10,t.px15,t.br100,t.fRow,t.faCenter]} onPress={()=>{navigation.navigate('Class')}}>
        <Image source={img.calendar} style={[t.w15,t.h15,t.me5]}/>
        <Text style={[t.cblack,t['p12-500']]}>By Date</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[t.bsolid,t.bw1,t.borange,t.py10,t.px15,t.br100]} onPress={()=>{navigation.navigate('Courses')}}>
        <Text style={[t.cblack,t['p12-500']]}>Normal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[t.bsolid,t.bw1,t.borange,t.py10,t.px15,t.br100]} onPress={()=>{navigation.navigate('Courses')}}>
        <Text style={[t.cblack,t['p12-500']]}>Hot Class</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingFilter;
