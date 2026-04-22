#!/bin/bash
 
echo "🔧 Removing react-native-reanimated..."
# yarn remove react-native-reanimated
 
echo "📦 Installing react-native-reanimated@3.9.0..."
# yarn add react-native-reanimated@3.9.0
 
echo "🗑️ Cleaning CMake cache..."
# rm -rf node_modules/react-native-reanimated/android/.cxx
 
echo "🧹 Cleaning Android build..."
cd android && ./gradlew clean && cd ..
 
echo "🚀 Running Android..."
npx react-native run-android