import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image';
// components
import Theimage from '../components/Theimage';
import Helper from '../config/Helper';
import Accordion from '../components/Accordion';
import {Api} from '../config/Api';
const Faq = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [faq, setfaq] = useState([]);
  const [loading, setloading] = useState(false);
  const getFaq = async () => {
    setloading(true);
    try {
      let req = await Api.faq(user.token);
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        setfaq(data);
      } else {
        console.error('Error get event');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get faq: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getFaq();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={[t.pt30, t.px20, t.faCenter, t.fjCenter]}>
        <Text style={[t['p18-600'], t.cblack, t.mt5]}>Faq</Text>
      </View>
      <View style={[t.mt30, t.px20]}>
        <View style={[t.btw1, t.bsolid, t.bgreye]}>
          {!loading && faq.length > 0 ? (
            faq.map((item, index) => {
              return (
                <Accordion title={item.title} content={item.faq} key={index} />
              );
            })
          ) : loading ? (
            <View style={[t.py50]}>
              <ActivityIndicator size="large" color="#FE9805" />
            </View>
          ) : (
            <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
              No FAQ
            </Text>
          )}
        </View>
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default Faq;
