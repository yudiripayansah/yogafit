import React, {useEffect, useContext, useState} from 'react';
import {
  ScrollView,View, StatusBar, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image'
// components
import HomeCarousel from '../components/HomeCarousel';
import HomeTeacher from '../components/HomeTeacher';
import HomeEvents from '../components/HomeEvents';
import HomeLocation from '../components/HomeLocation';
import HomeClass from '../components/HomeClass';
import { TouchableOpacity } from 'react-native-gesture-handler';
// API
import Api from '../config/Api'
const Home = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const [slider,setSlider] = useState([])
  const images = [
    img.banner1,img.banner2,img.banner3,img.banner4,img.banner5
  ]
  const teachers = [
    img.teacher,img.teacher,img.teacher,img.teacher,img.teacher,
    img.teacher,img.teacher,img.teacher,img.teacher,img.teacher,
    img.teacher,img.teacher,img.teacher,img.teacher,img.teacher,
  ]
  const events = [
    img.event,img.event,img.event,img.event,img.event,
    img.event,img.event,img.event,img.event,img.event,
    img.event,img.event,img.event,img.event,img.event,
  ]
  const getSlider = async () => {
    try {
      let req = await Api.slider()
      if(req.status === 200){
        let {data} = req.data
        let slide = []
        data.forEach((item) => {
          slide.push({uri: item.url})
        })
        setSlider(slide)
      } else {
        console.error("Error get slider")
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getSlider()
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <HomeCarousel images={images}/>
      <View style={[t.mmt30,t.px20]}>
        <HomeLocation navigation={navigation}/>
      </View>
      <View style={[t.mt20,t.px20]}>
        <HomeClass/>
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
          <TouchableOpacity style={[t.px10,t.py5,t.faCenter,t.fjCenter,t.bgorange,t.br10,t.mt10]}>
            <Text style={[t['h20-400'],t.cwhite]}>Book Classes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20,t.mb10]}>
          <Text style={[t['h20-400'],t.cblack]}>Teachers</Text>
        </View>
        <HomeTeacher images={teachers}/>
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20,t.mb10]}>
          <Text style={[t['h20-400'],t.cblack]}>Upcoming Events</Text>
        </View>
        <HomeEvents images={events}/>
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Home;
