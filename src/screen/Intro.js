import React, {useEffect, useContext} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import AppIntroSlider from 'react-native-app-intro-slider';
import analytics from '@react-native-firebase/analytics';
const Feed = ({navigation}) => {
  const t = useContext(ThemeContext);
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Intro',
      screen_class: 'Intro',
    });
  };
  useEffect(() => {
    gAnalytics();
  }, []);
  let introItems = [
    {
      title: 'Pelajari banyak hal dari Audio Streaming',
      text: 'Temukan berbagai konten menarik disini',
      image: require('../assets/images/splash.png'),
    },
    {
      title: 'Makin dekat dalam siaran',
      text: 'Kamu bisa ikuti kegiatan melalui Live Streaming',
      image: require('../assets/images/splash-2.png'),
    },
    {
      title: 'Nikmati musik  lebih seru',
      text: 'Nyaman menikmati musik dimanapun dan kapanpun',
      image: require('../assets/images/splash-3.png'),
    },
  ];
  let dotStyle = {
    ...t.bsolid,
    ...t.byellow,
    ...t.bw1,
    ...t.w8,
    ...t.h8,
    ...t.me10,
    ...t.br100,
  };
  let activeDotStyle = {
    ...t.bgyellow,
    ...t.w50,
  };
  let btnStyle = {
    ...t.bgyellow,
    ...t.w190,
    ...t.h70,
    ...t.faCenter,
    ...t.fjCenter,
    ...t.br42,
  };
  let pagination = activeIndex => {
    return (
      <View
        style={[
          t.absolute,
          t.bottom0,
          t.left0,
          t.right0,
          t.wp100,
          t.px20,
          t.pb60,
        ]}>
        <View style={[t.fRow, t.wp100, t.mb70]}>
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
            style={btnStyle}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={[t['h20-600'], t.cblack]}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  let elementItems = ({item}) => {
    return (
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        style={[t.wp100, t.hp100, t.bgblack, {flex: 1}]}>
        <View style={[t.px20, t.py20, t.absolute, t.bottom200]}>
          <Text style={[t['h27-700'], t.cwhite]}>{item.title}</Text>
          <Text style={[t['h18-500'], t.cwhite]}>{item.text}</Text>
        </View>
      </ImageBackground>
    );
  };
  return (
    <AppIntroSlider
      renderItem={elementItems}
      renderPagination={pagination}
      data={introItems}
    />
  );
};

export default Feed;
