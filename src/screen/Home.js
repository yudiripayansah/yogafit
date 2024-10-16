import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  ScrollView,View, StatusBar, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
// assets
import img from '../config/Image'
// components
import HomeCarousel from '../components/HomeCarousel';
import HomeTeacher from '../components/HomeTeacher';
import HomeEvents from '../components/HomeEvents';
import HomeLocation from '../components/HomeLocation';
import HomeClass from '../components/HomeClass';
import LocationModal from '../components/LocationList'
import HomeContract from '../components/HomeContract'
// API
import Api from '../config/Api'
const Home = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const locationRef = useRef(null);
  const [slider,setSlider] = useState([])
  const [events,setEvents] = useState([])
  const [trainer,setTrainer] = useState([])
  const getSlider = async () => {
    try {
      let req = await Api.slider()
      if(req.status === 200){
        let {data} = req.data
        let slide = []
        data.forEach((item) => {
          slide.push({uri: item.file})
        })
        setSlider(slide)
      } else {
        console.error("Error get slider")
      }
    } catch (error) {
      console.error(error)
    }
  }
  const getEvents = async () => {
    try {
      let req = await Api.event()
      if(req.status === 200){
        let {data} = req.data
        let event = []
        data.forEach((item) => {
          event.push({image:{uri: item.gambar},data:item})
        })
        setEvents(event)
      } else {
        console.error("Error get event")
      }
    } catch (error) {
      console.error(error)
    }
  }
  const getTrainer = async () => {
    try {
      let req = await Api.trainer()
      if(req.status === 200){
        let {data} = req.data
        let trainer = []
        data.forEach((item) => {
          trainer.push({image: {uri: item.foto},name:item.name})
        })
        setTrainer(trainer)
      } else {
        console.error("Error get trainer")
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getSlider()
    getEvents()
    getTrainer()
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <LocationModal locationRef={locationRef}/>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <HomeCarousel images={slider}/>
      <View style={[t.mmt30,t.px20]}>
        <HomeLocation navigation={navigation} onPress={() => {locationRef.current?.show();}}/>
      </View>
      <View style={[t.mt20,t.px20]}>
        <HomeClass navigation={navigation}/>
      </View>
      <View style={[t.mt20,t.px20]}>
        <Text style={[t['h20-400'],t.cblack]}>Start Your Journey with Yoga Fit</Text>
        <Text style={[t['p12-400'],t.cblack,t.mt5]}>You’re new in yoga? no worries! Don’t imagine your first yoga practice will be hard.</Text>
      </View>
      <View style={[t.mt20,t.px20]}>
        <View style={[t.bgorange,t.br10,t.p10,t.fRow,t.fjBetween,t.faCenter]}>
          <View style={[t.fRow,t.faCenter]}>
            <Image source={img.ticket} style={[t.w50,t.h50]}/>
            <View style={[t.ms10]}>
              <Text style={[t['h20-400'],t.cwhite]}>Complimentary Class For You!</Text>
              <Text style={[t['p12-400'],t.cwhite]}>Try our yoga class first time for free</Text>
            </View>
          </View>
          <TouchableOpacity style={[t.px10,t.py5,t.bgskyblue,t.br100]}>
            <Text style={[t['h12-400'],t.cwhite]}>Reedem</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[t.mt20]}>
        <Image source={img.banner2} style={[t.wp100,t.h275,{objectFit:'contain'}]}/>
        <View style={[t.absolute,t.wp100,t.hp100,t.top0,t.left0,t.faCenter,t.fjCenter]}>
          <View style={[t.absolute,t.wp100,t.hp100,t.top0,t.left0,t.bgblack,{opacity:.5}]}></View>
          <Text style={[t['h50-400'],t.cwhite,t.px50,t.tCenter]}>Have You Sweat Today?</Text>
          <TouchableOpacity style={[t.px10,t.py5,t.faCenter,t.fjCenter,t.bgorange,t.br10,t.mt10]} onPress={()=>{navigation.navigate('Class')}}>
            <Text style={[t['h20-400'],t.cwhite]}>Book Classes</Text>
          </TouchableOpacity>
        </View>
      </View>
      {user && (
      <View style={[t.mt20]}>
        <HomeContract navigation={navigation}/>
      </View>
      )}
      <View style={[t.mt20]}>
        <View style={[t.px20,t.mb10]}>
          <Text style={[t['h20-400'],t.cblack]}>Teachers</Text>
        </View>
        <HomeTeacher teacher={trainer} navigation={navigation}/>
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20,t.mb10]}>
          <Text style={[t['h20-400'],t.cblack]}>Upcoming Events</Text>
        </View>
        <HomeEvents events={events} navigation={navigation}/>
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Home;
