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
import EventItem from '../components/EventItem';
const Events = ({navigation}) => {
  const t = useContext(ThemeContext);
  const eventList = [
    {
      name: "Yoga Retreat to Lombok",
      date: "September 20-25, 2024",
      image: img.event
    },
    {
      name: "Yoga Retreat to Lombok",
      date: "September 20-25, 2024",
      image: img.event
    },
    {
      name: "Yoga Retreat to Lombok",
      date: "September 20-25, 2024",
      image: img.event
    },
    {
      name: "Yoga Retreat to Lombok",
      date: "September 20-25, 2024",
      image: img.event
    },
    {
      name: "Yoga Retreat to Lombok",
      date: "September 20-25, 2024",
      image: img.event
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
        {eventList.map((item,index) => {
          return (
            <EventItem data={item} key={index} boxStyle={[t.mt10]}/>
          )
        })}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Events;
