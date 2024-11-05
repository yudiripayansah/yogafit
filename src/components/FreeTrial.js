import React, {useContext} from 'react';
import {View, Image, Text} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
// components
import FreeContractCard from './FreeContractCard';
import Theimage from './Theimage'
function FreeTrial({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {freetrialRef,data} = props
  return (
    <ActionSheet ref={freetrialRef}>
      <View style={[t.bgwhite,t.wp100,t.px20,t.py20,t.brtl10,t.brtr10]}>
        <TouchableOpacity onPress={() => freetrialRef.current?.hide()} style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15,t.h15]}/>
        </TouchableOpacity>
        <Text style={[t['p25-600'],t.cblack,t.mt10,t.tCenter]}>Free trial kamu sudah siap digunakan!!!</Text>
        <View style={[t.mt20]}>
          <FreeContractCard data={data}/>
        </View>
        <View style={[t.mt20,t.px50,t.fjCenter,t.faCenter]}>
          <Theimage original={{uri: data && data.qrcode}} placeholder={img.placeholder} style={[t.h200,{objectFit:'contain'}]}/>
          <Text style={[t['p12-500'],t.cblack,t.mt10]}>Tunjukan & Scan Qrcode ini</Text>
        </View>
      </View>
    </ActionSheet>
  );
}

export default FreeTrial;
