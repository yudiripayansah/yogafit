import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View, ScrollView, StatusBar, Image, Text, Linking, Alert
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SweetAlert from 'react-native-sweet-alert';
// components
import Theimage from '../components/Theimage'
import Api from '../config/Api'
import Helper from '../config/Helper'
import DeleteAccountModal from '../components/DeleteAccount'
const Profile = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const deleteRef = useRef(null);
  const [booking,setbooking] = useState([])
  const [contract,setcontract] = useState()
  const [loading,setloading] = useState(false)
  const [profileimage, setprofileimage] = useState(user ? {uri: 'https://login.yogafitidonline.com/api/storage/foto/'+ user.foto} : {uri: 'https://login.yogafitidonline.com/api/storage/foto/'})
  function convertToInternationalFormat(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
      return '+62' + phoneNumber.slice(1);
    }
    return phoneNumber; // If it doesn't start with '0', return the number as is.
  }
  const sendWhatsAppMessage = (number) => {
    const phoneNumber = convertToInternationalFormat(number); // WhatsApp number with country code
    const message = 'Hi Yogafit!'; // Optional: pre-defined message
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          SweetAlert.showAlertWithOptions({
            title: 'Error',
            subTitle: 'WhatsApp is not installed',
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            otherButtonTitle: 'Cancel',
            otherButtonColor: '#dedede',
            style: 'error',
            cancellable: true
          });
          // Alert.alert('Error', 'WhatsApp is not installed');
        }
      })
      .catch((err) => console.error('Error occurred', err));
  };
  const getBooking = async () => {
    setloading(true)
    try {
      let req = await Api.myBookingHistory({},user.token)
      if(req.status === 200 || req.status === 201){
        let {data} = req.data
        setbooking(data)
      } else {
        console.error("Error get event")
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }
  const findNearestDate = (dates = []) => {
    const today = new Date();
    if(dates.length > 0){
      return dates.reduce((nearest, dateObj) => {
          const currentDiff = Math.abs(new Date(dateObj.end_date) - today);
          const nearestDiff = Math.abs(new Date(nearest.end_date) - today);
  
          return currentDiff < nearestDiff ? dateObj : nearest;
      });
    } else {
      return false
    }
}
  const getContract = async () => {
    setloading(true)
    try {
      let req = await Api.myContract(false,user.token)
      if(req.status === 200 || req.status === 201){
        let {data} = req.data
        let aContract = findNearestDate(data)
        setcontract(aContract)
      } else {
        console.error("Error get event")
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }
  const doLogout = () => {
    removeUser()
    navigation.navigate('Home')
  }
  useEffect(() => {
    getBooking()
    getContract()
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <DeleteAccountModal deleteRef={deleteRef} navigation={navigation}/>
      <View style={[t.pt70,t.px20,t.faCenter,t.fjCenter]}>
        <Theimage original={profileimage} placeholder={img.profile} style={[t.w50,t.h50,{objectFit:'contain'}]}/>
        <Text style={[t['p18-700'],t.corange,t.mt10]}>{user && user.name}</Text>
        <Text style={[t['p18-600'],t.cblack,t.mt5]}>{user && user.email}</Text>
      </View>
      <View style={[t.px20,t.mt20]}>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.br10,t.bw1,t.bsolid,t.bblack,t.p10]}>
          <View>
            <Text style={[t['h16-400'],t.corange]}>Refer your friends</Text>
            <Text style={[t['p16-700'],t.cblack]}>{user && user.referal_code}</Text>
          </View>
          <Image source={img.share} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
      </View>
      <View style={[t.mt20,t.px20,t.faCenter,t.fjCenter]}>
        <TouchableOpacity style={[t.bgorange,t.px20,t.py10,t.br10,t.fRow,t.faCenter,t.fjBetween]} onPress={()=>{sendWhatsAppMessage('+6287803377765')}}>
          <Image source={img.contact} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
          <Text style={[t['h25-400'],t.cwhite,t.ms10]}>Connect With Us</Text>
        </TouchableOpacity>
      </View>
      {booking.length > 0 && (
        <View style={[t.mt20,t.px20]}>
          <TouchableOpacity onPress={() => {navigation.navigate('BookingHistory')}}>
            <Text style={[t.bgorange,t['h30-400'],t.cwhite,t.py15,t.tCenter]}>Booking History</Text>
            <View style={[t.fRow,t.faCenter,t.p10,t.fjCenter,t.bgwarning]}>
              <Image source={img.navClassActive} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
              <Text style={[t['h30-400'],t.corange,t.ms10]}>{booking.length}</Text>
              <Text style={[t['p16-500'],t.cblack,t.ms10]}>Class Booked</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {contract && (
        <View style={[t.mt20,t.px20]}>
          <View style={[t.fRow,t.faCenter,t.br10,t.bw1,t.bsolid,t.bblack,t.p10]}>
            <Image source={img.ticketOrange} style={[t.w40,t.h40,{objectFit:'contain'}]}/>
            <View style={[t.ms10]}>
              <Text style={[t['p14-500'],t.cblack]}>Current Membership</Text>
              <Text style={[t['h25-400'],t.corange]}>{contract && contract.packages_name }</Text>
              <View style={[t.fRow,t.faCenter,t.fjBetween,t.wp92]}>
                <View style={[t.fRow,t.faCenter]}>
                  <Text style={[t['p10-600'],t.cblack]}>Start Date: </Text>
                  <Text style={[t['p10-600'],t.corange]}>{contract && Helper.dateFormatId(contract.start_date)}</Text>
                </View>
                <View style={[t.fRow,t.faCenter]}>
                  <Text style={[t['p10-600'],t.cblack]}>End Date: </Text>
                  <Text style={[t['p10-600'],t.corange]}>{contract && Helper.dateFormatId(contract.end_date)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={[t.mt20,t.btw1,t.bgreyd,t.bsolid]}>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]} onPress={()=>{navigation.navigate('MyProfile')}}>
          <Text style={[t['p14-600'],t.corange]}>My Profile</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>My Detail Activity</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>Wants to be Yoga Instructor?</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]}>
          <Text style={[t['p14-600'],t.corange]}>Upcoming Yoga Fit Events</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]} onPress={()=>{navigation.navigate('Faq')}}>
          <Text style={[t['p14-600'],t.corange]}>FAQ</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]} onPress={()=>{deleteRef.current?.show()}}>
          <Text style={[t['p14-600'],t.corange]}>Delete Account</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.fRow,t.faCenter,t.fjBetween,t.px20,t.py10,t.bbw1,t.bgreyd,t.bsolid]} onPress={()=>{doLogout()}}>
          <Text style={[t['p14-600'],t.corange]}>Logout</Text>
          <Image source={img.arrowRightOrange} style={[t.w30,t.h30,{objectFit:'contain'}]}/>
        </TouchableOpacity>
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Profile;
