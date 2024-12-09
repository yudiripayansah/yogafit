import React, {useEffect, useContext, useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
function Forgot({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {setUser} = useContext(AuthContext);
  const {loginRef, verifyRef, registerRef, forgotRef} = props;
  // const [email,setemail] = useState('085156487895')
  // const [password,setpassword] = useState('841586')
  const [phone, setphone] = useState();
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const doforgot = async () => {
    setLoading(true);
    try {
      let payload = {
        phone: phone,
      };
      if (phone) {
        let req = await Api.forgot(payload);
        if (req.status === 200 || req.status === 201) {
          setForgot({
            status: true,
            msg: 'Forgot password success',
          });
          setTimeout(() => {
            forgotRef.current?.hide();
          }, 2000);
        } else {
          setForgot({
            status: false,
            msg: 'Failed to forgot password',
            data: null,
          });
        }
      } else {
        setForgot({
          status: false,
          msg: 'Please enter phone number',
          data: null,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error forgot password: ' + error);
      setForgot({
        status: false,
        msg: 'Forgot password failed please try again later',
      });
      setLoading(false);
    }
    setTimeout(() => {
      setForgot({
        status: true,
        msg: null,
        data: null,
      });
    }, 3000);
  };
  return (
    <ActionSheet ref={forgotRef}>
      <View style={[t.bgwhite, t.wp100, t.px20, t.py20, t.brtl10, t.brtr10]}>
        <TouchableOpacity
          onPress={() => forgotRef.current?.hide()}
          style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15, t.h15]} />
        </TouchableOpacity>
        <Text style={[t['p20-600'], t.cblack, t.tCenter]}>Forgot Password</Text>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'], t.cblack]}>Mobile number</Text>
          <TextInput
            onChangeText={setphone}
            value={phone}
            placeholderTextColor="#ccc"
            placeholder="eg: +6281234567890"
            style={[t.bggrey90, t.p10, t['p14-500'], t.br5, t.cwhite, t.mt10]}
          />
        </View>
        <View style={[t.mt10, t.fRow, t.mb20]}>
          <Text style={[t['p12-600'], t.cblack]}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              forgotRef.current?.hide();
              loginRef.current?.show();
            }}>
            <Text style={[t['p12-600'], t.corange, t.tItalic, t.ms5]}>
              Click Here
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            t.mxAuto,
            t.bgorange,
            t.faCenter,
            t.fjCenter,
            t.px50,
            t.py10,
            t.br5,
          ]}
          onPress={() => {
            doforgot();
          }}>
          <Text style={[t['p14-700'], t.cblack]}>
            {loading ? 'Processing...' : 'Submit'}
          </Text>
        </TouchableOpacity>
        <View style={[t.faCenter, t.fjCenter, t.mt5]}>
          <Text style={[t['p12-500'], forgot.status ? t.cblack : t.cdanger]}>
            {forgot.msg}
          </Text>
        </View>
      </View>
    </ActionSheet>
  );
}

export default Forgot;
