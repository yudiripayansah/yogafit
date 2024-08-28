import React, {useEffect, useContext} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ThemeContext} from '../context/ThemeContext';
// assets
import img from '../config/Image'
import helper from '../config/Helper'
import { TouchableOpacity } from 'react-native-gesture-handler';
function CalendarSelect({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const width = Dimensions.get('window').width - 40;
  const baseOptions = ({
                        vertical: false,
                        width: width / 7,
                        height: width / 5,
                        style: {
                          width: width,
                        },
                      });
  function generateDatesForNext30Days() {
    const today = new Date();
    const datesArray = [];
  
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      const monthName = currentDate.toLocaleDateString('en-US', { month: 'short' });
      // Get the short day name in English
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
  
      // Format the date as "YYYY-MM-DD"
      const dateOnly = currentDate.getDate();
  
      // Push the date and day name as an object to the array
      datesArray.push({ date: dateOnly, dayName: dayName, monthName: monthName });
    }
  
    return datesArray;
  }
  const dates = generateDatesForNext30Days()
  useEffect(() => {
  },[])
  return (
    <View style={[{flex:1},t.wp100]}>
      <TouchableOpacity style={[t.fRow,t.faCenter]}>
        <Image source={img.calendar} style={[t.w20,t.h20]}/>
        <Text style={[t.cblack,t['p12-500'],t.ms5]}>{helper.dateIndo(new Date())}</Text>
      </TouchableOpacity>
      <View style={[t.mt10,t.bgwhite,{flex:1},t.bw1,t.bsolid,t.bgreye,t.py5,t.br10]}>
        <Carousel
          {...baseOptions}
          loop={false}
          autoPlay={false}
          autoPlayInterval={3000}
          data={dates}
          scrollAnimationDuration={1000}
          renderItem={({index}) => (
            <View style={[t.faCenter,t.fjCenter]}>
              <Text style={[t['p10-600'],t.cblack,t.tCenter]}>{dates[index]['dayName']}</Text>
              <Text style={[t['h16-400'],t.my5,t.cblack,t.bggreyc,t.w25,t.h25,t.br100,t.tCenter,t.pt3,t.mxAuto,t.faCenter,t.fjCenter]}>{dates[index]['date']}</Text>
              <Text style={[t['p10-600'],t.cblack,t.tCenter]}>{dates[index]['monthName']}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default CalendarSelect;
