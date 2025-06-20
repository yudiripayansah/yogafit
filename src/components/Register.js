import React, {useEffect, useContext, useRef, useState} from 'react';
import {Switch, Text, ScrollView, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {LocationContext} from '../context/LocationContext';
import ActionSheet from 'react-native-actions-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
// components
import LocationModal from './LocationList';
import ClassItem from './ClassItem';
function Register({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {setUser} = useContext(AuthContext);
  const studio = useContext(LocationContext);
  const locationRef = useRef(null);
  const {loginRef, verifyRef, registerRef, onRegister, classdata} = props;
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [referral, setreferral] = useState('');
  const [gender, setgender] = useState(true);
  const [birthday, setbirthday] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [register, setRegister] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const handlePhoneNumber = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setid(numericValue);
  };
  const toggleSwitch = () => setgender(previousState => !previousState);
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === 'ios'); // Only keep picker open on iOS
    setbirthday(currentDate);
  };
  const doRegister = async () => {
    setLoading(true);
    let dGender = gender ? 'male' : 'female';
    try {
      let payload = {
        id: id,
        name: name,
        email: email,
        gender: dGender,
        birthday: birthday,
        referral: referral,
        studio: studio.id,
      };
      if (classdata && classdata.idschedule) {
        payload.schedule = classdata.idschedule;
      }
      if (id && name && email && dGender && birthday && studio) {
        let req = false;
        if (classdata && classdata.idschedule) {
          req = await Api.getuserotp(payload);
        } else {
          req = await Api.register(payload);
        }
        if ((req && req.status === 200) || req.status === 201) {
          if (req.data) {
            onRegister(payload);
            setRegister({
              status: true,
              msg: 'Verification code sent to your whatsapp number',
              data: null,
            });
            setTimeout(() => {
              registerRef.current?.hide();
              setTimeout(()=> {
                verifyRef.current?.show();
              },300)
            }, 2000);
          } else {
            setRegister({
              status: false,
              msg: 'Failed to register, something went wrong in server',
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
      console.error('Error register: ' + error);
      setRegister({
        status: false,
        msg: 'Register failed! mobile number or password is wrong.',
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
  return (
    <ActionSheet ref={registerRef}>
      <LocationModal locationRef={locationRef} />
      <ScrollView
        style={[t.bgwhite, t.wp100, t.px20, t.py20, t.brtl10, t.brtr10]}>
        <TouchableOpacity
          onPress={() => registerRef.current?.hide()}
          style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15, t.h15]} />
        </TouchableOpacity>
        <Text style={[t['p20-600'], t.cblack, t.tCenter]}>Come join Us?</Text>
        {classdata && classdata.idschedule && (
          <View style={[t.mt20]}>
            <Text style={[t['p16-500'], t.cblack]}>Selected Class</Text>
            <ClassItem data={classdata} boxStyle={[t.mt10]} hidebtn={true} />
          </View>
        )}
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'], t.cblack]}>Mobile number</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={handlePhoneNumber}
            value={id}
            placeholderTextColor="#ccc"
            placeholder="eg: +6281234567890"
            style={[t.bggrey90, t.p10, t['p14-500'], t.br5, t.cwhite, t.mt10]}
          />
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'], t.cblack]}>Full Name</Text>
          <TextInput
            onChangeText={setname}
            value={name}
            placeholderTextColor="#ccc"
            placeholder="eg: John Doe"
            style={[t.bggrey90, t.p10, t['p14-500'], t.br5, t.cwhite, t.mt10]}
          />
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'], t.cblack]}>Email</Text>
          <TextInput
            onChangeText={setemail}
            value={email}
            placeholderTextColor="#ccc"
            placeholder="eg: johndoe@email.com"
            style={[t.bggrey90, t.p10, t['p14-500'], t.br5, t.cwhite, t.mt10]}
          />
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'], t.cblack]}>Gender</Text>
          <View style={[t.fRow, t.faCenter, t.mt10]}>
            <Switch
              trackColor={{false: '#F67AAE', true: '#17A5FF'}}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={gender}
            />
            <Text style={[t['p16-700'], t.cblack]}>
              {gender ? 'Male' : 'Female'}
            </Text>
          </View>
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'], t.cblack]}>Birthday</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={[t.mt10]}>
            <Text style={[t['p16-700'], t.cblack]}>
              {`Birthday: ${birthday.toLocaleDateString()}`}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthday}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        <View style={[t.mt20]}>
          <Text style={[t['p16-500'], t.cblack]}>Studio</Text>
          <TouchableOpacity
            onPress={() => {
              locationRef.current?.show();
            }}
            style={[t.bggrey90, t.p10, t.br5, t.mt10]}>
            <Text style={[t['p14-500'], t.cwhite]}>
              {studio && studio.deptname}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[t.my20]}>
          <Text style={[t['p16-500'], t.cblack]}>Referral Code</Text>
          <TextInput
            onChangeText={setreferral}
            value={referral}
            placeholderTextColor="#ccc"
            placeholder="eg: Y064F1T"
            style={[t.bggrey90, t.p10, t['p14-500'], t.br5, t.cwhite, t.mt10]}
          />
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
            doRegister();
          }}>
          <Text style={[t['p14-700'], t.cblack]}>
            {loading ? 'Processing...' : 'Register'}
          </Text>
        </TouchableOpacity>
        <View style={[t.faCenter, t.fjCenter, t.mt5]}>
          <Text style={[t['p12-500'], register.status ? t.cblack : t.cdanger]}>
            {register.msg}
          </Text>
        </View>
        <View style={[t.mt10, t.fRow, t.fjCenter]}>
          <Text style={[t['p16-600'], t.cblack]}>Already a Member?</Text>
          <TouchableOpacity
            onPress={() => {
              registerRef.current?.hide();
              setTimeout(()=>{
                loginRef.current?.show();
              },300)
            }}>
            <Text style={[t['p16-600'], t.corange, t.ms5]}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ActionSheet>
  );
}

export default Register;
