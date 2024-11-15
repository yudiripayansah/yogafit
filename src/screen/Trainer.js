import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
// components
import LocationSelect from '../components/LocationSelect';
import SubNavigation from '../components/SubNavigation';
import TeacherList from '../components/TeacherList';
// API
import {Api} from '../config/Api';
// assets
import img from '../config/Image';
const Trainer = ({navigation}) => {
  const t = useContext(ThemeContext);
  const cat = ['Man', 'Woman', 'Basic', 'Advance', 'Pro Pirce'];
  const [trainer, setTrainer] = useState([]);
  const [loading, setloading] = useState(false);
  const getTrainer = async () => {
    setloading(true);
    try {
      let req = await Api.trainer();
      if (req.status === 200) {
        let {data} = req.data;
        data.map(item => {
          item.foto = {uri: item.foto};
          item.placeholder = img.teacher;
        });
        setTrainer(data);
      } else {
        console.error('Error get trainer');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get trainer: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getTrainer();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20, t.bggreye, t.pt70]}>
        <LocationSelect navigation={navigation} />
      </View>
      <SubNavigation navigation={navigation} />
      {/* <View style={[t.px20,t.mt20]}>
          <TeacherCategory cat={cat}/>
        </View> */}
      <View style={[t.mt30]}>
        {!loading && trainer.length > 0 ? (
          <TeacherList teacher={trainer} navigation={navigation} />
        ) : loading ? (
          <View style={[t.py50]}>
            <ActivityIndicator size="large" color="#FE9805" />
          </View>
        ) : (
          <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
            No Available Schedule
          </Text>
        )}
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default Trainer;
