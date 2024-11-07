import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View, StatusBar, ScrollView, Text, Image, ActivityIndicator, Alert 
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
import {LocationContext} from '../context/LocationContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SweetAlert from 'react-native-sweet-alert';
// assets
import img from '../config/Image'
// components
import SubNavigation from '../components/SubNavigation';
import LocationSelect from '../components/LocationSelect';
import CalendarSelect from '../components/CalendarSelect';
import ClassItem from '../components/ClassItem';
import LevelModal from '../components/ClassKat';
import ClassKatModal from '../components/Ck';
import LoginModal from '../components/Login'
import VerifyModal from '../components/Verify'
import RegisterModal from '../components/Register'
import ChangePhoneModal from '../components/ChangePhone'
// api
import Api from  '../config/Api';
const Class = ({route,navigation}) => {
  const t = useContext(ThemeContext);
  const studio = useContext(LocationContext);
  const user = useContext(UserContext);
  const classkatRef = useRef(null);
  const ckRef = useRef(null);
  const loginRef = useRef(null);
  const verifyRef = useRef(null);
  const registerRef = useRef(null);
  const changephoneRef = useRef(null);
  const [registerdata,setregisterdata] = useState({})
  const [id,setid] = useState()
  const [level,setlevel] = useState('Select Level')
  const [loading,setloading] = useState(false)
  const [classdata,setclassdata] = useState(null)
  const [classkat,setclasskat] = useState('Select Category')
  const [classlist, setclasslist] = useState([])
  const [counter,setcounter] = useState(0)
  const {classKat = ''} = route.params || {}
  const getSchedule = async () => {
    setloading(true)
    try {
      let pLevel = (level != 'Select Level') ? level : ''
      let pClassKat = classkat != 'Select Category' ? classkat : ''
      let param = `id=${id}&studio=${studio.id}&level=${pLevel}&classkat=${pClassKat}`
      let req = await Api.mySchedule(param)
      if(req.status === 200 || req.status === 201) {
        let {data} = req.data
        setclasslist(data)
      } else {
        setclasslist([])
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }
  const doBookNow = async (data) => {
    try {
      let param = {
        id: Number(data.idschedule)
      }
      let req = await Api.bookingClass(param,user.token)
      if(req.status === 200 || req.status === 201) {
        if(req.data.message && req.data.message == 'Success Booking Class') {
          SweetAlert.showAlertWithOptions({
            title: 'Success',
            subTitle: 'Successfully booking class',
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            otherButtonTitle: 'Cancel',
            otherButtonColor: '#dedede',
            style: 'success',
            cancellable: true
          },() => {navigation.navigate('Home')});
        } else {
          console.log(req.data)
          SweetAlert.showAlertWithOptions({
            title: 'Failed',
            subTitle: 'Failed',
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            otherButtonTitle: 'Cancel',
            otherButtonColor: '#dedede',
            style: 'error',
            cancellable: true
          });
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const getToday = () => {
    const today = new Date();
    const formattedDate = today.getFullYear() + '-' + 
        String(today.getMonth() + 1).padStart(2, '0') + '-' + 
        String(today.getDate()).padStart(2, '0');
    return formattedDate
  }
  const registerAndBook = (data) => {
    setclassdata(data)
    registerRef.current?.show()
  }
  useEffect(() => {
    if(id){
      getSchedule()
      let count = counter + 1
      setcounter(count++)
    }
  }, [id, studio, level, classkat]);
  useEffect(() => {
    setid(getToday())
    if(classKat && classKat != ''){
      setclasskat(classKat)
    }
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <LevelModal classkatRef={classkatRef} onSelectLevel={(level)=>{setlevel(level)}}/>
      <ClassKatModal ckRef={ckRef} onSelectCk={(ck)=>{setclasskat(ck)}}/>
      <LoginModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef}/>
      <VerifyModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} registerdata={registerdata}/>
      <RegisterModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} onRegister={(data) => {setregisterdata(data)}} classdata={classdata}/>
      <ChangePhoneModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} registerdata={registerdata}/>
      <StatusBar translucent barStyle="dark-content" />
      <View style={[t.px20,t.bggreye,t.pt70]}>
        <LocationSelect navigation={navigation}/>
      </View>
      <SubNavigation navigation={navigation}/>
      <View style={[t.pt20,t.px20]}>
        <CalendarSelect onDateSelected={(date) => {setid(date)}}/>
      </View>
      <View style={[t.mt10,t.px20,t.fRow,t.faCenter,t.fjStart]}>
        <TouchableOpacity style={[t.bgorange,t.me10,t.br5,t.py10,t.px10,t.fRow,t.faCenter,t.fjBetween]} onPress={() => {classkatRef.current?.show();}}>
          <Text style={[t.cwhite,t['p10-500']]}>{level}</Text>
          <Image source={img.arrowDownWhite} style={[t.ms20,t.w15,t.h15,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.bgorange,t.me10,t.br5,t.py10,t.px10,t.fRow,t.faCenter,t.fjBetween]} onPress={() => {ckRef.current?.show();}}>
          <Text style={[t.cwhite,t['p10-500']]}>{classkat ? classkat : classKat}</Text>
          <Image source={img.arrowDownWhite} style={[t.ms20,t.w15,t.h15,{objectFit:'contain'}]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[t.bggreye,t.br5,t.py10,t.px10,t.fRow,t.faCenter,t.fjBetween]} onPress={() => {setlevel('Select Level');setclasskat('Select Category')}}>
          <Text style={[t.corange,t['p10-500']]}>Reset</Text>
          <Image source={img.close} style={[t.ms20,t.w10,t.h10,{objectFit:'contain'}]}/>
        </TouchableOpacity>
      </View>
      <View style={[t.pt20,t.px20]}>
        <View style={[t.bgwarning,t.fRow,t.faCenter,t.p10,t.br10]}>
          <Image source={img.warning} style={[t.w20,t.h20,t.me5]}/>
          <Text style={[t['p10-500'],t.cblack,t.wp95]}>Booking are mandatory in advance. Please book your class at least 1 day before to make sure your space are secured.</Text>
        </View>
      </View>
      <View style={[t.mt20, t.px20]}>
        {!loading && classlist.length > 0 ? classlist.map((item,index) => {
          return (
            <ClassItem data={item} key={index} boxStyle={[t.mt10]} onBookPress={(data)=>{user ? doBookNow(data) : registerAndBook(data)}} onDetailPress={()=>{navigation.navigate('DetailClass',{theClass:item})}}/>
          )
        }) : loading ? (<View style={[t.py50]}><ActivityIndicator size="large" color="#FE9805" /></View>) : <Text style={[t['p14-500'],t.cblack,t.tCenter,t.py50]}>No Available Schedule</Text>}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default Class;
