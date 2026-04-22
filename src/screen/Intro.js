import React, {useEffect, useContext, useState, useRef } from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image, StatusBar} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {GuestContext} from '../context/GuestContext';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
// assets
import img from '../config/Image';
// import analytics from '@react-native-firebase/analytics';
const Intro = ({navigation}) => {
  const sliderRef = useRef(null);
  const t = useContext(ThemeContext);
  const guest = useContext(GuestContext);
  const [lastSlide, setLastSlide] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const gAnalytics = () => {
    // analytics().logScreenView({
    //   screen_name: 'Intro',
    //   screen_class: 'Intro',
    // });
  };
  useEffect(() => {
    gAnalytics();
    if(guest){
      navigation.navigate('Home')
    }
  }, []);
  const onSlideChange = (index) => {
    setCurrentIndex(index)
    if (index === introItems.length - 1) {
      setLastSlide(true)
    } else {
      setLastSlide(false)
    }
  };
  let introItems = [
    {
      idx: 1,
      title: 'Find Balance in Every Breath',
      text: 'Discover inner peace with guided meditation sessions',
      image: require('../assets/images/revamp/splash-1.png'),
    },
    {
      idx: 2,
      title: 'Book Classes Anytime, Anywhere',
      text: 'Schedule your yoga sessions with just a few taps',
      image: require('../assets/images/revamp/splash-2.png'),
    },
    {
      idx: 3,
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
    ...t.mt24,
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
                onPress={() => sliderRef.current?.goToSlide(i, true)}
              />
            ))}
        </View>
        <View style={[t.faCenter, t.wp100]}>
          <TouchableOpacity
            style={lastSlide ? btnStyleLast :btnStyle}
            onPress={() => {
              if(lastSlide){
                navigation.navigate('LoginRegister');
              } else {
                sliderRef.current?.goToSlide(currentIndex + 1, true);
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
      <View style={[t.wp100, t.hp100,t.faCenter,t.fjCenter, {flex: 1}]} key={item.idx}>
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
      style={{ flex: 1 }}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={elementItems}
        renderPagination={pagination}
        data={introItems}
        onSlideChange={onSlideChange}
      />
    </LinearGradient>
  );
};

export default Intro;
