import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Pressable, Image} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';// assets
import img from '../config/Image'
import Theimage from './Theimage';
import Helper from '../config/Helper'
import AutoHeightImage from 'react-native-auto-height-image';
function ContractCard({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width - 40;
  const {data,boxStyle,onPress} = props
  return (
    <Pressable 
      onPress={()=>{onPress({uri:data ? 'https://login.yogafitidonline.com/api/storage/qrcode/'+data.referal_code+'.png': 'xxx'})}}>
      <View style={[t.relative]}>
        <AutoHeightImage
          source={img.card}
          style={[]}
          width={screenWidth}
        />
        <View style={[t.absolute,t.top20,t.right20,t.bgwhite,t.p5,t.br2]}>
        <Image source={img.logohorizontal} style={[t.w80,t.h17,{objectFit:'contain'}]}/>
        </View>
        <View style={[t.absolute,t.wp100,t.px20,t.bottom20]}>
          <Text style={[t['p14-600'],t.cwhite]}>{data && data.name}</Text>
          <Text style={[t['p12-600'],t.cwhite,t.mt10]}>{data && data.packages_name }</Text>
          <View style={[t.fRow,t.faCenter,t.fjBetween,t.mt10]}>
            <View style={[t.fRow,t.faCenter]}>
              <Text style={[t['p10-600'],t.p2,t.br3,t.cwhite,t[data && data.bg]]}>{data && data.status }</Text>
              <View style={[t.fRow,t.faCenter]}>
                <View style={[t.mx5]}>
                  <Text style={[t['p5-400'],t.cwhite]}>Valid</Text>
                  <Text style={[t['p5-400'],t.cwhite]}>Thru</Text>
                </View>
                <Text style={[t['p10-600'],t.cwhite]}>{data && Helper.dateFormatId(data.end_date)}</Text>
              </View>
            </View>
            <Text style={[t['p12-400'],t.cwhite]}>{data && data.accesss == 'All' ? 'All Club Access' : 'Single Club Access'}</Text>
          </View>
          <Text style={[t['p12-600'],t.cwhite,t.mt15]}>{data && data.referal_code }</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ContractCard;
