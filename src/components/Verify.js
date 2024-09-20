import React, {useEffect, useContext, useRef } from 'react';
import {Dimensions, Text, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
function Verify({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {verifyRef, loginRef} = props
  return (
    <ActionSheet ref={verifyRef}>
      <View style={[t.bgwhite,t.wp100,t.px20,t.py20,t.brtl10,t.brtr10]}>
        <TouchableOpacity onPress={() => verifyRef.current?.hide()} style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15,t.h15]}/>
        </TouchableOpacity>
        <Text style={[t['p20-600'],t.cblack,t.tCenter]}>Account Verification</Text>
        <View style={[t.mt10,t.fRow]}>
          <Text style={[t['p12-500'],t.cblack,t.tCenter]}>Enter the verification code that was sent to your WhatsApp number</Text>
        </View>
        <View style={[t.mt20,t.faCenter,t.fjCenter]}>
          <TextInput placeholderTextColor='#ccc' placeholder='XXXXXX' style={[t.wp60,t.bggrey90,t.p10,t['p20-700'],t.br5,t.cwhite,t.mt10,{letterSpacing:10},t.tCenter]}/>
        </View>
        <View style={[t.faCenter,t.fjCenter]}>
        <TouchableOpacity style={[t.mxAuto,t.bgorange,t.mt20,t.faCenter,t.fjCenter,t.px50,t.py10,t.br5]}>
          <Text style={[t['p14-700'],t.cblack]}>Verify</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}

export default Verify;
