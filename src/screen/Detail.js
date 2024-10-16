import React, {useEffect, useContext, useState} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image, ActivityIndicator, Dimensions
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
// assets
import img from '../config/Image'
import Theimage from '../components/Theimage';
const Events = ({route,navigation}) => {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width - 40;
  const {image = '',title = '',text = ''} = route.params || {}
  useEffect(() => {
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      {image && (
      <Theimage original={image} placeholder={img.placeholder} style={[]}/>
      )}
      <Text style={[t.px20,(image) ? t.mt20: t.mt50,t['p16-500'],t.cblack]}>{title}</Text>
      <View style={[t.px20,t.mt10]}>
        <RenderHTML
          contentWidth={screenWidth}
          style={[t.cblack,t['p12-500']]}
          tagsStyles={{
            div: { color: 'black' },
          }}
          source={{ html: `<div>${text}</div>` }}
        />
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Events;
