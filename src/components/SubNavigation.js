import React, {useContext} from 'react';
import {
  View, TouchableOpacity, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
const SubNavigation = ({navigation, ...props}) => {
  const t = useContext(ThemeContext);
  const {activeScreen} = props
  return (
    <View style={[t.px20,t.mt10,t.fRow,t.faCenter,t.fjBetween]}>
      <TouchableOpacity style={[t.tCenter,t.py15,t.faCenter,t.wp50,t.bbw1,t.bsolid,activeScreen == 'Class' ? t.borange : t.bwhite]} onPress={()=>{navigation.navigate('Class')}}>
        <Text style={[activeScreen == 'Class' ? t.cblack : t.cgrey90,t['h16-400']]}>Classes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[t.tCenter,t.py15,t.faCenter,t.wp50,t.bbw1,t.bsolid,activeScreen == 'Experiences' ? t.borange : t.bwhite]} onPress={()=>{navigation.navigate('Courses')}}>
        <Text style={[activeScreen == 'Experiences' ? t.cblack : t.cgrey90,t['h16-400']]}>Experiences</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=>{navigation.navigate('Workshop')}}>
        <Text style={[t.corange,t['p14-600']]}>Workshop</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={()=>{navigation.navigate('Events')}}>
        <Text style={[t.corange,t['p14-600']]}>Events</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SubNavigation;
