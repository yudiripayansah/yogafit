import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import img from '../config/Image'; // Pastikan path icon sesuai

const DetailCourse = ({ route, navigation }) => {
  const t = useContext(ThemeContext);
  // Mengambil data kelas dari navigasi sebelumnya (ClassItem)
  const { theClass } = route.params || {};

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image dengan Background */}
        <ImageBackground
          source={img.placeholder}
          style={[t.wp100, t.h400, t.fjEnd]}
        >

          {/* Overlay Text */}
          <View style={[t.p20,t.pt50,t.fjBetween, t.absolute, t.top0,t.bottom0,t.left0,t.right0,{ backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <View style={[t.fRow,t.faCenter,t.fjBetween]}>
                {/* Back Button */}
                <TouchableOpacity 
                    style={[]}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={img.backBtn} style={[t.w40, t.h40]} />
                </TouchableOpacity>
                <View style={[{backgroundColor:'#ECF0EE'}, t.px12, t.py6, t.br5]}>
                    <Text style={[{color:'#3F6050'}, t['h12-400']]}>{theClass?.level || 'COURSES'}</Text>
                </View>
            </View>
            <View>
                <View style={[t.fRow, t.mb10, {columnGap:8}]}>
                  <View style={[{ backgroundColor: '#fff' }, t.px12, t.py4, t.br100]}>
                      <Text style={[t.corange, t['h12-600']]}>{theClass?.level || 'Beginner'}</Text>
                  </View>
                  <View style={[{ backgroundColor: '#456A58' }, t.px12, t.py4, t.br100]}>
                      <Text style={[t.cwhite, t['h12-600']]}>{theClass?.slots || '8'} spots left</Text>
                  </View>
                </View>
                <Text style={[t.cwhite, t['h28-700']]}>{theClass?.title || 'Morning Vinyasa Flow'}</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Info Duration & Capacity */}
        <View style={[t.fRow, t.px20, t.py20, t.fjBetween]}>
          <View style={[t.faCenter, { flex: 1 }]}>
            <Image source={img.clock} style={[t.w24, t.h24, t.mb5]} />
            <Text style={[t.cblack, t['h12-700']]}>60 Minutes</Text>
            <Text style={[t.cgrey, t['p10-400']]}>Duration</Text>
          </View>
          <View style={[t.faCenter, { flex: 1 }]}>
            <Image source={img.iconuser} style={[t.w24, t.h24, t.mb5]} />
            <Text style={[t.cblack, t['h12-700']]}>16 People</Text>
            <Text style={[t.cgrey, t['p10-400']]}>Confirmed</Text>
          </View>
        </View>

        {/* Schedule Details Card */}
        <View style={[t.mx20, t.p20, t.br15, t.bw1, t.bgreye, t.bsolid]}>
          <Text style={[t.cblack, t['h16-700'], t.mb15]}>Schedule Details</Text>
          
          <View style={[t.fRow, t.faCenter, t.mb10]}>
            <Image source={img.iconcalendar} style={[t.w20, t.h20, t.me15]} />
            <View>
              <Text style={[t.cgrey30, t['h12-400']]}>Date</Text>
              <Text style={[t.cblack, t['p14-700']]}>Today, November 11</Text>
            </View>
          </View>

          <View style={[t.fRow, t.faCenter, t.mb10]}>
            <Image source={img.clock} style={[t.w20, t.h20, t.me15]} />
            <View>
              <Text style={[t.cgrey30, t['h12-400']]}>Time</Text>
              <Text style={[t.cblack, t['p14-700']]}>{theClass?.time || '08:00 - 09:00 AM'}</Text>
            </View>
          </View>

          <View style={[t.fRow, t.faCenter]}>
            <Image source={img.iconmap} style={[t.w20, t.h20, t.me15]} />
            <View>
              <Text style={[t.cgrey30, t['h12-400']]}>Location</Text>
              <Text style={[t.cblack, t['p14-700']]}>{theClass?.location || 'Citra Garden 8'}</Text>
            </View>
          </View>
        </View>

        {/* What's Included */}
        <View style={[t.m20, t.p20, t.br15, { backgroundColor: '#F0FFF4' }]}>
          <Text style={[t.cblack, t['h16-700'], t.mb10]}>What's Included</Text>
          {['Master fundamental yoga poses', 'Develop a consistent personal practice', 'Learn breathing techniques', 'Build strength and flexibility'].map((item, index) => (
            <View key={index} style={[t.fRow, t.mb8]}>
              <Image source={img.iconcheckmark} style={[t.w20, t.h20, t.me10]} />
              <Text style={[t.cgrey40, t['h14-400'], { flex: 1 }]}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Instructor */}
        <View style={[t.px20, t.mb20]}>
          <Text style={[t.cblack, t['h16-700'], t.mb10]}>Your Instructor</Text>
          <View style={[t.fRow, t.faCenter]}>
            <Image 
              source={img.trainericon} 
              style={[t.w60, t.h60, t.br30, t.me15]} 
            />
            <View style={{ flex: 1 }}>
              <Text style={[t.cblack, t['h14-700']]}>Master Rakesh</Text>
              <Text style={[t.cgrey10, t['h12-400']]}>Certified yoga instructor with 10+ years of experience.</Text>
            </View>
          </View>
        </View>

        {/* About Class */}
        <View style={[t.px20, t.mb20]}>
          <Text style={[t.cblack, t['h16-700'], t.mb5]}>About This Class</Text>
          <Text style={[t.cgrey40, t['h14-400'], { lineHeight: 20 }]}>
            Start your day with an energizing flow yoga session. This dynamic practice combines breath with movement to awaken your body and mind.
          </Text>
        </View>

        {/* What to bring */}
        <View style={[t.mx20, t.mb30, t.p20, t.br15, t.bw1, t.bwarning]}>
          <Text style={[t.cblack, t['h16-700'], t.mb10]}>What to bring</Text>
          {['Suitable for all levels', 'Wear comfortable clothing', 'Bring your own mat', 'Water bottle'].map((item, index) => (
            <View key={index} style={[t.fRow, t.mb5]}>
              <Image source={img.iconwarning} style={[t.w20, t.h20, t.me10]} />
              <Text style={[t.cgrey40, t['h14-400']]}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer Button Area */}
      <View style={[t.px20, t.pb30, t.pt10, t.bgwhite]}>
        <TouchableOpacity style={[t.bgneworange, t.py10, t.br10, t.faCenter, t.fRow, t.fjCenter]}>
          <Image source={img.paperlinewhite} style={[t.w18, t.h18, t.me10, { tintColor: '#fff' }]} />
          <Text style={[t.cwhite, t['h14-600']]}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailCourse;