import React, {useEffect, useContext, useState} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image, ActivityIndicator
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
// assets
import img from '../config/Image'
const Events = ({route,navigation}) => {
  const t = useContext(ThemeContext);
  useEffect(() => {
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Events;
