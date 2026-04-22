import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import RenderHTML from 'react-native-render-html';
import {Api} from '../config/Api';
// assets
import img from '../config/Image';

const DetailArticle = ({ route, navigation }) => {
  const t = useContext(ThemeContext);
  const screenWidth = Dimensions.get('window').width - 40;
  const [carticle, setcarticle] = useState([]);
  const getarticle = async () => {
    try {
      let req = await Api.article();
      if (req.status === 200) {
        let { data } = req.data.original;
        data.map((item, index) => {
          item.image = { uri: item.image };
          item.date = getTodayDate()
        });
        setcarticle(data);
      } else {
        console.error('Error get article');
      }
    } catch (error) {
      console.error('Error get home article: ' + error);
    }
  };

  function getTodayDate() {
    const today = new Date();

    const day = today.getDate();
    const month = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();

    return `${day} ${month} ${year}`;
  }
  const moreArticles = [
    { id: 1, title: 'The mind-altering power of yog...', readTime: '5 Min Read', image: img.classimage },
    { id: 2, title: 'The mind-altering power of yog...', readTime: '5 Min Read', image: img.classimage },
  ];
  const { article } = route.params

  useEffect(() => {
    getarticle();
  }, []);

  useEffect(() => {
    const onFocusPage = navigation.addListener('focus', () => {
      getarticle();
    });
    return onFocusPage;
  }, [navigation]);
  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image with Back Button */}
        <ImageBackground
          source={article.image} // Ganti dengan image artikel
          style={[t.wp100, t.h300, t.fjEnd]}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={[t.absolute, t.top50, t.left20]}
            onPress={() => navigation.goBack()}
          >
            <Image source={img.backBtn} style={[t.w40, t.h40, { tintColor: '#fff' }]} />
          </TouchableOpacity>

          {/* Article Title Overlay */}
          <View style={[t.p20]}>
            <Text style={[t.cwhite, t['h22-700'], { lineHeight: 28 }]}>
              {article.title}
            </Text>
          </View>
        </ImageBackground>

        {/* Date and Read Time */}
        <View style={[t.px20, t.py20, t.fRow, t.fjBetween, t.faCenter]}>
          <Text style={[t.cgrey30, t['h14-600']]}>{article.date}</Text>
          <Text style={[t.cgrey60, t['p12-400']]}>5 Min Read</Text>
        </View>

        {/* Article Content */}
        <View style={[t.px20]}>
          {/* <Text style={[t.cgrey40, t['p14-400'], { lineHeight: 24, textAlign: 'justify' }]}>
            Yoga has been found to increase grey matter and alter key networks in the brain. Now there are hopes it could be used to help improve people's mental health.{"\n\n"}
            My right arm is shaking. Sweat drips from my forehead as I twist my body from a side plank into a yoga pose known as "Wild Thing" – or "Camatkarasana". It is quite the contortion – I arch my back, stretching my left arm over my head. My right foot is planted on the ground, and I look up to the sky.{"\n\n"}
            <Text style={[t.cblack, t['h16-700']]}>One translation of the Sanskrit</Text>{"\n"}
            word camatkarasana is "
            <Text style={[t.cblack, t.tUnder]}>the ecstatic unfolding of the enraptured heart</Text>" 
            and is said to elicit confidence. And – despite the strain – I feel invincible.{"\n\n"}
            The practice of yoga <Text style={[t.cblack, t.tUnder]}>dates back over 2,000 years</Text> to ancient India. And though today, there are many different types of yoga – from meditative yin yoga to flowing vinyasa – through their use of movement, meditation and breathing exercises, all forms focus on a mind-body connection.
          </Text> */}
          <RenderHTML
            contentWidth={screenWidth}
            style={[t.cgrey40, t['h14-400']]}
            tagsStyles={{
              div: { color: '#444' },
            }}
            source={{ html: `<div>${article.desc}</div>` }}
          />
        </View>

        {/* More Articles Section */}
        <View style={[t.mt40, t.mb30]}>
          <Text style={[t.px20, t.cblack, t['h18-700'], t.mb15]}>More Article</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[t.ps20]}
          >
            {carticle.map((item,index) => (
              <TouchableOpacity
                key={index}
                style={[t.w200, t.me15, t.br15, t.bgwhite, t.bw1, t.bgreye, t.bsolid, { overflow: 'hidden' }]}
              >
                <Image source={item.image} style={[t.wp100, t.h120]} />
                <View style={[t.p12]}>
                  <Text style={[t.cblack, t['h14-600']]} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={[t.cgrey60, t['p10-400'], t.mt5]}>
                    5 Mins Read
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailArticle;