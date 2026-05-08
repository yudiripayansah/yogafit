import React, { useEffect, useContext, useRef, useState } from 'react';
import { Dimensions, Text, View, Image, TextInput, TouchableWithoutFeedback, TouchableOpacityBase } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';
// assets
import img from '../config/Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
// API
import { Api } from '../config/Api';
function Verify({ navigation, ...props }) {
  const t = useContext(ThemeContext);
  const { changephoneRef, verifyRef, loginRef, registerdata, registerRef } = props;
  const [otp, setotp] = useState();
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const [register, setRegister] = useState({
    status: false,
    msg: null,
    data: null,
  });
  const SuccessPopup = () => {
    return (
      <View style={[t.absolute, t.bottom0, t.right0, { backgroundColor: 'rgba(0,0,0,.5)' }, t.top0, t.left0, t.faCenter, t.fjCenter]}>
        <View style={[t.py32, t.px24, t.br10, t.bgwhite, t.fjCenter, t.wp80, t.relative]}>
          <TouchableOpacity style={[t.br100, t.w48, t.h48, t.absolute, t.mtop48, t.mright48, t.faCenter, t.fjCenter, t.bgwhite]}>
            <Image source={img.close} style={[t.w16, t.h16, t.mxAuto]} resizeMode='contain' />
          </TouchableOpacity>
          <Image source={img.success} style={[t.w80, t.h80, t.mxAuto]} resizeMode='contain' />
          <Text style={[t['h18-700'], t.cblack, t.tCenter, t.mt16]}>Account Registered!</Text>
          <Text style={[t['h12-400'], t.cgrey90, t.tCenter, t.mt4]}>Welcome to Yoga Fit App! Explore our app and get free trial class for the first time!</Text>
          <TouchableOpacity
            style={[
              t.bw1,
              t.bsolid,
              t.bfreshorange,
              t.bgorange,
              t.wp100,
              t.py13,
              t.faCenter,
              t.fjCenter,
              t.br12,
              t.mt16,
              t.cwhite
            ]}
            onPress={() => {
              verifyRef.current?.hide()
              loginRef.current?.show()
            }}>
            <Text style={[t['h14-700'], t.cwhite]}>
              Continue Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
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
      <LinearGradient colors={['#FFF3EE', '#FFFFFF']} style={[t.bgwhite, t.wp100, t.hp100, t.brtl10, t.brtr10]}>
        <View style={[t.px20, t.py20]}>
          <TouchableWithoutFeedback onPress={() => {
            verifyRef.current?.hide()
            registerRef.current?.show()
          }}>
            <Image source={img.backBtn} style={[t.w48, t.h48, t.br100]} resizeMode='contain' />
          </TouchableWithoutFeedback>
          <Text style={[t['h32-700'], t.corange, t.mt40]}>
            Masukan Kode
          </Text>
          <View style={[t.mt8, t.fRow, t.wp100]}>
            <Text style={[t['h14-400'], t.cgrey90, t.wp100]}>
              Cek email / whatsapp anda dan masukkan kode verifikasi pada kolom dibawah ini sebanyak 6 digit
            </Text>
          </View>
          <View style={[t.mt16, t.faCenter, t.fjCenter]}>
            <TextInput
              onChangeText={setotp}
              value={otp}
              placeholderTextColor="#ccc"
              placeholder="XXXXXX"
              style={[
                t.wp100,
                t.bgwhite,
                t.p10,
                t['p40-400'],
                t.br10,
                t.corange,
                { letterSpacing: 10 },
                t.tCenter,
                t.bw1,
                t.bsolid,
                t.bgrey
              ]}
            />
          </View>
          <View style={[t.mt16, t.faCenter, t.wp100, t.fRow]}>
            <Text style={[t['h12-400'], t.cgrey90]}>
              Tidak menerima kode?
            </Text>
            <TouchableOpacity onPress={() => doResend()} style={[t.ms5]}>
              <Text style={[t['h12-400'], t.corange, t.tCenter, t.wp100]}>
                Kirim ulang (60 detik)
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[t.mt5, t.faCenter, t.fRow]}>
            <Text style={[t['h12-400'], t.cgrey90]}>Atau</Text>
            <TouchableOpacity
              onPress={() => {
                changephoneRef.current?.show();
                verifyRef.current?.hide();
              }}
              style={[t.msAuto]}>
              <Text style={[t['h12-400'], t.corange, t.tCenter, t.wp100, t.ms5]}>
                Ganti no hp
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              t.bw1,
              t.bsolid,
              t.bfreshorange,
              t.bgorange,
              t.wp100,
              t.py13,
              t.faCenter,
              t.fjCenter,
              t.br12,
              t.mt12,
              t.cwhite,
              t.wp100
            ]}
            onPress={() => {
              doVerify();
            }}>
            <Text style={[t['h14-700'], t.cwhite]}>
              {loading ? 'Processing...' : 'Verify'}
            </Text>
          </TouchableOpacity>
          <View style={[t.faCenter, t.fjCenter, t.mt5]}>
            <Text
              style={[t['p12-500'], register.status ? t.cblack : t.cdanger]}>
              {register.msg}
            </Text>
          </View>
          {register.status && <SuccessPopup />}
        </View>
      </LinearGradient>
    </ActionSheet>
  );
}

export default Verify;
