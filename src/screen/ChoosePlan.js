import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import img from '../config/Image';
import helper from '../config/Helper';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');

const ChoosePlan = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const [selectedPlan, setSelectedPlan] = useState('unlimited');

  const plans = [
    {
      title: 'Unlimited Plan',
      desc: 'Flow Without Limits',
      benefits: ['Unlimited access to all group classes', 'All-Studio Access (based on selcted package)', 'Exclusive privilege with partner brands'],
      icon: img.iconcrownpurple
    },
    {
      title: 'Session Pass',
      desc: 'Flexible Access for Busy Days',
      benefits: ['No monthly commitment', 'Use anytime within validity period', 'Better value per-session'],
      icon: img.iconstarorange
    },
    {
      title: 'Personal Training',
      desc: 'Tailored for You',
      benefits: ['Private 1-on-1 Session with International Certified Teacher', 'Customized & Personalized Training Plan', 'Flexible Scheduling Time','Good for member with Medical Conditions (Helps recovery faster)'],
      icon: img.iconmedalgrey
    }
  ];

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[t.pb40]}>
        <LinearGradient
          colors={['#FF4E00', '#FF8E4E']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[t.pt50, t.px20, t.pb30]}
        >

          <View style={[t.fRow, t.faCenter, t.fjBetween]}>
            {/* Back Button */}
            <TouchableOpacity
              style={[]}
              onPress={() => navigation.goBack()}
            >
              <Image source={img.btnback} style={[t.w40, t.h40]} />
            </TouchableOpacity>

          </View>
          <View style={[t.fjCenter,t.faCenter,t.px20,t.tCenter]}>
            <Text style={[t.cwhite, t['h24-600'],t.tCenter]}>Choose Your Plan</Text>
            <Text style={[t.cwhite, t['p16-400'],t.tCenter]}>
              Find the perfect membership for your journey
            </Text>
          </View>
        </LinearGradient>
        <View style={[t.px20,t.pt30]}>
          {plans.map((item) => {
            return (
              <PlanCard
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                benefits={item.benefits}
              />
            )
          })}
        </View>

      </ScrollView>

      {/* Bottom Action */}
      <View style={[t.p20, t.btw1, { borderColor: '#F3F4F6' }]}>
        <Text style={[t.cgrey90, t['h12-500'],t.tCenter,t.mb20]}>Need help? Tap below to connect with our team.</Text>
        <TouchableOpacity style={[t.bgneworange, t.py15, t.br12, t.fRow, t.fjCenter, t.faCenter]}
          onPress={() => {
            helper.sendWhatsapp(`Hi Yogafit!, i want to know more about Plans at Yogafit Indonesia!`)
          }}
        >
          <Image source={img.whatsapp} style={[t.w24, t.h24, t.me10]} />
          <Text style={[t.cwhite, t['p16-700']]}>Chat via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const PlanCard = ({ icon, title, desc, benefits }) => {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.p20, t.br20, t.bw1, t.bgreye, t.bsolid, t.mb15]}>
      <View style={[t.fRow, t.faCenter, t.mb10]}>
        <Image source={icon} style={[t.w50, t.h50]} />
        <View style={[t.ms12]}>
          <Text style={[t.cblack, t['h16-700']]}>{title}</Text>
          <Text style={[t.cgrey60, t['p12-400']]}>{desc}</Text>
        </View>
      </View>
      {benefits.map((item, i) => (
        <View key={i} style={[t.fRow, t.faCenter, t.mt8]}>
          <View style={[t.w4, t.h4, t.br100, t.bgorange, t.me10]} />
          <Text style={[t.cgrey60, t['h13-400']]}>{item}</Text>
        </View>
      ))}
      <TouchableOpacity style={[t.mt20, t.py12, t.br12, t.bw1, { borderColor: '#456A58' }, t.faCenter]}
        onPress={() => {
          helper.sendWhatsapp(`Hi Yogafit!, i want to know more about ${title}`)
        }}
      >
        <Text style={[{ color: '#456A58' }, t['h14-600']]}>Chat with Sales</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ChoosePlan;