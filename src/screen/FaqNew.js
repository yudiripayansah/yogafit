import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import img from '../config/Image';

import helper from '../config/Helper';
import { Api } from '../config/Api';
// Mengaktifkan animasi untuk Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const [faq, setfaq] = useState([]);
  const [loading, setloading] = useState(false);
  const getFaq = async () => {
    setloading(true);
    try {
      let req = await Api.faq(user.token);
      if (req.status === 200 || req.status === 201) {
        let { data } = req.data;
        setfaq(data);
      } else {
        console.error('Error get event');
      }
      setloading(false);
    } catch (error) {
      console.error('Error get faq: ' + error);
      setloading(false);
    }
  };
  useEffect(() => {
    getFaq();
  }, []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('3'); // Default expand id 3 seperti di gambar

  const categories = ['All', 'Membership', 'Classes', 'Booking', 'Payments'];

  const faqData = [
    {
      id: '1',
      category: 'Membership',
      question: 'Can I change my membership plan?',
      answer: 'Yes, you can upgrade your plan at any time through the Membership Info page.',
    },
    {
      id: '2',
      category: 'Membership',
      question: 'Can I change my membership plan?',
      answer: 'Yes, you can upgrade your plan at any time through the Membership Info page.',
    },
    {
      id: '3',
      category: 'Membership',
      question: 'Is there a trial period?',
      answer: 'Yes, we offer a 3-day trial for new members. You can submit a trial request through the app, and our sales team will contact you to activate it. The trial gives you full access to all member benefits.',
    },
    {
      id: '4',
      category: 'Membership',
      question: 'What should I bring to class?',
      answer: 'Wear comfortable clothing and bring water. Yoga mats are provided for free to all members. Silver members get free mat rental, while Gold and Platinum members also get complimentary towels.',
    },
    {
      id: '5',
      category: 'Membership',
      question: 'How do I book a class?',
      answer: 'All bookings must be confirmed through our sales team via WhatsApp chat. Browse classes in the app, select your preferred time, and click "Book Now" to start the chat process.',
    },
  ];

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb15, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>FAQ</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[t.pb40]}>
        {/* Search Bar */}
        <View style={[t.mx20, t.mt10, t.fRow, t.faCenter, t.p15, t.br15, t.bw1, { borderColor: '#E5E7EB' }]}>
          <Image source={img.iconsearch} style={[t.w20, t.h20, t.me10, { tintColor: '#9CA3AF' }]} />
          <TextInput
            placeholder="Search questions..."
            style={[t.flex1, t['p14-400']]}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Categories Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[t.mt20]}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                t.px20, t.py10, t.br25, t.me10, t.bw1,
                activeCategory === cat ? [t.bgorange, { borderColor: '#F28C18' }] : { borderColor: '#E5E7EB' }
              ]}
            >
              <Text style={[
                t['h14-600'],
                activeCategory === cat ? t.cwhite : t.cgrey60
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[t.px20, t.mt25]}>
          <Text style={[t.cgrey60, t['p12-400'], t.mb15]}>15 questions found</Text>

          {faq.map((item) => (
            <AccordionItem
              key={item.odata}
              item={item}
              isExpanded={expandedId === item.odata}
              onPress={() => toggleExpand(item.odata)}
            />
          ))}
        </View>

        {/* Still Need Help Section */}
        <View style={[t.m20, t.p25, t.br25, t.bw1, { borderColor: '#FFE0B2', backgroundColor: '#FFF8F1' }]}>
          <Text style={[t.cblack, t['p16-700']]}>Still Need Help?</Text>
          <Text style={[t.cgrey60, t['h13-400'], t.mt5, t.mb20]}>
            Can't find the answer you're looking for? Our support team is here to help!
          </Text>

          <TouchableOpacity style={[t.bgorange, t.py15, t.br12, t.fRow, t.faCenter, t.fjCenter, t.mb10]}
            onPress={() => {
              helper.sendWhatsapp(`Hi Yogafit!, i have a question about Yogafit Indonesia!`)
            }}
          >
            <Image source={img.whatsapp} style={[t.w20, t.h20, t.me10, { tintColor: '#fff' }]} />
            <Text style={[t.cwhite, t['h15-700']]}>Chat on WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[t.bgwhite, t.py15, t.br12, t.bw1, { borderColor: '#E5E7EB' }, t.fRow, t.faCenter, t.fjCenter]}>
            <Image source={img.iconemail} style={[t.w20, t.h20, t.me10, { tintColor: '#1C1C1E' }]} />
            <Text style={[t.cblack, t['h15-700']]}>Email Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Sub-component untuk list FAQ yang bisa dibuka-tutup
const AccordionItem = ({ item, isExpanded, onPress }) => {
  const t = useContext(ThemeContext);
  return (
    <View style={[t.mb15, t.br20, t.bw1, { borderColor: '#F3F4F6' }, t.overflowHidden]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[t.p20, t.bgwhite]}
      >
        <View style={[t.fRow, t.fjBetween, t.faCenter]}>
          <View style={[t.flex1, t.faStart]}>
            <View style={[{ backgroundColor: '#ECF0EE' }, t.px10, t.py4, t.br50, t.asFlexStart, t.mb8]}>
              <Text style={[t['p10-700'], { color: '#6A8879' }]}>All</Text>
            </View>
            <Text style={[t.cblack, t['h15-700']]}>{item.title}</Text>
          </View>
          <Image
            source={img.chevronDown}
            style={[t.w20, t.h20, { tintColor: '#9CA3AF' }]}
          />
        </View>

        {isExpanded && (
          <View style={[t.mt15, t.pt15, t.btw1, { borderColor: '#F3F4F6' }]}>
            <Text style={[t.cgrey60, t['p14-400'], { lineHeight: 22 }]}>
              {item.faq}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FAQ;