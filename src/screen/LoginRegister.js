import React, {useEffect, useContext, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
// assets
import img from '../config/Image';
// import analytics from '@react-native-firebase/analytics';
const LoginRegister = ({navigation}) => {
  const t = useContext(ThemeContext);
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
    ...t.bgfreshorange,
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
              navigation.navigate('Register');
          }}>
          <Text style={[t['h14-400'],t.cwhite]}>
            Create Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={btnStyle}
          onPress={() => {
              navigation.navigate('Login');
          }}>
          <Text style={[t['h14-400'],t.cblack]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback
          style={[t.mt24]}
          onPress={() => {
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
