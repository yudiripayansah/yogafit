import React, { useEffect, useContext, useRef, useState } from 'react';
import { Text, ScrollView, View, Image, TextInput, TouchableWithoutFeedback, Pressable, Platform } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { LocationContext } from '../context/LocationContext';
import ActionSheet from 'react-native-actions-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
// assets
import img from '../config/Image';
import { TouchableOpacity } from 'react-native-gesture-handler';
// API
import { Api } from '../config/Api';
// components
import LocationModal from './LocationList';
import ClassItem from './ClassItem';
function Register({ navigation, ...props }) {
  const t = useContext(ThemeContext);
  const { setUser } = useContext(AuthContext);
  const studio = useContext(LocationContext);
  const locationRef = useRef(null);
  const { loginRef, verifyRef, registerRef, onRegister, classdata } = props;
  const [countryCode, setCountryCode] = useState('+62');
  const [countryCodes, setCountryCodes] = useState(['+62']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [regions, setregions] = useState([]);
  const [id, setid] = useState();
  const [region, setregion] = useState(1);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [referral, setreferral] = useState('');
  const [gender, setgender] = useState(null);
  const [birthday, setbirthday] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [register, setRegister] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const handlePhoneNumber = text => {
    let numericValue = text.replace(/[^0-9]/g, '');
    numericValue = numericValue.replace(/^0+/, '');

    setid(numericValue);
  };
  const onDateChange = (event, selectedDate) => {
    if (Platform.OS === 'ios') {
      if (selectedDate) setTempDate(selectedDate);
    } else {
      if (selectedDate) { setbirthday(selectedDate); }
      setShowDatePicker(false);
    }
  };
  const doRegister = async () => {
    setLoading(true);
    try {
      let payload = {
        id: countryCode + id,
        region: region,
        name: name,
        email: email,
        referral: referral,
        studio: studio.id,
      };
      if (gender !== null) payload.gender = gender ? 'male' : 'female';
      if (birthday !== null) payload.birthday = birthday;
      if (classdata && classdata.idschedule) {
        payload.schedule = classdata.idschedule;
      }
      if (id && name && email && studio) {
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
              verifyRef.current?.show();
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
  const getRegion = async () => {
    try {
      let req = await Api.region();
      if (req.status === 200 || req.status === 201) {
        if (req.data.data) {
          setregions(req.data.data);
        }
      }
    } catch (error) {
      console.error('Error get regions: ' + error);
    }
  };
  const getCountryCode = async () => {
    try {
      let req = await Api.countryCode();
      if (req.status === 200 || req.status === 201) {
        if (req.data.data) {
          setCountryCodes(req.data.data);
        } else {
          setCountryCode('+62');
        }
      } else {
        setCountryCode('+62');
      }
    } catch (error) {
      console.error('Error get country code: ' + error);
      setCountryCode('+62');
    }
  };
  const RadioButton = ({ label, value }) => (
    <TouchableOpacity
      style={[t.fRow, t.faCenter, t.me20]}
      onPress={() => setregion(value)}
    >
      <View
        style={[
          t.w20,
          t.h20,
          t.br100,
          t.bw1,
          t.fjCenter,
          t.faCenter,
          region === value ? t.borange : t.cgreyc,
        ]}
      >
        {region === value && (
          <View style={[t.bgorange, t.w10, t.h10, t.br100]} />
        )}
      </View>

      <Text style={[t.ms8, t.cblack, t['p14-400']]}>{label}</Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    getCountryCode();
    getRegion();
  }, []);
  return (
    <ActionSheet ref={registerRef} isModal={false}>
      <LocationModal locationRef={locationRef} region={region} nav={navigation} />
      <ScrollView
        style={[t.wp100, t.brtl10, t.brtr10]}>
        <LinearGradient
          colors={['#FFF3EE', '#FFFFFF']}
          style={[{ flex: 1 }, t.brtl10, t.brtr10,]}
        >
          <View style={[t.px20, t.py20,]}>
            <TouchableWithoutFeedback onPress={() => {
              registerRef.current?.hide()
            }}>
              <Image source={img.backBtn} style={[t.w48, t.h48, t.br100]} resizeMode='contain' />
            </TouchableWithoutFeedback>
            <Text style={[t['h24-700'], t.cblack, t.mt40]}>
              Join the Yoga Fit Community!
            </Text>
            <Text style={[t['p14-400'], t.cgrey90]}>
              Let's continue your journey with Yoga Fit.
            </Text>
            {classdata && classdata.idschedule && (
              <View style={[t.mt20]}>
                <Text style={[t['h16-400'], t.cblack]}>Selected Class</Text>
                <ClassItem data={classdata} boxStyle={[t.mt10]} hidebtn={true} onDetailPress={(item, navigation) => { }} />
              </View>
            )}
            <View style={[t.mt20]}>
              <View style={[t.fRow]}>
                <Text style={[t['h16-400'], t.cblack]}>Region</Text>
                <Text style={[t['h16-400'], t.cdanger, t.ms3]}>*</Text>
              </View>
              <View style={[t.fRow, t.mt10]}>
                {
                  regions.map((item) => {
                    return (
                      <RadioButton key={item.id} label={item.name} value={item.id} />
                    )
                  })
                }
              </View>
            </View>
            <View style={[t.mt20, { zIndex: 1 }]}>
              <View style={[t.fRow]}>
                <Text style={[t['h16-400'], t.cblack]}>Country</Text>
                <Text style={[t['h16-400'], t.cdanger, t.ms3]}>*</Text>
              </View>
              {Platform.OS === 'ios' ? (
                <View style={{ position: 'relative' }}>
                  <Pressable
                    onPress={() => setDropdownOpen(v => !v)}
                    style={[t.br10, t.bw1, t.bsolid, t.bgrey, t.bgwhite, t.mt10, t.p10, t.fRow, t.fjBetween, t.faCenter]}>
                    <Text style={[t['h14-400'], t.cblack]}>
                      {countryCodes.find(c => c.code === countryCode)?.name || countryCode}
                    </Text>
                    <Text style={[t['h14-400'], t.cgrey90]}>{dropdownOpen ? '▴' : '▾'}</Text>
                  </Pressable>
                  {dropdownOpen && (
                    <View style={[t.bgwhite, t.br10, {
                      position: 'absolute', top: '100%', left: 0, right: 0,
                      zIndex: 999, maxHeight: 200, marginTop: 4,
                      shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.15, shadowRadius: 6,
                      borderWidth: 1, borderColor: '#eee',
                    }]}>
                      <ScrollView nestedScrollEnabled>
                        {countryCodes.map((item, index) => (
                          <Pressable
                            key={index}
                            onPress={() => { setCountryCode(item.code); setDropdownOpen(false); }}
                            style={[t.p15, { borderBottomWidth: 1, borderBottomColor: '#eee' }]}>
                            <Text style={[t['h14-400'], countryCode === item.code ? { color: '#456A58', fontWeight: '600' } : t.cblack]}>
                              {item.name}  ({item.code})
                            </Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              ) : (
                <View style={[t.br10, t.bw1, t.bsolid, t.bgrey, t.bgwhite, t.mt10, { overflow: 'hidden' }]}>
                  <Picker
                    style={[t.bgwhite, t.p10, t['h14-400'], t.br5, t.cblack]}
                    selectedValue={countryCode}
                    onValueChange={(itemValue) => setCountryCode(itemValue)}>
                    {countryCodes.map((item, index) => (
                      <Picker.Item label={item.name} value={item.code} key={index} />
                    ))}
                  </Picker>
                </View>
              )}
            </View>
            <View style={[t.mt20]}>
              <View style={[t.fRow]}>
                <Text style={[t['h16-400'], t.cblack]}>Mobile number</Text>
                <Text style={[t['h16-400'], t.cdanger, t.ms3]}>*</Text>
              </View>
              <View style={[t.fRow, t.faCenter, t.wp100]}>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={setCountryCode}
                  value={countryCode}
                  placeholderTextColor="#ccc"
                  placeholder="+62"
                  style={[t.bw1, t.bsolid, t.bgrey, t.bgwhite, t.p10, t.pr5, t.bsolid, t.brw1, t.tCenter, t['h14-400'], t.brtl10, t.brbl10, t.cblack, t.mt10, t.wp15]}
                />
                <TextInput
                  keyboardType="numeric"
                  onChangeText={handlePhoneNumber}
                  value={id}
                  placeholderTextColor="#ccc"
                  placeholder="81234567890"
                  style={[t.bgwhite, t.p10, t['h14-400'], t.brtr10, t.brbr10, t.cblack, t.mt10, t.wp85, t.bw1, t.bsolid, t.bgrey]}
                />
              </View>
            </View>
            <View style={[t.mt20]}>
              <View style={[t.fRow]}>
                <Text style={[t['h16-400'], t.cblack]}>Full Name</Text>
                <Text style={[t['h16-400'], t.cdanger, t.ms3]}>*</Text>
              </View>
              <TextInput
                onChangeText={setname}
                value={name}
                placeholderTextColor="#ccc"
                placeholder="eg: John Doe"
                style={[t.bgwhite, t.p10, t['h14-400'], t.br10, t.cblack, t.mt10, t.wp100, t.bw1, t.bsolid, t.bgrey,]}
              />
            </View>
            <View style={[t.mt20]}>
              <View style={[t.fRow]}>
                <Text style={[t['h16-400'], t.cblack]}>Email</Text>
                <Text style={[t['h16-400'], t.cdanger, t.ms3]}>*</Text>
              </View>
              <TextInput
                onChangeText={setemail}
                value={email}
                placeholderTextColor="#ccc"
                placeholder="eg: johndoe@email.com"
                style={[t.bgwhite, t.p10, t['h14-400'], t.br10, t.cblack, t.mt10, t.wp100, t.bw1, t.bsolid, t.bgrey,]}
              />
            </View>
            <View style={[t.mt20]}>
              <Text style={[t['h16-400'], t.cblack]}>Gender</Text>
              <View style={[t.fRow, t.mt10]}>
                {[{label: 'Male', value: true}, {label: 'Female', value: false}].map(opt => (
                  <TouchableOpacity
                    key={opt.label}
                    style={[t.fRow, t.faCenter, t.me20]}
                    onPress={() => setgender(opt.value)}>
                    <View style={[t.w20, t.h20, t.br100, t.bw1, t.fjCenter, t.faCenter, gender === opt.value ? t.borange : t.cgreyc]}>
                      {gender === opt.value && <View style={[t.bgorange, t.w10, t.h10, t.br100]} />}
                    </View>
                    <Text style={[t.ms8, t.cblack, t['p14-400']]}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={[t.mt20]}>
              <Text style={[t['h16-400'], t.cblack]}>Date of Birth</Text>
              <TouchableOpacity
                onPress={() => { setTempDate(birthday || new Date()); setShowDatePicker(true); }}
                style={[t.bgwhite, t.p10, t['h14-400'], t.br10, t.cblack, t.mt10, t.wp100, t.bw1, t.bsolid, t.bgrey]}>
                <Text style={[t['h14-400'], birthday ? t.cblack : { color: '#ccc' }]}>
                  {birthday ? birthday.toLocaleDateString() : 'eg: 01/01/1990'}
                </Text>
              </TouchableOpacity>
              {Platform.OS === 'ios' && showDatePicker && (
                <View style={{borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginTop: 8, backgroundColor: 'white'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingTop: 12}}>
                    <Pressable onPress={() => { setbirthday(tempDate); setShowDatePicker(false); }}>
                      <Text style={{color: '#456A58', fontWeight: '600', fontSize: 16}}>Done</Text>
                    </Pressable>
                  </View>
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={onDateChange}
                    style={{height: 180}}
                  />
                </View>
              )}
              {Platform.OS === 'android' && showDatePicker && (
                <DateTimePicker
                  value={birthday || new Date()}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>
            <View style={[t.mt20]}>
              <View style={[t.fRow]}>
                <Text style={[t['h16-400'], t.cblack]}>Studio</Text>
                <Text style={[t['h16-400'], t.cdanger, t.ms3]}>*</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  locationRef.current?.show();
                }}
                style={[t.bgwhite, t.p10, t['h14-400'], t.br10, t.cblack, t.mt10, t.wp100, t.bw1, t.bsolid, t.bgrey,]}>
                <Text style={[t['h14-400'], t.cblack]}>
                  {studio && studio.deptname}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[t.my20]}>
              <Text style={[t['h16-400'], t.cblack]}>Referral Code</Text>
              <TextInput
                onChangeText={setreferral}
                value={referral}
                placeholderTextColor="#ccc"
                placeholder="eg: Y064F1T"
                style={[t.bgwhite, t.p10, t['h14-400'], t.br10, t.cblack, t.mt10, t.wp100, t.bw1, t.bsolid, t.bgrey,]}
              />
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
                t.cwhite
              ]}
              onPress={() => {
                doRegister();
              }}>
              <Text style={[t['h14-400'], t.cwhite]}>
                {loading ? 'Processing...' : 'Register'}
              </Text>
            </TouchableOpacity>
            <View style={[t.faCenter, t.fjCenter, t.mt5]}>
              <Text style={[t['p12-500'], register.status ? t.cblack : t.cdanger]}>
                {register.msg}
              </Text>
            </View>
            <View style={[t.mt10, t.fRow, t.fjCenter, t.pb100]}>
              <Text style={[t['p14-400'], t.cblack]}>Already a Member?</Text>
              <TouchableOpacity
                onPress={() => {
                  loginRef.current?.show();
                  registerRef.current?.hide();
                }}>
                <Text style={[t['p14-600'], t.cdarkGreen, t.ms5]}>Login Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </ActionSheet>
  );
}

export default Register;
