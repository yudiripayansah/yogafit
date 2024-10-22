import React, {useEffect, useContext, useState} from 'react';
import {
  View, ScrollView, StatusBar, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image'
// components
import Theimage from '../components/Theimage'
import Helper from '../config/Helper'
const MyProfile = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const profileimage = user ? {uri: 'https://login.yogafitidonline.com/api/storage/foto/'+ user.foto} : {uri: 'https://login.yogafitidonline.com/api/storage/foto/'}
  useEffect(() => {
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[t.pt50,t.px20,t.faCenter,t.fjCenter]}>
        <Theimage original={profileimage} placeholder={img.profile} style={[t.w150,t.h150,{objectFit:'contain'}]}/>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.greya]}>Name</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.name}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.greya]}>Email</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.email}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.greya]}>Phone</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.no_telp}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.greya]}>Gender</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.gender}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.greya]}>Marital status</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.marital}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.greya]}>Date of birth</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && Helper.dateIndo(user.date_birth)}</Text>
        </View>
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default MyProfile;
