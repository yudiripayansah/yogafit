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
import WorkshopItem from '../components/WorkshopItem';
// api
import {Api} from '../config/Api';
const Workshop = ({navigation}) => {
  const t = useContext(ThemeContext);
  const [workshop, setworkshop] = useState('');
  const [loading, setloading] = useState(false);
  const getWorkshop = async () => {
    setloading(true);
    try {
      let req = await Api.workshop();
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        data.map((item, i) => {
          item.dTitle = item.workshop;
          item.dText = `<div>
                          Teacher: ${item.teacher}<br/>
                          Date: ${item.tanggal}<br/>
                          Studio: ${item.studio}<br/>
                          Level: ${item.level}<br/>
                          Duration: ${item.durasi}<br/><br/>
                          <b>Description: </b><br/>
                          ${item.desc_workshop}
                        </div>
                        `;
        });
        setworkshop(data);
      } else {
        setworkshop([]);
      }
      setloading(false);
    } catch (error) {
      console.error('Error get workshop: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getWorkshop();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20, t.bggreye, t.pt70]}>
        <LocationSelect navigation={navigation} />
      </View>
      <SubNavigation navigation={navigation} />
      <View style={[t.mt20, t.px20]}>
        {!loading && workshop.length > 0 ? (
          workshop.map((item, index) => {
            return (
              <WorkshopItem
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
            No Available Workshop
          </Text>
        )}
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default Workshop;
