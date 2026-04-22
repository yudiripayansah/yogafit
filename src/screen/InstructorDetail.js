import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import RenderHTML from 'react-native-render-html';
// assets
import img from '../config/Image';

import { Api } from '../config/Api';
import Helper from '../config/Helper';
const InstructorDetail = ({ navigation, route }) => {
  const screenWidth = Dimensions.get('window').width - 40;
  const { param } = route.params || {}
  const t = useContext(ThemeContext);
  const [teacher, setteacher] = useState({
    language: [],
    speciality: [],
    certification: [],
    available_classes: []
  })
  const detail = async () => {
    try {
      let req = await Api.teacherDetail(`id=${param.id}`);
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        let thedata = data[0]
        console.log(thedata.available_classes)
        thedata.language = thedata.language ? thedata.language : []
        thedata.certification = thedata.certification ? thedata.certification : []
        thedata.speciality = thedata.speciality ? thedata.speciality : []
        thedata.available_classes = thedata.available_classes ? thedata.available_classes : []
        setteacher(thedata)
      } else {
        console.error('Error get teacher');
      }
    } catch (error) {
      console.error('Error get teacher: ' + error);
    }
  };
  const availableClasses = [
    { id: 1, title: 'Ashtanga Primary Series', duration: '90 min', schedule: 'Mon, Wed, Fri - 06:00', level: 'Intermediate' },
    { id: 2, title: 'Prenatal Yoga', duration: '60 min', schedule: 'Tue, Thu - 10:00', level: 'All Levels' },
    { id: 3, title: 'Restorative Yoga', duration: '75 min', schedule: 'Sat, Sun - 17:00', level: 'All Levels' },
  ];
  useEffect(() => {
    detail();
  }, []);
  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Header Navigation */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb10, t.px20, t.bgwhite]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Instructor Detail</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Image with Overlay Tags */}
        <ImageBackground
          source={param.image} // Gambar Master Rakesh
          style={[t.wp100, t.h500, t.fjEnd]}
        >

          {/* Overlay Info */}
          <View style={[t.p20]}>
            <View style={[t.fRow, t.mb10, { columnGap: 10 }]}>
              <View style={[t.bgwhite, t.px12, t.py8, t.br100]}>
                <Text style={[t.corange, t['h12-600']]}>Vinyasa Flow</Text>
              </View>
              <View style={[{ backgroundColor: '#EFFFF4' }, t.px12, t.py8, t.br100, t.fRow, t.faCenter]}>
                <Image source={img.iconmedal} style={[t.w12, t.h12, t.me5, { tintColor: '#10B981' }]} />
                <Text style={[{ color: '#10B981' }, t['h12-600']]}>Certified</Text>
              </View>
            </View>
            <Text style={[t.cwhite, t['h24-700']]}>{teacher.name}</Text>
            <View style={[t.fRow, t.faCenter, t.mt5]}>
              <Image source={img.iconstarfill} style={[t.w20, t.h20, t.me5]} />
              <Text style={[t.cwhite, t['h16-700']]}>4.9</Text>
              <Text style={[t.cwhite, t['h12-400'], t.ms5]}>(156 reviews)</Text>
            </View>
          </View>
        </ImageBackground>

        {/* About Me */}
        <View style={[t.px20, t.mt25]}>
          <Text style={[t.cblack, t['h18-700'], t.mb10]}>About Me</Text>
          {/* <Text style={[t.cgrey40, t['h14-400'], { lineHeight: 22 }]}>
            Passionate yoga instructor with over 8 years of experience. I believe in the transformative power of yoga to heal mind, body, and spirit. My classes focus on proper alignment, breath awareness, and creating a safe space for all levels.
          </Text> */}
          <RenderHTML
            contentWidth={screenWidth}
            style={[t.cgrey40, t['h14-400']]}
            tagsStyles={{
              div: { color: '#444' },
            }}
            source={{ html: `<div>${teacher.desc_teacher != 'null' ? teacher.desc_teacher : '-'}</div>` }}
          />
        </View>

        {/* Languages */}
        {teacher?.language?.length > 0 && (
          <View style={[t.px20, t.mt25]}>
            <Text style={[t.cblack, t['h16-700'], t.mb12]}>Languages</Text>
            <View style={[t.fRow, { columnGap: 10 }]}>
              {teacher?.language?.map((lang, i) => (
                <View key={i} style={[t.bggreye, t.px20, t.py10, t.br100]}>
                  <Text style={[t.cgrey30, t['p14-500']]}>{lang}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Specialties */}
        {teacher?.speciality?.length > 0 && (
          <View style={[t.px20, t.mt25]}>
            <Text style={[t.cblack, t['h16-700'], t.mb12]}>Specialties</Text>
            <View style={[t.fRow, { flexWrap: 'wrap', gap: 10 }]}>
              {teacher?.speciality?.map((spec, i) => (
                <View key={i} style={[t.bggreye, t.px20, t.py10, t.br100]}>
                  <Text style={[t.cgrey30, t['p14-500']]}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {teacher?.certification?.length > 0 && (
          <View style={[t.px20, t.mt25]}>
            <Text style={[t.cblack, t['h16-700'], t.mb12]}>Certifications</Text>
            {teacher?.certification?.map((cert, i) => (
              <View key={i} style={[t.fRow, t.faCenter, t.bggreye, t.p15, t.br12, t.mb10]}>
                <Image source={img.iconcheckmarkblack} style={[t.w20, t.h20, t.me15, { tintColor: '#6B7280' }]} />
                <Text style={[t.cgrey30, t['p14-500']]}>{cert}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Available Classes Card */}
        {teacher.available_classes.length > 0 && (
          <View style={[t.px20, t.mt30, t.mb40]}>
            <View style={[t.p20, t.br20, t.bw1, t.bgwhite, t.bsolid, t.bgreye]}>
              <Text style={[t.cblack, t['h16-700'], t.mb15]}>Available Classes</Text>
              {teacher.available_classes.map((item, index) => (
                <View key={item.id} style={[t.py15, t.bgreye, index !== 0 && t.btw1, index !== 0 && t.bgwhite, index !== 0 && t.bsolid]}>
                  <View style={[t.fRow, t.fjBetween, t.faStart]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[t.cblack, t['h15-600']]}>{item.nama_kelas}</Text>
                      <Text style={[t.cgrey60, t['p12-400'], t.mt2]}>{Helper.formatDate(item.tgl_schedule,'DD MMM YYYY')} • {item.time_schedule} • {item.duration_kelas} Mins</Text>
                    </View>
                    <View style={[{ backgroundColor: '#FFF2E6' }, t.px10, t.py4, t.br20]}>
                      <Text style={[t.cfreshorange, t['p10-600']]}>{item.level_kelas}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default InstructorDetail;