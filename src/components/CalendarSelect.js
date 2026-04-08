import React, { useEffect, useContext, useState, useMemo } from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
import img from '../config/Image';
import helper from '../config/Helper';
import { TouchableOpacity } from 'react-native-gesture-handler';

function CalendarSelect({ navigation, ...props }) {
  const t = useContext(ThemeContext);
  const [selecteddate, setselecteddate] = useState();
  const { onDateSelected } = props;

  const SCREEN_WIDTH = Dimensions.get('window').width - 40;

  const SPACING = 12;
  const VISIBLE_ITEMS = 7;

  // total spacing dalam 1 row
  const TOTAL_SPACING = SPACING * (VISIBLE_ITEMS - 1);

  // lebar card presisi agar 7 item + spacing pas 1 layar
  const ITEM_WIDTH = (SCREEN_WIDTH - TOTAL_SPACING) / VISIBLE_ITEMS;

  const dates = useMemo(() => {
    const today = new Date();
    const arr = [];

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      const dayName = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
      });

      const fullDate =
        currentDate.getFullYear() +
        '-' +
        String(currentDate.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(currentDate.getDate()).padStart(2, '0');

      arr.push({
        date: currentDate.getDate(),
        dayName,
        fullDate,
      });
    }

    return arr;
  }, []);

  const selectDate = (date) => {
    setselecteddate(date);
    onDateSelected && onDateSelected(date);
  };

  useEffect(() => {
    const today = new Date();
    const fullDate =
      today.getFullYear() +
      '-' +
      String(today.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(today.getDate()).padStart(2, '0');

    setselecteddate(fullDate);
  }, []);

  return (
    <View style={[t.wp100]}>
      <TouchableOpacity style={[t.fRow, t.faCenter,t.fjCenter]}>
        <Text style={[t.cblack, t['h14-500'], t.ms5]}>
          {helper.dateIndo(selecteddate)}
        </Text>
      </TouchableOpacity>

      <View style={[t.mt10, { width: SCREEN_WIDTH }]}>
        <Carousel
          loop={false}
          width={ITEM_WIDTH + SPACING} // slot lebih besar 12px
          height={110}
          data={dates}
          snapEnabled={false}
          pagingEnabled={false}
          style={{ width: SCREEN_WIDTH }}
          renderItem={({ item }) => {
            const isSelected = selecteddate === item.fullDate;

            return (
              <View
                style={{
                  width: ITEM_WIDTH + SPACING,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => selectDate(item.fullDate)}
                  style={{
                    width: ITEM_WIDTH,
                    height: 100,
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isSelected ? '#F28C18' : '#F3F4F6',
                    borderWidth: isSelected ? 0 : 1,
                    borderColor: '#D1D5DB',
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[t['h12-400'],{
                      color: isSelected ? '#fff' : '#6B7280',
                    }]}
                  >
                    {item.dayName}
                  </Text>

                  <Text
                    style={[t['h16-600'],{
                      marginTop: 6,
                      color: isSelected ? '#fff' : '#111827',
                    }]}
                  >
                    {item.date}
                  </Text>

                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      marginTop: 6,
                      backgroundColor: isSelected ? '#fff' : '#10B981',
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default CalendarSelect;