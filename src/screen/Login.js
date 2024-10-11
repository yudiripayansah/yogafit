import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import Api from '../config/Api'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';
const Login = ({navigation}) => {
  const webClientId = '543317221813-25in70mlr40laf569025fedv79n908n8.apps.googleusercontent.com'
  const t = useContext(ThemeContext)
  const {setUser} = useContext(AuthContext);
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [sPassword, setSpassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState({
    status: true,
    msg: null,
    data: null
  })
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Login',
      screen_class: 'Login',
    });
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId, 
    })
    gAnalytics()
  },[])
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const doLogin = async () => {
    setLoading(true)
    try {
      let payload = {
        email: email,
        password: password
      }
      if(email && password) {
        if(validateEmail(email)) {
          let req = await Api.login(payload)
          if(req.status == 200){
            let {data,status,msg} = req.data
            if(status) {
              setUser(data)
            } else {
              setLogin(req.data)
            }
          } else {
            setLogin({
              status: false,
              msg: 'Failed to login',
              data: null
            })
          }
        } else {
          setLogin({
            status: false,
            msg: 'Please enter valid email',
            data: null
          })
        }
      } else {
        setLogin({
          status: false,
          msg: 'Please enter email and password',
          data: null
        })
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  const guest = () => {
    let data = {
      username: 'guest',
      email: 'guest@ardanradio.com',
      name: 'Guest',
      phone: '-',
      address: '-',
      gender: '-',
      image: '-',
      role: 'guest',
      dob: '-'
    }
    setUser(data)
  }
  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userData = await GoogleSignin.signIn();
      let payload = {
        id: null,
        username: userData.user.name+makeid(10),
        email: userData.user.email,
        name: userData.user.name,
        password: null,
        phone: null,
        image: null,
        address: null,
        gender: null,
        dob: null,
        role: 'member',
        status: 'active',
      }
      let req = await Api.loginOrRegister(payload);
      if(req.status == 200){
        let {data,status,msg} = req.data
        if(status) {
          setUser(data)
        } else {
          setLogin({
            status: false,
            msg: 'Failed to login - Server Error',
            data: null
          })
        }
      } else {
        setLogin({
          status: false,
          msg: 'Failed to login - Connection Error',
          data: null
        })
      }
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.error(error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.error(error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.error(error)
        } else {
          console.error(error)
        }
    }
  };
  return (
    <KeyboardAvoidingView style={[t.wp100,t.hp100, t.bgwhite, t.fjStart, t.px20, t.py20 ,{flexGrow: 1}]}>
      <View style={[t.faCenter]}>
        <Image
          style={[t.w135, t.h78, {objectFit: 'contain'}]}
          source={require('../assets/images/logo.png')}
        />
      </View>
      <View style={[t.wp100, t.mt50,]}>
        <Text style={[t.cwhite,t['p24-500'], t.tCenter]}>SIGN IN</Text>
        <Text style={[t.cblue_grey,t['p14-500'], t.tCenter]}>Please enter your account here</Text>
        <View style={[ t.bgblack, t.px20, t.ps50, t.wp100, t.mt20, t.br12]}>
          {/* <Image style={[t.w20,t.h20, t.absolute,t.left20, t.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/envelope.png')}/> */}
          <TextInput style={[t.p0,t['p13-500'],t.cblack]} placeholder='Email' onChangeText={setEmail} value={email} placeholderTextColor={'#000'}/>
        </View>
        <View style={[ t.bgblack, t.px50, t.wp100, t.mt15, t.br12]}>
          {/* <Image style={[t.w20,t.h20, t.absolute,t.left20, t.top15,{objectFit: 'contain'}]} source={require('../assets/images/icons/lock.png')}/> */}
          <TextInput style={[t.p0,t['p13-500'],t.cblack]} placeholder='Password' secureTextEntry={sPassword} onChangeText={setPassword} value={password} placeholderTextColor={'#000'}/>
          <TouchableOpacity onPress={()=> {setSpassword(!sPassword)}} style={[t.absolute,t.right20, t.top15]}>
            <Icon name={(sPassword) ? "eye-slash" : "eye"} size={20} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={[t.fRow, t.mt5, t.fjBetween]}>
          <TouchableOpacity onPress={() => {navigation.navigate('Register');}}>
            <Text style={[t.cindian_red, t['p14-500']]}>Daftar?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('Forgot');}}>
          <Text style={[t.cindian_red, t['p14-500']]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[t.bgyellow, t.faCenter, t.py15, t.br52, t.mt20]} onPress={() => {doLogin()}} disabled={(loading) ? true : false}>
          <Text style={[t['p14-500'], t.cblack]}>{(loading) ? 'Processing...' : 'Login'}</Text>
        </TouchableOpacity>
        {
          (!login.status) ? (
            <Text style={[t.cindian_red,t['p10-400'],t.tCenter,t.pt5]}>{login.msg}</Text>
          ) : null
        }
        <View style={[t.relative,t.mt15, t.faCenter]}>
          <View style={[t.h1,t.bgblack,t.absolute, t.left0, t.right0, t.top10]}></View>
          <Text style={[{backgroundColor:'#090903'}, t.cyellow_bold, t['p14-500'], t.px5]}>Or Login with</Text>
        </View>
        <View style={[t.fRow, t.fjCenter, t.mt15]}>
          <TouchableOpacity style={[t.w80, t.bwhite, t.bSolid, t.bw1, t.faCenter, t.py5, t.br10, t.mx5]} onPress={googleLogin}>
            {/* <Image source={require('../assets/images/icons/google.png')}/> */}
          </TouchableOpacity>
          <TouchableOpacity style={[t.w80, t.bwhite, t.bSolid, t.bw1, t.faCenter, t.py5, t.br10, t.mx5]}>
            {/* <Image source={require('../assets/images/icons/apple.png')}/> */}
          </TouchableOpacity>
          <TouchableOpacity style={[t.w80, t.bwhite, t.bSolid, t.bw1, t.faCenter, t.py5, t.br10, t.mx5]}>
            {/* <Image source={require('../assets/images/icons/facebook.png')}/> */}
          </TouchableOpacity>
        </View>
        <View style={[t.relative,t.mt30, t.faCenter]}>
          <TouchableOpacity style={[t.fRow]} onPress={()=>{guest()}}>
            <Text style={[t.cwhite, t['p15-500'], t.me5]}>Atau masuk sebagai tamu !</Text>
            <Text style={[t.cyellow_bold, t['p15-500']]}>Lewati</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login