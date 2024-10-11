import React, {useEffect, useContext, useState} from 'react';
import {
  View, StatusBar, ScrollView, Text, ActivityIndicator
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
// components
import SubNavigation from '../components/SubNavigation';
import LocationSelect from '../components/LocationSelect';
import LocationItem from '../components/LocationItem';
// API
import Api from '../config/Api'
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
const Location = ({navigation}) => {
  const t = useContext(ThemeContext);
  const [studio, setStudio] = useState([]);
  const [loading,setloading] = useState(false)
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true, // Set to true to get better accuracy
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };
  const calculateDistance = (targetLocation) => {
    if(location.latitude && location.longitude){
      const calculatedDistance = getDistance(
        location,
        targetLocation
      );
      return calculatedDistance
    } else {
      return 0
    }
  };
  const getStudio = async () => {
    setloading(true)
    try {
      let req = await Api.studio()
      if(req.status === 200 || req.status === 201){
        let {data} = req.data
        data.map((item) => {
          let location = item.location.split(',')
          let targetLocation = {
            latitude: Number(location[0]),
            longitude: Number(location[1])
          }
          item.distance = Math.floor(calculateDistance(targetLocation) / 1000) + ' km'
          item.image = {uri:item.gambar}
          item.freq = "Sedang"
          item.rating= "4.8"
          item.ratingCount= 200
        })
        setStudio(data)
      } else {
        console.error("Error get studio")
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }
  useEffect(() => {
    getLocation()
  }, []);
  useEffect(() => {
    getStudio()
  }, [location]);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20,t.bggreye,t.pt70]}>
        <LocationSelect navigation={navigation}/>
      </View>
      <SubNavigation navigation={navigation}/>
      <View style={[t.mt20, t.px20]}>
        { studio.length > 0 && <Text style={[t['p14-500'],t.cblack,t.mt10]}>{studio.length} Yoga Fit Studio tersedia di Indonesia</Text> }
        {!loading ? studio.map((item,index) => {
          return (
            <LocationItem data={item} key={index} boxStyle={[t.mt10]}/>
          )
        }): (<View style={[t.py50]}><ActivityIndicator size="large" color="#FE9805" /></View>)}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Location;
