import React, {useEffect, useContext, useRef, useState} from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
function ClassKat({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const [level, setLevel] = useState([]);
  const {classkatRef, onSelectLevel} = props;
  const getLevel = async () => {
    try {
      let req = await Api.classLevel();
      if (req.status === 200 || req.status === 201) {
        let {data} = req.data;
        setLevel(data);
      } else {
        console.error('Error get level');
      }
    } catch (error) {
      console.error('Error get level: ' + error);
    }
  };
  const selectLevel = level => {
    classkatRef.current?.hide();
    onSelectLevel(level);
  };
  useEffect(() => {
    getLevel();
  }, []);
  return (
    <ActionSheet ref={classkatRef}>
      <View style={[t.bgwhite, t.wp100, t.px20, t.py20, t.brtl10, t.brtr10]}>
        <TouchableOpacity
          onPress={() => classkatRef.current?.hide()}
          style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15, t.h15]} />
        </TouchableOpacity>
        {level.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  selectLevel(item.class_level);
                }}>
                <Text style={[t['p16-600'], t.cblack, t.py10]}>
                  {item.class_level}
                </Text>
              </TouchableOpacity>
              <View style={[t.bbw1, t.bsolid, t.bgreyc]}></View>
            </View>
          );
        })}
      </View>
    </ActionSheet>
  );
}

export default ClassKat;
