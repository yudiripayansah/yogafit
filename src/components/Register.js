import React, {useEffect, useContext, useRef, useState } from 'react';
import {Dimensions, Text, ScrollView, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {LocationContext} from '../context/LocationContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
// API
import Api from '../config/Api'
// components
import LocationModal from './LocationList'
function Register({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {setUser} = useContext(AuthContext);
  const studio = useContext(LocationContext);
  const locationRef = useRef(null);
  const {loginRef,verifyRef, registerRef, onRegister} = props
  const [id,setid] = useState()
  const [name,setname] = useState()
  const [email,setemail] = useState()
  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState({
    status: true,
    msg: null,
    data: null
  })
  const handlePhoneNumber = (text) => {
    // Use regex to remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    setid(numericValue);
  };
  const doRegister = async () => {
    setLoading(true)
    try {
      let payload = {
        id: id,
        name: name,
        email: email,
        studio: studio.id,
      }
      if(id && name && email && studio) {
        let req = await Api.register(payload)
        if(req.status === 200 || req.status === 201){
          if(req.data) {
            onRegister(payload)
            setRegister({
              status: true,
              msg: 'Verification code sent to your whatsapp number',
              data: null
            })
            setTimeout(() => {
              registerRef.current?.hide()
              verifyRef.current?.show()
            },2000)
          } else {
            setRegister({
              status: false,
              msg: 'Failed to register, something went wrong in server'
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
    <ActionSheet ref={registerRef}>
      <LocationModal locationRef={locationRef}/>
      <ScrollView style={[t.bgwhite,t.wp100,t.px20,t.py20,t.brtl10,t.brtr10]}>
        <TouchableOpacity onPress={() => registerRef.current?.hide()} style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15,t.h15]}/>
        </TouchableOpacity>
        <Text style={[t['p20-600'],t.cblack,t.tCenter]}>Come join Us?</Text>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'],t.cblack]}>Mobile number</Text>
          <TextInput keyboardType="numeric" onChangeText={handlePhoneNumber} value={id} placeholderTextColor='#ccc' placeholder='eg: +6281234567890' style={[t.bggrey90,t.p10,t['p14-500'],t.br5,t.cwhite,t.mt10]}/>
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'],t.cblack]}>Full Name</Text>
          <TextInput onChangeText={setname} value={name} placeholderTextColor='#ccc' placeholder='eg: John Doe' style={[t.bggrey90,t.p10,t['p14-500'],t.br5,t.cwhite,t.mt10]}/>
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'],t.cblack]}>Email</Text>
          <TextInput onChangeText={setemail} value={email} placeholderTextColor='#ccc' placeholder='eg: johndoe@email.com' style={[t.bggrey90,t.p10,t['p14-500'],t.br5,t.cwhite,t.mt10]}/>
        </View>
        <View style={[t.my20]}>
          <Text style={[t['p16-500'],t.cblack]}>Studio</Text>
          <TouchableOpacity onPress={()=>{locationRef.current?.show();}} style={[t.bggrey90,t.p10,t.br5,t.mt10]}>
            <Text style={[t['p14-500'],t.cwhite]}>{studio && studio.deptname}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[t.mxAuto,t.bgorange,t.faCenter,t.fjCenter,t.px50,t.py10,t.br5]} onPress={() => {doRegister()}}>
          <Text style={[t['p14-700'],t.cblack]}>{loading ? 'Processing...' : 'Register'}</Text>
        </TouchableOpacity>
        <View style={[t.faCenter,t.fjCenter,t.mt5]}>
          <Text style={[t['p12-500'],register.status ? t.cblack : t.cdanger]}>{register.msg}</Text>
        </View>
        <View style={[t.mt10,t.fRow,t.fjCenter]}>
          <Text style={[t['p16-600'],t.cblack]}>Already a Member?</Text>
          <TouchableOpacity onPress={()=>{registerRef.current?.hide();loginRef.current?.hide()}}>
            <Text style={[t['p16-600'],t.corange,t.ms5]}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ActionSheet>
  );
}

export default Register;
