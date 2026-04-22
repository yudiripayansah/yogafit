import React, { useContext } from 'react';
import { Dimensions, View, Pressable, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Theimage from './Theimage';
import img from '../config/Image';

function HomeSchedule({ navigation, ...props }) {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width;
  const { schedule } = props;

  const ITEM_WIDTH = 200;
  const ITEM_HEIGHT = 245;
  const SPACING = 15;
  const FIRST_ITEM_SPACING = 20;

  return (
    <View style={{ height: ITEM_HEIGHT }}>
      <Carousel
        width={ITEM_WIDTH + SPACING}
        height={ITEM_HEIGHT}
        data={schedule}
        pagingEnabled={false}
        loop
        style={{ width: screenWidth }}
        contentContainerStyle={{
          paddingLeft: FIRST_ITEM_SPACING, // ⬅️ spacing item pertama 20px
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: ITEM_WIDTH + SPACING,
              paddingLeft: 20,
            }}
          >
            <Pressable
              onPress={() => navigation.navigate('DetailClassNew', {theClass: item})}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Theimage
                original={item.gambar}
                placeholder={img.schedule}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />

              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={[
                  t.absolute,
                  t.p15,
                  t.fjEnd,
                  t.wp100,
                  t.hp100,
                ]}
              >
                <Text
                  style={[
                    t['p10-600'],
                    t.corange,
                    t.py4,
                    t.px8,
                    t.br50,
                    t.absolute,
                    t.top10,
                    t.right10,
                    { backgroundColor: '#fef3e8' },
                  ]}
                >
                  {item.capacity - item.status_booking} Spots Left
                </Text>

                <Text style={[t['h14-600'], t.cwhite]}>
                  {item.class_name}
                </Text>

                <Text style={[t['h12-400'], t.cwhite]}>
                  {item.name}
                </Text>

                <Text style={[t['h12-600'], t.cwhite]}>
                  {item.open}
                </Text>
                <Text style={[t['p9-400'], t.cwhite, {fontStyle:'italic'}]}>
                  {item.class_level} {item.class_kat} Studio
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

export default HomeSchedule;