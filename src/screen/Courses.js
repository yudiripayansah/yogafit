import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
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
import CourseItem from '../components/CourseItem';
// api
import {Api} from '../config/Api';
const Courses = ({navigation}) => {
  const t = useContext(ThemeContext);
  const [course, setcourse] = useState('');
  const [loading, setloading] = useState(false);
  const getCourse = async () => {
    setloading(true);
    try {
      let req = await Api.course();
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        data.map((item, i) => {
          item.dTitle = item.course;
          item.dText = `<div>
                          Teacher: ${item.teacher}<br/>
                          Date: ${item.tanggal}<br/>
                          Studio: ${item.studio}<br/>
                          Duration: ${item.durasi} Mins<br/><br/>
                          <b>Description: </b><br/>
                          ${item.desc_course}
                        </div>
                        `;
        });
        setcourse(data);
      } else {
        setcourse([]);
      }
      setloading(false);
    } catch (error) {
      console.error('Error get course: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20, t.bggreye, t.pt70]}>
        <LocationSelect navigation={navigation} />
      </View>
      <SubNavigation navigation={navigation} />
      <View style={[t.mt20, t.px20]}>
        {!loading && course.length > 0 ? (
          course.map((item, index) => {
            return (
              <CourseItem
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
            No Available Courses
          </Text>
        )}
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default Courses;
