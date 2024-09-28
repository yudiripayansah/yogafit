import React, {useEffect, useContext, useRef } from 'react';
import {Dimensions, Text, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
function Login({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {loginRef,verifyRef} = props
  return (
    <ActionSheet ref={loginRef}>
      <View style={[t.bgwhite,t.wp100,t.px20,t.py20,t.brtl10,t.brtr10]}>
        <TouchableOpacity onPress={() => loginRef.current?.hide()} style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15,t.h15]}/>
        </TouchableOpacity>
        <Text style={[t['p20-600'],t.cblack,t.tCenter]}>Already a Member?</Text>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'],t.cblack]}>Mobile number</Text>
          <TextInput placeholderTextColor='#ccc' placeholder='eg: +6281234567890' style={[t.bggrey90,t.p10,t['p14-500'],t.br5,t.cwhite,t.mt10]}/>
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'],t.cblack]}>Password</Text>
          <TextInput placeholderTextColor='#ccc' placeholder='Enter your password' style={[t.bggrey90,t.p10,t['p14-500'],t.br5,t.cwhite,t.mt10]} secureTextEntry/>
        </View>
        <View style={[t.mt10,t.fRow]}>
          <Text style={[t['p12-600'],t.cblack]}>Forgot your password?</Text>
          <TouchableOpacity>
            <Text style={[t['p12-600'],t.corange,t.tItalic,t.ms5]}>Click Here</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[t.mxAuto,t.bgorange,t.mt20,t.faCenter,t.fjCenter,t.px50,t.py10,t.br5]} onPress={() => {loginRef.current?.hide();verifyRef.current?.show()}}>
          <Text style={[t['p14-700'],t.cblack]}>Login</Text>
        </TouchableOpacity>
        <View style={[t.relative,t.faCenter,t.fjCenter,t.my10]}>
          <View style={[t.absolute,t.wp100,t.bbw2,t.bblack,t.bsolid]}></View>
          <Text style={[t.bgwhite,t['p14-600'],t.cblack,t.px10,t.py10]}>OR</Text>
        </View>
        <View>
          <TouchableOpacity style={[t.fRow,t.bgwhite,t.fjCenter]}>
            <Image source={img.google} style={[t.w20,t.h20]}/>
            <Text style={[t['p14-700'],t.cblack,t.ms10]}>Login with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={[t.my40,t.fRow,t.fjCenter]}>
          <Text style={[t['p16-600'],t.cblack]}>Not a Member?</Text>
          <TouchableOpacity>
            <Text style={[t['p16-600'],t.corange,t.ms5]}>Register Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}

export default Login;