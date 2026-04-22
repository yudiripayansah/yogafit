import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
// assets
import img from '../config/Image';

const LeaveFeedback = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImprovements, setSelectedImprovements] = useState([]);

  const improvementTags = [
    'Class difficulty',
    'Instructor guidance',
    'Music selection',
    'Temperature control',
    'Class duration',
  ];

  const toggleImprovement = (tag) => {
    if (selectedImprovements.includes(tag)) {
      setSelectedImprovements(selectedImprovements.filter((t) => t !== tag));
    } else {
      setSelectedImprovements([...selectedImprovements, tag]);
    }
  };

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[t.fRow, t.faCenter, t.pt50, t.pb20, t.px20]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={img.backBtn} style={[t.w40, t.h40]} />
        </TouchableOpacity>
        <View style={[t.ms10]}>
          <Text style={[t['h18-600'], t.cblack]}>Leave Feedback</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[t.pb40]}>
        {/* Class Summary Card */}
        <View style={[t.mx20, t.p20, t.br15, { backgroundColor: '#FFF9F1' }]}>
          <Text style={[t.cblack, t['h16-700']]}>Evening Relaxation</Text>
          <Text style={[t.cgrey60, t['h14-400'], t.mt2]}>with Master Rakesh</Text>
          <Text style={[t.cgrey60, t['h14-400'], t.mt5]}>Nov 8, 2025 • 06:00 - 07:00 PM</Text>
        </View>

        {/* Rating Section */}
        <View style={[t.faCenter, t.mt30]}>
          <Text style={[t.cblack, t['h16-700']]}>How was your experience?</Text>
          <View style={[t.fRow, t.mt15, { columnGap: 10 }]}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Image
                  source={img.ratestar}
                  style={[
                    t.w40,
                    t.h40,
                    { tintColor: star <= rating ? '#FE9805' : '#E5E7EB' }
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[t.cgrey60, t['h16-400'], t.mt10]}>Tap to rate</Text>
        </View>

        {/* Comment Section */}
        <View style={[t.px20, t.mt30]}>
          <Text style={[t.cblack, t['h16-700'], t.mb10]}>Tell us more (optional)</Text>
          <View style={[t.bw1, t.br15, t.bgreye, t.py3,t.px10, { height: 120 }]}>
            <TextInput
              multiline
              placeholder="Share your experience with this class..."
              placeholderTextColor="#999"
              style={[t['h14-400'], t.cblack, { textAlignVertical: 'top', flex: 1 }]}
              maxLength={500}
              onChangeText={setComment}
            />
          </View>
          <Text style={[t.cgrey60, t['p11-400'], t.mt5, t.tRight]}>
            {comment.length}/500 characters
          </Text>
        </View>

        {/* Improvement Tags Section */}
        <View style={[t.px20, t.mt20]}>
          <Text style={[t.cblack, t['h16-700'], t.mb15]}>What could we improve?</Text>
          <View style={[t.fRow, { flexWrap: 'wrap', gap: 10 }]}>
            {improvementTags.map((tag) => {
              const isActive = selectedImprovements.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleImprovement(tag)}
                  style={[
                    t.px15,
                    t.py10,
                    t.br10,
                    t.bw1,
                    isActive ? t.borange : t.bgreye,
                    isActive ? { backgroundColor: '#FFF9F1' } : t.bgwhite,
                  ]}
                >
                  <Text style={[t['p13-400'], isActive ? t.corange : t.cblack]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Submit Button */}
        <View style={[t.px20, t.mt40]}>
          <TouchableOpacity
            style={[t.bgneworange, t.py15, t.br12, t.faCenter]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[t.cwhite, t['h14-700']]}>Submit Feedback</Text>
          </TouchableOpacity>
          <Text style={[t.cgrey60, t['p12-400'], t.mt15, t.tCenter]}>
            Your feedback helps us improve
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LeaveFeedback;