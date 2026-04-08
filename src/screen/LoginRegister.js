import React, {useEffect, useContext,useRef, useState} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {GstContext} from '../context/GstContext';
import {GuestContext} from '../context/GuestContext';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import LoginModal from '../components/Login';
import VerifyModal from '../components/Verify';
import RegisterModal from '../components/Register';
import ForgotModal from '../components/Forgot';
import FreeTrialModal from '../components/FreeTrial';
import ChangePhoneModal from '../components/ChangePhone';
// assets
import img from '../config/Image';
// import analytics from '@react-native-firebase/analytics';
const LoginRegister = ({navigation}) => {
  const t = useContext(ThemeContext);
  const guest = useContext(GuestContext);
  const {setGuest} = useContext(GstContext);
  const locationRef = useRef(null);
  const loginRef = useRef(null);
  const verifyRef = useRef(null);
  const registerRef = useRef(null);
  const forgotRef = useRef(null);
  const freetrialRef = useRef(null);
  const changephoneRef = useRef(null);
  const [registerdata, setregisterdata] = useState({});
  const [trialcontract, settrialcontract] = useState();
  const [lastSlide, setLastSlide] = useState(false)
  const gAnalytics = () => {
    // analytics().logScreenView({
    //   screen_name: 'Intro',
    //   screen_class: 'Intro',
    // });
  };
  useEffect(() => {
    gAnalytics();
  }, []);
  useEffect(() => {
    if(guest){
      navigation.navigate('Home')
    }
  }, [guest]);
  const onSlideChange = (index) => {
    if (index === introItems.length - 1) {
      setLastSlide(true)
    } else {
      setLastSlide(false)
    }
  };
  let introItems = [
    {
      title: 'Find Balance in Every Breath',
      text: 'Discover inner peace with guided meditation sessions',
      image: require('../assets/images/revamp/splash-1.png'),
    },
    {
      title: 'Book Classes Anytime, Anywhere',
      text: 'Schedule your yoga sessions with just a few taps',
      image: require('../assets/images/revamp/splash-2.png'),
    },
    {
      title: 'Join the Yoga Fit Community Now!',
      text: 'Connect with thousands of yoga enthusiasts',
      image: require('../assets/images/revamp/splash-3.png'),
    },
  ];
  let dotStyle = {
    ...t.bggrey,
    ...t.w8,
    ...t.h8,
    ...t.me10,
    ...t.br100,
  };
  let activeDotStyle = {
    ...t.bgdarkGreen,
    ...t.w50,
  };
  let btnStyle = {
    ...t.bw1,
    ...t.bsolid,
    ...t.bblack,
    ...t.wp80,
    ...t.py8,
    ...t.faCenter,
    ...t.fjCenter,
    ...t.br12,
    ...t.mt8,
    ...t.mb16
  };
  let btnStyleLast = {
    ...t.bw1,
    ...t.bsolid,
    ...t.bfreshorange,
    ...t.bgorange,
    ...t.wp80,
    ...t.py8,
    ...t.faCenter,
    ...t.fjCenter,
    ...t.br12,
    ...t.mt24,
    ...t.cwhite
  };
  let pagination = activeIndex => {
    return (
      <View
        style={[
          t.wp100,
          t.px20,
          t.absolute,
          t.left0,
          t.right0,
          t.bottom0,
          t.pb60
        ]}>
        <View style={[t.fRow, t.wp100,t.fjCenter]}>
          {introItems.length > 1 &&
            introItems.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  dotStyle,
                  i === activeIndex ? activeDotStyle : t.bgnone,
                ]}
                onPress={() => this.slider?.goToSlide(i, true)}
              />
            ))}
        </View>
        <View style={[t.faCenter, t.wp100]}>
          <TouchableOpacity
            style={lastSlide ? btnStyleLast :btnStyle}
            onPress={() => {
              if(lastSlide){
                navigation.navigate('Login');
              }
            }}>
            <Text style={[t['h14-400'],lastSlide ? t.cwhite : t.cblack]}>
              {lastSlide ? 'Create Account': 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  let elementItems = ({item}) => {
    return (
      <View style={[t.wp100, t.hp100,t.faCenter,t.fjCenter, {flex: 1}]}>
        <View style={[t.relative,t.wp80,t.p20]}>
          <Image source={item.image} style={[t.wp100,t.h390,t.br13]}/>
          <View style={[t.absolute,t.left0,t.bottom0]}>
            <Image source={img.fireLeft} style={[t.w60,t.h90]} resizeMode="contain"/>
          </View>
          <View style={[t.absolute,t.right0,t.bottom0]}>
            <Image source={img.fireRight} style={[t.w60,t.h90]} resizeMode="contain"/>
          </View>
        </View>
        <View style={[t.px20, t.py20,t.tCenter]}>
          <Text style={[t['h28-600'], t.cblack,t.tCenter]}>{item.title}</Text>
          <Text style={[t['h14-400'], t.cblack,t.tCenter]}>{item.text}</Text>
        </View>
      </View>
    );
  };
  return (
    <LinearGradient
      colors={['#FFF3EE', '#FFFFFF']}
      style={[{ flex: 1 }]}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
      <LoginModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        forgotRef={forgotRef}
      />
      <ForgotModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        forgotRef={forgotRef}
      />
      <VerifyModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        registerdata={registerdata}
      />
      <ChangePhoneModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        registerdata={registerdata}
      />
      <FreeTrialModal
        changephoneRef={changephoneRef}
        freetrialRef={freetrialRef}
        data={trialcontract}
      />
      <RegisterModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        onRegister={data => {
          setregisterdata(data);
        }}
      />
      <View style={[t.faCenter,t.fjCenter]}>
      <Image source={img.logoBig} style={[t.wp80,t.h390,t.br13]} resizeMode='contain'/>
      </View>
      <View style={[t.px20, t.py20,t.tCenter]}>
        <Text style={[t['h28-600'], t.cblack,t.tCenter]}>
          Welcome to Yoga Fit App
        </Text>
        <Text style={[t['h14-400'], t.cblack,t.tCenter]}>Connect with thousands of yoga enthusiasts</Text>
      </View>
      <View style={[t.faCenter]}>
        <TouchableOpacity
          style={btnStyleLast}
          onPress={() => {
              registerRef.current?.show()
          }}>
          <Text style={[t['h14-400'],t.cwhite]}>
            Create Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={btnStyle}
          onPress={() => {
              loginRef.current?.show()
          }}>
          <Text style={[t['h14-400'],t.cblack]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback
          style={[t.mt24]}
          onPress={() => {
            setGuest(true)
            navigation.navigate('Home');
          }}>
          <Text style={[t['h14-400'],t.cblack]}>
            Continue as guest
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </LinearGradient>
  );
};

export default LoginRegister;
