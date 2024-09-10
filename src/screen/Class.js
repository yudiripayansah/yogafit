import React, {useEffect, useContext} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
// assets
import img from '../config/Image'
// components
import SubNavigation from '../components/SubNavigation';
import LocationSelect from '../components/LocationSelect';
import CalendarSelect from '../components/CalendarSelect';
import ClassItem from '../components/ClassItem';
const Class = ({navigation}) => {
  const t = useContext(ThemeContext);
  const classList = [
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Hot',
      spot_left: 'Full Booked'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Normal',
      spot_left: '5 Spots Left'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Normal',
      spot_left: '3 Spots Left'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Normal',
      spot_left: 'Full Booked'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Hot',
      spot_left: 'Full Booked'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Hot',
      spot_left: 'Full Booked'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Normal',
      spot_left: '5 Spots Left'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Normal',
      spot_left: '3 Spots Left'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Normal',
      spot_left: 'Full Booked'
    },
    {
      time: '07:00 AM',
      duration: '60 Mins',
      location: 'Yoga Fit Gandaria',
      name: 'Hot Backbend - In Studio',
      teacher: 'Master Rakesh',
      type: 'Hot',
      spot_left: 'Full Booked'
    },
  ]
  useEffect(() => {

  }, []);
  return (
    // <SafeAreaView>
      <ScrollView style={[t.bgwhite]}>
        <StatusBar translucent barStyle="dark-content" />
        <View style={[t.px20,t.bggreye,t.pt70]}>
          <LocationSelect/>
        </View>
        <SubNavigation/>
        <View style={[t.pt20,t.px20]}>
          <CalendarSelect/>
        </View>
        <View style={[t.mt10,t.px20,t.fRow,t.faCenter,t.fjCenter]}>
          <View style={[t.bgorange,t.br100,t.mx10,t.wp35,t.faCenter]}>
            <TouchableOpacity style={[t.py5,t.wp100]}>
              <Text style={[t['p14-500'],t.cwhite]}>Normal Studio</Text>
            </TouchableOpacity>
          </View>
          <View style={[t.bgorange,t.br100,t.mx10,t.wp35,t.faCenter]}>
            <TouchableOpacity style={[t.py5,t.wp100]}>
              <Text style={[t['p14-500'],t.cwhite]}>Hot Studio</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[t.pt20,t.px20]}>
          <View style={[t.bgwarning,t.fRow,t.faCenter,t.p10,t.br10]}>
            <Image source={img.warning} style={[t.w20,t.h20,t.me5]}/>
            <Text style={[t['p10-500'],t.cblack,t.wp95]}>Booking are mandatory in advance. Please book your class at least 1 day before to make sure your space are secured.</Text>
          </View>
        </View>
        <View style={[t.mt20, t.px20]}>
          {classList.map((item,index) => {
            return (
              <ClassItem data={item} key={index} boxStyle={[t.mt10]}/>
            )
          })}
        </View>
        <View style={[t.py50,t.wp100]}></View>
      </ScrollView>
    // </SafeAreaView>
  );
};

export default Class;
