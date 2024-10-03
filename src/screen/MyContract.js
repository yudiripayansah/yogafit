import React, {useEffect, useContext} from 'react';
import {
  View, ScrollView, StatusBar, Image, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
const MyContract = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  useEffect(() => {
    
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[t.pt70,t.px20,t.faCenter,t.fjCenter]}>
        <Text style={[t['p18-600'],t.cblack,t.mt5]}>My Contract</Text>
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default MyContract;
