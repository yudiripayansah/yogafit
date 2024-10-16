import React, {useEffect, useContext, useRef, useState } from 'react';
import {Dimensions, Text, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
// API
import Api from '../config/Api'
function Verify({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {verifyRef, loginRef,registerdata} = props
  const [otp,setotp] = useState()
  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState({
    status: true,
    msg: null,
    data: null
  })
  const doVerify = async () => {
    setLoading(true)
    try {
      let payload = {
        id: registerdata.id,
        otp: otp
      }
      if(payload.id && payload.otp) {
        let req = await Api.cekotp(payload)
        if(req.status === 200 || req.status === 201){
          if(req.data.data != "Wrong otp code") {
            setRegister({
              status: true,
              msg: 'Register success, you can login with your account now.'
            })
            setTimeout(() => {
              loginRef.current?.show()
              verifyRef.current?.hide()
            },2000)
          } else {
            setRegister({
              status: false,
              msg: 'Failed to register, OTP code is wrong'
            })
          }
        } else {
          setRegister({
            status: false,
            msg: 'Failed to register',
            data: null
          })
        }
      } else {
        setRegister({
          status: false,
          msg: 'Please fill all required fields',
          data: null
        })
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setRegister({
        status: false,
        msg: 'Register failed! mobile number or password is wrong.'
      })
      setLoading(false)
    }
    setTimeout(()=>{
      setRegister({
        status: true,
        msg: null,
        data: null
      })
    },3000)
  }
  return (
    <ActionSheet ref={verifyRef}>
      <View style={[t.bgwhite,t.wp100,t.px20,t.py20,t.brtl10,t.brtr10]}>
        <TouchableOpacity onPress={() => verifyRef.current?.hide()} style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15,t.h15]}/>
        </TouchableOpacity>
        <Text style={[t['p20-600'],t.cblack,t.tCenter]}>Account Verification</Text>
        <View style={[t.mt10,t.fRow,t.wp100]}>
          <Text style={[t['p12-500'],t.cblack,t.tCenter,t.wp100]}>Hi {registerdata.name}, Please enter the verification code that was sent to your WhatsApp number</Text>
        </View>
        <View style={[t.mt20,t.faCenter,t.fjCenter]}>
          <TextInput onChangeText={setotp} value={otp} placeholderTextColor='#ccc' placeholder='XXXXXX' style={[t.wp60,t.bggrey90,t.p10,t['p20-700'],t.br5,t.cwhite,t.mt10,{letterSpacing:10},t.tCenter]}/>
        </View>
        <View style={[t.faCenter,t.fjCenter]}>
          <TouchableOpacity style={[t.mxAuto,t.bgorange,t.mt20,t.faCenter,t.fjCenter,t.px50,t.py10,t.br5]} onPress={()=>{doVerify()}}>
            <Text style={[t['p14-700'],t.cblack]}>{loading ? 'Processing...' : 'Verify'}</Text>
          </TouchableOpacity>
          <View style={[t.faCenter,t.fjCenter,t.mt5]}>
            <Text style={[t['p12-500'],register.status ? t.cblack : t.cdanger]}>{register.msg}</Text>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}

export default Verify;
