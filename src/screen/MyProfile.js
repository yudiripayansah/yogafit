import React, {useEffect, useContext, useState} from 'react';
import {
  View, ScrollView, StatusBar, Text, TextInput, Pressable, Image, TouchableOpacity
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image'
// components
import Theimage from '../components/Theimage'
import Helper from '../config/Helper'
import Api from '../config/Api'
const MyProfile = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [loading,setloading] = useState(false)
  const [shownew_password, setshownew_password] = useState(false)
  const [showconfirmasi_password, setshowconfirmasi_password] = useState(false)
  const [new_password,setnew_password] = useState()
  const [confirmasi_password,setconfirmasi_password] = useState()
  const profileimage = user ? {uri: 'https://login.yogafitidonline.com/api/storage/foto/'+ user.foto} : {uri: 'https://login.yogafitidonline.com/api/storage/foto/'}
  const [cp, setCp] = useState({
    status: true,
    msg: null,
    data: null
  })
  const doChangePassword = async () => {
    setloading(true)
    try {
      let payload = {
        new_password: new_password,
        confirmasi_password: confirmasi_password
      }
      let req = await Api.changePassword(payload,user.token)
      if(req.status === 200 || req.status === 201){
        setCp({
          status: true,
          msg: 'Password changed successfully'
        })
      } else {
        setCp({
          status: false,
          msg: 'Failed to change password'
        })
        console.error("Error change password")
      }
      setloading(false)
      setTimeout(()=>{
        setCp({
          status: true,
          msg: null,
          data: null
        })
      },2000)
    } catch (error) {
      console.error(error)
      setloading(false)
      setCp({
        status: false,
        msg: 'Failed to change password '+error
      })
      setTimeout(()=>{
        setCp({
          status: true,
          msg: null,
          data: null
        })
      },2000)
    }
  }
  useEffect(() => {
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[t.pt50,t.px20,t.faCenter,t.fjCenter]}>
        <Theimage original={profileimage} placeholder={img.profile} style={[t.w150,t.h150,{objectFit:'contain'}]}/>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.cgreya]}>Name</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.name}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.cgreya]}>Email</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.email}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.cgreya]}>Phone</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.no_telp}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.cgreya]}>Gender</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.gender}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.cgreya]}>Marital status</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && user.marital}</Text>
        </View>
        <View style={[t.fRow,t.fjBetween,t.faCenter,t.py10,t.bbw1,t.bsolid,t.bgreye, t.wp100]}>
          <Text style={[t['p14-700'],t.cgreya]}>Date of birth</Text>
          <Text style={[t['p14-700'],t.cblack]}>{user && Helper.dateIndo(user.date_birth)}</Text>
        </View>
        <Text style={[t['p20-700'],t.cblack,t.mt50]}>Change Password</Text>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'],t.cblack]}>New Password</Text>
          <View style={[t.fRow,t.fjBetween,t.faCenter,t.wp100,t.relative]}>
            <TextInput onChangeText={setnew_password} value={new_password} placeholderTextColor='#ccc' placeholder='Enter your new password' style={[t.bggrey90,t.p10,t['p14-500'],t.br5,t.cwhite,t.mt10, t.wp100]} secureTextEntry={shownew_password ? false : true}/>
            <Pressable style={[t.absolute,t.right10,t.top25]} onPress={()=>{setshownew_password(!shownew_password)}}>
              <Image source={shownew_password ? img.eyeopen : img.eyeclose} style={[t.w20,t.h20]}/>
            </Pressable>
          </View>
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'],t.cblack]}>Confirm Password</Text>
          <View style={[t.fRow,t.fjBetween,t.faCenter,t.wp100,t.relative]}>
            <TextInput onChangeText={setconfirmasi_password} value={confirmasi_password} placeholderTextColor='#ccc' placeholder='Rernter your new password' style={[t.bggrey90,t.p10,t['p14-500'],t.br5,t.cwhite,t.mt10, t.wp100]} secureTextEntry={showconfirmasi_password ? false : true}/>
            <Pressable style={[t.absolute,t.right10,t.top25]} onPress={()=>{setshowconfirmasi_password(!showconfirmasi_password)}}>
              <Image source={showconfirmasi_password ? img.eyeopen : img.eyeclose} style={[t.w20,t.h20]}/>
            </Pressable>
          </View>
        </View>
        <View style={[t.mt20]}>
          <TouchableOpacity style={[t.mxAuto,t.bgorange,t.faCenter,t.fjCenter,t.px50,t.py10,t.br5]} onPress={() => {doChangePassword()}}>
            <Text style={[t['p14-700'],t.cblack]}>{loading ? 'Processing...' : 'Change Password'}</Text>
          </TouchableOpacity>
          <View style={[t.faCenter,t.fjCenter,t.mt5]}>
            <Text style={[t['p12-500'],cp.status ? t.cblack : t.cdanger,t.tCenter]}>{cp.msg}</Text>
          </View>
        </View>
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default MyProfile;
