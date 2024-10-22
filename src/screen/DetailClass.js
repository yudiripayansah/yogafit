import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View, ScrollView, StatusBar, ActivityIndicator, Text, Dimensions
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SweetAlert from 'react-native-sweet-alert';
// components
import Theimage from '../components/Theimage';
import RenderHTML from 'react-native-render-html';
// api
import Api from  '../config/Api';
const DetailClass = ({route,navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const screenWidth = Dimensions.get('window').width - 40;
  const {theClass} = route.params
  const [loading,setloading] = useState(false)
  const doBookNow = async () => {
    setloading(true)
    try {
      let param = {
        id: Number(theClass.id_schedule)
      }
      let req = await Api.bookingClass(param,user.token)
      if(req.status === 200 || req.status === 201) {
        setTimeout(()=>{
          if(req.data.message && req.data.message == 'Success Added') {
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
            SweetAlert.showAlertWithOptions({
              title: 'Failed',
              subTitle: req.data.data[0],
              confirmButtonTitle: 'OK',
              confirmButtonColor: '#000',
              otherButtonTitle: 'Cancel',
              otherButtonColor: '#dedede',
              style: 'error',
              cancellable: true
            });
          }
        },2000)
      }
      setTimeout(()=>{
        setloading(false)
      },2000)
    } catch (error) {
      setTimeout(()=>{
        setloading(false)
      },2000)
      console.error(error)
    }
  }
  useEffect(() => {
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Theimage original={{uri:'https://login.yogafitidonline.com/api/storage/studio/'+theClass.gambar}} placeholder={img.placeholder}/>
      <View style={[t.pt20,t.pb50,t.px20]}>
        <Text style={[t['h30-400'],t.cblack]}>{theClass.class_name}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Alamat</Text>
        <Text style={[t['p16-500'],t.cblack]}>{theClass.alamat}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Kapasitas</Text>
        <Text style={[t['p16-500'],t.cblack]}>{theClass.capacity}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Kategori</Text>
        <Text style={[t['p16-500'],t.cblack]}>{theClass.class_kat}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Level</Text>
        <Text style={[t['p16-500'],t.cblack]}>{theClass.class_level}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Studio</Text>
        <Text style={[t['p16-500'],t.cblack]}>{theClass.deptname}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Teacher</Text>
        <Text style={[t['p16-500'],t.cblack]}>{theClass.name}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Time</Text>
        <Text style={[t['p16-500'],t.cblack]}>{theClass.start_time} - {theClass.end_time}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Tanggal</Text>
        <Text style={[t['p16-500'],t.cblack]}>{theClass.tgl_schedule}</Text>
        <Text style={[t['p16-700'],t.cblack,t.mt10]}>Fasilitas</Text>
        <RenderHTML
          contentWidth={screenWidth}
          style={[t.cblack,t['p12-500']]}
          tagsStyles={{
            div: { color: 'black' },
          }}
          source={{ html: `<div>${theClass.fasilitas}</div>` }}
        />
        {!loading ? 
          (
            <TouchableOpacity onPress={()=>{doBookNow()}}>
              <Text style={[t.bgorange,t.py5,t.px10,t.bw1,t.borange,t.bsolid,t.br5,t.cwhite,t.tCenter,t['p20-700']]}>Book Now</Text>
            </TouchableOpacity>
          )
         : (<View style={[t.pt20]}><ActivityIndicator size="large" color="#FE9805" /></View>)}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default DetailClass;
