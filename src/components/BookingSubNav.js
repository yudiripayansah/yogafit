import React, {useContext} from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
const BookingSubNav = ({navigation, ...props}) => {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.pt20,t.pb20,t.fRow,t.faCenter,t.fjBetween]}>
    <TouchableOpacity onPress={()=>{navigation.navigate('BookingHistory')}}>
      <Text style={[t.cblack,t['p16-600']]}>History</Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('BookingUpcoming')}}>
        <Text style={[t.cblack,t['p16-600']]}>Upcoming</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingSubNav;
