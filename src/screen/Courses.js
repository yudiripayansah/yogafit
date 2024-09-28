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
import CalendarSelect from '../components/CalendarSelect';
import CourseItem from '../components/CourseItem';
const Courses = ({navigation}) => {
  const t = useContext(ThemeContext);
  const courseList = [
    {
      date: '12 - 26',
      month: 'June',
      year: '2024',
      name: 'Yoga Wheel Small Course',
      location: 'Yoga Fit Gandaria',
      duration: '5 Hours',
      teacher: 'Master Jatin'
    },
    {
      date: '12 - 26',
      month: 'June',
      year: '2024',
      name: 'Yoga Wheel Small Course',
      location: 'Yoga Fit Gandaria',
      duration: '5 Hours',
      teacher: 'Master Jatin'
    },
    {
      date: '12 - 26',
      month: 'June',
      year: '2024',
      name: 'Yoga Wheel Small Course',
      location: 'Yoga Fit Gandaria',
      duration: '5 Hours',
      teacher: 'Master Jatin'
    },
    {
      date: '12 - 26',
      month: 'June',
      year: '2024',
      name: 'Yoga Wheel Small Course',
      location: 'Yoga Fit Gandaria',
      duration: '5 Hours',
      teacher: 'Master Jatin'
    },
    {
      date: '12 - 26',
      month: 'June',
      year: '2024',
      name: 'Yoga Wheel Small Course',
      location: 'Yoga Fit Gandaria',
      duration: '5 Hours',
      teacher: 'Master Jatin'
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
        {courseList.map((item,index) => {
          return (
            <CourseItem data={item} key={index} boxStyle={[t.mt10]}/>
          )
        })}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Courses;