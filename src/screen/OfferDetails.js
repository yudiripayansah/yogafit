import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
import img from '../config/Image';
import { ScrollView } from 'react-native-gesture-handler';
import Helper from '../config/Helper';
export default function OfferDetailsScreen({ route, navigation }) {
  const t = useContext(ThemeContext);
  const {offers} = route.params
  const terms = [
    'Valid for new members only',
    'One-time use per account',
    'Cannot be combined with other offers',
    'Auto-renewal after trial period',
    'Cancel anytime during trial',
    'Must claim through sales team',
  ];

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER — SAMA SEPERTI SCREEN KAMU */}
      <View
        style={[
          t.fRow,
          t.fjBetween,
          t.faCenter,
          t.bgwhite,
          t.pt50,
          t.pb10,
          t.pe20,
        ]}
      >
        <View style={[t.fRow, t.faCenter, { columnGap: 15 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={img.backBtn} style={[t.w48, t.h48]} />
          </TouchableOpacity>

          <Text style={[t['h18-500'], t.cblack]}>
            Offer Details
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[t.px20]}
      >
        {/* BANNER */}
        <Image
          source={offers.image} // pastikan ada di Image config
          style={[styles.banner, t.mb25]}
          resizeMode="cover"
        />

        {/* OFFER CARD */}
        <View style={[styles.offerCard, t.mb30]}>
          <Text style={[t['h20-600'], t.cblack, t.mb10]}>
            {offers.title}
          </Text>

          <Text style={[t['h13-500'], t.cgrey90, t.mb20]}>
            {Helper.daysRemaining(offers.end_date)} days left  •  Valid until {Helper.formatDate(offers.end_date, 'DD MMMM YYYY')}
          </Text>

          <View style={[styles.infoBox]}>
            <View style={[t.fRow, { columnGap: 10 }]}>
              <Text style={styles.infoIcon}>!</Text>
              <View style={{ flex: 1 }}>
                <Text style={[t['h14-600'], t.corange]}>
                  Information Only:
                </Text>
                <Text style={[t['h14-500'], t.cgrey90]}>
                  To claim this promo, please chat with our sales team using the button below.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ABOUT */}
        <Text style={[t['h18-600'], t.cblack, t.mb10]}>
          About This Offer
        </Text>

        <Text style={[t['h15-500'], t.cgrey90, t.mb25]}>
          Get premium access to all classes, workshops, and events for 3 months absolutely free
        </Text>

        {/* TERMS */}
        <View style={[styles.termsBox, t.mb30]}>
          <View style={[t.fRow, t.faCenter, t.mb15, { columnGap: 10 }]}>
            <Text style={styles.termIcon}>!</Text>
            <Text style={[t['h16-600'], t.corange]}>
              Terms & Conditions
            </Text>
          </View>

          {terms.map((item, index) => (
            <View
              key={index}
              style={[t.fRow, t.mb10, { columnGap: 10 }]}
            >
              <View style={styles.bullet} />
              <Text style={[t['h14-500'], t.cgrey90, { flex: 1 }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={[styles.claimBtn, t.mb40]} onPress={()=>{Helper.sendWhatsapp('Hi i want to know more about the Offers on Yogafit!')}}>
          <Text style={[t['h16-600'], { color: '#fff' }]}>
            Chat Sales to Claim
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 16,
  },

  offerCard: {
    borderWidth: 2,
    borderColor: '#F28C18',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#fff',
  },

  infoBox: {
    borderWidth: 1,
    borderColor: '#F2C94C',
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#FFF8E6',
  },

  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F28C18',
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },

  termsBox: {
    borderWidth: 1,
    borderColor: '#F28C18',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#FFF7ED',
  },

  termIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F28C18',
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 22,
  },

  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F28C18',
    marginTop: 8,
  },

  claimBtn: {
    backgroundColor: '#F28C18',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
});