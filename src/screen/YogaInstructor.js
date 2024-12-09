import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image';
// components
import RenderHTML from 'react-native-render-html';
import {Api} from '../config/Api';
const YogaInstructor = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const screenWidth = Dimensions.get('window').width - 40;
  const [instructor, setinstructor] = useState([]);
  const [loading, setloading] = useState(false);
  const getInstructor = async () => {
    setloading(true);
    try {
      let req = await Api.getInstructor(user.token);
      console.log(req.data)
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        setinstructor(data);
      } else {
        console.error('Error get event');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get instructor: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getInstructor();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={[t.pt30, t.px20, t.faCenter, t.fjCenter]}>
        <Text style={[t['p18-600'], t.cblack, t.mt5]}>Yoga Instructor</Text>
      </View>
      <View style={[t.mt30, t.px20]}>
        <View style={[t.btw1, t.bsolid, t.bgreye]}>
          {!loading && instructor.length > 0 ? (
            instructor.map((item, index) => {
              return (
                <View key={index} style={[t.mt10]}>
                  <Text style={[t['p18-600'], t.cblack, t.mt5]}>{item.title}</Text>
                  <RenderHTML
                    contentWidth={screenWidth}
                    style={[t.cblack,t['p12-500']]}
                    tagsStyles={{
                      div: { color: 'black' },
                    }}
                    source={{ html: `<div>${item.desc}</div>` }}
                  />
                </View>
              );
            })
          ) : loading ? (
            <View style={[t.py50]}>
              <ActivityIndicator size="large" color="#FE9805" />
            </View>
          ) : (
            <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
              No Data to Show
            </Text>
          )}
        </View>
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default YogaInstructor;
