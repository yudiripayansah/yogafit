import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  Pressable
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { LocationContext } from '../context/LocationContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';
// assets
import img from '../config/Image';
import Helper from '../config/Helper';
// components
import SubNavigation from '../components/SubNavigation';
import LocationSelect from '../components/LocationSelect';
import CalendarSelect from '../components/CalendarSelect';
import ClassItem from '../components/ClassItem';
import LevelModal from '../components/ClassKat';
import ClassKatModal from '../components/Ck';
import LoginModal from '../components/Login';
import VerifyModal from '../components/Verify';
import RegisterModal from '../components/Register';
import ChangePhoneModal from '../components/ChangePhone';
import ExperiencesItem from '../components/ExperiencesItem';
// api
import { Api } from '../config/Api';
const Class = ({ route, navigation }) => {
  const t = useContext(ThemeContext);
  const studio = useContext(LocationContext);
  const user = useContext(UserContext);
  const classkatRef = useRef(null);
  const ckRef = useRef(null);
  const loginRef = useRef(null);
  const verifyRef = useRef(null);
  const registerRef = useRef(null);
  const changephoneRef = useRef(null);
  const [registerdata, setregisterdata] = useState({});
  const [id, setid] = useState();
  const [level, setlevel] = useState('All Levels');
  const [loading, setloading] = useState(false);
  const [loadingbooking, setloadingbooking] = useState(false);
  const [activeTab, setActiveTab] = useState('Classes');
  const [alert, setalert] = useState({
    show: false,
    title: '',
    message: '',
    cancelText: 'Close',
    confirmText: 'Ok',
    onConfirm: () => { },
  });
  const [classdata, setclassdata] = useState(null);
  const [classkat, setclasskat] = useState('Class Type');
  const [classlist, setclasslist] = useState([]);
  const [counter, setcounter] = useState(0);
  const { classKat = '' } = route.params || {};
  // Experiences
  const [workshop, setworkshop] = useState([]);
  const [event, setevent] = useState([]);
  const [course, setcourse] = useState([]);
  const getWorkshop = async () => {
    setloading(true);
    try {
      let req = await Api.workshop();
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        data.data.map((item, i) => {
          item.dImage = item.gambar ? { uri: item.gambar } : null;
          item.dTitle = item.workshop;
          item.dTime = `${item.start_time} - ${item.end_time}`;
          item.dDate = Helper.formatDate(item.tanggal,'DD MMMM YYYY');
          item.link = 'DetailWorkshopNew'
        });
        setworkshop(data.data);
      } else {
        setworkshop([]);
      }
      setloading(false);
    } catch (error) {
      console.error('Error get workshop: ' + error);
      setloading(false);
    }
  };
  const getEvent = async () => {
    setloading(true);
    try {
      let req = await Api.event();
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        data.data.map((item, i) => {
          item.dImage = item.gambar ? { uri: item.gambar } : null;
          item.dTitle = item.event;
          item.dTime = `${item.start_time} - ${item.end_time}`;
          item.dDate = Helper.formatDate(item.tanggal,'DD MMMM YYYY');
          item.link = 'DetailEventNew'
        });
        setevent(data.data);
      } else {
        setevent([]);
      }
      setloading(false);
    } catch (error) {
      console.error('Error get events: ' + error);
      setloading(false);
    }
  };
  const getCourse = async () => {
    setloading(true);
    try {
      let req = await Api.course();
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        data.map((item, i) => {
          item.dImage = item.gambar ? { uri: item.gambar } : null;
          item.dTitle = item.course;
          item.dTime = `${item.start_time} - ${item.end_time}`;
          item.dDate = Helper.formatDate(item.tanggal,'DD MMMM YYYY');
          item.link = 'DetailCourseNew'
        });
        setcourse(data);
      } else {
        setcourse([]);
      }
      setloading(false);
    } catch (error) {
      console.error('Error get course: ' + error);
      setloading(false);
    }
  };
  const getSchedule = async () => {
    setloading(true);
    try {
      let pLevel = level != 'All Levels' ? level : '';
      let pClassKat = classkat != 'Class Type' ? classkat : '';
      let param = `id=${id}&studio=${studio.id}&level=${pLevel}&classkat=${pClassKat}`;
      let req = await Api.mySchedule(param);
      if(activeTab != 'Classes'){
        req = await Api.myScheduleExp(param)
      }
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        data.map((item) => {
          item.gambar = {uri: item.gambar}
          item.teacher_photo = {uri: item.teacher_photo}
        })
        console.log(data)
        setclasslist(data);
      } else {
        setclasslist([]);
      }
      setloading(false);
    } catch (error) {
      console.error('Error get class: ' + error);
      setloading(false);
    }
  };
  const doBookNow = async data => {
    setloadingbooking(true);
    try {
      let param = {
        id: Number(data.id_schedule),
      };
      let req = await Api.bookingClass(param, user.token);
      if (req.status === 200 || req.status === 201) {
        if (req.data.message && req.data.message == 'Success Booking Class') {
          setalert({
            show: true,
            title: 'Success',
            message: req.data.message,
            cancelText: 'Close',
            confirmText: 'Ok',
            onConfirm: () => {
              navigation.navigate('Booking');
            },
          });
        } else {
          if (req.data.data && req.data.data.length > 0) {
            setalert({
              show: true,
              title: 'Failed',
              message: req.data.data[0],
              cancelText: 'Close',
              confirmText: 'Ok',
              onConfirm: () => {
                hideAlert();
              },
            });
          }
        }
      }
      setloadingbooking(false);
    } catch (error) {
      setloadingbooking(false);
      console.error('Error booking: ' + error);
    }
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
  const getToday = () => {
    const today = new Date();
    const formattedDate =
      today.getFullYear() +
      '-' +
      String(today.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(today.getDate()).padStart(2, '0');
    return formattedDate;
  };
  const registerAndBook = data => {
    setclassdata(data);
    registerRef.current?.show();
  };
  const formatDateCustom = (dateInput) => {
    const date = new Date(dateInput);

    const dayName = date.toLocaleDateString('en-US', {
      weekday: 'short',
    });

    const day = date.getDate();

    const monthName = date.toLocaleDateString('id-ID', {
      month: 'long',
    });

    return `${dayName}, ${day} ${monthName}`;
  }
  useEffect(() => {
    if (id) {
      getSchedule();
      let count = counter + 1;
      setcounter(count++);
    }
  }, [id, studio, level, classkat]);
  useEffect(() => {
    setid(getToday());
    getWorkshop();
    getEvent();
    getCourse();
    if (classKat && classKat != '') {
      setclasskat(classKat);
    }
  }, []);
  useEffect(() => {
    getSchedule()
  }, [activeTab]);
  return (
    <ScrollView style={[t.bgwhite]}>
      <LevelModal
        classkatRef={classkatRef}
        onSelectLevel={level => {
          setlevel(level);
        }}
      />
      <ClassKatModal
        ckRef={ckRef}
        onSelectCk={ck => {
          setclasskat(ck);
        }}
      />
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
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20, t.pt70]}>
        <Text style={[t.cblack, t['h18-600']]}>Practice</Text>
        <Text style={[t.cgrey60, t['h12-500']]}>Discover classes and courses for your journey</Text>
      </View>
      <View style={[t.px20, t.mt28]}>
        <LocationSelect navigation={navigation} />
      </View>
      {/* TAB NAVIGATION - Perbaikan Lebar 50% */}
      <View style={[t.px20, t.mt20, t.fRow, { width: '100%', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
        <Pressable
          style={[
            { flex: 1, paddingVertical: 15, alignItems: 'center' },
            activeTab === 'Classes' ? { borderBottomWidth: 2, borderBottomColor: '#FE9805' } : null
          ]}
          onPress={() => setActiveTab('Classes')}
        >
          <Text style={[activeTab === 'Classes' ? t.cblack : t.cgrey90, t['h16-400']]}>Classes</Text>
        </Pressable>

        <Pressable
          style={[
            { flex: 1, paddingVertical: 15, alignItems: 'center' },
            activeTab === 'Experiences' ? { borderBottomWidth: 2, borderBottomColor: '#FE9805' } : null
          ]}
          onPress={() => setActiveTab('Experiences')}
        >
          <Text style={[activeTab === 'Experiences' ? t.cblack : t.cgrey90, t['h16-400']]}>Experiences</Text>
        </Pressable>
      </View>
      {activeTab == 'Classes' || activeTab != 'Classes' ? (
        <>
          <View style={[t.pt20, t.px20]}>
            <CalendarSelect
              onDateSelected={date => {
                setid(date);
              }}
            />
          </View>
          <View style={[t.mt10, t.px20, t.fRow, t.faCenter, t.fjStart, { flexWrap: 'wrap' }]}>
            <TouchableOpacity
              style={[
                t.bggreye,
                t.me10,
                t.br5,
                t.p12,
                t.fRow,
                t.faCenter,
                t.fjBetween,
              ]}
              onPress={() => {
                classkatRef.current?.show();
              }}>
              <View style={[t.fRow]}>
                <Image
                  source={img.filter}
                  style={[t.w17, t.h17, { objectFit: 'contain' }]}
                />
                <Text style={[t.cblack, t.ms5, t['h12-500']]}>{level}</Text>
              </View>
              <Image
                source={img.chevronDown}
                style={[t.ms15, t.w15, t.h15, { objectFit: 'contain' }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                t.bggreye,
                t.me10,
                t.br5,
                t.p12,
                t.fRow,
                t.faCenter,
                t.fjBetween,
              ]}
              onPress={() => {
                ckRef.current?.show();
              }}>
              <View style={[t.fRow]}>
                <Image
                  source={img.filter}
                  style={[t.w17, t.h17, { objectFit: 'contain' }]}
                />
                <Text style={[t.cblack, t.ms5, t['h12-500']]}>
                  {classkat ? classkat : classKat}
                </Text>
              </View>
              <Image
                source={img.chevronDown}
                style={[t.ms15, t.w15, t.h15, { objectFit: 'contain' }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                t.bggreye,
                t.br5,
                t.p12,
                t.fRow,
                t.faCenter,
                t.fjBetween,
              ]}
              onPress={() => {
                setlevel('Select Level');
                setclasskat('Select Category');
              }}>
              <Text style={[t.cblack, t['h12-500']]}>Reset</Text>
              <Image
                source={img.close}
                style={[t.ms15, t.w10, t.h10, { objectFit: 'contain' }]}
              />
            </TouchableOpacity>
          </View>
          <View style={[t.pt20, t.px20]}>
            <Text style={[t['h16-500'], t.cblack, t.wp95]}>
              {formatDateCustom(id)}
            </Text>
          </View>
          <View style={[t.mt20, t.px20]}>
            {!loading && classlist.length > 0 ? (
              classlist.map((item, index) => {
                return (
                  <ClassItem
                    data={item}
                    key={index}
                    boxStyle={[t.mt10]}
                    onBookPress={data => {
                      user ? doBookNow(data) : registerAndBook(data);
                    }}
                    onDetailPress={() => {
                      navigation.navigate('DetailClassNew', { theClass: item });
                    }}
                    loading={loadingbooking}
                  />
                );
              })
            ) : loading ? (
              <View style={[t.py50]}>
                <ActivityIndicator size="large" color="#FE9805" />
              </View>
            ) : (
              <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
                No Available Schedule
              </Text>
            )}
          </View>
        </>
      ) : (
        <>
          <View style={[t.mt20]}>
            <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
              <Text style={[t['h18-400'], t.cblack]}>Events</Text>
            </View>
            {event.length > 0 ? (
              <ExperiencesItem data={event} navigation={navigation} />
            ) : (
              <View style={[t.px20,t.py15]}>
                <Text style={[t['h14-500'],t.cblack]}>No available events right now.</Text>
              </View>
            )}
          </View>
          <View style={[t.mt20]}>
            <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
              <Text style={[t['h18-400'], t.cblack]}>Workshop</Text>
            </View>
            {workshop.length > 0 ? (
              <ExperiencesItem data={workshop} navigation={navigation} />
            ) : (
              <View style={[t.px20,t.py15]}>
                <Text style={[t['h14-500'],t.cblack]}>No available workshops right now.</Text>
              </View>
            )}
          </View>
          <View style={[t.mt20]}>
            <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
              <Text style={[t['h18-400'], t.cblack]}>Courses</Text>
            </View>
            {course.length > 0 ? (
              <ExperiencesItem data={course} navigation={navigation} />
            ) : (
              <View style={[t.px20,t.py15]}>
                <Text style={[t['h14-500'],t.cblack]}>No available courses right now.</Text>
              </View>
            )}
          </View>
        </>
      )}
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default Class;
