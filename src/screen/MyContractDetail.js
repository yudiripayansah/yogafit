import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
import Helper from '../config/Helper';
// components
import ContractCard from '../components/ContractCard';
import PackagesCard from '../components/PackagesCard';
import QrModal from '../components/QrModal';
const MyContractDetail = ({route, navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const qrRef = useRef(null);
  const [contract, setcontract] = useState();
  const [packages, setpackages] = useState([]);
  const [loading, setloading] = useState(false);
  const [qrcode, setqrcode] = useState();
  const {id} = route.params;
  const getContract = async () => {
    setloading(true);
    try {
      let req = await Api.myContract({id: id}, user.token);
      if (req.status === 200 || req.status === 201) {
        let {data, packages} = req.data;
        let dt = data[0];
        dt.status = '';
        switch (dt.status_contract) {
          case '0':
            dt.status = 'Aktif';
            dt.bg = 'bgleafGreen';
            break;
          case '1':
            dt.status = 'Tidak Aktif';
            dt.bg = 'bgdanger';
            break;
          case '2':
            dt.status = 'Waiting Approve Cuti';
            dt.bg = 'bggrey6';
            break;
          case '3':
            dt.status = 'Cuti';
            dt.bg = 'bggrey6';
            break;
          case '4':
            dt.status = 'Trial';
            dt.bg = 'bggrey6';
            break;
        }
        setpackages(packages);
        setcontract(dt);
      } else {
        console.error('Error get contract details');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get contract details: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getContract();
  }, []);
  return (
    <ScrollView style={[t.bgwhite]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <QrModal qrRef={qrRef} qrcode={qrcode} />
      <View style={[t.pt30, t.px20, t.faCenter, t.fjCenter, t.bggreye]}>
        <Text style={[t['p18-600'], t.cblack, t.mt5]}>My Contract Details</Text>
      </View>
      <View style={[t.pt20, t.px20, t.bggreye, t.pb20]}>
        {!loading && contract ? (
          <ContractCard
            data={contract}
            boxStyle={[t.mt10]}
            onPress={data => {
              setqrcode({
                uri: data
                  ? 'https://login.yogafitidonline.com/api/storage/qrcode/' +
                    data.referal_code +
                    '.png'
                  : 'xxx',
              });
              qrRef.current?.show();
            }}
          />
        ) : loading ? (
          <View style={[t.py50]}>
            <ActivityIndicator size="large" color="#FE9805" />
          </View>
        ) : (
          <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
            No Available Contract
          </Text>
        )}
      </View>
      <View style={[t.mt20, t.px20]}>
        {!loading && packages.length > 0 ? (
          packages.map((item, index) => {
            return (
              <PackagesCard
                data={item}
                key={index}
                boxStyle={[t.mt10, t.bbw1, t.bsolid, t.bgreyd, t.pb10]}
              />
            );
          })
        ) : loading ? (
          <View style={[t.py50]}>
            <ActivityIndicator size="large" color="#FE9805" />
          </View>
        ) : (
          <Text style={[t['p14-500'], t.cblack, t.tCenter, t.py50]}>
            No Available Contract
          </Text>
        )}
      </View>
      <View style={[t.py50, t.wp100]}></View>
    </ScrollView>
  );
};

export default MyContractDetail;
