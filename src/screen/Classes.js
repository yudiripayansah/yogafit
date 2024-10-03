import React, {useEffect, useContext} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
// assets
import img from '../config/Image'
// components
import SubNavigation from '../components/SubNavigation';
import LocationSelect from '../components/LocationSelect';
import ClassesSelect from '../components/ClassesSelect';
import ClassesItem from '../components/ClassesItem';
const Classes = ({navigation}) => {
  const t = useContext(ThemeContext);
  const classesList = [
    {
      name: "Wheel Yoga",
      image: img.classes1,
      textStyle: t.bgorange
    },
    {
      name: "Yoga Swing",
      image: img.classes2,
      textStyle: t.bgfreshorange
    },
    {
      name: "Hot Class",
      image: img.classes3,
      textStyle: t.bgorange
    },
  ]
  useEffect(() => {

  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20,t.bggreye,t.pt70]}>
        <LocationSelect navigation={navigation}/>
      </View>
      <SubNavigation navigation={navigation}/>
      <View style={[t.mt20, t.px20]}>
        <ClassesSelect navigation={navigation}/>
        {classesList.map((item,index) => {
          return (
            <ClassesItem data={item} key={index} boxStyle={[t.mt10]}/>
          )
        })}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Classes;
