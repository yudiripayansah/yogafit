import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { ThemeContext } from '../context/ThemeContext';
import img from '../config/Image';

const { width, height } = Dimensions.get('window');
const innerDimension = width * 0.7; // Ukuran kotak scan

const ScanQRCode = ({ navigation }) => {
  const t = useContext(ThemeContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [torch, setTorch] = useState(false);
  
  // Animasi Laser
  const animationValue = useRef(new Animated.Value(0)).current;

  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && isActive) {
        setIsActive(false);
        navigation.navigate('CheckInConfirmation');
      }
    }
  });

  useEffect(() => {
    // Jalankan Animasi Laser
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: innerDimension - 10,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission || device == null) {
    return <View style={[t.bgblack, t.flex1, t.faCenter, t.fjCenter]}><Text style={t.cwhite}>Loading Camera...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
        torch={torch ? 'on' : 'off'}
      />

      {/* Custom Overlay with Cut-out */}
      <View style={styles.overlayContainer}>
        {/* Top Dark Area */}
        <View style={styles.darkSide}>
           <View style={[t.fRow, t.fjBetween, t.faCenter, t.px20, t.pt60]}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.headerBtn}
            >
              <Image source={img.btnclose} style={[t.w40, t.h40, { tintColor: '#fff' }]} />
            </TouchableOpacity>
            <View style={t.faCenter}>
              <Text style={[t.cwhite, t['h18-600']]}>Scan QR Code</Text>
              <Text style={[t.cwhite, t['p12-400'], { opacity: 0.8 }]}>Check-in to your class</Text>
            </View>
            <View style={t.w45} /> 
          </View>
        </View>

        <View style={t.fRow}>
          <View style={styles.darkSide} />
          {/* Middle Scan Area */}
          <View style={styles.scannerBox}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Animated Laser */}
            <Animated.View 
              style={[
                styles.laserLine, 
                { transform: [{ translateY: animationValue }] }
              ]} 
            />
          </View>
          <View style={styles.darkSide} />
        </View>

        {/* Bottom Dark Area */}
        <View style={[styles.darkSide, { flex: 1, paddingTop: 40 }]}>
          <Text style={[t.cwhite, t['h16-600'], t.tCenter]}>
            Position QR code within the frame
          </Text>
          <Text style={[t.cwhite, t['p12-400'], t.tCenter, { opacity: 0.6, marginTop: 10 }]}>
            The code will be scanned automatically
          </Text>

          {/* Controls */}
          <View style={[t.fRow, t.fjCenter, t.faCenter,t.wp100, { marginTop: 60, columnGap: 20 }]}>
            <TouchableOpacity style={t.faCenter}>
              <View style={styles.iconCircle}>
                <Image source={img.btngallery} style={[t.w50, t.h50, { tintColor: '#fff' }]} />
              </View>
              <Text style={[t.cwhite, t['p12-600'], t.mt8]}>Upload</Text>
            </TouchableOpacity>

            <View style={t.faCenter}>
              <View style={styles.mainScanButton}>
                <Image source={img.scan} style={[t.w30, t.h30, { tintColor: '#fff' }]} />
              </View>
              <Text style={[t.cwhite, t['p12-600'], t.mt8]}>Scanning</Text>
            </View>

            <TouchableOpacity style={t.faCenter} onPress={() => setTorch(!torch)}>
              <View style={styles.iconCircle}>
                <Image source={img.btnflash} style={[t.w50, t.h50, { tintColor: '#fff' }]} />
              </View>
              <Text style={[t.cwhite, t['p12-600'], t.mt8]}>Flash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlayContainer: { ...StyleSheet.absoluteFillObject },
  darkSide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  headerBtn: {
    width: 45, height: 45, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center'
  },
  scannerBox: {
    width: innerDimension,
    height: innerDimension,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 40, height: 40,
    borderColor: '#F28C18',
    borderWidth: 4,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 20 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 20 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 20 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 20 },
  laserLine: {
    width: '100%', height: 3,
    backgroundColor: '#F28C18',
    shadowColor: "#F28C18",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 10,
    elevation: 15,
  },
  iconCircle: {
    width: 55, height: 55, borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center'
  },
  mainScanButton: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#F28C18',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 6, borderColor: 'rgba(242, 140, 24, 0.3)'
  }
});

export default ScanQRCode;