import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import {LocationContext} from '../context/LocationContext';
// components
import HomeCarousel from '../components/HomeCarousel';
import HomeTeacher from '../components/HomeTeacher';
import HomeSchedule from '../components/HomeSchedule';
import HomeSpecialOffers from '../components/HomeSpecialOffers';
import HomeStudio from '../components/HomeStudio';
import HomeArticle from '../components/HomeArticle';
import HomeLocation from '../components/HomeLocation';
import LocationModal from '../components/LocationList';
import LoginModal from '../components/Login';
import VerifyModal from '../components/Verify';
import RegisterModal from '../components/Register';
import ForgotModal from '../components/Forgot';
import FreeTrialModal from '../components/FreeTrial';
import ChangePhoneModal from '../components/ChangePhone';
import LinearGradient from 'react-native-linear-gradient';
// API & config
import {Api} from '../config/Api';
import Helper from '../config/Helper';
import Cache, {TTL} from '../config/Cache';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const CACHE_KEYS = {
  SLIDER: 'home_slider',
  ARTICLE: 'home_article',
  TRAINER: 'home_trainer',
  SPECIAL_OFFER: 'home_special_offer',
  STUDIO: 'home_studio',
  CONTRACT: 'home_contract',
  schedule: (studioId, date) => `home_schedule_${studioId}_${date}`,
};

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
  const isMounted = useRef(true);

  const [registerdata, setregisterdata] = useState({});
  const [trialcontract, settrialcontract] = useState(null);
  const [slider, setSlider] = useState([]);
  const [article, setarticle] = useState([]);
  const [specialoffer, setspecialoffer] = useState([]);
  const [trainer, setTrainer] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [contract, setcontract] = useState([]);
  const [studiolist, setStudiolist] = useState([]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const getTodayDate = () => {
    const today = new Date();
    return `${today.getDate()} ${today.toLocaleString('en-US', {month: 'long'})} ${today.getFullYear()}`;
  };

  // Stale-While-Revalidate: show cached data instantly, refresh in background when stale
  const loadCached = async (key, ttl, apiFn, transform, setter) => {
    const cached = await Cache.get(key, {allowStale: true});
    if (cached) {
      if (isMounted.current) setter(cached.data);
      if (!cached.isStale) return; // Cache is fresh, skip network call
    }
    // No cache or stale cache: fetch fresh data in background
    try {
      const req = await apiFn();
      if ((req.status === 200 || req.status === 201) && isMounted.current) {
        const data = transform(req);
        setter(data);
        Cache.set(key, data, ttl);
      }
    } catch (err) {
      if (!cached) console.error('Home fetch failed:', key, String(err));
    }
  };

  const getSlider = () =>
    loadCached(
      CACHE_KEYS.SLIDER,
      TTL.MIN_30,
      () => Api.slider(),
      req => req.data.data.map(item => ({uri: item.file})),
      setSlider,
    );

  const getArticle = () =>
    loadCached(
      CACHE_KEYS.ARTICLE,
      TTL.MIN_30,
      () => Api.article(),
      req =>
        req.data.original.data.map(item => ({
          ...item,
          image: {uri: item.image},
          date: getTodayDate(),
        })),
      setarticle,
    );

  const getTrainer = () =>
    loadCached(
      CACHE_KEYS.TRAINER,
      TTL.HOUR_1,
      () => Api.trainer(),
      req =>
        req.data.data.map(item => ({
          id: item.id,
          image: {uri: item.foto},
          name: item.name,
          text: item.desc_teacher,
        })),
      setTrainer,
    );

  const getSpecialOffer = () =>
    loadCached(
      CACHE_KEYS.SPECIAL_OFFER,
      TTL.MIN_15,
      () => Api.specialOffer(),
      req => req.data.data.map(item => ({...item, image: {uri: item.image}})),
      setspecialoffer,
    );

  const getStudio = () =>
    loadCached(
      CACHE_KEYS.STUDIO,
      TTL.HOUR_1,
      () => Api.studio(user ? user.region_id : 1),
      req => [
        {type: 'all'},
        ...req.data.data.map(item => ({
          ...item,
          distance: '0 km',
          image: {uri: item.gambar},
          freq: 'Sedang',
          rating: '4.8',
          ratingCount: 200,
        })),
      ],
      setStudiolist,
    );

  const getSchedule = () => {
    if (!studio?.id) return Promise.resolve();
    const today = getToday();
    return loadCached(
      CACHE_KEYS.schedule(studio.id, today),
      TTL.MIN_30,
      () => Api.mySchedule(`id=${today}&studio=${studio.id}&level=&classkat=`),
      req =>
        req.data.data.map(item => ({
          ...item,
          gambar: {uri: item.gambar},
          teacher_photo: {uri: item.teacher_photo},
        })),
      setSchedule,
    );
  };

  const getContract = async () => {
    if (!user?.token) return;
    const cached = await Cache.get(CACHE_KEYS.CONTRACT, {allowStale: true});
    if (cached && isMounted.current) {
      setcontract(cached.data);
      if (!cached.isStale) return;
    }
    try {
      const req = await Api.myContract(null, user.token);
      if (
        (req.status === 200 || req.status === 201) &&
        req.data.data &&
        isMounted.current
      ) {
        setcontract(req.data.data);
        Cache.set(CACHE_KEYS.CONTRACT, req.data.data, TTL.MIN_5);
      }
    } catch (err) {
      if (!cached) console.error('Error get contract:', String(err));
    }
  };

  useEffect(() => {
    Promise.all([
      getSlider(),
      getArticle(),
      getTrainer(),
      getSpecialOffer(),
      getStudio(),
      getSchedule(),
      getContract(),
    ]);
  }, []);

  useEffect(() => {
    if (!user) {
      Cache.remove(CACHE_KEYS.CONTRACT);
      setcontract([]);
      return;
    }
    getContract();
  }, [user]);

  useEffect(() => {
    getSchedule();
  }, [studio]);

  useEffect(() => {
    const onFocusPage = navigation.addListener('focus', () => {
      getSlider();
      getArticle();
      getTrainer();
      getSchedule();
      getContract();
      getStudio();
      getSpecialOffer();
    });
    return onFocusPage;
  }, [navigation]);

  const PromoBlack = () => {
    return (
      <View style={[t.mt0, t.px20, t.py20]}>
        <LinearGradient
          colors={['rgba(0,0,0,1)', '#505050']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={[
            t.br16,
            {
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 6,
            },
          ]}>
          <Pressable
            style={[t.p20, t.fRow, t.fjBetween, t.faCenter]}
            onPress={() => {
              navigation.navigate('ChoosePlan');
            }}>
            <View style={[t.fRow, t.faCenter]}>
              <View style={[t.ms10]}>
                <Text style={[t['h12-400'], t.cwhite]}>JOIN OUR COMMUNITY!</Text>
                <Text style={[t['h18-700'], t.cwhite]}>Become a Member</Text>
                <Text style={[t['p13-400'], t.cwhite]}>View Membership Plans</Text>
              </View>
            </View>
            <View style={[t.px16, t.py10, t.br7, t.bsolid, t.bw1, t.bwhite]}>
              <Text style={[t['h14-400'], t.cwhite]}>See Details</Text>
            </View>
          </Pressable>
        </LinearGradient>
      </View>
    );
  };

  const PromoOrange = () => {
    return (
      <View style={[t.mt0, t.px20, t.py20]}>
        <LinearGradient
          colors={['#FF4E00', '#FF8E4E']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={[t.br16]}>
          <Pressable
            style={[t.p20, t.fRow, t.fjBetween, t.faCenter]}
            onPress={() => {
              navigation.navigate('ChoosePlan');
            }}>
            <View style={[t.fRow, t.faCenter]}>
              <View style={[t.ms10]}>
                <Text style={[t['h12-400'], t.cwhite]}>NEW TO YOGAFIT</Text>
                <Text style={[t['h18-700'], t.cwhite]}>Start Your Free Trial</Text>
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
    );
  };

  return (
    <ScrollView style={[t.bgwhite]}>
      <LocationModal locationRef={locationRef} nav={navigation} />
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
      ) : user && contract.length > 0 ? (
        <PromoBlack />
      ) : (
        <PromoOrange />
      )}
      <View style={[t.mt0]}>
        <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
          <Text style={[t['h18-400'], t.cblack]}>Today's Class</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Class');
            }}>
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
        <HomeStudio
          studio={studiolist}
          navigation={navigation}
          onPressViewAll={() => locationRef.current?.show()}
        />
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
          <Text style={[t['h18-400'], t.cblack]}>Trainer</Text>
        </View>
        <HomeTeacher teacher={trainer} navigation={navigation} />
      </View>
      <View style={[t.mt20]}>
        <View style={[t.px20, t.mb10, t.fRow, t.fjBetween, t.faEnd]}>
          <Text style={[t['h18-400'], t.cblack]}>Article</Text>
        </View>
        <HomeArticle article={article} navigation={navigation} />
      </View>
      <View style={[t.py50, t.wp100]} />
    </ScrollView>
  );
};

export default Home;
