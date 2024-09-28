import React, {useEffect, useContext, useState} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
// assets
import img from '../config/Image'
// components
import SubNavigation from '../components/SubNavigation';
import LocationSelect from '../components/LocationSelect';
import LocationItem from '../components/LocationItem';
// API
import Api from '../config/Api'
const Location = ({navigation}) => {
  const t = useContext(ThemeContext);
  const [city, setCity] = useState('Pilih Kota');
  const [studio, setStudio] = useState([]);
  const locationList = [
    {
      name: "Gandaria",
      location: "Jakarta",
      distance: "2Km",
      rating: "4.8",
      ratingCount: 200,
      image: img.yogafitLocation,
      freq: "Sedang",
      time: "07:00 - 21:00",
    },
    {
      name: "Kelapa Gading",
      location: "Jakarta",
      distance: "2Km",
      rating: "4.8",
      ratingCount: 200,
      image: img.yogafitLocation,
      freq: "Sedang",
      time: "07:00 - 21:00",
    },
    {
      name: "Pluit",
      location: "Jakarta",
      distance: "2Km",
      rating: "4.8",
      ratingCount: 200,
      image: img.yogafitLocation,
      freq: "Sedang",
      time: "07:00 - 21:00",
    },
    {
      name: "Gandaria",
      location: "Jakarta",
      distance: "2Km",
      rating: "4.8",
      ratingCount: 200,
      image: img.yogafitLocation,
      freq: "Sedang",
      time: "07:00 - 21:00",
    },
    {
      name: "Kelapa Gading",
      location: "Jakarta",
      distance: "2Km",
      rating: "4.8",
      ratingCount: 200,
      image: img.yogafitLocation,
      freq: "Sedang",
      time: "07:00 - 21:00",
    },
  ]
  const getStudio = async () => {
    try {
      let req = await Api.studio()
      if(req.status === 200 || req.status === 201){
        let {data} = req.data
        data.map((item) => {
          item.distance = "2 Km"
          item.image = img.yogafitLocation
          item.freq = "Sedang"
          item.rating= "4.8"
          item.ratingCount= 200
        })
        setStudio(data)
      } else {
        console.error("Error get studio")
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getStudio()
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20,t.bggreye,t.pt70]}>
        <LocationSelect navigation={navigation}/>
      </View>
      <SubNavigation navigation={navigation}/>
      <View style={[t.mt20, t.px20]}>
        <View style={[t.fRow,t.faCenter,t.fjBetween]}>
          <View style={[t.h60,t.wp45]}>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue, itemIndex) =>
                setCity(itemValue)
              }
              style={[t.cblack,t.bggreyd,t['p10-400']]}
              itemStyle={[t['p10-400'],t.p10]}>
              <Picker.Item label="Jakarta" value="Jakarta" />
              <Picker.Item label="Bogor" value="Bogor" />
              <Picker.Item label="Depok" value="Depok" />
              <Picker.Item label="Tanggerang" value="Tanggerang" />
              <Picker.Item label="Bekasi" value="Bekasi" />
            </Picker>
          </View>
          <View style={[t.h60,t.wp45]}>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue, itemIndex) =>
                setCity(itemValue)
              }
              style={[t.cblack,t.bggreyd,t['p10-400']]}
              itemStyle={[t['p10-400'],t.p10]}>
              <Picker.Item label="Rating" value="Rating" />
              <Picker.Item label="Distance" value="Distance" />
              <Picker.Item label="Name" value="Name" />
              <Picker.Item label="Time" value="Time" />
              <Picker.Item label="Visitor" value="Visitor" />
            </Picker>
          </View>
        </View>
        <Text style={[t['p14-500'],t.cblack,t.mt10]}>10 Yoga Fit Studio tersedia di Indonesia</Text>
        {studio.map((item,index) => {
          return (
            <LocationItem data={item} key={index} boxStyle={[t.mt10]}/>
          )
        })}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Location;
