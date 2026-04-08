import React, {useEffect, useContext} from 'react';
import {Image, View, StatusBar} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
// import analytics from '@react-native-firebase/analytics';
const Splash = ({navigation}) => {
  const t = useContext(ThemeContext);
  const gAnalytics = () => {
    // analytics().logScreenView({
    //   screen_name: 'Splash',
    //   screen_class: 'Splash',
    // });
  };
  useEffect(() => {
    gAnalytics();
  }, []);

  return (
    <LinearGradient colors={['#FFF3EE', '#FFFFFF']} style={[{flex: 1}]}>
      <View
        style={[
          t.wp100,
          t.hp100,
          t.faCenter,
          t.fjCenter,
          {flex: 1},
        ]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Image
          style={[t.w270, t.h60, {objectFit: 'contain'}]}
          source={require('../assets/images/revamp/logo.png')}
        />
      </View>
    </LinearGradient>
  );
};

export default Splash;
