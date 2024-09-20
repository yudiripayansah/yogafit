import React, {useContext} from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
const SubNavigation = ({navigation, ...props}) => {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.pt20,t.bggreye,t.pb20,,t.px20,t.fRow,t.faCenter,t.fjBetween]}>
      <TouchableOpacity onPress={()=>{navigation.navigate('Class')}}>
        <Text style={[t.corange,t['p14-600']]}>Classes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('Courses')}}>
        <Text style={[t.corange,t['p14-600']]}>Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('Workshop')}}>
        <Text style={[t.corange,t['p14-600']]}>Workshop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('Events')}}>
        <Text style={[t.corange,t['p14-600']]}>Events</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubNavigation;
