import React, {useContext} from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
const SubNavigation = ({navigation, ...props}) => {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.pt20,t.bggreye,t.pb20,,t.px20,t.fRow,t.faCenter,t.fjBetween]}>
      <TouchableOpacity>
        <Text style={[t.corange,t['p14-600']]}>Classes</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[t.corange,t['p14-600']]}>Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[t.corange,t['p14-600']]}>Workshop</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[t.corange,t['p14-600']]}>Retreat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubNavigation;
