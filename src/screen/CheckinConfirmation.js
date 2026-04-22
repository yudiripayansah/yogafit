import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import img from '../config/Image';

const CheckInConfirmation = ({ navigation }) => {
  const t = useContext(ThemeContext);

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb15, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Check-In Class Confirmation</Text>
        </View>
      </View>

      <View style={[t.flex1, t.faCenter, t.pt40]}>
        {/* Success Icon */}
        <Image source={img.bookingconfirm} style={[t.w150, t.h150]} />

        <Text style={[ t.cblack, { fontSize: 24, fontWeight: '800' }]}>QR Code Valid</Text>
        <Text style={[t.mt10, t.cgrey60, t['h16-400']]}>Check-In Confirmed!</Text>

        {/* Booking Card */}
        <View style={[t.mt40, t.p30, t.br25, t.bw1, { borderColor: '#F3F4F6', width: '90%' }]}>
          <Text style={[t.cgrey30, t['h14-400']]}>Booking ID</Text>
          <Text style={[t.corange, t['h16-700'], t.mb20]}>BKG-20251126-001</Text>

          <Text style={[t.cblack, { fontSize: 20, fontWeight: '700' }, t.mb20]}>
            Mindfulness & Meditation{'\n'}Essentials
          </Text>

          {/* Details Row */}
          <View style={[t.fRow, t.faCenter, t.mb15]}>
            <Image source={img.iconcalendar} style={[t.w20, t.h20, t.me15, { tintColor: '#6B7280' }]} />
            <Text style={[t.cgrey60, t['p15-400']]}>November 15, 2025</Text>
          </View>

          <View style={[t.fRow, t.faCenter, t.mb15]}>
            <Image source={img.clock} style={[t.w20, t.h20, t.me15, { tintColor: '#6B7280' }]} />
            <Text style={[t.cgrey60, t['p15-400']]}>10:00 AM - 12:00 PM</Text>
          </View>

          <View style={[t.fRow, t.faCenter]}>
            <Image source={img.iconmap} style={[t.w20, t.h20, t.me15, { tintColor: '#6B7280' }]} />
            <Text style={[t.cgrey60, t['p15-400']]}>Citra Garden 8</Text>
          </View>
        </View>
      </View>

      {/* Bottom Action Buttons */}
      <View style={[t.px20, t.pb50]}>
        <TouchableOpacity 
          style={[t.bgwhite, t.py12, t.br15, t.bw1, { borderColor: '#1C1C1E' }, t.mb15]}
          onPress={() => navigation.navigate('ScanQR')}
        >
          <Text style={[t.cblack, t['h16-600'], t.tCenter]}>Scan Another Code</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[t.py10]}
          onPress={() => navigation.navigate('MyBooking')}
        >
          <Text style={[t.cblack, t['h16-400'], t.tCenter]}>View Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#10B981', // Hijau sukses
    justifyContent: 'center',
    alignItems: 'center',
    // Memberikan efek shadow/glow seperti di gambar
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  }
});

export default CheckInConfirmation;