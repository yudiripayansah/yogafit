import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
// assets
import img from '../config/Image';
// components
import SubNavigation from '../components/SubNavigation';
import LocationSelect from '../components/LocationSelect';
import CalendarSelect from '../components/CalendarSelect';
import EventItem from '../components/EventItem';
// api
import {Api} from '../config/Api';
const Events = ({navigation}) => {
  const t = useContext(ThemeContext);
  const [event, setevent] = useState('');
  const [loading, setloading] = useState(false);
  const getEvent = async () => {
    setloading(true);
    try {
      let req = await Api.event();
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        setevent(data);
        data.map((item, i) => {
          item.dImage = {uri: item.gambar};
          item.dTitle = item.desc_event;
          item.dText = `<div>
                          Date: ${item.tanggal}<br/>
                        </div>
                        `;
        });
      } else {
        setevent([]);
      }
      setloading(false);
    } catch (error) {
      console.error('Error get events: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getEvent();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20, t.bggreye, t.pt70]}>
        <LocationSelect navigation={navigation} />
      </View>
      <SubNavigation navigation={navigation} />
      <View style={[t.mt20, t.px20]}>
        {!loading && event.length > 0 ? (
          event.map((item, index) => {
            return (
              <EventItem
                data={item}
                key={index}
                boxStyle={[t.mt10]}
                navigation={navigation}
              />
            );
          })
        ) : loading ? (
          <View style={[t.py50]}>
            <ActivityIndicator size="large" color="#FE9805" />
          </View>
        ) : (
          <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
            No Available Events
          </Text>
        )}
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default Events;
