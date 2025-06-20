echo "🧹 Cleaning iOS build..."

cd ios || exit

echo "📦 Removing Pods, Podfile.lock, and DerivedData..."
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/Library/Caches/org.cocoapods.*
rm -rf DerivedData
rm -rf Pods
rm -rf Podfile.lock
rm -rf ~/Library/Developer/Xcode/DerivedData/*
rm -rf build

echo "📡 Running pod install with correct architecture (for M1/M2 Macs)..."
pod cache clean --all
pod deintegrate
pod install

cd .. || exit