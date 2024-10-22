import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View, ScrollView, StatusBar, ActivityIndicator, Text
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
// API
import Api from '../config/Api'
// components
import ContractItem from '../components/ContractItem';
import QrModal from '../components/QrModal';
const HomeContract = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const qrRef = useRef(null);
  const [contract,setcontract] = useState([])
  const [loading,setloading] = useState(false)
  const [qrcode,setqrcode] = useState()
  const getContract = async () => {
    setloading(true)
    try {
      let req = await Api.myBooking({},user.token)
      if(req.status === 200 || req.status === 201){
        let {data} = req.data
        if(data){
          let theData = [data[0]]
          setcontract(theData)
        }
      } else {
        console.error("Error get event")
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }
  useEffect(() => {
    getContract()
  }, []);
  return (
    <View style={[t.py20,t.bggreye,t.px20]}>
      <QrModal qrRef={qrRef} qrcode={qrcode}/>
      <Text style={[t['p20-500'],t.cblack,t.tCenter,t.mb20]}>My Class Booking</Text>
      {!loading && contract.length > 0 && contract[0] ? contract.map((item,index) => {
      return (
          <ContractItem data={item} key={index} boxStyle={[t.mt10]} onPress={(qrcode)=>{setqrcode(qrcode);qrRef.current?.show()}}/>
        )
      }) : loading ? (<View style={[t.py50]}><ActivityIndicator size="large" color="#FE9805" /></View>) : <Text style={[t['p14-500'],t.cblack,t.tCenter,t.py50]}>No Available Booking</Text>}
    </View>
  );
};

export default HomeContract;
