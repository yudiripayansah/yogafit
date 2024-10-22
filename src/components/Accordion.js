import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {ThemeContext} from '../context/ThemeContext';

const Accordion = ({ title, content }) => {
  const t = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const animationHeight = useSharedValue(0);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    animationHeight.value = isOpen ? withTiming(0, { duration: 300 }) : withTiming(100, { duration: 300 });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animationHeight.value,
    };
  });

  return (
    <View style={[{overflow:'hidden'}]}>
      <TouchableOpacity onPress={toggleAccordion} style={[t.py15,t.fRow,t.faCenter,t.fjBetween]}>
        <Text style={[t['p14-700'],t.corange]}>{title}</Text>
        <Text style={[t['p20-700'],t.corange]}>{isOpen ? '-' : '+'}</Text>
      </TouchableOpacity>
      <Animated.View style={[t.bbw1,t.bsolid,t.bgreye, animatedStyle]}>
        <View style={[t.py15,t.btw1,t.bsolid,t.bgreye]}>
          <Text style={[t['p12-500'],t.cgrey6]}>{content}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
