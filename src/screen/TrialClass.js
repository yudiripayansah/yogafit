import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import LocationSelect from '../components/LocationSelect';
import img from '../config/Image';

const TrialClass = ({ navigation }) => {
  const t = useContext(ThemeContext);
    const [selectedId, setSelectedId] = useState(null);
  const [gender, setGender] = useState(null);

  const scheduleData = [
    { id: '1', date: 'Nov 13, 2025', spots: 12 },
    { id: '2', date: 'Nov 16, 2025', spots: 12 },
    { id: '3', date: 'Nov 19, 2025', spots: 12 },
  ];

  const InputField = ({ label, placeholder, icon, isDropdown }) => (
    <View style={[t.mb20]}>
      <Text style={[t['p14-600'], t.cblack, t.mb10]}>{label} <Text style={{color: 'red'}}>*</Text></Text>
      <View style={[t.fRow, t.faCenter, t.px15, t.br12, t.bw1, { borderColor: '#E5E7EB', height: 55 }]}>
        {icon && <Image source={icon} style={[t.w20, t.h20, t.me10, { tintColor: '#9CA3AF' }]} />}
        <TextInput 
          placeholder={placeholder} 
          style={[t.flex1, t['p14-400']]} 
          placeholderTextColor="#9CA3AF"
        />
        {isDropdown && <Image source={img.iconChevronDown} style={[t.w18, t.h18, { tintColor: '#9CA3AF' }]} />}
      </View>
    </View>
  );

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb15, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Start your free trial class.</Text>
          <Text style={[t['p11-400'], t.cgrey30]}>Book your session and experience Yoga Fit for the first time</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[t.pb40]}>
        
        <View style={[t.px20]}>
          <LocationSelect navigation={navigation} />
        </View>

        {/* Selected Class Info */}
        <View style={[t.mx20, t.mt15, t.p20, t.br15, { backgroundColor: '#FFF8F1' }]}>
          <Text style={[t['h16-700'], t.cblack]}>Mindfulness & Meditation Essentials</Text>
          <Text style={[t.cgrey60, t['p13-400'], t.mt5]}>with Master Rakesh</Text>
        </View>

        <View style={[t.px20, t.mt25]}>
          <Text style={[t['h16-700'], t.cblack, t.mb15]}>Select Your Class Date</Text>
          
          {scheduleData.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedId(item.id)}
            activeOpacity={0.8}
            style={[
              t.p20, t.br20, t.bgwhite, t.bw1, t.bsolid, t.mb15,
              selectedId === item.id ? t.borange : t.bgreye,
              { elevation: selectedId === item.id ? 2 : 0 }
            ]}
          >
            <View style={[t.fRow, t.fjBetween, t.faStart]}>
              <View style={[t.fColumn, { flex: 1 }]}>
                {/* Badge Spots */}
                <View style={[{backgroundColor:'#FEF3E8'}, t.px10, t.py4, t.br10, t.mb10, { alignSelf: 'flex-start' }]}>
                  <Text style={[{ color: '#DA7917' }, t['p10-600']]}>{item.spots} Spots Left</Text>
                </View>

                <Text style={[t.cblack, t['h14-700']]}>Mindfulness & Meditation Essentials</Text>
                <Text style={[t.cgrey60, t['h12-400'], t.mt2]}>Master Rakesh</Text>
                
                <Text style={[{color:'#456A58'}, t['h12-700'], t.mt10]}>08:00 - 09:00 AM</Text>

                <View style={[t.fRow, t.mt10, { columnGap: 8 }]}>
                  <View style={[{ backgroundColor: '#D5FFD5' }, t.px10, t.py4, t.br5]}>
                    <Text style={[{ color: '#007D2F' }, t['h12-600']]}>Beginner</Text>
                  </View>
                  <View style={[t.bgreye, t.px10, t.py4, t.br5]}>
                    <Text style={[t.cgrey30, t['h12-600']]}>Normal Studio</Text>
                  </View>
                </View>

                <View style={[t.fRow, t.faCenter, t.mt15]}>
                  <Image source={img.iconcalendar} style={[t.w16, t.h16, t.me8, {tintColor:'#456A58'}]} />
                  <Text style={[t.cblack, t['h14-600']]}>{item.date}</Text>
                </View>
              </View>

              {/* Radio Button Custom */}
              <View style={[
                t.w24, t.h24, t.br100, t.bw1, t.fjCenter, t.faCenter, t.bgreyd,
                selectedId === item.id ? t.borange : t.cgreyc
              ]}>
                {selectedId === item.id && (
                  <View style={[t.bgorange, t.w14, t.h14, t.br100]} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        </View>

        {/* Form Personal Information */}
        <View style={[t.px20, t.mt20]}>
          <InputField label="Country" placeholder="Indonesia" isDropdown />
          <InputField label="Mobile Number" placeholder="Input your number here" icon={img.iconPhone} />
          <InputField label="First Name" placeholder="Input your First Name here" />
          <InputField label="Last Name" placeholder="Input your Last Name here" />
          <InputField label="Email" placeholder="Input your Email here" />

          {/* Gender Selector */}
          <Text style={[t['p14-600'], t.cblack, t.mb10]}>Gender <Text style={{color: 'red'}}>*</Text></Text>
          <View style={[t.fRow, t.mb20]}>
            {['Male', 'Female', 'Prefer not to say'].map((item) => (
              <TouchableOpacity 
                key={item} 
                onPress={() => setGender(item)}
                style={[t.fRow, t.faCenter, t.me20]}
              >
                <View style={[t.w20, t.h20, t.br100, t.bw1, t.faCenter, t.fjCenter, t.me8, { borderColor: gender === item ? '#F28C18' : '#D1D5DB' }]}>
                  {gender === item && <View style={[t.w10, t.h10, t.br100, t.bgorange]} />}
                </View>
                <Text style={[t['p14-400'], t.cblack]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <InputField label="Date of Birth Date" placeholder="Select your Date of Birth Date" icon={img.iconCalendar} isDropdown />
          
          <View style={[t.mb30]}>
            <Text style={[t['p14-600'], t.cblack, t.mb10]}>Referral Code <Text style={[t.cgrey30, t['p12-400']]}> (Optional)</Text></Text>
            <View style={[t.px15, t.br12, t.bw1, { borderColor: '#E5E7EB', height: 55 }, t.fjCenter]}>
              <TextInput placeholder="Input your Referral Code here" placeholderTextColor="#9CA3AF" />
            </View>
          </View>

          <TouchableOpacity style={[t.bgorange, t.py18, t.br15, t.faCenter]}>
            <Text style={[t.cwhite, t['h16-700']]}>Book your trial class now</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default TrialClass;