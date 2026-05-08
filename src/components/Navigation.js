import React, {useEffect, useContext, useRef} from 'react';
import {
  View, TouchableOpacity, Image, Text, ImageBackground
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import img from '../config/Image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const Nav = ({navigation, ...props}) => {
  const {activeScreen, onPressMainBtn} = props
  const user = useContext(UserContext);
  const t = useContext(ThemeContext);
  const hiddenOn = ['DetailClassNew','DetailCourseNew','DetailWorkshopNew' , 'Intro' , 'LoginRegister' , 'Login' , 'Register', 'DetailClassCheckin','DetailEventNew','BookingConfirmation','LeaveFeedback','StudioDetail','InstructorDetail','DetailArticle','Rebook','ScanQr','EditProfile','MyActivity','BecomeInstructor','FaqNew','MembershipInfo','MembershipPrevilage','CheckinConfirmation','TrialClass','ChoosePlan','OfferDetails']
  const elNav = (
    <View style={[t.fRow,t.fjBetween,t.faCenter,t.absolute,t.bottom0,t.left0,t.wp100,t.right0, t.bgwhite]}>
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.15)']}
        style={{
          position: 'absolute',
          top: -20,
          left: 0,
          right: 0,
          height: 20,
        }}
      />
      <View style={[t.fRow,t.fjStart,t.faCenter,t.wp35,t.ps15]}>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10, t.me15]} onPress={() => {navigation.navigate('Home')}}>
          <Image source={(activeScreen == 'Home') ? img.navHomeActive : img.navHomeInactive} style={[t.w30,t.h30,(activeScreen == 'Home') ? {tintColor:'#F08519'} : {tintColor:'#666'}]}/>
          <Text style={[t['h12-400'],t.mt3,(activeScreen == 'Home') ? t.corange : t.cgrey60]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10]} onPress={() => {navigation.navigate('Class')}}>
          <Image source={(activeScreen == 'Class') ? img.navClassActive : img.navClassInactive} style={[t.w30,t.h30,(activeScreen == 'Class') ? {tintColor:'#F08519'} : {tintColor:'#666'}]}/>
          <Text style={[t['h12-400'],t.mt3,(activeScreen == 'Class') ? t.corange : t.cgrey60]}>Practice</Text>
        </TouchableOpacity>
      </View>
      <View style={[t.faCenter,t.fjCenter,t.relative]}>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.absolute,{top:-65}]} activeOpacity={.9} onPress={()=>{navigation.navigate('ScanQr')}}>
          <View style={[t.faCenter,t.fjCenter,t.w67,t.h67,t.br100,t.bgorange, t.bw3,t.bsolid,t.bgreye,{overflow:'hidden'}]}>
            <Image source={img.scan} style={[t.w45,t.h45,{objectFit:'contain'}]}/>
          </View>
          <Text style={[t['h12-400'],t.mt5,t.cgrey60]}>Scan</Text>
        </TouchableOpacity>
      </View>
      <View style={[t.fRow,t.fjEnd,t.faCenter,t.wp35,t.pe15]}>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10, t.me15]} onPress={() => {user ? navigation.navigate('Booking') : onPressMainBtn() }}>
          <Image source={(activeScreen == 'Booking') ? img.navTrainerActive : img.navTrainerInactive} style={[t.w30,t.h30,(activeScreen == 'Booking') ? {tintColor:'#F08519'} : {tintColor:'#666'}]}/>
          <Text style={[t['h12-400'],t.mt3,(activeScreen == 'Booking') ? t.corange : t.cgrey60]}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[t.faCenter,t.fjCenter,t.px10, t.py10]} onPress={() => {user ? navigation.navigate('ProfileNew') : onPressMainBtn()}}>
          <Image source={(activeScreen == 'ProfileNew') ? img.navProfileActive : img.navProfileInactive} style={[t.w30,t.h30,(activeScreen == 'ProfileNew') ? {tintColor:'#F08519'} : {tintColor:'#666'}]}/>
          <Text style={[t['h12-400'],t.mt3,(activeScreen == 'ProfileNew') ? t.corange : t.cgrey60]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  return hiddenOn.includes(activeScreen) ? null : elNav;
};

export default Nav;
