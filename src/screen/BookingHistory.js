import React, {useEffect, useContext} from 'react';
import {
  View, ScrollView, StatusBar, Image, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// components
import BookingSubNav from '../components/BookingSubNav'
import BookingFilter from '../components/BookingFilter'
import BookingItem from '../components/BookingItem'
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
const BookingHistory = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const bookingList = [
    {
      studio: 'Yoga Fit Gandaria',
      type: 'HOT',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      date: 'Wednesday, 26 June 2024',
      time: '07:00 AM - 08:00 AM',
      attendance: 'Present!'
    },
    {
      studio: 'Yoga Fit Gandaria',
      type: 'HOT',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      date: 'Wednesday, 26 June 2024',
      time: '07:00 AM - 08:00 AM',
      attendance: 'Present!'
    },
    {
      studio: 'Yoga Fit Gandaria',
      type: 'HOT',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      date: 'Wednesday, 26 June 2024',
      time: '07:00 AM - 08:00 AM',
      attendance: 'Present!'
    },
    {
      studio: 'Yoga Fit Gandaria',
      type: 'HOT',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      date: 'Wednesday, 26 June 2024',
      time: '07:00 AM - 08:00 AM',
      attendance: 'Present!'
    },
    {
      studio: 'Yoga Fit Gandaria',
      type: 'HOT',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      date: 'Wednesday, 26 June 2024',
      time: '07:00 AM - 08:00 AM',
      attendance: 'Present!'
    },
  ]
  useEffect(() => {

  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={[t.pt70,t.px20,t.faCenter,t.fjCenter]}>
        <Text style={[t['p20-700'],t.cblack]}>Booking History</Text>
      </View>
      <View style={[t.px20]}>
        <BookingSubNav navigation={navigation}/>
      </View>
      <View style={[t.px20]}>
        <BookingFilter/>
      </View>
      <View style={[t.px20]}>
      {bookingList.map((item,index) => {
          return (
            <BookingItem data={item} key={index} boxStyle={[t.mt10]}/>
          )
        })}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default BookingHistory;
