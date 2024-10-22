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
import ContractCard from '../components/ContractCard';
import QrModal from '../components/QrModal';
const MyContract = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const qrRef = useRef(null);
  const [contract,setcontract] = useState([])
  const [loading,setloading] = useState(false)
  const [qrcode,setqrcode] = useState()
  const getContract = async () => {
    setloading(true)
    try {
      let req = await Api.myContract({},user.token)
      if(req.status === 200 || req.status === 201){
        let {data} = req.data
        data.map((item)=>{
          item.status = ''
          switch (item.status_contract) {
            case "0":
              item.status = 'Aktif'
              item.bg = 'bgleafGreen'
              break;
            case "1":
              item.status = 'Tidak Aktif'
              item.bg = 'bgdanger'
              break;
            case "2":
              item.status = 'Waiting Approve Cuti'
              item.bg = 'bggrey6'
              break;
            case "3":
              item.status = 'Cuti'
              item.bg = 'bggrey6'
              break;
            case "4":
              item.status = 'Trial'
              item.bg = 'bggrey6'
              break;
          }
        })
        setcontract(data)
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
    <ScrollView style={[t.bgwhite]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <QrModal qrRef={qrRef} qrcode={qrcode}/>
      <View style={[t.pt30,t.px20,t.faCenter,t.fjCenter]}>
        <Text style={[t['p18-600'],t.cblack,t.mt5]}>My Contract</Text>
      </View>
      <View style={[t.mt20, t.px20]}>
        {!loading && contract.length > 0 ? contract.map((item,index) => {
          return (
            <ContractCard data={item} key={index} boxStyle={[t.mt10]} onPress={(qrcode)=>{setqrcode(qrcode);qrRef.current?.show()}}/>
          )
        }) : loading ? (<View style={[t.py50]}><ActivityIndicator size="large" color="#FE9805" /></View>) : <Text style={[t['p14-500'],t.cblack,t.tCenter,t.py50]}>No Available Contract</Text>}
      </View>
      <View style={[t.py50,t.wp100]}></View>
    </ScrollView>
  );
};

export default MyContract;
