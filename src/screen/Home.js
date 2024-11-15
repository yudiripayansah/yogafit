import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image';
// components
import HomeCarousel from '../components/HomeCarousel';
import HomeTeacher from '../components/HomeTeacher';
import HomeEvents from '../components/HomeEvents';
import HomeLocation from '../components/HomeLocation';
import HomeClass from '../components/HomeClass';
import LocationModal from '../components/LocationList';
import HomeContract from '../components/HomeContract';
import LoginModal from '../components/Login';
import VerifyModal from '../components/Verify';
import RegisterModal from '../components/Register';
import ForgotModal from '../components/Forgot';
import FreeTrialModal from '../components/FreeTrial';
import ChangePhoneModal from '../components/ChangePhone';
// API
import {Api} from '../config/Api';
import Helper from '../config/Helper';
const Home = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const locationRef = useRef(null);
  const loginRef = useRef(null);
  const verifyRef = useRef(null);
  const registerRef = useRef(null);
  const forgotRef = useRef(null);
  const freetrialRef = useRef(null);
  const changephoneRef = useRef(null);
  const [trialloading, settrialloading] = useState(false);
  const [loadingContract, setloadingContract] = useState(false);
  const [registerdata, setregisterdata] = useState({});
  const [trialcontract, settrialcontract] = useState();
  const [slider, setSlider] = useState([]);
  const [events, setEvents] = useState([]);
  const [trainer, setTrainer] = useState([]);
  const [contract, setcontract] = useState([]);
  const getSlider = async () => {
    console.log('Home get slider');
    try {
      let req = await Api.slider();
      if (req.status === 200) {
        let {data} = req.data;
        let slide = [];
        data.forEach(item => {
          slide.push({uri: item.file});
        });
        setSlider(slide);
      } else {
        console.error('Error get slider');
      }
    } catch (error) {
      console.error('Error get home slider: ' + error);
    }
  };
  const getEvents = async () => {
    console.log('Home get events');
    try {
      let req = await Api.event();
      if (req.status === 200) {
        let {data} = req.data;
        let event = [];
        data.forEach(item => {
          event.push({image: {uri: item.gambar}, data: item});
        });
        setEvents(event);
      } else {
        console.error('Error get event');
      }
    } catch (error) {
      console.error('Error get home events: ' + error);
    }
  };
  const getTrainer = async () => {
    console.log('Home get trainer');
    try {
      let req = await Api.trainer();
      if (req.status === 200) {
        let {data} = req.data;
        let trainer = [];
        data.forEach(item => {
          trainer.push({
            image: {uri: item.foto},
            name: item.name,
            text: item.desc_teacher,
          });
        });
        setTrainer(trainer);
      } else {
        console.error('Error get trainer');
      }
    } catch (error) {
      console.error('Error get home trainer: ' + error);
    }
  };
  const getTrialContract = async () => {
    console.log('Home get trial contract');
    if (user && user.token) {
      settrialloading(true);
      try {
        let req = await Api.trialContract(user.token);
        if (req.status === 200 || req.status === 201) {
          settrialcontract(req.data.data[0]);
        } else {
          console.error('Error get trial contract');
        }
        settrialloading(false);
      } catch (error) {
        console.error('Error get trial contract: ' + error);
        settrialloading(false);
      }
    } else {
      settrialcontract(null);
    }
  };
  const getContract = async () => {
    console.log('Home get contract');
    if (user) {
      setloadingContract(true);
      try {
        let req = await Api.myBooking({}, user.token);
        if (req.status === 200 || req.status === 201) {
          let {data} = req.data;
          if (data) {
            let theData = [data[0]];
            setcontract(theData);
          }
        } else {
          console.error('Error get contract');
        }
        setloadingContract(false);
      } catch (error) {
        console.error('Error get contract: ' + error);
        setloadingContract(false);
      }
    }
  };
  useEffect(() => {
    getSlider();
    getEvents();
    getTrainer();
    getTrialContract();
    getContract();
  }, []);
  useEffect(() => {
    getTrialContract();
    getContract();
  }, [user]);
  useEffect(() => {
    const onFocusPage = navigation.addListener('focus', () => {
      getSlider();
      getEvents();
      getTrainer();
      getTrialContract();
      getContract();
    });
    return onFocusPage;
  }, [navigation]);
  return (
    <ScrollView style={[t.bgwhite]}>
      <LocationModal locationRef={locationRef} />
      <LoginModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        forgotRef={forgotRef}
      />
      <ForgotModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        forgotRef={forgotRef}
      />
      <VerifyModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        registerdata={registerdata}
      />
      <ChangePhoneModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        registerdata={registerdata}
      />
      <FreeTrialModal
        changephoneRef={changephoneRef}
        freetrialRef={freetrialRef}
        data={trialcontract}
      />
      <RegisterModal
        changephoneRef={changephoneRef}
        verifyRef={verifyRef}
        loginRef={loginRef}
        registerRef={registerRef}
        onRegister={data => {
          setregisterdata(data);
        }}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <HomeCarousel images={slider} />
      <View style={[t.mmt30, t.px20]}>
        <HomeLocation
          navigation={navigation}
          onPress={() => {
            locationRef.current?.show();
          }}
        />
      </View>
      <View style={[t.mt20, t.px20]}>
        <HomeClass navigation={navigation} />
      </View>
      <View style={[t.mt20, t.px20]}>
        <Text style={[t['h20-400'], t.cblack]}>
          Start Your Journey with Yoga Fit
        </Text>
        <Text style={[t['p12-400'], t.cblack, t.mt5]}>
          You’re new in yoga? no worries! Don’t imagine your first yoga practice
          will be hard.
        </Text>
      </View>
      {trialcontract ? (
        <View style={[t.mt20, t.p20, t.bggreye]}>
          <View>
            <Text style={[t['h20-400'], t.cblack]}>
              Gunakan Free Trial Kamu
            </Text>
            <View style={[t.fRow, t.faStretch, t.fjBetween, t.mt20]}>
              <Pressable
                style={[
                  t.p10,
                  t.faCenter,
                  t.wp48,
                  t.fjCenter,
                  t.bgwhite,
                  t.bw1,
                  t.bsolid,
                  t.borange,
                  t.br5,
                ]}
                onPress={() => {
                  navigation.navigate('Class');
                }}>
                <Text style={[t['p12-600'], t.cblack, t.tCenter]}>
                  Booking Kelas
                </Text>
              </Pressable>
              <Pressable
                style={[
                  t.p10,
                  t.faCenter,
                  t.wp48,
                  t.fjCenter,
                  t.bgwhite,
                  t.bw1,
                  t.bsolid,
                  t.borange,
                  t.br5,
                ]}
                onPress={() => {
                  freetrialRef.current?.show();
                }}>
                <Text style={[t['p12-600'], t.cblack, t.tCenter]}>
                  Check In di lokasi terdekat
                </Text>
              </Pressable>
            </View>
            <Text
              style={[
                t['p12-400'],
                t.cblack,
                t.tCenter,
                t.pt5,
                t.btw1,
                t.bsolid,
                t.bgreyd,
                t.mt10,
              ]}>
              Free trial akan berakhir dalam{' '}
              {Helper.daysLeft(trialcontract.tgl_exp)} hari
            </Text>
          </View>
        </View>
      ) : trialloading ? (
        <View style={[t.py50]}>
          <ActivityIndicator size="large" color="#FE9805" />
        </View>
      ) : (
        !user && (
          <View style={[t.my20, t.px20]}>
            <Pressable
              style={[
                t.bgorange,
                t.br10,
                t.p10,
                t.fRow,
                t.fjBetween,
                t.faCenter,
              ]}
              onPress={() => {
                registerRef.current?.show();
              }}>
              <View style={[t.fRow, t.faCenter]}>
                <Image source={img.ticket} style={[t.w50, t.h50]} />
                <View style={[t.ms10]}>
                  <Text style={[t['h20-400'], t.cwhite]}>
                    Complimentary Class For You!
                  </Text>
                  <Text style={[t['p12-400'], t.cwhite]}>
                    Try our yoga class first time for free
                  </Text>
                </View>
              </View>
              <View style={[t.px10, t.py5, t.bgskyblue, t.br100]}>
                <Text style={[t['h12-400'], t.cwhite]}>Reedem</Text>
              </View>
            </Pressable>
          </View>
        )
      )}
      <View style={[]}>
        <Image
          source={img.banner2}
          style={[t.wp100, t.h275, {objectFit: 'cover'}]}
        />
        <View
          style={[
            t.absolute,
            t.wp100,
            t.hp100,
            t.top0,
            t.left0,
            t.faCenter,
            t.fjCenter,
          ]}>
          <View
            style={[
              t.absolute,
              t.wp100,
              t.hp100,
              t.top0,
              t.left0,
              t.bgblack,
              {opacity: 0.5},
            ]}></View>
          <Text style={[t['h50-400'], t.cwhite, t.px50, t.tCenter]}>
            Have You Sweat Today?
          </Text>
          <TouchableOpacity
            style={[
              t.px10,
              t.py5,
              t.faCenter,
              t.fjCenter,
              t.bgorange,
              t.br10,
              t.mt10,
            ]}
            onPress={() => {
              navigation.navigate('Class');
            }}>
            <Text style={[t['h20-400'], t.cwhite]}>Book Classes</Text>
          </TouchableOpacity>
        </View>
      </View>
      {user && (
        <HomeContract
          navigation={navigation}
          contract={contract}
          loading={loadingContract}
        />
      )}
      <View style={[t.mt20]}>
        <View style={[t.px20, t.mb10]}>
          <Text style={[t['h20-400'], t.cblack]}>Teachers</Text>
        </View>
        <HomeTeacher teacher={trainer} navigation={navigation} />
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20, t.mb10]}>
          <Text style={[t['h20-400'], t.cblack]}>Upcoming Events</Text>
        </View>
        <HomeEvents events={events} navigation={navigation} />
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default Home;
