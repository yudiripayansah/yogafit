import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
// assets
import img from '../config/Image';

const BookingConfirmation = ({ navigation, route }) => {
  const t = useContext(ThemeContext);

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header Area */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb20, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Booking Confirmation</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[t.px20, t.pb40]}
      >
        {/* Success Icon Section */}
        <View style={[t.faCenter, t.my40]}>
          <Image source={img.bookingconfirm} style={[t.w160, t.h160]} />
          <Text style={[t.cblack, t['p22-700']]}>Booking Confirmed!</Text>
          <Text style={[t.cgrey60, t['p14-400'], t.mt5]}>You're all set for the workshop</Text>
        </View>

        {/* Info Card */}
        <View style={[t.p25, t.br20, t.bgwhite, t.bw1, t.bgreye, t.bsolid]}>
          <Text style={[t.cblack, t['p18-700'], t.mb20]}>Mindfulness & Meditation Essentials</Text>

          <View style={[t.fRow, t.faCenter, t.mb15]}>
            <Image source={img.iconcalendar} style={[t.w20, t.h20, t.me15]} />
            <Text style={[t.cgrey30, t['p14-500']]}>November 15, 2025</Text>
          </View>

          <View style={[t.fRow, t.faCenter, t.mb15]}>
            <Image source={img.clock} style={[t.w20, t.h20, t.me15]} />
            <Text style={[t.cgrey30, t['p14-500']]}>10:00 AM - 12:00 PM</Text>
          </View>

          <View style={[t.fRow, t.faCenter]}>
            <Image source={img.iconmap} style={[t.w20, t.h20, t.me15]} />
            <Text style={[t.cgrey30, t['p14-500']]}>Citra Garden 8</Text>
          </View>
        </View>

        {/* List "What to Bring" */}
        <View style={[t.mt30]}>
          <Text style={[t.cblack, t['p14-700'], t.mb10]}>What to Bring:</Text>
          <View style={[t.ps10]}>
            {['Comfortable clothing', 'Yoga mat (or use ours)', 'Water bottle', 'Open mind and positive energy'].map((item, index) => (
              <Text key={index} style={[t.cgrey40, t['p14-400'], t.mb5]}>• {item}</Text>
            ))}
          </View>
        </View>

        {/* Important Reminder Box */}
        <View style={[t.mt30, t.p20, t.br15, { backgroundColor: '#FFF9F1', borderLeftWidth: 4, borderLeftColor: '#FF7133' }]}>
          <Text style={[{color:'#7E2A0C'}, t['h14-700'], t.mb5]}>Important Reminder</Text>
          <Text style={[{color:'#CA3500'}, t['h14-400'], { lineHeight: 18 }]}>
            Your class starts in 30 minutes. Don't forget to bring your mat and water bottle!
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[t.bgneworange, t.py10, t.br12, t.faCenter, t.mt40]}
          onPress={() => navigation.navigate('Bookings')}
        >
          <Text style={[t.cwhite, t['h14-500']]}>View My Bookings</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default BookingConfirmation;