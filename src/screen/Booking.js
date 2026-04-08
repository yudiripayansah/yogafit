import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  StatusBar,
  ScrollView, // Gunakan dari react-native standard
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { LocationContext } from '../context/LocationContext';
import LocationSelect from '../components/LocationSelect';
// API
import {Api} from '../config/Api';
const Bookings = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const studio = useContext(LocationContext);
  const [activeTab, setActiveTab] = useState('Upcoming');

  const [bookingList, setBookingList] = useState([
    { id: 1, title: 'Evening Relaxation', master: 'Master Rakesh', time: '08:00 - 09:00 AM', location: 'Citra Garden 8', status: 'Confirmed' },
    { id: 2, title: 'Evening Relaxation', master: 'Master Rakesh', time: '08:00 - 09:00 AM', location: 'Citra Garden 8', status: 'Confirmed' },
    { id: 3, title: 'Morning Yoga', master: 'Master Yoga', time: '06:00 - 07:00 AM', location: 'Citra Garden 8', status: 'Confirmed' },
  ]);

  const [booking, setbooking] = useState([]);
  const [loading, setloading] = useState(false);
  const getBooking = async () => {
    setloading(true);
    try {
      let req = await Api.myBookingHistory({}, user.token);
      if(activeTab == 'Upcoming'){
        req = await Api.myBooking({}, user.token);
      }
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
  useEffect(() => {
    getBooking();
  }, [activeTab]);

  return (
    // PASTI-KAN View utama punya flex: 1
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
      
      {/* HEADER - Static Area */}
      <View style={{ flexShrink: 0 }}> 
        <View style={[t.px20, t.pt70]}>
          <Text style={[t.cblack, t['h18-600']]}>Bookings</Text>
          <Text style={[t.cgrey60, t['h12-500']]}>Manage your bookings and history</Text>
        </View>

        <View style={[t.px20, t.mt20]}>
          <LocationSelect navigation={navigation} />
        </View>

        {/* TAB NAVIGATION - Perbaikan Lebar 50% */}
        <View style={[t.px20, t.mt20, t.fRow, { width: '100%', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
          <Pressable 
            style={[
              { flex: 1, paddingVertical: 15, alignItems: 'center' },
              activeTab === 'Upcoming' ? { borderBottomWidth: 2, borderBottomColor: '#FE9805' } : null
            ]} 
            onPress={() => setActiveTab('Upcoming')}
          >
            <Text style={[activeTab === 'Upcoming' ? t.cblack : t.cgrey90, t['h16-400']]}>Upcoming</Text>
          </Pressable>

          <Pressable 
            style={[
              { flex: 1, paddingVertical: 15, alignItems: 'center' },
              activeTab === 'History' ? { borderBottomWidth: 2, borderBottomColor: '#FE9805' } : null
            ]} 
            onPress={() => setActiveTab('History')}
          >
            <Text style={[activeTab === 'History' ? t.cblack : t.cgrey90, t['h16-400']]}>History</Text>
          </Pressable>
        </View>
      </View>

      {/* SCROLLABLE CONTENT AREA */}
      <View style={{ flex: 1 }}> 
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#FE9805" style={{ marginTop: 50 }} />
          ) : booking.length > 0 ? (
            booking.map((item, index) => (
              <View key={index} style={[styles.card, t.mb20]}>
                <View style={[t.fRow, t.fjBetween, t.faCenter]}>
                  <View>
                    <Text style={[t.cblack, t['h16-600']]}>{item.class_name}</Text>
                    <Text style={[t.cgrey60, t['h14-400'], t.mt5]}>{item.name}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.class_level}</Text>
                  </View>
                </View>

                <View style={[t.mt15]}>
                  <Text style={[t.cgrey60, t['h12-500'], t.mb5]}>🕒 {item.start_time}-{item.end_time}</Text>
                  <Text style={[t.cgrey60, t['h12-500']]}>📍 {item.alamat}</Text>
                </View>

                {/* Buttons */}
                {activeTab == 'Upcoming' && (
                  <View style={[t.fRow, t.fjBetween, t.mt20]}>
                    <TouchableOpacity style={[styles.btnAction, t.bggreye]}>
                      <Text style={[t.cblack, t['h12-600']]}>View Detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#000' }]}>
                      <Text style={[t.cblack, t['h12-600']]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#FE9805', flex: 1.2 }]}>
                      <Text style={[t.cwhite, t['h12-600']]}>Check-In</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          ) : (
            <View>
              <Text style={[t.tCenter,t.py50,t['h14-400'],t.cgrey60]}>{activeTab == 'Upcoming' ? 'You don\'t have any Upcoming Booking available' : 'You don\'t have any History Booking available'}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusBadge: {
    backgroundColor: '#F0F4F0',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    color: '#6B8E6B',
    fontSize: 12,
    fontWeight: '700',
  },
  btnAction: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 6,
  }
});

export default Bookings;