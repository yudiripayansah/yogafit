import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  ActivityIndicator
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image';
// components
import Theimage from '../components/Theimage';
import Helper from '../config/Helper';
import {Api} from '../config/Api';
const MyDetailActivity = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [detailactivity, setdetailactivity] = useState([]);
  const [loading, setloading] = useState(false);
  const getDetailactivity = async () => {
    setloading(true);
    try {
      let req = await Api.myActivity(user.token);
      console.log(req.data)
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        setdetailactivity(data);
        // setdetailactivity([{
        //   tanggal: '2024-11-16',
        //   type: 'class',
        //   keterangan: 'Morning Stretch'
        // }]);
      } else {
        console.error('Error get event');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get detailactivity: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getDetailactivity();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={[t.pt30, t.px20, t.faCenter, t.fjCenter]}>
        <Text style={[t['p18-600'], t.cblack, t.mt5]}>My Detail Activity</Text>
      </View>
      <View style={[t.mt30, t.px20]}>
        <View style={[t.btw1, t.bsolid, t.bgreye]}>
          {!loading && detailactivity.length > 0 ? (
            detailactivity.map((item, index) => {
              return (
                <View key={index} style={[t.mt10,t.bbw1,t.bsolid,t.bgreye,t.pb10]}>
                  <Text style={[t['p14-600'], t.cblack]}>{item.type}</Text>
                  <Text style={[t['h24-400'], t.corange, t.mt5]}>{item.keterangan}</Text>
                  <Text style={[t['p12-600'], t.cblack, t.mt5]}>{Helper.dateIndo(item.tanggal)}</Text>
                </View>
              );
            })
          ) : loading ? (
            <View style={[t.py50]}>
              <ActivityIndicator size="large" color="#FE9805" />
            </View>
          ) : (
            <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
              No Data Availabe
            </Text>
          )}
        </View>
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default MyDetailActivity;
