import React, {useEffect, useContext} from 'react';
import {
  View, TouchableOpacity, Image, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import img from '../config/Image'
const Nav = ({navigation, ...props}) => {
  const {activeScreen} = props
  const t = useContext(ThemeContext);
  return (
    <View style={[t.fRow,t.fjBetween,t.faCenter, t.bggreye, t.px20]}>
      <View style={[t.fRow,t.fjStart,t.faCenter]}>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10, t.me30]} onPress={() => {navigation.navigate('Home')}}>
          <Image source={(activeScreen == 'Home') ? img.navHomeActive : img.navHomeInactive} style={[t.w30,t.h30]}/>
          <Text style={[t['p12-400'],t.mt3,(activeScreen == 'Home') ? t.cblack : t.grey90]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10]} onPress={() => {navigation.navigate('Class')}}>
          <Image source={(activeScreen == 'Class') ? img.navClassActive : img.navClassInactive} style={[t.w30,t.h30]}/>
          <Text style={[t['p12-400'],t.mt3,(activeScreen == 'Class') ? t.cblack : t.grey90]}>Class</Text>
        </TouchableOpacity>
      </View>
      <View>
        
      </View>
      <View style={[t.fRow,t.fjEnd,t.faCenter]}>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10, t.me30]} onPress={() => {navigation.navigate('Trainer')}}>
          <Image source={(activeScreen == 'Trainer') ? img.navTrainerActive : img.navTrainerInactive} style={[t.w30,t.h30]}/>
          <Text style={[t['p12-400'],t.mt3,(activeScreen == 'Trainer') ? t.cblack : t.grey90]}>Trainer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10]} onPress={() => {navigation.navigate('Profile')}}>
          <Image source={(activeScreen == 'Profile') ? img.navProfileActive : img.navProfileInactive} style={[t.w30,t.h30]}/>
          <Text style={[t['p12-400'],t.mt3,(activeScreen == 'Profile') ? t.cblack : t.grey90]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Nav;
