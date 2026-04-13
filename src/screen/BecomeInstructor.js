import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import img from '../config/Image';

import helper from '../config/Helper';

// components
import RenderHTML from 'react-native-render-html';
import { Api } from '../config/Api';
const BecomeInstructor = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const screenWidth = Dimensions.get('window').width - 40;
  const [instructor, setinstructor] = useState([]);
  const [loading, setloading] = useState(false);
  const getInstructor = async () => {
    setloading(true);
    try {
      let req = await Api.getInstructor(user.token);
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        setinstructor(data);
      } else {
        console.error('Error get event');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get instructor: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getInstructor();
  }, []);
  const benefits = [
    {
      title: 'Share Your Passion',
      desc: 'Inspire and guide students on their yoga journey',
      icon: img.iconusersblue,
      bgColor: '#F0F7FF',
    },
    {
      title: 'Flexible Schedule',
      desc: 'Choose your own teaching hours and availability',
      icon: img.iconcalendarpurple,
      bgColor: '#FDF2F8',
    },
    {
      title: 'Professional Growth',
      desc: 'Continuous training and development opportunities',
      icon: img.iconbadgegreen,
      bgColor: '#F0FDF4',
    },
    {
      title: 'Community Impact',
      desc: 'Be part of a supportive wellness community',
      icon: img.iconlovepink,
      bgColor: '#FFF1F2',
    },
  ];

  const requirements = [
    'You must be at least 18 years old',
    'You should have a deep passion for yoga and engage in daily personal practice',
    'You must hold a yoga certification from a reputable institution',
    'You should have completed a minimum of a 200-hour yoga teacher training course',
    'You must possess a basic understanding of teaching methodology, yoga anatomy, yoga philosophy, and ethics',
    'You should have CPR and first aid certification',
    'You must keep your yoga certifications up to date and renew them as needed',
  ];

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header Navigation */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb15, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Become an Instructor</Text>
          <Text style={[t['p12-400'], t.cgrey30]}>Join our teaching community</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Intro Section */}
        <View style={[t.px20, t.mt20]}>
          <Text style={[t.cblack, { fontSize: 26, fontWeight: '800', lineHeight: 32 }]}>
            Join Our Team of Instructors
          </Text>
          <Text style={[t.cgrey60, t.mt15, t['p14-400'], { lineHeight: 22 }]}>
            Although you must have a yoga teacher trainer certificate, you can have any educational background and still become a yoga trainer. All you need is the passion for yoga and teaching it to others. Such are the benefits, that once you step inside the world of yoga, you will only immerse yourself more and more into it.
          </Text>
        </View>

        {/* Why Teach With Us - Grid Section */}
        <View style={[t.px20, t.mt30]}>
          <Text style={[t.cblack, t['h18-700'], t.mb20]}>Why Teach With Us?</Text>
          <View style={[t.fRow, t.fWrap, t.fjBetween, { flexWrap: 'wrap' }]}>
            {benefits.map((item, index) => (
              <View
                key={index}
                style={[
                  t.p20, t.br20, t.mb15,
                  { width: '48%', backgroundColor: item.bgColor }
                ]}
              >
                <Image source={item.icon} style={[t.w40, t.h40, t.mb5]} />
                <Text style={[t.cblack, t['h14-700'], t.mb5]}>{item.title}</Text>
                <Text style={[t.cgrey60, t['p11-400'], { lineHeight: 16 }]}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Requirements Section */}
        <View style={[t.px20, t.mt20, t.mb30]}>
          <Text style={[t.cblack, t['h18-700'], t.mb15]}>Requirements</Text>
          <View style={[t.p25, t.br25, t.bw1, { borderColor: '#F3F4F6', backgroundColor: '#fff' }]}>
            {requirements.map((req, index) => (
              <View key={index} style={[t.fRow, t.mb15]}>
                <Image source={img.iconcheckmarkblack} style={[t.w18, t.h18, t.me12, { tintColor: '#456A58' }]} />
                <Text style={[t.cgrey60, t.flex1, t['p13-400'], { lineHeight: 20 }]}>
                  {req}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[t.btw1,t.px20, t.bsolid, t.bgreye]}>
          {!loading && instructor.length > 0 ? (
            instructor.map((item, index) => {
              return (
                <View key={index} style={[t.mt10]}>
                  <Text style={[t['p18-600'], t.cblack, t.mt5]}>{item.title}</Text>
                  <RenderHTML
                    contentWidth={screenWidth}
                    style={[t.cblack, t['p12-500']]}
                    tagsStyles={{
                      div: { color: 'black' },
                    }}
                    source={{ html: `<div>${item.desc}</div>` }}
                  />
                </View>
              );
            })
          ) : loading ? (
            <View style={[t.py50]}>
              <ActivityIndicator size="large" color="#FE9805" />
            </View>
          ) : (
            <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
              No Data to Show
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Footer Button */}
      <View style={[t.p20, t.btw1, { borderColor: '#F3F4F6' }]}>
        <TouchableOpacity
          style={[t.bgneworange, t.py15, t.br15, t.fRow, t.faCenter, t.fjCenter]}
          onPress={() => {
            helper.sendWhatsapp(`Hi Yogafit!, i want to know more about Become an Instructor at Yogafit Indonesia!`)
          }}
        >
          <Image source={img.whatsapp} style={[t.w20, t.h20, t.me10, { tintColor: '#fff' }]} />
          <Text style={[t.cwhite, t['h16-700']]}>Chat on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BecomeInstructor;