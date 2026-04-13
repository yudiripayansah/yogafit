import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
// assets
import img from '../config/Image';

import Theimage from '../components/Theimage';
import { Api } from '../config/Api';
import Helper from '../config/Helper';
import DeleteAccountModal from '../components/DeleteAccount';
const ProfileScreen = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const { removeUser,setUser } = useContext(AuthContext);
  const deleteRef = useRef(null);
  const [booking, setbooking] = useState([]);
  const [contract, setcontract] = useState();
  const [loading, setloading] = useState(false);
  const [detailactivity, setdetailactivity] = useState({});
  const [profileimage, setprofileimage] = useState({uri:'https://api.yogafitidonline.com/storage/foto/'+user.foto});
  const [profile, setprofile] = useState({})
  const myProfile = async () => {
    console.log('get profile')
    try {
      let req = await Api.myProfile(user.token)
      let prof = req.data.users
      setprofile(prof)
      console.log(prof)
      setprofileimage({uri: prof.foto}) 
    } catch (error) {
      console.log('error get profile',error)
    }
  }
  const getDetailactivity = async () => {
    setloading(true);
    try {
      let req = await Api.myActivity(user.token);
      if (req.status === 200 || req.status === 201) {
        let { data, summary } = req.data;
        setdetailactivity(summary);
      } else {
        console.error('Error get detail activity');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get detail activity: ' + error);
      setloading(false);
    }
  };
  function convertToInternationalFormat(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
      return '+62' + phoneNumber.slice(1);
    }
    return phoneNumber; // If it doesn't start with '0', return the number as is.
  }
  const getBooking = async () => {
    setloading(true);
    try {
      let req = await Api.myBookingHistory({}, user.token);
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        setbooking(data);
      } else {
        console.error('Error get booking history');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get booking history: ' + error);
      setloading(false);
    }
  };
  const findNearestDate = (dates = []) => {
    const today = new Date();
    if (dates.length > 0) {
      return dates.reduce((nearest, dateObj) => {
        const currentDiff = Math.abs(new Date(dateObj.end_date) - today);
        const nearestDiff = Math.abs(new Date(nearest.end_date) - today);

        return currentDiff < nearestDiff ? dateObj : nearest;
      });
    } else {
      return false;
    }
  };
  const getContract = async () => {
    setloading(true);
    try {
      let req = await Api.myContract(false, user.token);
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        let aContract = findNearestDate(data);
        setcontract(aContract);
      } else {
        console.error('Error get contract');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get contract: ' + error);
      setloading(false);
    }
  };
  const doLogout = () => {
    removeUser();
    navigation.navigate('Home');
  };
  useEffect(() => {
    getBooking();
    getContract();
    getDetailactivity();
    myProfile()
  }, []);
  useEffect(() => {
    const onFocusPage = navigation.addListener('focus', () => {
      getBooking();
      getContract();
      getDetailactivity();
      myProfile()
    });
    return onFocusPage;
  }, [navigation]);
  const menuItems = [
    { id: 1, title: 'Edit Profile', icon: img.iconedit, screen: 'EditProfile' },
    { id: 2, title: 'Membership Info', icon: img.iconedit, screen: 'MembershipInfo' },
    { id: 3, title: 'My Activity', icon: img.iconprofileact, screen: 'MyActivity' },
    { id: 4, title: 'Become an Instructor', icon: img.iconmedalbox, screen: 'BecomeInstructor' },
    { id: 5, title: 'FAQ', icon: img.iconfaq, screen: 'FaqNew' },
    { id: 6, title: 'Setting', icon: img.iconsetting, screen: 'NotificationSettings' },
  ];

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header Title */}
      <View style={[t.pt50, t.pb20, t.faCenter, t.bgwhite]}>
        <Text style={[t['h18-700'], t.cblack]}>My Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header Section */}
        <View style={[t.faCenter, t.mt20]}>
          <Theimage
            original={profileimage}
            placeholder={img.profile}
            style={[t.w100, t.h100, t.br100, { objectFit: 'cover' }]}
          />
          <Text style={[t.cblack, t['p22-700'], t.mt15]}>{profile && profile.name}</Text>
          {contract && (
            <View style={[t.bgneworange, t.px15, t.py6, t.br20, t.mt10]}>
              <Text style={[t.cwhite, t['p12-700'], { textTransform: 'uppercase' }]}>
                {contract && contract.packages_name}
              </Text>
            </View>
          )}

          <Text style={[t.cgrey60, t['p14-400'], t.mt10]}>{profile && profile.email}</Text>
          <Text style={[t.cgrey60, t['p13-400'], t.mt2]}>Member since {Helper.formatDate(profile && profile.created_at, 'MMMM YYYY')}</Text>
        </View>

        {/* Stats Cards */}
        <View style={[t.fRow, t.px20, t.mt30, { columnGap: 15 }]}>
          <View style={[{ flex: 1 }, t.fRow, t.faCenter, t.p15, t.br20, t.bw1, t.bgreye, t.bsolid]}>
            <Image source={img.iconattended} style={[t.w40, t.h40]} />
            <View style={[t.ms12, t.fRow, t.faCenter, { columnGap: 5 }]}>
              <Text style={[t.cblack, t['h24-700']]}>{detailactivity?.classes_attended}</Text>
              <Text style={[t.cgrey60, t['h12-400']]}>Classes{"\n"}Attended</Text>
            </View>
          </View>

          <View style={[{ flex: 1 }, t.fRow, t.faCenter, t.p15, t.br20, t.bw1, t.bgreye, t.bsolid]}>
            <Image source={img.iconfire} style={[t.w40, t.h40]} />
            <View style={[t.ms12, t.fRow, t.faCenter, { columnGap: 5 }]}>
              <Text style={[t.cblack, t['h24-700']]}>{detailactivity?.streak_days}</Text>
              <Text style={[t.cgrey60, t['h12-400']]}>Streak{"\n"}Days</Text>
            </View>
          </View>
        </View>

        {/* Menu List */}
        <View style={[t.px20, t.mt30]}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[t.fRow, t.faCenter, t.fjBetween, t.mb20]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[t.fRow, t.faCenter]}>
                <Image source={item.icon} style={[t.w40, t.h40]} />
                <Text style={[t.cblack, t['h14-500'], t.ms15]}>{item.title}</Text>
              </View>
              <Image source={img.iconrightblack} style={[t.w16, t.h16, { tintColor: '#9CA3AF' }]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Log Out Button */}
        <View style={[t.px20, t.mt10, t.mb20]}>
          <TouchableOpacity
            style={[t.fRow, t.faCenter, t.fjBetween, t.p15, t.br15, t.bw1, t.bgreye, t.bsolid]}
            onPress={() => doLogout()}
          >
            <View style={[t.fRow, t.faCenter]}>
              <Image source={img.iconlogout} style={[t.w40, t.h40,]} />
              <Text style={[{ color: '#EF4444' }, t['h14-600'], t.ms15]}>Log Out</Text>
            </View>
            <Image source={img.iconrightorange} style={[t.w16, t.h16, { tintColor: '#EF4444' }]} />
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <Text style={[t.tCenter, t.cgrey60, t['h12-400'], t.mb100]}>Yoga Fit App v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;