import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Switch,
  Alert,
} from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
import img from '../config/Image';
import { ScrollView } from 'react-native-gesture-handler';

import messaging from '@react-native-firebase/messaging';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export default function NotificationsSettingsScreen({navigation}) {
  const t = useContext(ThemeContext);

  const [settings, setSettings] = useState({
    push: true,
    email: false,
    sms: false,
    sound: true,
    vibration: true,
    reminders: false,
    offers: false,
    newClasses: false,
  });

  // =============================
  // PUSH NOTIFICATION PERMISSION
  // =============================

  const requestPushPermission = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Push notification enabled');
    } else {
      Alert.alert('Notification permission denied');
    }
  };

  // =============================
  // SOUND TRIGGER (LOG ONLY)
  // =============================

  const playNotificationSound = () => {
    if (settings.sound) {
      console.log('Notification sound triggered');
    }
  };

  // =============================
  // VIBRATION
  // =============================

  const triggerVibration = () => {
    if (settings.vibration) {
      ReactNativeHapticFeedback.trigger("impactMedium", {
        enableVibrateFallback: true,
      });
    }
  };

  // =============================
  // HANDLE TOGGLE
  // =============================

  const handleToggle = keyName => {

    const newValue = !settings[keyName];

    setSettings(prev => ({
      ...prev,
      [keyName]: newValue,
    }));

    if (keyName === 'push' && newValue) {
      requestPushPermission();
    }

    if (keyName === 'sound' && newValue) {
      playNotificationSound();
    }

    if (keyName === 'vibration' && newValue) {
      triggerVibration();
    }
  };

  const ToggleItem = ({ title, subtitle, value, keyName }) => (
    <View style={[t.mb25]}>
      <View style={[t.fRow, t.fjBetween, t.faCenter]}>
        <View style={{ flex: 1 }}>
          <Text style={[t['h16-600'], t.cblack]}>{title}</Text>
          <Text style={[t['h14-500'], t.cgrey90]}>
            {subtitle}
          </Text>
        </View>

        <Switch
          value={value}
          onValueChange={() => handleToggle(keyName)}
          trackColor={{ false: '#E5E7EB', true: '#F28C18' }}
          thumbColor={'#ffffff'}
        />
      </View>
    </View>
  );

  return (
    <View style={[t.bgwhite, { flex: 1 }]}>
      <StatusBar barStyle="dark-content" />

      <View
        style={[
          t.fRow,
          t.fjBetween,
          t.faCenter,
          t.bgwhite,
          t.pt50,
          t.pb10,
          t.pe20,
        ]}
      >
        <View style={[t.fRow, t.faCenter, { columnGap: 15 }]}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Image source={img.backBtn} style={[t.w48, t.h48]} />
          </TouchableOpacity>

          <View>
            <Text style={[t['h18-500'], t.cblack]}>
              Notifications Settings
            </Text>
            <Text style={[t['h12-500'], t.cgreya]}>
              Manage your notification preferences
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[t.px20, t.pt20]}
      >
        <Text style={[t['p14-700'], t.cgrey60, t.mb20]}>
          GENERAL
        </Text>

        <ToggleItem
          title="Push Notifications"
          subtitle="Receive notifications on this device"
          value={settings.push}
          keyName="push"
        />

        <ToggleItem
          title="Email Notifications"
          subtitle="Get updates via email"
          value={settings.email}
          keyName="email"
        />

        <ToggleItem
          title="SMS Notifications"
          subtitle="Receive text messages for important updates"
          value={settings.sms}
          keyName="sms"
        />

        <ToggleItem
          title="Notification Sound"
          subtitle="Play sound for notifications"
          value={settings.sound}
          keyName="sound"
        />

        <ToggleItem
          title="Vibration"
          subtitle="Vibrate on new notifications"
          value={settings.vibration}
          keyName="vibration"
        />

        <Text style={[t['p14-700'], t.cgrey60, t.mt30, t.mb20]}>
          OTHERS
        </Text>

        <ToggleItem
          title="Class Reminders"
          subtitle="Get reminded before your classes start"
          value={settings.reminders}
          keyName="reminders"
        />

        <ToggleItem
          title="Special Offers"
          subtitle="Exclusive deals and discounts"
          value={settings.offers}
          keyName="offers"
        />

        <ToggleItem
          title="New Classes"
          subtitle="Updates about new class offerings"
          value={settings.newClasses}
          keyName="newClasses"
        />

        <View
          style={[
            styles.infoBox,
            t.mt30,
            t.mb40,
          ]}
        >
          <View style={[t.fRow, { columnGap: 10 }]}>
            <Text style={[styles.infoIcon]}>i</Text>
            <Text style={[t['h14-500'], t.cgrey90, { flex: 1 }]}>
              You can manage notification permissions in your device
              settings. Some notifications like booking confirmations
              and payment alerts are essential and cannot be disabled.
            </Text>
          </View>
        </View>

        <View style={[t.pb100]}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    borderWidth: 1,
    borderColor: '#F28C18',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFF7ED',
  },
  infoIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F28C18',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
});