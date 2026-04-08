import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import {LocContext} from '../context/LocContext';
import {LocationContext} from '../context/LocationContext';
import ActionSheet from 'react-native-actions-sheet';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
// components
import LocationItem from '../components/LocationItem';
function LocationList({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {setLocation} = useContext(LocContext);
  const currentStudio = useContext(LocationContext);
  const {locationRef,region,nav} = props;
  const [studio, setStudio] = useState([]);
  const [loading, setloading] = useState(false);
  const [longlat, setlonglat] = useState({
    latitude: null,
    longitude: null,
  });
  const getStudio = async () => {
    setloading(true);
    let region_id = region ? region : 1
    try {
      let req = await Api.studio(user ? user.region_id : region_id);
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        let distance = 0;
        let theStudio;
        data.map((item, index) => {
          let longlat = item.location.split(',');
          let targetLocation = {
            latitude: Number(longlat[0]),
            longitude: Number(longlat[1]),
          };
          let theDistance = Math.floor(
            calculateDistance(targetLocation) / 1000,
          );
          item.distance = theDistance + ' km';
          item.image = {uri: item.gambar};
          item.freq = 'Sedang';
          item.rating = '4.8';
          item.ratingCount = 200;
          if (index == 0) {
            distance = theDistance;
          }
          theStudio = item
          if (theDistance > 0 && theDistance <= distance) {
            distance = theDistance;
            theStudio = item;
          }
        });
        // console.log(theStudio.deptname,currentStudio.deptname)
        if (theStudio && !currentStudio) {
          setLocation(theStudio);
        }
        setStudio(data);
      } else {
        console.error('Error get studio');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get studio: ' + error);
      setloading(false);
    }
  };
  const getLonglat = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setlonglat({
          latitude,
          longitude,
        });
      },
      error => {
        console.error(error.code, error.message);
      },
      {
        enableHighAccuracy: true, // Set to true to get better accuracy
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  const calculateDistance = targetLocation => {
    if (longlat.latitude && longlat.longitude) {
      const calculatedDistance = getDistance(longlat, targetLocation);
      return calculatedDistance;
    } else {
      return 0;
    }
  };
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (status === RESULTS.GRANTED) {
          getLonglat();
        } else {
          console.log(
            'Permission Denied',
            'Location permission is required to continue.',
          );
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLonglat();
        } else {
          console.log(
            'Permission Denied',
            'Location permission is required to continue.',
          );
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);
  useEffect(() => {
    getStudio();
  }, [longlat,region]);
  return (
    <ActionSheet ref={locationRef}>
      <View style={[t.bgwhite, t.wp100, t.px20, t.py20, t.brtl10, t.brtr10]}>
        <TouchableOpacity
          onPress={() => locationRef.current?.hide()}
          style={[t.faCenter,t.fRow]}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
          <Text style={[t['h18-400'], t.cblack, t.ms10]}>
            Select your studio
          </Text>
        </TouchableOpacity>
        <ScrollView style={[t.mt20]} showsVerticalScrollIndicator={false}>
          {!loading ? (
            studio.map((item, index) => {
              return (
                <LocationItem
                  data={item}
                  key={index}
                  boxStyle={[t.mt10]}
                  onSelectLocation={selectedStudio => {
                    setLocation(selectedStudio);
                    locationRef.current?.hide();
                  }}
                  onDetailLocation={selectedStudio => {
                    nav.navigate('StudioDetail', {studio: selectedStudio})
                    locationRef.current?.hide();
                  }}
                  nav={nav}
                />
              );
            })
          ) : (
            <View style={[t.py50]}>
              <ActivityIndicator size="large" color="#FE9805" />
            </View>
          )}
          <View style={[t.py25, t.wp100]}></View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
}

export default LocationList;
