import React, { useContext } from 'react';
import { Dimensions, View, Pressable, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Theimage from './Theimage';
import img from '../config/Image';

function HomeTeacher({ navigation, ...props }) {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width;
  const { teacher } = props;

  const ITEM_WIDTH = 140;
  const ITEM_HEIGHT = 190;
  const SPACING = 15;

  return (
    <View style={{ height: ITEM_HEIGHT }}>
      <Carousel
        width={ITEM_WIDTH + SPACING} // ⬅️ penting!
        height={ITEM_HEIGHT}
        data={teacher}
        pagingEnabled={false}
        loop
        style={{ width: screenWidth }}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH + SPACING, paddingLeft: 20 }}>
            <Pressable
              onPress={() =>
                navigation.navigate('InstructorDetail', {param: item})
              }
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Theimage
                original={item.image}
                placeholder={img.teacher}
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
                  t.faCenter,
                  t.fjEnd,
                  t.wp100,
                  t.hp100,
                ]}
              >
                <Text style={[t['h14-400'], t.cwhite, t.tCenter]}>
                  {item.name}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

export default HomeTeacher;