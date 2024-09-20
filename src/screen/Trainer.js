import React, {useEffect, useContext} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
// assets
import img from '../config/Image'
// components
import LocationSelect from '../components/LocationSelect';
import SubNavigation from '../components/SubNavigation';
import TeacherCategory from '../components/TeacherCategory';
import TeacherList from '../components/TeacherList';
const Trainer = ({navigation}) => {
  const t = useContext(ThemeContext);
  const cat = ["Man","Woman","Basic","Advance","Pro Pirce"]
  const teacher = [
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
    {
      image: img.teacher,
      name: 'Master Ashish',
      cat: 'Teacher of Yoga Fit',
      rating: 5,
      ratingFrom: 567
    },
  ]
  useEffect(() => {

  }, []);
  return (
    // <SafeAreaView>
      <ScrollView style={[t.bgwhite]}>
        <StatusBar translucent barStyle="dark-content" />
        <View style={[t.px20,t.bggreye,t.pt70]}>
          <LocationSelect navigation={navigation}/>
        </View>
        <SubNavigation navigation={navigation}/>
        <View style={[t.px20,t.mt20]}>
          <TeacherCategory cat={cat}/>
        </View>
        <View style={[t.mt30]}>
          <TeacherList teacher={teacher}/>
        </View>
        <View style={[t.py50,t.wp100]}></View>
      </ScrollView>
    // </SafeAreaView>
  );
};

export default Trainer;
