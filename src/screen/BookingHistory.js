import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// components
import BookingSubNav from '../components/BookingSubNav';
import BookingFilter from '../components/BookingFilter';
import BookingItem from '../components/BookingItem';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
const BookingHistory = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [booking, setbooking] = useState([]);
  const [loading, setloading] = useState(false);
  const getBooking = async () => {
    setloading(true);
    try {
      let req = await Api.myBookingHistory({}, user.token);
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        setbooking(data);
      } else {
        console.error('Error get booking history');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get booking history: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getBooking();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={[t.pt70, t.px20, t.faCenter, t.fjCenter]}>
        <Text style={[t['p20-700'], t.cblack]}>Booking History</Text>
      </View>
      {/* <View style={[t.px20]}>
        <BookingSubNav navigation={navigation}/>
      </View> */}
      <View style={[t.px20, t.mt20]}>
        <BookingFilter />
      </View>
      <View style={[t.px20]}>
        {!loading && booking.length > 0 ? (
          booking.map((item, index) => {
            return (
              <BookingItem
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
            No Available Booking
          </Text>
        )}
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default BookingHistory;
