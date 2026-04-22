import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import img from '../config/Image';

import { Api } from '../config/Api';
import Helper from '../config/Helper';
const { width } = Dimensions.get('window');

const MembershipInfo = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [contract, setcontract] = useState([]);
  const [loading, setloading] = useState(false);
  const [qrcode, setqrcode] = useState();
  const [specialoffer, setspecialoffer] = useState([]);
  const [detailactivity, setdetailactivity] = useState({});
  const getContract = async () => {
    setloading(true);
    try {
      let req = await Api.myContract(false, user.token);
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        data.map(item => {
          item.status = '';
          switch (item.status_contract) {
            case '0':
              item.status = 'Aktif';
              item.bg = 'bgleafGreen';
              break;
            case '1':
              item.status = 'Tidak Aktif';
              item.bg = 'bgdanger';
              break;
            case '2':
              item.status = 'Waiting Approve Cuti';
              item.bg = 'bggrey6';
              break;
            case '3':
              item.status = 'Cuti';
              item.bg = 'bggrey6';
              break;
            case '4':
              item.status = 'Trial';
              item.bg = 'bggrey6';
              break;
          }
        });
        setcontract(data[0]);
      } else {
        console.error('Error get contract');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get contract: ' + error);
      setloading(false);
    }
  };
  const getSpecialOffer = async () => {
    console.log('get specialoffer');
    try {
      let req = await Api.specialOffer();
      if (req.status === 200) {
        let { data } = req.data;
        data.map((item, index) => {
          item.image = { uri: item.image };
        });
        setspecialoffer(data);
      } else {
        console.error('Error get special offer');
      }
    } catch (error) {
      console.error('Error get special offer: ' + error);
    }
  };
  const getDetailactivity = async () => {
    setloading(true);
    try {
      let req = await Api.myActivity(user.token);
      if (req.status === 200 || req.status === 201) {
        let { data, summary, monthly_progress } = req.data;
        const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });

        let da = monthly_progress.find(item => item.month === currentMonth);
        setdetailactivity(da);
      } else {
        console.error('Error get detail activity');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get detail activity: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getContract();
    getDetailactivity();
    getSpecialOffer();
  }, []);
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
      benefits: ['Private 1-on-1 Session with International Certified Teacher', 'Customized & Personalized Training Plan', 'Flexible Scheduling Time', 'Good for member with Medical Conditions (Helps recovery faster)'],
      icon: img.iconmedalgrey
    }
  ];
  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb10, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Membership Info</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[t.pb40]}>

        {/* Black Membership Card */}
        <View style={[t.m20, t.p25, t.br25, t.faCenter, t.fjCenter, { backgroundColor: '#1C1C1E', elevation: 5 }]}>
          <View style={[, t.wp100, t.fRow, t.fjBetween, t.faCenter]}>
            <View>
              <Text style={[t.cwhite, t['h18-400']]}>{contract.type} PLAN</Text>
              <Text style={[t.cgreya, t['h12-400']]}>Member ID: {contract.contrack_no}-{contract.id}</Text>
              <Text style={[t.cwhite, t['h18-700'], t.mt5]}>{contract.name}</Text>
            </View>
          </View>

          <View style={[t.wp100, t.mt10]}>
            <View style={[t.fRow, t.fjBetween, t.faCenter]}>
              <View>
                <Text style={[t.cgreya, t['p10-400']]}>Valid Until</Text>
                <Text style={[t.cwhite, t['h14-600']]}>{Helper.formatDate(contract.end_date, 'DD MMMM YYYY')}</Text>
              </View>
              <View style={[t.bggreya, t.px12, t.py4, t.br20]}>
                <Text style={[t.cwhite, t['p10-700']]}>Active</Text>
              </View>
            </View>
            <View style={[t.fRow, t.fjBetween, t.faCenter, t.mt5]}>
              <Text style={[t.cgreya, t['p10-600']]}>Days Remaining</Text>
              <Text style={[t.cwhite, t['h14-600']]}>{Helper.daysRemaining(contract.end_date)} days</Text>
            </View>
            <View style={[t.fRow, t.fjBetween, t.faCenter, t.mt5]}>
              <Text style={[t.cgreya, t['p10-600']]}>This month activity</Text>
              <Text style={[t.cwhite, t['h14-600']]}>{detailactivity.total} classes</Text>
            </View>
          </View>
          {/* Progress Bar */}
          <View style={[t.mt10, t.h10, t.wp100, t.br10, { overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.1)' }, t.overflowHidden]}>
            <View style={[t.bgwhite, { width: '75%', height: '100%' }]} />
          </View>
          <Image source={img.iconcard1} style={[t.absolute, t.wp90, t.hp90, { objectFit: 'contain' }]} />
        </View>

        {/* Your Benefits Section */}
        <View style={[t.px20]}>
          <Text style={[t.cblack, t['h16-700'], t.mb15]}>Your Benefits</Text>
          <View style={[t.fRow, t.fjBetween]}>
            <BenefitItem icon={img.iconelectric} title="Classes" value={contract.type} color="#FFF2E6" />
            <BenefitItem icon={img.iconstargreen} title="Studio" value={contract.accesss} color="#E6F4EA" />
          </View>
        </View>

        {/* Member's Privilege Section */}
        <View style={[t.px20, t.mt30]}>
          <View style={[t.fRow, t.fjBetween, t.faCenter, t.mb15]}>
            <Text style={[t.cblack, t['h16-700']]}>Member's Privilege</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PrivilegeList')}>
              <Text style={[t.corange, t['p14-600']]}>See All</Text>
            </TouchableOpacity>
          </View>

          <View>
            {specialoffer.map((item, i) => (
              <TouchableOpacity key={i} style={[t.mb10]} onPress={() => { navigation.navigate('OfferDetails', { offers: item }) }}>
                <Image source={item.image} style={{ width: '100%', objectFit: 'contain', height: width * 0.45 }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Change Plan Section */}
        <View style={[t.px20, t.mt35]}>
          <View style={[t.fRow, t.fjBetween, t.faCenter, t.mb15]}>
            <Text style={[t.cblack, t['h16-700']]}>Change Plan</Text>
            <Text style={[t.cgrey60, t['p12-400']]}>Choose your plan</Text>
          </View>

          {/* Session Pass Card */}
          {plans.map((item, index) => {
            return (
              <PlanCard
                key={index}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                benefits={item.benefits}
              />
            )
          })}

          {/* Help Box */}
          <TouchableOpacity style={[t.p20, t.br20, t.mt20, t.fRow, t.faCenter, { backgroundColor: '#FFF8F1', borderStyle: 'dashed', borderWidth: 1, borderColor: '#FFE0B2' }]}>
            <Image source={img.iconlightbulb} style={[t.w50, t.h50, t.me15]} />
            <View style={[t.flex1]}>
              <Text style={[t.cblack, t['h14-700']]}>Need Help Choosing?</Text>
              <Text style={[t.cgrey60, t['p11-400'], t.mt2]}>Contact our team via WhatsApp to get personalized recommendations based on your fitness goals.</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

// Reusable Components
const BenefitItem = ({ icon, title, value, color }) => {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.fjCenter, t.faCenter, t.p15, t.br20, t.bw1, t.bgreye, { width: (width - 55) / 2 }]}>
      <View style={[t.w50, t.h50, t.br100, t.faCenter, t.fjCenter, { backgroundColor: color }]}>
        <Image source={icon} style={[t.w50, t.h50]} />
      </View>
      <View style={[t.tCenter, t.faCenter, t.fjCenter]}>
        <Text style={[t.cgrey60, t['h12-400']]}>{title}</Text>
        <Text style={[t.cblack, t['h16-700']]}>{value}</Text>
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
        Helper.sendWhatsapp(`Hi Yogafit!, i have a question about Membership at Yogafit Indonesia!`)
      }}>
        <Text style={[{ color: '#456A58' }, t['h14-600']]}>Chat with Sales</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MembershipInfo;