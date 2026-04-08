import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
// assets
import img from '../config/Image';

const RebookScreen = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const [selectedId, setSelectedId] = useState(null);

  const scheduleData = [
    { id: '1', date: 'Nov 13, 2025', spots: 12 },
    { id: '2', date: 'Nov 16, 2025', spots: 12 },
    { id: '3', date: 'Nov 19, 2025', spots: 12 },
  ];

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header Area */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb20, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Rebook Meditation Flow</Text>
          <Text style={[t.cgrey60, t['p12-400']]}>Choose your preferred time available slot</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[t.px20, t.pt10, t.pb40]}
      >
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
      </ScrollView>

      {/* Footer Button Area */}
      <View style={[t.px20, t.pb30, t.pt10, t.bgwhite]}>
        <TouchableOpacity 
          style={[
            selectedId ? t.bgneworange : t.bgreye, 
            t.py15, t.br12, t.faCenter
          ]}
          disabled={!selectedId}
          onPress={() => navigation.navigate('BookingConfirmation')}
        >
          <Text style={[selectedId ? t.cwhite : t.cgrey60, t['h14-700']]}>Continue to Booking</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[t.mt15, t.faCenter, t.py10]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[t.cblack, t['h14-500']]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RebookScreen;