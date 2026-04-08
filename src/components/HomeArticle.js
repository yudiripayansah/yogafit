import React, { useContext } from 'react';
import { Dimensions, View, Pressable, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Theimage from './Theimage';
import img from '../config/Image';

function HomeArticle({ navigation, ...props }) {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width;
  const { article } = props;

  const ITEM_WIDTH = 240;
  const ITEM_HEIGHT = 197;
  const SPACING = 15;

  return (
    <View style={{ height: ITEM_HEIGHT }}>
      <Carousel
        width={ITEM_WIDTH + SPACING} // ⬅️ penting!
        height={ITEM_HEIGHT + 20}
        data={article}
        pagingEnabled={false}
        loop
        style={{ width: screenWidth }}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH + SPACING, paddingLeft: 20 }}>
            <View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
                elevation: 6,
                backgroundColor: '#fff', // wajib supaya shadow muncul di Android
              }}
            >
              <Pressable
                onPress={() => { navigation.navigate('DetailArticle', { article: item }) }}
                style={{
                  flex: 1,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <Theimage
                  original={item.image}
                  placeholder={img.teacher}
                  style={{
                    width: '100%',
                    height: '70%',
                  }}
                />

                <View
                  style={[
                    t.p12,
                    t.fjEnd,
                    t.hp30,
                    t.bgwhite,
                  ]}
                >
                  <Text style={[t['h14-400'], t.cblack]}>
                    {item.title}
                  </Text>
                  <Text style={[t['p9-400'], t.cgrey90, t.mt5]}>
                    5 Min Read
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default HomeArticle;