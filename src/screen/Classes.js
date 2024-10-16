import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View, StatusBar, ScrollView, ActivityIndicator
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
import ClassKat from '../components/ClassKat';
// API
import Api from '../config/Api'
// Helper
import Helper from '../config/Helper';
const Classes = ({navigation}) => {
  const t = useContext(ThemeContext);
  const [classes,setClasses] = useState([])
  const [level,setlevel] = useState('All Level')
  const [loading,setloading] = useState(false)
  const classkatRef = useRef(null);
  const getClasses = async () => {
    setloading(true)
    try {
      let param = level != 'All Level' ? 'class_level='+level : ''
      let req = await Api.classes(param)
      if(req.status === 200 || req.status == 201){
        let {data} = req.data
        data.map((item,i) => {
          item.textStyle = i%2 === 0 ? t.bgfreshorange : t.bgorange
          item.dImage = {uri:item.file}
          item.dTitle = item.class_name
          item.dText = `<div>
                          Capacity: ${item.capacity}<br/>
                          Category: ${item.class_kat}<br/>
                          Level: ${item.level}<br/>
                          Duration: ${item.duration} Mins<br/>
                          Virtual Class: ${item.virtual_class}<br/><br/><br/>
                          <b>Benefit: </b><br/>
                          ${item.class_benefit}<br/>
                          <b>Facilities: </b><br/>
                          ${item.class_facilities}<br/>
                          <b>Description: </b><br/>
                          ${item.class_desc}
                        </div>
                        `
        })
        setClasses(data)
      } else {
        setClasses([])
        console.error("Error get classes")
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }
  useEffect(() => {
    getClasses()
  }, [level]);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20,t.bggreye,t.pt70]}>
        <LocationSelect navigation={navigation}/>
      </View>
      <SubNavigation navigation={navigation}/>
      <View style={[t.mt20, t.px20]}>
        <ClassesSelect navigation={navigation} onPress={() => {classkatRef.current?.show();}} level={level}/>
        {!loading ? classes.map((item,index) => {
          return (
            <ClassesItem navigation={navigation} data={item} key={index} boxStyle={[t.mt10]}/>
          )
        }) : (<View style={[t.py50]}><ActivityIndicator size="large" color="#FE9805" /></View>)}
      </View>
      <View style={[t.py50,t.wp100]}></View>
      <ClassKat classkatRef={classkatRef} onSelectLevel={(level)=>{setlevel(level)}}/>
    </ScrollView>
  );
};

export default Classes;
