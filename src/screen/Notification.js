import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
// assets
import img from '../config/Image';
import { ScrollView } from 'react-native-gesture-handler';
const todayData = [
  { id: '1', title: 'Special Offer Available!', unread: true },
  { id: '2', title: 'Special Offer Available!', unread: true },
  { id: '3', title: 'Special Offer Available!', unread: true },
];

const yesterdayData = [
  { id: '4', title: 'Booking Confirmed', unread: false },
  { id: '5', title: 'Booking Confirmed', unread: false },
  { id: '6', title: 'Booking Confirmed', unread: false },
  { id: '7', title: 'Booking Confirmed', unread: false },
  { id: '8', title: 'Booking Confirmed', unread: false },
  { id: '9', title: 'Booking Confirmed', unread: false },
];

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },

  unreadCard: {
    borderWidth: 1,
    borderColor: '#F28C18',
    elevation: 0,
  },
});
export default function NotificationsScreen({ navigation }) {

  const NotificationCard = ({ item }) => {
    const isUnread = item.unread;

    return (
      <TouchableOpacity
        onPress={()=>navigation.navigate('OfferDetails')}
        style={[
          styles.card,
          t.faStretch,
          t.pe40,
          isUnread && styles.unreadCard,
        ]}
      >
        <Image source={img.gift} style={[t.w48, t.h48, t.me15]} />
        <View style={{ flex: 1 }}>
          <Text style={[t['h16-600'], t.cblack]}>{item.title}</Text>
          <Text style={[t['h14-500'], t.cgrey90]}>
            {isUnread
              ? 'Get 50% OFF on 3-month premium membership'
              : 'Your booking for Power Vinyasa has been confirmed'}
          </Text>

          <Text style={[t['h11-400'], t.cgrey90]}>
            {isUnread ? '2 hours ago' : 'Yesterday, 11 November'}
          </Text>
        </View>
        <View style={[t.fjBetween, t.faCenter, t.absolute, t.right0, t.top0, t.bottom0, t.p16]}>
          {isUnread && <View style={[t.bgorange, t.w10, t.h10, t.br100]} />}
          <TouchableOpacity>
            <Image source={img.trash} style={[t.h16, t.w16]} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const t = useContext(ThemeContext);

  return (
    <View>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[t.fRow, t.fjBetween, t.faCenter, t.bgwhite, t.pt50, t.pb10, t.pe20]}>
        <View style={[t.fRow, t.faCenter, { columnGap: 15 }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={img.backBtn} style={[t.w48, t.h48]} />
          </TouchableOpacity>

          <View style={[]}>
            <Text style={[t['h18-500'], t.cblack]}>
              Notifications
            </Text>
            <Text style={[t['h12-500'], t.cgreya]}>
              2 unread notifications
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={()=> navigation.navigate('NotificationSettings')}>
          <Image source={img.cog} style={[t.w24, t.h24]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[t.px20, t.pt20]}
      >
        {/* TODAY */}
        <Text style={[t['p14-700'], t.cgrey60, t.mb12]}>TODAY</Text>
        {todayData.map(item => (
          <NotificationCard key={item.id} item={item} />
        ))}

        {/* YESTERDAY */}
        <Text style={[t['p14-700'], t.cgrey60, t.mb12, t.mt25]}>
          YESTERDAY
        </Text>
        {yesterdayData.map(item => (
          <NotificationCard key={item.id} item={item} />
        ))}
        <View style={[t.pb200]}></View>
      </ScrollView>
    </View>
  );
}