import React, {useEffect, useContext, useRef, useState } from 'react';
import {Dimensions, Text, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
// components
import Theimage from './Theimage'
function QrModal({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {qrRef,qrcode} = props
  return (
    <ActionSheet ref={qrRef}>
      <View style={[t.bgwhite,t.wp100,t.px20,t.py20,t.brtl10,t.brtr10]}>
        <TouchableOpacity onPress={() => qrRef.current?.hide()} style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15,t.h15]}/>
        </TouchableOpacity>
        <View style={[t.mt20,t.px20]}>
          <Theimage original={qrcode} placeholder={img.placeholder} style={[t.wp100,{objectFit:'contain'}]}/>
        </View>
      </View>
    </ActionSheet>
  );
}

export default QrModal;
