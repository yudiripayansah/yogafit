import React, {useEffect, useContext, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {GstContext} from '../context/GstContext';
import ActionSheet from 'react-native-actions-sheet';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
function Login({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const {setUser} = useContext(AuthContext);
  const {setGuest} = useContext(GstContext);
  const {loginRef, verifyRef, registerRef, forgotRef} = props;
  // const [email, setemail] = useState('8988449651');
  // const [password, setpassword] = useState('964953');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+62');
  const [countryCodes, setCountryCodes] = useState(['+62']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [login, setLogin] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const doLogin = async () => {
    setLoading(true);
    try {
      let payload = {
        email: countryCode+email,
        password: password,
      };
      if (email && password) {
        let req = await Api.login(payload);
        if (req.status === 200) {
          let {users, token} = req.data;
          if (users) {
            users.token = token;
            setUser(users);
            setLogin({
              status: true,
              msg: 'Login successful. welcome back ' + users.name,
            });
            setTimeout(() => {
              loginRef.current?.hide();
              setGuest(true)
            }, 2000);
          } else {
            setLogin({
              status: false,
              msg: 'Failed to login, something went wrong in server',
            });
          }
        } else {
          setLogin({
            status: false,
            msg: 'Failed to login',
            data: null,
          });
        }
      } else {
        setLogin({
          status: false,
          msg: 'Please enter email and password',
          data: null,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error login: ' + error);
      setLogin({
        status: false,
        msg: 'Login failed! mobile number or password is wrong.',
      });
      setLoading(false);
    }
    setTimeout(() => {
      setLogin({
        status: true,
        msg: null,
        data: null,
      });
    }, 3000);
  };
  const handlePhoneNumber = text => {
    let numericValue = text.replace(/[^0-9]/g, '');
    numericValue = numericValue.replace(/^0+/, '');

    setemail(numericValue);
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
  useEffect(() => {
    getCountryCode();
  }, []);
  return (
    <ActionSheet ref={loginRef} isModal={false}>
      <LinearGradient colors={['#FFF3EE', '#FFFFFF']} style={[t.wp100, t.brtl10, t.brtr10, t.fjStart, t.hp100]}>
        <View style={[t.px20, t.py20]}>
        <TouchableWithoutFeedback onPress={() => {
          loginRef.current?.hide()
        }}>
          <Image source={img.backBtn} style={[t.w48,t.h48,t.br100]} resizeMode='contain'/>
        </TouchableWithoutFeedback>
        <Text style={[t['h24-700'], t.cblack, t.mt40]}>
          Welcome Back!
        </Text>
        <Text style={[t['p14-400'], t.cgrey90]}>
          Let's continue your journey with Yoga Fit.
        </Text>
        <View style={[t.mt28, {zIndex: 999}]}>
          <Text style={[t['h16-400'], t.cblack]}>Country</Text>
          {Platform.OS === 'ios' ? (
            <View style={{position: 'relative'}}>
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
                  shadowColor: '#000', shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.15, shadowRadius: 6,
                  borderWidth: 1, borderColor: '#eee',
                }]}>
                  <ScrollView nestedScrollEnabled>
                    {countryCodes.map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() => { setCountryCode(item.code); setDropdownOpen(false); }}
                        style={[t.p15, {borderBottomWidth: 1, borderBottomColor: '#eee'}]}>
                        <Text style={[t['h14-400'], countryCode === item.code ? {color: '#456A58', fontWeight: '600'} : t.cblack]}>
                          {item.name}  ({item.code})
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          ) : (
            <View style={[t.br10, t.bw1, t.bsolid, t.bgrey, t.bgwhite, t.mt10, {overflow: 'hidden'}]}>
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
        <View style={[t.mt12]}>
          <Text style={[t['h16-400'], t.cblack]}>Mobile number</Text>
          <View style={[t.fRow, t.faCenter, t.wp100]}>
            <TextInput
              keyboardType="numeric"
              onChangeText={setCountryCode}
              value={countryCode}
              placeholderTextColor="#ccc"
              placeholder="+62"
              style={[t.bw1,t.bsolid,t.bgrey,t.bgwhite, t.p10 ,t.pr5,t.bsolid,t.brw1,t.tCenter, t['h14-400'], t.brtl10,t.brbl10, t.cblack, t.mt10, t.wp15]}
            />
            <TextInput
              onChangeText={handlePhoneNumber}
              value={email}
              placeholderTextColor="#ccc"
              placeholder="eg: +6281234567890"
              style={[t.bgwhite, t.p10, t['h14-400'], t.brtr10,t.brbr10, t.cblack, t.mt10, t.wp85, t.bw1,t.bsolid,t.bgrey]}
            />
          </View>
        </View>
        <View style={[t.mt12]}>
          <Text style={[t['h16-400'], t.cblack]}>Password</Text>
          <View style={[t.fRow, t.fjBetween, t.faCenter, t.wp100, t.relative]}>
            <TextInput
              onChangeText={setpassword}
              value={password}
              placeholderTextColor="#ccc"
              placeholder="Enter your password"
              style={[t.bgwhite,t.p10,t['h14-400'],t.br10,t.cblack,t.mt10,t.wp100,t.bw1,t.bsolid,t.bgrey,]}
              secureTextEntry={showpassword ? false : true}
            />
            <Pressable
              style={[t.absolute, t.right10, t.top25]}
              onPress={() => {
                setshowpassword(!showpassword);
              }}>
              <Image
                source={showpassword ? img.eyeopen : img.eyeclose}
                style={[t.w20, t.h20]}
              />
            </Pressable>
          </View>
        </View>
        <View style={[t.mt10, t.fRow, t.fjEnd]}>
          <TouchableOpacity
            onPress={() => {
              forgotRef.current?.show();
              loginRef.current?.hide();
            }}>
            <Text style={[t['p14-600'], t.cgrey90]}>
              Forgot your password?
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
            t.cwhite
          ]}
          onPress={() => {
            doLogin();
          }}>
          <Text style={[t['h14-400'], t.cwhite]}>
            {loading ? 'Processing...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <View style={[t.faCenter, t.fjCenter, t.mt5]}>
          <Text style={[t['p12-500'], login.status ? t.cblack : t.cdanger]}>
            {login.msg}
          </Text>
        </View>
        <View style={[t.mt40, t.fRow, t.fjCenter]}>
          <Text style={[t['p14-400'], t.cblack]}>Didn't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              registerRef.current?.show();
              loginRef.current?.hide();
            }}>
            <Text style={[t['p14-600'], t.cdarkGreen, t.ms5]}>Register Here</Text>
          </TouchableOpacity>
        </View>
        </View>
      </LinearGradient>
    </ActionSheet>
  );
}

export default Login;
