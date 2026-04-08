import React, { useContext } from 'react';
import { Dimensions, View, Pressable, Text, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Theimage from './Theimage';
import img from '../config/Image';

function HomeStudio({ navigation, ...props }) {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width;
  const { studio, onPressViewAll } = props;

  const ITEM_WIDTH = 140;
  const ITEM_HEIGHT = 140;
  const SPACING = 15;

  return (
    <View style={{ height: ITEM_HEIGHT }}>
      <Carousel
        width={ITEM_WIDTH + SPACING} // ⬅️ penting!
        height={ITEM_HEIGHT}
        data={studio}
        pagingEnabled={false}
        loop
        style={{ width: screenWidth }}
        renderItem={({ item },index) => (
          <View style={{ width: ITEM_WIDTH + SPACING,
              paddingLeft: 20, }}>
            <Pressable
              onPress={() => {
                  if(item.type == 'all'){
                    onPressViewAll()
                  } else {
                    navigation.navigate('StudioDetail', {studio: item})
                  }
                }
              }
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Theimage
                original={(item.type != 'all') ? item.image : img.studio}
                placeholder={img.placeholder}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              {item.type == 'all' ? (
                <LinearGradient
                  colors={['rgba(255,78,0,.5)', 'rgba(255,78,0,.5)']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={[
                    t.absolute,
                    t.p15,
                    t.fjCenter,
                    t.faCenter,
                    t.wp100,
                    t.hp100,
                  ]}
                >
                  <Text style={[t['h16-600'], t.cwhite]}>
                    All Studios
                  </Text>
                  <Text style={[t['h12-400'], t.cwhite,t.mt10, t.px8,t.bw1,t.bsolid,t.bwhite,t.br100]}>
                    View All
                  </Text>
                </LinearGradient>
              ) : (
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={[
                  t.absolute,
                  t.p15,
                  t.fjEnd,
                  t.faStart,
                  t.wp100,
                  t.hp100,
                ]}
              >
                <Text style={[t['p8-400'], t.cwhite, t.px8,t.bw1,t.bsolid,t.bwhite,t.br100]}>
                  Jakarta {index}
                </Text>
                <Text style={[t['h14-600'], t.cwhite]}>
                  {item.deptname}
                </Text>
                <View style={[t.fRow,t.faCenter]}>
                    <Image source={img.star} style={[t.w8,t.h8]} ob/>
                  <Text style={[t['p8-400'], t.cwhite,t.ms5]}>
                    {item.rating}
                  </Text>
                  <Text style={[t['p8-400'], t.cwhite, t.mx2]}>
                  -
                  </Text>
                  <Text style={[t['p8-400'], t.cwhite]}>
                    {item.ratingCount} reviews
                  </Text>
                </View>
              </LinearGradient>
              )}
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

export default HomeStudio;