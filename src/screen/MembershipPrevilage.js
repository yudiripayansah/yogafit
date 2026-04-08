import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import img from '../config/Image';

const { width } = Dimensions.get('window');
const MembersPrivilege = ({ navigation }) => {
  const t = useContext(ThemeContext);

  // Data dummy untuk daftar penawaran
  const offers = [
    { id: '1', title: '50% OFF FIRST CLASS', expiry: 'Nov 30, 2025' },
    { id: '2', title: '50% OFF FIRST CLASS', expiry: 'Nov 30, 2025' },
    { id: '3', title: '50% OFF FIRST CLASS', expiry: 'Nov 30, 2025' },
    { id: '4', title: '50% OFF FIRST CLASS', expiry: 'Nov 30, 2025' },
    { id: '5', title: '50% OFF FIRST CLASS', expiry: 'Nov 30, 2025' },
    { id: '6', title: '50% OFF FIRST CLASS', expiry: 'Nov 30, 2025' },
    { id: '7', title: '50% OFF FIRST CLASS', expiry: 'Nov 30, 2025' },
    { id: '8', title: '50% OFF FIRST CLASS', expiry: 'Nov 30, 2025' },
  ];

  const renderOfferCard = ({ item }) => (
    <View style={[t.mb20, t.shadow, { overflow: 'visible' }]}>
      {/* Gunakan ImageBackground dengan source gambar kupon yang memiliki 
         lekukan (cut-out) di sisi kiri dan kanan sesuai desain 
      */}
      <ImageBackground
        source={img.bgCouponTicket}
        style={[t.wp100, { height: 160, flexDirection: 'row', alignItems: 'center' }]}
        imageStyle={{ borderRadius: 15 }}
      >
        {/* Sisi Kiri: Gambar Pose Yoga */}
        <View style={{ flex: 1.2, paddingLeft: 20 }}>
          <Image
            source={img.yogaPosePromo}
            style={{ width: '100%', height: 120, resizeMode: 'contain' }}
          />
        </View>

        {/* Sisi Kanan: Detail Promo */}
        <View style={{ flex: 2, paddingHorizontal: 15 }}>
          <View style={[t.fRow, t.faCenter, t.mb5]}>
            <Image source={img.iconLotus} style={[t.w15, t.h15, t.me5]} />
            <Text style={[t['h10-400'], { color: '#666' }]}>Yoga Fit Journey</Text>
          </View>

          <Text style={[{ fontSize: 20, fontWeight: 'bold', color: '#1A3A3A', lineHeight: 24 }]}>
            {item.title}
          </Text>

          <Text style={[t.mt10, t['p10-400'], t.cgrey60]}>
            Start Your Yoga Journey{'\n'}New Member Special
          </Text>

          <View style={[t.fRow, t.fjBetween, t.faCenter, t.mt15]}>
            <Text style={[t['p10-400'], t.cgrey60]}>Valid until {item.expiry}</Text>
            <TouchableOpacity
              style={[t.bgwhite, t.px15, t.py6, t.br20, t.bw1, { borderColor: '#E5E7EB' }]}
              onPress={() => navigation.navigate('PrivilegeDetail', { id: item.id })}
            >
              <Text style={[t.corange, t['h10-700']]}>View Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Custom Header */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb15, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Member's Privilege</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[t.pb40]}>
        <View style={[t.px20]}>
          <Text style={[t.cgrey30, t['h14-600'], t.mb15]}>10 Offers Available</Text>
          <View>
            {[1, 2, 3,4,5,6,7,8,9,10].map((_, i) => (
              <TouchableOpacity key={i} style={[t.mb10]}>
                <Image source={img.voucher} style={{ width: '100%', objectFit: 'contain', height: width * 0.45 }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MembersPrivilege;