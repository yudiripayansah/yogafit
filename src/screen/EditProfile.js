import React, { useContext, useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import img from '../config/Image';
import Helper from '../config/Helper';
import {Api} from '../config/Api';
import AwesomeAlert from 'react-native-awesome-alerts';

const EditProfile = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const {setUser} = useContext(AuthContext);
  const user = useContext(UserContext);
  const [alert, setalert] = useState({
    show: false,
    title: 'Success',
    message: 'Profile successfully updated',
    cancelText: 'Close',
    confirmText: 'Ok'
  });
  const profileimage = user && user.foto
    ? { uri: 'https://api.yogafitidonline.com/storage/foto/'+user.foto }
    : img.profile;

  const [profilePhoto, setProfilePhoto] = useState(profileimage);

  const [loading, setloading] = useState(false);
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [phone, setPhone] = useState(user.no_telp);
  const [gender, setGender] = useState(user.gender);
  const [profile, setprofile] = useState({});

  const [dateBirth, setDateBirth] = useState(
    user.date_birth ? new Date(user.date_birth) : new Date()
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = date => {
    return date.toISOString().split('T')[0];
  };
  const myProfile = async () => {
    try {
      let req = await Api.myProfile(user.token)
      let prof = req.data.users
      setprofile(prof)
      setname(prof.name)
      setemail(prof.email)
      setPhone(prof.no_telp)
      setGender(prof.gender)
      if (prof.date_birth) {
        const parsed = new Date(prof.date_birth)
        if (!isNaN(parsed)) setDateBirth(parsed)
      }
    } catch (error) {
      
    }
  }
  const hideAlert = () => {
    setalert({
      show: false,
      title: '',
      message: '',
      cancelText: 'Close',
      confirmText: 'Ok',
      onConfirm: () => { },
    });
  };
  const saveProfile = async () => {
    setloading(true)
    try {
      let payload = new FormData()
      payload.append('name', name)
      payload.append('email', email)
      payload.append('no_telp', phone)
      payload.append('date_birth', Helper.formatDate(dateBirth,'YYYY-MM-DD'))
      payload.append('gender', gender)
      if(profilePhoto.name){
        payload.append('file', profilePhoto)
      }
      let req = await Api.updateProfile(payload,user.token)
      myProfile()
      setalert({
        show: true,
        title: 'Success',
        message: 'Profile successfully updated',
        cancelText: 'Close',
        confirmText: 'Ok',
        onConfirm: () => {
          hideAlert();
        },
      })
      setTimeout(()=>{
        setloading(false)
      },1000)
    } catch (error) {
      console.log(error)
      setalert({
        show: true,
        title: 'Error',
        message: 'Failed to update Profile, please try again',
        cancelText: 'Close',
        confirmText: 'Ok',
        onConfirm: hideAlert,
      })
      setTimeout(()=>{
        setloading(false)
      },1000)
    }
  }
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateBirth(selectedDate);
    }
  };

  // ==========================
  // CAMERA PERMISSION
  // ==========================

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
            buttonPositive: 'OK',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // ==========================
  // OPEN CAMERA
  // ==========================

  const openCamera = async () => {
    const permission = await requestCameraPermission();

    if (!permission) {
      Alert.alert('Camera permission denied');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.7,
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Alert.alert('Camera Error', response.errorMessage);
          return;
        }

        if (response.assets) {
          const asset = response.assets[0];

          setProfilePhoto({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName || 'photo.jpg',
          });
        }
      },
    );
  };

  // ==========================
  // OPEN GALLERY
  // ==========================

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Alert.alert('Gallery Error', response.errorMessage);
          return;
        }

        if (response.assets) {
          const asset = response.assets[0];

          setProfilePhoto({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName || 'photo.jpg',
          });
        }
      },
    );
  };

  const pickImage = () => {
    Alert.alert('Update Profile Photo', 'Choose option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const RadioButton = ({ label, value }) => (
    <TouchableOpacity
      style={[t.fRow, t.faCenter, t.me20]}
      onPress={() => setGender(value)}
    >
      <View
        style={[
          t.w20,
          t.h20,
          t.br100,
          t.bw1,
          t.fjCenter,
          t.faCenter,
          gender === value ? t.borange : t.cgreyc,
        ]}
      >
        {gender === value && (
          <View style={[t.bgorange, t.w10, t.h10, t.br100]} />
        )}
      </View>

      <Text style={[t.ms8, t.cblack, t['p14-400']]}>{label}</Text>
    </TouchableOpacity>
  );
  useEffect(()=>{
    myProfile()
  },[])
  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <AwesomeAlert
        show={alert.show}
        showProgress={false}
        title={alert.title}
        message={alert.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText={alert.cancelText}
        confirmText={alert.confirmText}
        confirmButtonColor="#62AC18"
        cancelButtonColor="#dd0000"
        titleStyle={[t['h20-400'], t.cblack]}
        messageStyle={[t['p14-500'], t.cblack, t.tCenter]}
        contentStyle={[t.tCenter]}
        confirmButtonTextStyle={[t['p20-600'], t.cwhite]}
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={alert.onConfirm || hideAlert}
      />
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}

      <View style={[t.fRow, t.faCenter, t.pt50, t.pb20, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>

        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Edit Profile</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[t.pb40]}
      >
        {/* Avatar */}
        <View style={[t.faCenter, t.mt20]}>
          <View style={[t.relative]}>
            <Image
              source={profilePhoto}
              style={[t.w150, t.h150, { objectFit: 'cover' }, t.br100]}
            />

            <TouchableOpacity
              style={[
                t.absolute,
                t.bottom0,
                t.right0,
                t.bgneworange,
                t.p8,
                t.br100,
                t.bw2,
                t.bwhite,
              ]}
              onPress={pickImage}
            >
              <Image source={img.iconcamera} style={[t.w20, t.h20]} />
            </TouchableOpacity>
          </View>

          <Text style={[t.cgrey60, t['h12-400'], t.mt15]}>
            Click camera icon to change photo
          </Text>
        </View>

        {/* FORM */}
        <View style={[t.px20, t.mt30]}>
          <Text style={[t.cgrey30, t['p14-700'], t.mb15]}>
            PERSONAL INFORMATION
          </Text>

          {/* Full Name */}
          <View style={[t.mb20]}>
            <Text style={[t.cblack, t['p14-500'], t.mb8]}>
              Full Name <Text style={[t.corange]}>*</Text>
            </Text>

            <View
              style={[
                t.bw1,
                t.br12,
                t.bgwhite,
                t.p12,
                t.bgreye,
                t.bsolid,
              ]}
            >
              <TextInput
                value={name}
                onChangeText={setname}
                style={[t.cblack, t['p14-400'], { padding: 0 }]}
              />
            </View>
          </View>

          {/* Email */}
          <View style={[t.mb20]}>
            <Text style={[t.cblack, t['h16-500'], t.mb8]}>
              Email Address <Text style={[t.corange]}>*</Text>
            </Text>

            <View
              style={[
                t.fRow,
                t.faCenter,
                t.bw1,
                t.br12,
                t.bgwhite,
                t.p12,
                t.bgreye,
                t.bsolid,
              ]}
            >
              <Image
                source={img.iconemail}
                style={[t.w20, t.h20, t.me10, { tintColor: '#666' }]}
              />

              <TextInput
                value={email}
                editable={true}
                onChangeText={setemail}
                style={[t.cblack, t['h14-400'], { flex: 1 }]}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={[t.mb20]}>
            <Text style={[t.cblack, t['h16-500'], t.mb8]}>
              Phone Number <Text style={[t.corange]}>*</Text>
            </Text>

            <View
              style={[
                t.fRow,
                t.faCenter,
                t.bw1,
                t.br12,
                { backgroundColor: '#F3F4F6' },
                t.p12,
                t.bgreye,
                t.bsolid,
              ]}
            >
              <Image
                source={img.iconphone}
                style={[t.w20, t.h20, t.me10, { tintColor: '#666' }]}
              />

              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={[t.cblack, t['h14-400'], { flex: 1 }]}
              />
            </View>
          </View>

          {/* Date of Birth */}
          <View style={[t.mb20]}>
            <Text style={[t.cblack, t['h16-500'], t.mb8]}>
              Date of Birth <Text style={[t.corange]}>*</Text>
            </Text>

            <TouchableOpacity
              style={[
                t.fRow,
                t.faCenter,
                t.fjBetween,
                t.bw1,
                t.br12,
                t.bgwhite,
                t.p12,
                t.bgreye,
                t.bsolid,
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <View style={[t.fRow, t.faCenter]}>
                <Image
                  source={img.iconcalendar}
                  style={[t.w20, t.h20, t.me10, { tintColor: '#666' }]}
                />

                <Text style={[t.cblack, t['h14-400']]}>
                  {Helper.formatDate(dateBirth,'DD MMM YYYY')}
                </Text>
              </View>

              <Image
                source={img.chevronDown}
                style={[t.w16, t.h16, { tintColor: '#666' }]}
              />
            </TouchableOpacity>
          </View>

          {/* Gender */}
          <View style={[t.mb30]}>
            <Text style={[t.cblack, t['h16-500'], t.mb12]}>
              Gender <Text style={[t.corange]}>*</Text>
            </Text>

            <View style={[t.fRow]}>
              <RadioButton label="Male" value="Male" />
              <RadioButton label="Female" value="Female" />
              <RadioButton label="Prefer not to say" value="Other" />
            </View>
          </View>

          {/* Save */}
          <TouchableOpacity
            style={[
              t.bgorange,
              t.py15,
              t.br12,
              t.faCenter,
              t.fRow,
              t.fjCenter,
            ]}
            onPress={()=>{
              saveProfile()
            }}
          >
            <Image
              source={img.iconsave}
              style={[t.w20, t.h20, t.me10, { tintColor: '#fff' }]}
            />

            <Text style={[t.cwhite, t['p16-700']]}>{loading ? 'Saving...':'Save Changes'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[t.mt15, t.faCenter, t.py10]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[t.cblack, t['h16-500']]}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={[t.pb100]} />
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={dateBirth}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default EditProfile;