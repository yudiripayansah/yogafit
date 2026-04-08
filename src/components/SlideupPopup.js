import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const { height } = Dimensions.get('window');

const SlideUpPopup = ({
  visible,
  onClose,

  icon = '✕',
  iconBgColor = '#F5EDE6',
  iconColor = '#F28C18',

  title,
  subtitle,

  primaryText = 'Confirm',
  secondaryText = 'Cancel',

  onPrimaryPress,
  onSecondaryPress,

  hideSecondary = false,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[styles.overlay, { opacity: overlayAnim }]}
        />
      </TouchableWithoutFeedback>

      {/* Modal */}
      <Animated.View
        style={[
          styles.modal,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Close */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Icon */}
        <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
          <Text style={[styles.icon, { color: iconColor }]}>{icon}</Text>
        </View>

        {/* Content */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {/* Primary Button */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onPrimaryPress}
        >
          <Text style={styles.primaryText}>{primaryText}</Text>
        </TouchableOpacity>

        {/* Secondary Button */}
        {!hideSecondary && (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={onSecondaryPress || onClose}
          >
            <Text style={styles.secondaryText}>{secondaryText}</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

export default SlideUpPopup;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  closeText: {
    fontSize: 20,
    color: '#999',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  primaryBtn: {
    backgroundColor: '#F28C18',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: '#F3F4F6',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: 18,
    color: '#222',
  },
});