import React, {useEffect, useContext, useRef, useState} from 'react';
import {Dimensions, Text, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
function Verify({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {changephoneRef, verifyRef, loginRef, registerdata} = props;
  const [otp, setotp] = useState();
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const [register, setRegister] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const doVerify = async () => {
    setLoading(true);
    try {
      let payload = {
        id: registerdata.id,
        otp: otp,
      };
      if (registerdata.schedule) {
        payload.schedule = registerdata.schedule;
      }
      if (payload.id && payload.otp) {
        let req = false;
        if (registerdata.schedule) {
          req = await Api.cekoptwithbooking(payload);
        } else {
          req = await Api.cekotp(payload);
        }
        if (req.status === 200 || req.status === 201) {
          if (req.data.data != 'Wrong otp code') {
            setRegister({
              status: true,
              msg: 'Register success, you can login with your account now.',
            });
            setTimeout(() => {
              loginRef.current?.show();
              verifyRef.current?.hide();
            }, 2000);
          } else {
            setRegister({
              status: false,
              msg: 'Failed to register, OTP code is wrong',
            });
          }
        } else {
          setRegister({
            status: false,
            msg: 'Failed to register',
            data: null,
          });
        }
      } else {
        setRegister({
          status: false,
          msg: 'Please fill all required fields',
          data: null,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error verification: ' + error);
      setRegister({
        status: false,
        msg: 'Verification failed!',
      });
      setLoading(false);
    }
    setTimeout(() => {
      setRegister({
        status: true,
        msg: null,
        data: null,
      });
    }, 3000);
  };
  const doResend = async () => {
    setLoading(true);
    try {
      let payload = {
        nohp: registerdata.id,
      };
      let req = await Api.resendOtp(payload);
      if (req.status === 200 || req.status === 201) {
        if (req.data.data != 'Wrong otp code') {
          setResend({
            status: true,
            msg: 'New code has been sent',
          });
          setTimeout(() => {
            setResend({
              status: true,
              msg: null,
              data: null,
            });
          }, 2000);
        } else {
          setResend({
            status: false,
            msg: 'Failed to resend new code',
          });
        }
      } else {
        setResend({
          status: false,
          msg: 'Failed trying to resend new code',
          data: null,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error resend otp code: ' + error);
      setResend({
        status: false,
        msg: 'Resend code failed' + error,
      });
      setLoading(false);
    }
    setTimeout(() => {
      setResend({
        status: true,
        msg: null,
        data: null,
      });
    }, 3000);
  };
  return (
    <ActionSheet ref={verifyRef}>
      <View style={[t.bgwhite, t.wp100, t.px20, t.py20, t.brtl10, t.brtr10]}>
        <TouchableOpacity
          onPress={() => verifyRef.current?.hide()}
          style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15, t.h15]} />
        </TouchableOpacity>
        <Text style={[t['p20-600'], t.cblack, t.tCenter]}>
          Account Verification
        </Text>
        <View style={[t.mt10, t.fRow, t.wp100]}>
          <Text style={[t['p12-500'], t.cblack, t.tCenter, t.wp100]}>
            Hi {registerdata.name}, Please enter the verification code that was
            sent to your WhatsApp number
          </Text>
        </View>
        <View style={[t.mt10, t.faCenter, t.fjCenter]}>
          <Text style={[t['p12-500'], t.cblack, t.tCenter, t.wp100]}>
            Didn't get the code?
          </Text>
          <TouchableOpacity onPress={() => doResend()} style={[t.msAuto]}>
            <Text style={[t['p12-500'], t.corange, t.tCenter, t.wp100]}>
              Click here to resend
            </Text>
          </TouchableOpacity>
          <Text style={[t['p12-500'], t.cblack, t.tCenter, t.wp100]}>Or</Text>
          <TouchableOpacity
            onPress={() => {
              changephoneRef.current?.show();
              verifyRef.current?.hide();
            }}
            style={[t.msAuto]}>
            <Text style={[t['p12-500'], t.corange, t.tCenter, t.wp100]}>
              Change phone number
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.mt20, t.faCenter, t.fjCenter]}>
          <TextInput
            onChangeText={setotp}
            value={otp}
            placeholderTextColor="#ccc"
            placeholder="XXXXXX"
            style={[
              t.wp60,
              t.bggrey90,
              t.p10,
              t['p20-700'],
              t.br5,
              t.cwhite,
              t.mt10,
              {letterSpacing: 10},
              t.tCenter,
            ]}
          />
        </View>
        <View style={[t.faCenter, t.fjCenter]}>
          <TouchableOpacity
            style={[
              t.mxAuto,
              t.bgorange,
              t.mt20,
              t.faCenter,
              t.fjCenter,
              t.px50,
              t.py10,
              t.br5,
            ]}
            onPress={() => {
              doVerify();
            }}>
            <Text style={[t['p14-700'], t.cblack]}>
              {loading ? 'Processing...' : 'Verify'}
            </Text>
          </TouchableOpacity>
          <View style={[t.faCenter, t.fjCenter, t.mt5]}>
            <Text
              style={[t['p12-500'], register.status ? t.cblack : t.cdanger]}>
              {register.msg}
            </Text>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}

export default Verify;
