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
import {LocationContext} from '../context/LocationContext';
// assets
import img from '../config/Image';
// components
import HomeCarousel from '../components/HomeCarousel';
import HomeTeacher from '../components/HomeTeacher';
import HomeSchedule from '../components/HomeSchedule';
import HomeSpecialOffers from '../components/HomeSpecialOffers';
import HomeStudio from '../components/HomeStudio';
import HomeArticle from '../components/HomeArticle';
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
import LinearGradient from 'react-native-linear-gradient';
// API
import {Api} from '../config/Api';
import Helper from '../config/Helper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const Home = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const studio = useContext(LocationContext);
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
  const [article, setarticle] = useState([]);
  const [specialoffer, setspecialoffer] = useState([]);
  const [trainer, setTrainer] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [contract, setcontract] = useState([]);
  const [studiolist, setStudiolist] = useState([]);
  const [loading, setloading] = useState(false);
  const [longlat, setlonglat] = useState({
    latitude: null,
    longitude: null,
  });
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
  const getarticle = async () => {
    console.log('Home get article');
    try {
      let req = await Api.article();
      if (req.status === 200) {
        let {data} = req.data.original;
        data.map((item, index) => {
          item.image = {uri: item.image};
          item.date = getTodayDate()
        });
        setarticle(data);
      } else {
        console.error('Error get article');
      }
    } catch (error) {
      console.error('Error get home article: ' + error);
    }
  };
  function getTodayDate() {
    const today = new Date();

    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();

    return `${day} ${month} ${year}`;
  }
  const getSpecialOffer = async () => {
    console.log('Home get specialoffer');
    try {
      let req = await Api.specialOffer();
      if (req.status === 200) {
        let {data} = req.data;
        data.map((item, index) => {
          item.image = {uri: item.image};
        });
        setspecialoffer(data);
      } else {
        console.error('Error get special offer');
      }
    } catch (error) {
      console.error('Error get home special offer: ' + error);
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
            id: item.id,
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
  const getSchedule = async () => {
    console.log('Home get schedule');
    try {
      let pLevel = '';
      let pClassKat = '';
      let id = getToday()
      let param = `id=${id}&studio=${studio.id}&level=${pLevel}&classkat=${pClassKat}`;
      let req = await Api.mySchedule(param);
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        data.map((item)=>{
          item.gambar = {uri: item.gambar}
          item.teacher_photo = {uri: item.teacher_photo}
        })
        console.log(data[0])
        setSchedule(data);
      } else {
        setSchedule([]);
      }
    } catch (error) {
      console.error('Error get home schedule');
    }
  };
  const getStudio = async () => {
    try {
      let req = await Api.studio(user ? user.region_id : 1);
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        let distance = 0;
        let theStudio;
        data.map((item, index) => {
          let longlat = item.location.split(',');
          let targetLocation = {
            latitude: Number(longlat[0]),
            longitude: Number(longlat[1]),
          };
          let theDistance = Math.floor(
            calculateDistance(targetLocation) / 1000,
          );
          item.distance = theDistance + ' km';
          item.image = {uri: item.gambar};
          item.freq = 'Sedang';
          item.rating = '4.8';
          item.ratingCount = 200;
          if (index == 0) {
            distance = theDistance;
          }
          if (theDistance > 0 && theDistance <= distance) {
            distance = theDistance;
            theStudio = item;
          }
        });
        let studios = [
          { type: 'all'},
          ...data
        ]
        setStudiolist(studios);
      } else {
        console.error('Error get studio');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get studio: ' + error);
    }
  };
  const calculateDistance = targetLocation => {
    if (longlat.latitude && longlat.longitude) {
      const calculatedDistance = getDistance(longlat, targetLocation);
      return calculatedDistance;
    } else {
      return 0;
    }
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
    if (user && user.token) {
      setloadingContract(true);
      try {
        let req = await Api.myContract(null, user.token);
        if (req.status === 200 || req.status === 201) {
          let {data} = req.data;
          if (data) {
            setcontract(data);
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
  const redirect = () => {
    navigation.navigate('Profile')
  }
  const PromoBlack = () => {
    return (
      <View style={[t.mt0, t.px20, t.py20]}>
        <LinearGradient
          colors={['rgba(0,0,0,1)', '#505050']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[t.br16, {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 6,
            elevation: 6,
          }]}
        >
          <Pressable
            style={[
              t.p20,
              t.fRow,
              t.fjBetween,
              t.faCenter,
            ]}
            onPress={() => {
              navigation.navigate('ChoosePlan')
            }}>
            <View style={[t.fRow, t.faCenter]}>
              <View style={[t.ms10]}>
                <Text style={[t['h12-400'], t.cwhite]}>
                  JOIN OUR COMMUNITY!
                </Text>
                <Text style={[t['h18-700'], t.cwhite]}>
                  Become a Member
                </Text>
                <Text style={[t['p13-400'], t.cwhite]}>
                  View Membership Plans
                </Text>
              </View>
            </View>
            <View style={[t.px16, t.py10, t.br7, t.bsolid, t.bw1, t.bwhite]}>
              <Text style={[t['h14-400'], t.cwhite]}>See Details</Text>
            </View>
          </Pressable>
        </LinearGradient>
      </View>
    )
  }
  const PromoOrange = () => {
    return (
      <View style={[t.mt0, t.px20, t.py20]}>
        <LinearGradient
          colors={['#FF4E00', '#FF8E4E']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[t.br16]}
        >
          <Pressable
            style={[
              t.p20,
              t.fRow,
              t.fjBetween,
              t.faCenter
            ]}
            onPress={() => {
              navigation.navigate('ChoosePlan')
            }}>
            <View style={[t.fRow, t.faCenter]}>
              <View style={[t.ms10]}>
                <Text style={[t['h12-400'], t.cwhite]}>
                  NEW TO YOGAFIT
                </Text>
                <Text style={[t['h18-700'], t.cwhite]}>
                  Start Your Free Trial
                </Text>
                <Text style={[t['p13-400'], t.cwhite]}>
                  Experience our class for free
                </Text>
              </View>
            </View>
            <View style={[t.px16, t.py10, t.br7, t.bsolid, t.bw1, t.bwhite]}>
              <Text style={[t['h14-400'], t.cwhite]}>Claim</Text>
            </View>
          </Pressable>
        </LinearGradient>
      </View>
    )
  }
  useEffect(() => {
    getSlider();
    getarticle();
    getTrainer();
    getSchedule();
    getTrialContract();
    getContract();
    getStudio()
    getSpecialOffer()
    // redirect()
  }, []);
  useEffect(() => {
    getTrialContract();
    getContract();
  }, [user]);
  useEffect(() => {
    getSchedule();
  }, [studio]);
  useEffect(() => {
    const onFocusPage = navigation.addListener('focus', () => {
      getSlider();
      getarticle();
      getTrainer();
      getSchedule();
      getTrialContract();
      getContract();
      getStudio()
      getSpecialOffer()
    });
    return onFocusPage;
  }, [navigation]);
  return (
    <ScrollView style={[t.bgwhite]}>
      <LocationModal locationRef={locationRef} nav={navigation}/>
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
      <View style={[t.relative]}>
        <HomeCarousel images={slider} />
        <Pressable style={[t.absolute,t.top60,t.right20,t.w40,t.h40,t.bgwhite,t.faCenter,t.fjCenter,t.br100]} onPress={() => {navigation.navigate('Notification')}}>
          <Image source={img.notification} style={[t.w24,t.h24, {tintColor:'#F08519'}]}/>
        </Pressable>
      </View>
      <View style={[t.pt12, t.px20]}>
        <HomeLocation
          navigation={navigation}
          onPress={() => {
            locationRef.current?.show();
          }}
        />
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
        user && contract.length > 0 ? (
          <PromoBlack/>
        ) : (
          <PromoOrange/>  
        )
      )}
      <View style={[t.mt0]}>
        <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
          <Text style={[t['h18-400'], t.cblack]}>Today's Class</Text>
          <TouchableWithoutFeedback onPress={()=>{navigation.navigate('Class')}}>
            <Text style={[t['h14-400'], t.corange]}>See More</Text>
          </TouchableWithoutFeedback>
        </View>
        <HomeSchedule schedule={schedule} navigation={navigation} />
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
          <Text style={[t['h18-400'], t.cblack]}>Special Offers</Text>
        </View>
        <HomeSpecialOffers offers={specialoffer} navigation={navigation} />
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
          <Text style={[t['h18-400'], t.cblack]}>Our Studio Lineup</Text>
        </View>
        <HomeStudio studio={studiolist} navigation={navigation} onPressViewAll={()=> locationRef.current?.show()}/>
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
          <Text style={[t['h18-400'], t.cblack]}>Trainer</Text>
          {/* <TouchableWithoutFeedback onPress={()=>{navigation.navigate('Trainer')}}>
            <Text style={[t['h14-400'], t.corange]}>See More</Text>
          </TouchableWithoutFeedback> */}
        </View>
        <HomeTeacher teacher={trainer} navigation={navigation} />
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
          <Text style={[t['h18-400'], t.cblack]}>Article</Text>
        </View>
        <HomeArticle article={article} navigation={navigation} />
      </View>
      {/* <View style={[t.mt20, t.px20]}>
        <HomeClass navigation={navigation} />
      </View> */}
      {/* <View style={[t.mt20, t.px20]}>
        <Text style={[t['h20-400'], t.cblack]}>
          Start Your Journey with Yoga Fit
        </Text>
        <Text style={[t['p12-400'], t.cblack, t.mt5]}>
          You’re new in yoga? no worries! Don’t imagine your first yoga practice
          will be hard.
        </Text>
      </View> */}
      {/* <View style={[]}>
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
      </View> */}
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default Home;
