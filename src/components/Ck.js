import React, {useEffect, useContext, useRef, useState } from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image'
import { TouchableOpacity } from 'react-native-gesture-handler';
function Ck({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const [ck,setCk] = useState(['Normal','Hot','Beginer'])
  const {ckRef,onSelectCk} = props
  const selectCk = (ck) => {
    ckRef.current?.hide()
    onSelectCk(ck)
  }
  return (
    <ActionSheet ref={ckRef}>
      <View style={[t.bgwhite,t.wp100,t.px20,t.py20,t.brtl10,t.brtr10]}>
        <TouchableOpacity onPress={() => classkatRef.current?.hide()} style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15,t.h15]}/>
        </TouchableOpacity>
        {ck.map((item,index)=> {
          return (
            <View key={index}>
              <TouchableOpacity onPress={() => {selectCk(item)}}>
                <Text style={[t['p16-600'],t.cblack,t.py10]}>{item}</Text>
              </TouchableOpacity>
              <View style={[t.bbw1,t.bsolid,t.bgreyc]}></View>
            </View>
          )
        })}
      </View>
    </ActionSheet>
  );
}

export default Ck;
