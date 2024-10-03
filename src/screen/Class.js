import React, {useEffect, useContext, useState} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
// assets
import img from '../config/Image'
// components
import SubNavigation from '../components/SubNavigation';
import LocationSelect from '../components/LocationSelect';
import CalendarSelect from '../components/CalendarSelect';
import ClassItem from '../components/ClassItem';
// api
import Api from  '../config/Api';
const Class = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [id,setid] = useState()
  const [studio,setstudio] = useState(103)
  const [level,setlevel] = useState('')
  const [classkat,setclasskat] = useState('')
  const [classlist, setclasslist] = useState([])
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
  const getSchedule = async () => {
    try {
      let param = `id=${id}&studio=${studio}&level=${level}&classkat=${classkat}`
      console.log(param)
      let req = await Api.mySchedule(param)
      if(req.status === 200 || req.status === 201) {
        let {data} = req.data
        console.log(data[0])
        setclasslist(data)
      }
    } catch (error) {
      
    }
  }
  const doBookNow = async (data) => {
    try {
      // let param = new FormData()
      // param.append('id',Number(data.id_class))
      let param = {
        id: Number(data.id_class)
      }
      console.log(param)
      let req = await Api.bookingClass(param,user.token)
      if(req.status === 200 || req.status === 201) {
        // let {data} = req.data
        console.log(req.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getToday = () => {
    const today = new Date();
    const formattedDate = today.getFullYear() + '-' + 
        String(today.getMonth() + 1).padStart(2, '0') + '-' + 
        String(today.getDate()).padStart(2, '0');
    return formattedDate
  }
  useEffect(() => {
    getSchedule()
  }, [id, studio, level, classkat]);
  useEffect(() => {
    setid(getToday())
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20,t.bggreye,t.pt70]}>
        <LocationSelect navigation={navigation}/>
      </View>
      <SubNavigation navigation={navigation}/>
      <View style={[t.pt20,t.px20]}>
        <CalendarSelect onDateSelected={(date) => {setid(date)}}/>
      </View>
      <View style={[t.mt10,t.px20,t.fRow,t.faCenter,t.fjCenter]}>
        <View style={[t.bgorange,t.br100,t.mx10,t.wp35,t.faCenter]}>
          <TouchableOpacity style={[t.py5,t.wp100]} onPress={()=>{setclasskat('normal')}}>
            <Text style={[t['p14-500'],t.cwhite]}>Normal Studio</Text>
          </TouchableOpacity>
        </View>
        <View style={[t.bgorange,t.br100,t.mx10,t.wp35,t.faCenter]}>
          <TouchableOpacity style={[t.py5,t.wp100]} onPress={()=>{setclasskat('hot')}}>
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
        {classlist.map((item,index) => {
          return (
            <ClassItem data={item} key={index} boxStyle={[t.mt10]} onBookPress={(data)=>{doBookNow(data)}}/>
          )
        })}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Class;
