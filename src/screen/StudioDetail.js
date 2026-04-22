
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity, StyleSheet, Linking, Alert, Dimensions } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import RenderHTML from 'react-native-render-html';
import img from '../config/Image';
import MapView, { Marker, UrlTile, PROVIDER_DEFAULT } from 'react-native-maps';
import { WebView } from 'react-native-webview';
import { Api } from '../config/Api';
import Helper from '../config/Helper';
const StudioDetail = ({ route, navigation }) => {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width - 40;
  const { studio } = route.params || {};
  const [theStudio, setTheStudio] = useState({})
  const [loc, setloc] = useState({ latitude: -6.12879727452725, longitude: 106.69120167671443, })
  const location = { latitude: -6.12879727452725, longitude: 106.69120167671443, };
  const facilities = [{ id: 1, name: 'Free WiFi', icon: img.iconwifi }, { id: 2, name: 'Shower Rooms', icon: img.iconshower }, { id: 3, name: 'Water Station', icon: img.iconwater }, { id: 4, name: 'Air Conditioning', icon: img.iconfan },];
  const availableClasses = [
    { id: 1, title: 'Ashtanga Primary Series', duration: '90 min', schedule: 'Mon, Wed, Fri - 06:00', level: 'Intermediate' },
    { id: 2, title: 'Prenatal Yoga', duration: '60 min', schedule: 'Tue, Thu - 10:00', level: 'All Levels' },
    { id: 3, title: 'Restorative Yoga', duration: '75 min', schedule: 'Sat, Sun - 17:00', level: 'All Levels' },];
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
      <style>
        body, html, #map { margin:0; padding:0; height:100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>

      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([${loc.latitude}, ${loc.longitude}], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        L.marker([${loc.latitude}, ${loc.longitude}])
          .addTo(map)
          .bindPopup('${theStudio.deptname}')
          .openPopup();
      </script>
    </body>
    </html>
  `;
  const detail = async () => {
    try {
      let req = await Api.studioDetail(`id=${studio.id}`);
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        let longlat = data[0].location.split(',')

        let theloc = {
          latitude: parseFloat(longlat[0]),
          longitude: parseFloat(longlat[1])
        }
        setloc(theloc)
        setTheStudio(data[0])
      } else {
        console.error('Error get studio');
      }
    }
    catch (error) {
      console.error('Error get studio: ' + error);
    }
  };
  function convertToInternationalFormat(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
      return '+62' + phoneNumber.slice(1);
    }
    return phoneNumber;
  }
  useEffect(() => {
    detail();
    console.log(loc)
  }, []);
  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb10, t.px20, t.bgwhite]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Studio Detail</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[t.relative]}>
          <Image source={studio.image} style={[t.wp100, t.h250]} resizeMode="cover" />
        </View>
        <View style={[t.px20, t.mt20]}>
          <Text style={[t.cblack, t['h24-700']]}>{studio.deptname}</Text>
          <View style={[t.mt15, t.p15, t.br15, t.bw1, t.bgreye, t.bsolid]}>
            <View style={[t.fRow, t.mb10]}>
              <Image source={img.iconmap} style={[t.w18, t.h18, t.me10, t.mt2]} />
              <Text style={[t.cgrey30, t['p13-400'], { flex: 1 }]}> {studio?.alamat} </Text>
            </View>
            <View style={[t.fRow, t.mb10, t.faCenter]}>
              <Image source={img.clock} style={[t.w18, t.h18, t.me10]} />
              <Text style={[t.cgrey30, t['p13-400']]}>{studio?.open}</Text>
            </View>
            <View style={[t.fRow, t.faCenter]}>
              <Image source={img.phonecall} style={[t.w18, t.h18, t.me10]} />
              <Text style={[t.cgrey30, t['p13-400']]}>{studio?.telp}</Text>
            </View>
          </View>
        </View>
        {theStudio.facilities?.length > 0 && (
          <View style={[t.px20, t.mt25]}>
            <Text style={[t.cblack, t['h18-700'], t.mb15]}>Facilities</Text>
            <View style={{ rowGap: 12 }}> {theStudio.facilities?.map((item) => (
              <View key={item.id} style={[t.fRow, t.faCenter]}>
                <Image source={img.iconcheckmarkblack} style={[t.w24, t.h24, t.me15]} />
                <Text style={[t.cblack, t['p14-500']]}>{item.name}</Text>
              </View>
            ))}
            </View>
          </View>)}
        {theStudio.available_classes?.length > 0 && (
          <View style={[t.px20, t.mt30]}>
            <View style={[t.p20, t.br20, t.bw1, t.bgreye, t.bsolid]}>
              <Text style={[t.cblack, t['h16-700'], t.mb15]}>Available Classes</Text>
              {theStudio.available_classes.map((item, index) => (
                <View key={item.id} style={[t.py15, index !== 0 && t.btw1, index !== 0 && t.bgreye, index !== 0 && t.bsolid]}>
                  <View style={[t.fRow, t.fjBetween, t.faStart]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[t.cblack, t['h15-600']]}>{item.nama_kelas}</Text>
                      <Text style={[t.cgrey60, t['p12-400'], t.mt2]}>
                        {item.duration_kelas} Min • {Helper.formatDate(item.tgl_schedule, 'DD MMM YYYY')}
                      </Text>
                    </View>
                    <View style={[{ backgroundColor: '#FFF2E6' }, t.px10, t.py4, t.br20]}>
                      <Text style={[t.cfreshorange, t['p10-600']]}>{item.level_kelas}</Text>
                    </View>
                  </View>
                </View>))}
            </View>
          </View>)}
        {theStudio.teachers?.length > 0 && (
          <View style={[t.px20, t.mt30]}>
            <Text style={[t.cblack, t['h18-700'], t.mb15]}>Our Instructors</Text>
            {theStudio.teachers?.map((ins, idx) => (
              <View key={idx} style={[t.fRow, t.faCenter, t.fjBetween, t.mb15]}>
                <View style={[t.fRow, t.faCenter]}>
                  <Image source={img.trainericon} style={[t.w50, t.h50, t.br100, t.me15]} />
                  <View>
                    <Text style={[t.cblack, t['h15-600']]}>{ins.name}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text style={[t.cgrey30, t['p13-600'], t.tUnder]}>See Details</Text>
                </TouchableOpacity>
              </View>)
            )}
          </View>)}
        {/* Location Map Section */}
        <View style={[t.px20, t.mt25, t.mb40]}>
          <View style={[t.p20, t.br20, t.bw1, t.bgreye, t.bsolid]}>
            <Text style={[t.cblack, t['h18-700'], t.mb15]}>Location</Text>

            <View style={[t.br20, t.overflowHidden, t.bw1, t.bgreye, t.bsolid]}>
              <Image
                source={img.mapsample}
                style={[t.wp100, t.h200, { position: 'absolute' }]}
              />
              {/* <MapView
                provider={PROVIDER_DEFAULT} // 🔥 ini penting
                style={[t.wp100, t.h200]}
                initialRegion={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                mapType="none"
              >
                <UrlTile
                  urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maximumZ={19}
                />

                <Marker
                  coordinate={{
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                  }}
                  title="Lokasi"
                  description="Titik yang kamu kirim"
                />
              </MapView> */}
              <WebView originWhitelist={['*']} source={{ html }} style={[t.wp100,t.h200]}/>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[t.px20, t.pb30, t.pt10, t.bgwhite]}>
        <TouchableOpacity style={[t.bgneworange, t.py15, t.br12, t.fRow, t.fjCenter, t.faCenter]} onPress={() => { Helper.sendWhatsapp(`Hi Yogafit i want to know more about this ${studio.deptname}`,studio?.telp) }}>
          <Image source={img.whatsapp} style={[t.w24, t.h24, t.me10]} />
          <Text style={[t.cwhite, t['p16-700']]}>Chat via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>);
};

export default StudioDetail;