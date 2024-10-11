import React, {useEffect, useContext, useState} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
// components
import LocationSelect from '../components/LocationSelect';
import SubNavigation from '../components/SubNavigation';
import TeacherCategory from '../components/TeacherCategory';
import TeacherList from '../components/TeacherList';
// API
import Api from '../config/Api'
// assets
import img from '../config/Image'
const Trainer = ({navigation}) => {
  const t = useContext(ThemeContext);
  const cat = ["Man","Woman","Basic","Advance","Pro Pirce"]
  const [trainer,setTrainer] = useState([])
  const getTrainer = async () => {
    try {
      let req = await Api.trainer()
      if(req.status === 200){
        let {data} = req.data
        data.map((item)=> {
          item.foto = {uri:item.foto}
          item.placeholder = img.teacher
        })
        setTrainer(data)
      } else {
        console.error("Error get trainer")
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getTrainer()
  }, []);
  return (
      <ScrollView style={[t.bgwhite]}>
        <StatusBar translucent barStyle="dark-content" />
        <View style={[t.px20,t.bggreye,t.pt70]}>
          <LocationSelect navigation={navigation}/>
        </View>
        <SubNavigation navigation={navigation}/>
        {/* <View style={[t.px20,t.mt20]}>
          <TeacherCategory cat={cat}/>
        </View> */}
        <View style={[t.mt30]}>
          <TeacherList teacher={trainer}/>
        </View>
        <View style={[t.py50,t.wp100]}></View>
      </ScrollView>
  );
};

export default Trainer;
