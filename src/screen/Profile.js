import React, {useEffect, useContext, useState} from 'react';
import {
  View, ScrollView, StatusBar, Image, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
// components
import Theimage from '../components/Theimage'
const Profile = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const [profileimage, setprofileimage] = useState(user ? {uri: 'https://login.yogafitidonline.com/api/storage/foto/'+ user.foto} : {uri: 'https://login.yogafitidonline.com/api/storage/foto/'})
  const doLogout = () => {
    removeUser()
    navigation.navigate('Home')
  }
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[t.pt70,t.px20,t.faCenter,t.fjCenter]}>
        <Theimage original={profileimage} placeholder={img.profile} style={[t.w50,t.h50,{objectFit:'contain'}]}/>
        <Text style={[t['p18-700'],t.corange,t.mt10]}>{user && user.name}</Text>
        <Text style={[t['p18-600'],t.cblack,t.mt5]}>{user && user.email}</Text>
      </View>
      <View style={[t.px20,t.mt20]}>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.br10,t.bw1,t.bsolid,t.bblack,t.p10]}>
          <View>
            <Text style={[t['h16-400'],t.corange]}>Refer your friends</Text>
            <Text style={[t['p16-700'],t.cblack]}>{user && user.referal_code}</Text>
          </View>
          <Image source={img.share} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
      </View>
      <View style={[t.mt20,t.px20,t.faCenter,t.fjCenter]}>
        <TouchableOpacity style={[t.bgorange,t.px20,t.py10,t.br10,t.fRow,t.faCenter,t.fjBetween]}>
          <Image source={img.contact} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
          <Text style={[t['h25-400'],t.cwhite,t.ms10]}>Connect With Us</Text>
        </TouchableOpacity>
      </View>
      <View style={[t.mt20,t.px20]}>
        <TouchableOpacity onPress={() => {navigation.navigate('BookingHistory')}}>
          <Text style={[t.bgorange,t['h30-400'],t.cwhite,t.py15,t.tCenter]}>Booking History</Text>
          <View style={[t.fRow,t.faCenter,t.p10,t.fjCenter,t.bgwarning]}>
            <Image source={img.navClassActive} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
            <Text style={[t['h30-400'],t.corange,t.ms10]}>30</Text>
            <Text style={[t['p16-500'],t.cblack,t.ms10]}>Class Attended</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[t.mt20,t.px20]}>
        <View style={[t.fRow,t.faCenter,t.br10,t.bw1,t.bsolid,t.bblack,t.p10]}>
          <Image source={img.ticketOrange} style={[t.w40,t.h40,{objectFit:'contain'}]}/>
          <View style={[t.ms10]}>
            <Text style={[t['p14-500'],t.cblack]}>Current Membership</Text>
            <Text style={[t['h25-400'],t.corange]}>Unlimited 12 Months</Text>
            <View style={[t.fRow,t.faCenter,t.fjBetween,t.wp92]}>
              <View style={[t.fRow,t.faCenter]}>
                <Text style={[t['p10-600'],t.cblack]}>Start Date: </Text>
                <Text style={[t['p10-600'],t.corange]}>01-01-2024</Text>
              </View>
              <View style={[t.fRow,t.faCenter]}>
                <Text style={[t['p10-600'],t.cblack]}>End Date: </Text>
                <Text style={[t['p10-600'],t.corange]}>31-12-2024</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[t.mt20,t.btw1,t.bgreyd,t.bsolid]}>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>My Profile</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>My Detail Activity</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>Wants to be Yoga Instructor?</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>Upcoming Yoga Fit Events</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>FAQ</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>Delete Account</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]} onPress={()=>{doLogout()}}>
          <Text style={[t['p14-600'],t.corange]}>Logout</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Profile;
