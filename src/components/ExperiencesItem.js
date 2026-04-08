import React, { useContext } from 'react';
import { Dimensions, View, Pressable, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Theimage from './Theimage';
import img from '../config/Image';

function ExperiencesItem({ navigation, ...props }) {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width;
  const { data } = props;

  const ITEM_WIDTH = 250;
  const ITEM_HEIGHT = 150;
  const SPACING = 15;
  const FIRST_ITEM_SPACING = 20;

  return (
    <View style={{ height: ITEM_HEIGHT }}>
      <Carousel
        width={ITEM_WIDTH + SPACING}
        height={ITEM_HEIGHT}
        data={data}
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
              onPress={() => navigation.navigate(item.link, {data: item})}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Theimage
                original={item.dImage ? item.dImage : img.placeholder}
                placeholder={img.placeholder}
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
                <Text style={[t['h14-600'], t.cwhite]}>
                  {item.dTitle}
                </Text>

                <Text style={[t['h12-400'], t.cwhite]}>
                  {item.dDate}
                </Text>

                <Text style={[t['h12-600'], t.cwhite]}>
                  {item.dTime}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

export default ExperiencesItem;