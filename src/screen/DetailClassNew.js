import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import img from '../config/Image'; // Pastikan path icon sesuai
import RenderHTML from 'react-native-render-html';
import LoginModal from '../components/Login';
import VerifyModal from '../components/Verify';
import RegisterModal from '../components/Register';
import ChangePhoneModal from '../components/ChangePhone';
import Theimage from '../components/Theimage';
// api
import { Api } from '../config/Api';
import Helper from '../config/Helper';
const DetailClass = ({ route, navigation }) => {
  const user = useContext(UserContext);
  const loginRef = useRef(null);
  const verifyRef = useRef(null);
  const registerRef = useRef(null);
  const changephoneRef = useRef(null);
  const screenWidth = Dimensions.get('window').width - 40;
  const t = useContext(ThemeContext);
  // Mengambil data kelas dari navigasi sebelumnya (ClassItem)
  const { theClass } = route.params || {};
  const [classdata, setclassdata] = useState(null);
  const [registerdata, setregisterdata] = useState({});
  const [alert, setalert] = useState({
    show: false,
    title: '',
    message: '',
    cancelText: 'Close',
    confirmText: 'Ok',
    onConfirm: () => { },
  });
  const [loading, setloading] = useState(false);
  const doBookNow = async () => {
    setloading(true);
    try {
      let param = {
        id: Number(theClass.id_schedule),
      };
      let req = await Api.bookingClass(param, user.token);
      if (req.status === 200 || req.status === 201) {
        setTimeout(() => {
          if (req.data.message && req.data.message == 'Success Booking Class') {
            setalert({
              show: true,
              title: 'Success',
              message: req.data.message,
              cancelText: 'Close',
              confirmText: 'Ok',
              onConfirm: () => {
                navigation.navigate('Home');
              },
            });
          } else {
            setalert({
              show: true,
              title: 'Failed',
              message: req.data.message,
              cancelText: 'Close',
              confirmText: 'Ok',
              onConfirm: () => {
                hideAlert();
              },
            });
          }
        }, 2000);
      }
      setTimeout(() => {
        setloading(false);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setloading(false);
      }, 2000);
      console.error('Error booking class: ' + error);
    }
  };
  const registerAndBook = data => {
    setclassdata(data);
    registerRef.current?.show();
  };
  const hideAlert = () => {
    setalert({
      show: false,
      title: '',
      message: '',
      cancelText: 'Close',
      confirmText: 'Ok',
      onConfirm: () => { },
    });
  };

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LoginModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
      />
      <VerifyModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        registerdata={registerdata}
      />
      <RegisterModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        onRegister={data => {
          setregisterdata(data);
        }}
        classdata={classdata}

      />
      <ChangePhoneModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        registerdata={registerdata}
      />
      <AwesomeAlert
        show={alert.show}
        showProgress={false}
        title={alert.title}
        message={alert.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText={alert.cancelText}
        confirmText={alert.confirmText}
        confirmButtonColor="#62AC18"
        cancelButtonColor="#dd0000"
        titleStyle={[t['h20-400'], t.cblack]}
        messageStyle={[t[('p14-500', t.cblack, t.tCenter)]]}
        contentStyle={[t.tCenter]}
        confirmButtonTextStyle={[t[('p20-600', t.cblack)]]}
        onCancelPressed={() => {
          setalert(false);
        }}
        onConfirmPressed={alert.onConfirm}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image dengan Background */}
        <ImageBackground
          source={theClass.gambar ? theClass.gambar : img.classimage}
          style={[t.wp100, t.h400, t.fjEnd]}
        >

          {/* Overlay Text */}
          <View style={[t.p20, t.pt50, t.fjBetween, t.absolute, t.top0, t.bottom0, t.left0, t.right0, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <View style={[t.fRow, t.faCenter, t.fjBetween]}>
              {/* Back Button */}
              <TouchableOpacity
                style={[]}
                onPress={() => navigation.goBack()}
              >
                <Image source={img.backBtn} style={[t.w40, t.h40]} />
              </TouchableOpacity>
              <View style={[{ backgroundColor: '#ECF0EE' }, t.px12, t.py6, t.br5]}>
                <Text style={[{ color: '#3F6050' }, t['h12-400']]}>{theClass?.class_kat || 'CLASSES'}</Text>
              </View>
            </View>
            <View>
              <View style={[t.fRow, t.mb10, { columnGap: 8 }]}>
                <View style={[{ backgroundColor: '#fff' }, t.px12, t.py4, t.br100]}>
                  <Text style={[t.corange, t['h12-600']]}>{theClass?.class_level || 'Beginner'}</Text>
                </View>
                <View style={[{ backgroundColor: '#456A58' }, t.px12, t.py4, t.br100]}>
                  <Text style={[t.cwhite, t['h12-600']]}>{theClass?.capacity - theClass?.status_booking} spots left</Text>
                </View>
              </View>
              <Text style={[t.cwhite, t['h28-700']]}>{theClass?.class_name || 'Morning Vinyasa Flow'}</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Info Duration & Capacity */}
        <View style={[t.fRow, t.px20, t.py20, t.fjBetween]}>
          <View style={[t.faCenter, { flex: 1 }]}>
            <Image source={img.clock} style={[t.w24, t.h24, t.mb5]} />
            <Text style={[t.cblack, t['h12-700']]}>{theClass?.duration_kelas} Minutes</Text>
            <Text style={[t.cgrey, t['p10-400']]}>Duration</Text>
          </View>
          <View style={[t.faCenter, { flex: 1 }]}>
            <Image source={img.iconuser} style={[t.w24, t.h24, t.mb5]} />
            <Text style={[t.cblack, t['h12-700']]}>{theClass?.status_booking} People</Text>
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
              <Text style={[t.cblack, t['p14-700']]}>{Helper.formatDate(theClass?.tgl_schedule, 'DD MMM YYYY')}</Text>
            </View>
          </View>

          <View style={[t.fRow, t.faCenter, t.mb10]}>
            <Image source={img.clock} style={[t.w20, t.h20, t.me15]} />
            <View>
              <Text style={[t.cgrey30, t['h12-400']]}>Time</Text>
              <Text style={[t.cblack, t['p14-700']]}>{theClass?.open || '08:00 - 09:00 AM'}</Text>
            </View>
          </View>

          <View style={[t.fRow, t.faCenter]}>
            <Image source={img.iconmap} style={[t.w20, t.h20, t.me15]} />
            <View>
              <Text style={[t.cgrey30, t['h12-400']]}>Location</Text>
              <Text style={[t.cblack, t['p14-700']]}>{theClass?.alamat || 'Citra Garden 8'}</Text>
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
            <Theimage original={theClass.teacher_photo} placeholder={img.teacher} style={[t.w60, t.h60, t.br30, t.me15, { objectFit: 'cover' }]} />
            <View style={{ flex: 1 }}>
              <Text style={[t.cblack, t['h14-700']]}>{theClass?.name}</Text>
              <Text style={[t.cgrey10, t['h12-400']]}>Certified yoga instructor with 10+ years of experience.</Text>
            </View>
          </View>
        </View>

        {/* About Class */}
        <View style={[t.px20, t.mb20]}>
          <Text style={[t.cblack, t['h16-700'], t.mb5]}>About This Class</Text>
          <RenderHTML
            contentWidth={screenWidth}
            style={[t.cgrey40, t['h14-400']]}
            tagsStyles={{
              div: { color: '#444' },
            }}
            source={{ html: `<div>${theClass?.class_desc}</div>` }}
          />
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
        <TouchableOpacity disabled={loading} style={[t.bgneworange, t.py10, t.br10, t.faCenter, t.fRow, t.fjCenter]} onPress={() => {
          user ? doBookNow(theClass) : registerAndBook(theClass);
        }}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Image source={img.paperlinewhite} style={[t.w18, t.h18, t.me10, { tintColor: '#fff' }]} />
              <Text style={[t.cwhite, t['h14-600']]}>Book Now</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={[t.mt15, t.faCenter, t.fRow, t.fjCenter]} onPress={() => { Helper.sendWhatsapp('Hello i want to know more about this class ' + theClass.class_name) }}>
          <Image source={img.phonecall} style={[t.w18, t.h18, t.me10]} />
          <Text style={[t.cblack, t['h14-600']]}>Contact Studio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailClass;