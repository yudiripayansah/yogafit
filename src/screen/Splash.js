import React, {useEffect, useContext} from 'react';
import {Image, View, StatusBar} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import analytics from '@react-native-firebase/analytics';
const Splash = ({navigation}) => {
  const t = useContext(ThemeContext);
  const gAnalytics = () => {
    analytics().logScreenView({
      screen_name: 'Splash',
      screen_class: 'Splash',
    });
  };
  useEffect(() => {
    gAnalytics();
  }, []);

  return (
    <View
      style={[
        t.wp100,
        t.hp100,
        t.faCenter,
        t.fjCenter,
        t.bgwhite,
        {flex: 1},
      ]}>

      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Image
        style={[t.w135, t.h78, {objectFit: 'contain'}]}
        source={require('../assets/images/logo-full.png')}
      />
    </View>
  );
};

export default Splash;
