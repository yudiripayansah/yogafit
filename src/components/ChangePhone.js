import React, {useEffect, useContext, useRef, useState } from 'react';
import {Dimensions, Text, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
// API
import Api from '../config/Api'
function ChangePhone({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {changephoneRef,verifyRef, loginRef, registerdata} = props
  const [nohp,setnohp] = useState()
  const [loading, setLoading] = useState(false)
  const [cp, setCp] = useState({
    status: true,
    msg: null,
    data: null
  })
  const handlePhoneNumber = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setnohp(numericValue);
  };
  const doChange = async () => {
    setLoading(true)
    try {
      let payload = {
        id: registerdata.id,
        nohp: nohp
      }
      if(payload.id && payload.nohp) {
        let req = await Api.updatePhone(payload)
        if(req.status === 200 || req.status === 201){
            setCp({
              status: true,
              msg: 'Phone number updated successfully'
            })
            setTimeout(() => {
              changephoneRef.current?.hide()
              verifyRef.current?.show()
            },2000)
        } else {
          setCp({
            status: false,
            msg: 'Failed to update phone number',
            data: null
          })
        }
      } else {
        setCp({
          status: false,
          msg: 'Please fill new phone number',
          data: null
        })
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setCp({
        status: false,
        msg: 'Change phone number failed!'
      })
      setLoading(false)
    }
    setTimeout(()=>{
      setCp({
        status: true,
        msg: null,
        data: null
      })
    },3000)
  }
  return (
    <ActionSheet ref={changephoneRef}>
      <View style={[t.bgwhite,t.wp100,t.px20,t.py20,t.brtl10,t.brtr10]}>
        <TouchableOpacity onPress={() => changephoneRef.current?.hide()} style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15,t.h15]}/>
        </TouchableOpacity>
        <Text style={[t['p20-600'],t.cblack,t.tCenter]}>Change Phone Number</Text>
        <View style={[t.mt10,t.fRow,t.wp100]}>
          <Text style={[t['p12-500'],t.cblack,t.tCenter,t.wp100]}>Hi {registerdata.name}, Please enter new phone number</Text>
        </View>
        <View style={[t.mt20,t.faCenter,t.fjCenter,t.wp100]}>
          <TextInput keyboardType="numeric" onChangeText={handlePhoneNumber} value={nohp} placeholderTextColor='#ccc' placeholder='eg: +6281234567890' style={[t.bggrey90,t.p10,t['p14-500'],t.br5,t.cwhite,t.wp80]}/>
        </View>
        <View style={[t.faCenter,t.fjCenter]}>
          <TouchableOpacity style={[t.mxAuto,t.bgorange,t.mt20,t.faCenter,t.fjCenter,t.px50,t.py10,t.br5]} onPress={()=>{doChange()}}>
            <Text style={[t['p14-700'],t.cblack]}>{loading ? 'Processing...' : 'Update'}</Text>
          </TouchableOpacity>
          <View style={[t.faCenter,t.fjCenter,t.mt5]}>
            <Text style={[t['p12-500'],cp.status ? t.cblack : t.cdanger]}>{cp.msg}</Text>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}

export default ChangePhone;
