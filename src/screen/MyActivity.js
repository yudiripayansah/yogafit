import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Pressable
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import img from '../config/Image';

import { Api } from '../config/Api';
import Helper from '../config/Helper';

const { width } = Dimensions.get('window');

const MyActivity = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [contract, setcontract] = useState([]);
  const [loading, setloading] = useState(false);
  const [qrcode, setqrcode] = useState();
  const [specialoffer, setspecialoffer] = useState([]);
  const [activeTab, setActiveTab] = useState('Overview');
  const [stats, setstats] = useState([])
  const [summary, setsummary] = useState([])
  const [monthly, setmonthly] = useState([])
  const [history, sethistory] = useState([])
  // const stats = [
  //   { id: 1, label: 'Classes\nAttended', value: '48', icon: img.iconattended, color: '#FFF2E6' },
  //   { id: 2, label: 'Total\nHours', value: '178', icon: img.icontimeorange, color: '#FFF2E6' },
  //   { id: 3, label: 'Streak\nDays', value: '12', icon: img.iconfire, color: '#FFF2E6' },
  // ];

  const monthlyData = [
    { month: 'Jan', value: 28 },
    { month: 'Feb', value: 24 },
    { month: 'Mar', value: 30 },
    { month: 'Apr', value: 26 },
    { month: 'May', value: 22 },
    { month: 'Jun', value: 12 },
  ];
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
        let theStats = [
          { id: 1, label: 'Classes\nAttended', value: summary.classes_attended, icon: img.iconattended, color: '#FFF2E6' },
          { id: 2, label: 'Total\nHours', value: summary.total_hours, icon: img.icontimeorange, color: '#FFF2E6' },
          { id: 3, label: 'Streak\nDays', value: summary.streak_days, icon: img.iconfire, color: '#FFF2E6' },
        ]
        setstats(theStats)
        setsummary(summary)
        setmonthly(monthly_progress)
        sethistory(data)
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
    getDetailactivity();
  }, []);
  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb10, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>My Activity</Text>
        </View>
      </View>

      {/* TAB NAVIGATION - Perbaikan Lebar 50% */}
      <View style={[t.px20, t.mt20, t.fRow, { width: '100%', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
        <Pressable
          style={[
            { flex: 1, paddingVertical: 15, alignItems: 'center' },
            activeTab === 'Overview' ? { borderBottomWidth: 2, borderBottomColor: '#FE9805' } : null
          ]}
          onPress={() => setActiveTab('Overview')}
        >
          <Text style={[activeTab === 'Overview' ? t.cblack : t.cgrey90, t['h16-400']]}>Overview</Text>
        </Pressable>

        <Pressable
          style={[
            { flex: 1, paddingVertical: 15, alignItems: 'center' },
            activeTab === 'History' ? { borderBottomWidth: 2, borderBottomColor: '#FE9805' } : null
          ]}
          onPress={() => setActiveTab('History')}
        >
          <Text style={[activeTab === 'History' ? t.cblack : t.cgrey90, t['h16-400']]}>History</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[t.px20, t.pt25, t.pb40]}>
        {activeTab == 'Overview' ? (
          <>
            <View style={[t.fRow, t.fjBetween, t.mb25]}>
              {stats.map((item) => (
                <View
                  key={item.id}
                  style={[t.bgwhite, t.bw1, t.bgreye, t.bsolid, t.br20, t.faCenter, t.p15, { width: (width - 60) / 3 }]}
                >
                  <View style={[t.w40, t.h40, t.br100, { backgroundColor: item.color }, t.faCenter, t.fjCenter, t.mb10]}>
                    <Image source={item.icon} style={[t.w40, t.h40]} />
                  </View>
                  <Text style={[t.cblack, t['h24-700']]}>{item.value}</Text>
                  <Text style={[t.cgrey60, t['h12-400'], t.tCenter, t.mt2]}>{item.label}</Text>
                </View>
              ))}
            </View>

            <View style={[t.p20, t.br25, t.bw1, t.bgreye, t.bsolid, t.mb25]}>
              <View style={[t.fRow, t.fjBetween, t.faCenter, t.mb30]}>
                <Text style={[t.cblack, t['h16-700']]}>Monthly Progress</Text>
                <Text style={[t.cgrey60, t['h12-400']]}>Activity per Month</Text>
              </View>

              {/* Simple Bar Chart Visualization */}
              <View style={[t.fRow, t.faEnd, t.fjBetween, { height: 150 }]}>
                {monthly.map((data, index) => (
                  <View key={index} style={[t.faCenter, { width: 40 }]}>
                    <Text style={[t.cgrey30, t['h12-600'], t.mb5]}>{data.total}</Text>
                    <View style={[
                      t.bgneworange, t.br8,
                      { width: 35, height: (data.total / 40) * 120 }
                    ]} />
                    <Text style={[t.cgrey60, t['h12-400'], t.mt8]}>{data.month}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[t.bgneworange, t.p20, t.br20, t.fRow, t.faCenter, t.fjBetween]}>
              <View style={[t.fRow, t.faCenter, { flex: 1 }]}>
                <Image source={img.fireicon} style={[t.w24, t.h24, { tintColor: '#fff' }]} />
                <View style={[t.ms15]}>
                  <Text style={[t.cwhite, t['h18-700']]}>{summary.streak_days} Day Streak!</Text>
                  <Text style={[t.cwhite, t['h14-400'], t.mt2]}>Keep it up! You're doing amazing.</Text>
                </View>
              </View>
              <View style={[t.faEnd]}>
                <Text style={[t.cwhite, t['h32-700']]}>{summary.streak_days}</Text>
                <Text style={[t.cwhite, t['h12-700'], { marginTop: -5 }]}>DAYS</Text>
              </View>
            </View>
          </>
        ) : (<>
          {
            history.map((item) => {
              return (
                <View style={[t.bneworange,t.bw1,t.bsolid, t.p20, t.br20, t.fRow, t.faCenter, t.fjBetween, t.mb10]}>
                    <View style={[]}>
                      <Text style={[t.cblack, t['h18-700']]}>{item.keterangan}</Text>
                      <Text style={[t.cblack, t['h14-400'], t.mt2]}>{item.type}</Text>
                      <Text style={[t.cblack, t['h14-400'], t.mt2]}>{Helper.formatDate(item.tanggal,'DD MMM YYYY')}</Text>
                    </View>
                  <View style={[t.faEnd]}>
                    <Image source={img.iconcheckmark} style={[t.w24, t.h24]} />
                  </View>
                </View>
              )
            })
          }
        </>)}

      </ScrollView>
    </View>
  );
};

export default MyActivity;