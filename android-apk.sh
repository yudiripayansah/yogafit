#!/bin/bash

echo "Android Build APK..."

# Ambil tanggal sekarang (tanpa leading zero)
DATE=$(date +"%-d-%-m-%Y-%H-%M")

# Nama file final
FILENAME="yogafit-release-$DATE.apk"

# Bundle React Native
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

# Masuk folder android
cd android || exit

# Build APK release
./gradlew assembleRelease

# Masuk folder output APK
cd app/build/outputs/apk/release || exit

# Rename file hasil build
mv app-release.apk "$FILENAME"

echo "Build selesai: $FILENAME"

cd ../../../../../..