import React, {useEffect, useContext, useRef} from 'react';
import {
  View, TouchableOpacity, Image, Text, ImageBackground
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import img from '../config/Image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const Nav = ({navigation, ...props}) => {
  const {activeScreen, onPressMainBtn} = props
  const user = useContext(UserContext);
  const t = useContext(ThemeContext);
  return (
    <ImageBackground resizeMode="cover" source={img.navigation} style={[t.fRow,t.fjBetween,t.faCenter,t.absolute,t.bottom0,t.left0,t.wp100,t.right0, {backgroundPosition: 'center center', backgroundSize: '100% 50px'},]}>
      <View style={[t.fRow,t.fjStart,t.faCenter,t.wp35,t.ps15]}>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10, t.me15]} onPress={() => {navigation.navigate('Home')}}>
          <Image source={(activeScreen == 'Home') ? img.navHomeActive : img.navHomeInactive} style={[t.w30,t.h30]}/>
          <Text style={[t['p12-500'],t.mt3,(activeScreen == 'Home') ? t.cblack : t.cgrey10]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10]} onPress={() => {navigation.navigate('Class')}}>
          <Image source={(activeScreen == 'Class') ? img.navClassActive : img.navClassInactive} style={[t.w30,t.h30]}/>
          <Text style={[t['p12-500'],t.mt3,(activeScreen == 'Class') ? t.cblack : t.cgrey10]}>Class</Text>
        </TouchableOpacity>
      </View>
      <View style={[t.faCenter,t.fjCenter,t.relative]}>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.absolute,{top:-65}]} activeOpacity={.9} onPress={()=>{user ? navigation.navigate('MyContract') : onPressMainBtn()}}>
          <View style={[t.faCenter,t.fjCenter,t.w67,t.h67,t.br100,t.bgorange, t.bw3,t.bsolid,t.bgreye,{overflow:'hidden'}]}>
            <Image source={img.logo} style={[t.w45,t.h45,{objectFit:'contain'}]}/>
          </View>
          <Text style={[t['p12-700'],t.mt12,t.cblack]}>{user ? 'My Contract' :'Join Now'}</Text>
        </TouchableOpacity>
      </View>
      <View style={[t.fRow,t.fjEnd,t.faCenter,t.wp35,t.pe15]}>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10, t.me15]} onPress={() => {navigation.navigate('Trainer')}}>
          <Image source={(activeScreen == 'Trainer') ? img.navTrainerActive : img.navTrainerInactive} style={[t.w30,t.h30]}/>
          <Text style={[t['p12-500'],t.mt3,(activeScreen == 'Trainer') ? t.cblack : t.cgrey10]}>Trainer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10]} onPress={() => {user ? navigation.navigate('Profile') : onPressMainBtn()}}>
          <Image source={(activeScreen == 'Profile') ? img.navProfileActive : img.navProfileInactive} style={[t.w30,t.h30]}/>
          <Text style={[t['p12-500'],t.mt3,(activeScreen == 'Profile') ? t.cblack : t.cgrey10]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Nav;
