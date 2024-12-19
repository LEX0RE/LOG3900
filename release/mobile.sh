#!/bin/bash

rm -rf ./artefacts/ClientLeger.zip
rm -rf ./artefacts/ClientLeger
cd ../mobile
flutter clean
flutter pub get
flutter gen-l10n
flutter pub run build_runner build --delete-conflicting-outputs
flutter build apk --no-pub

if [ ! -f "./build/app/outputs/flutter-apk/app-release.apk" ]; then
    echo "failed to generate app-release.apk file"
    exit 1
fi

mkdir -p ../release/artefacts/ClientLeger
cp ./build/app/outputs/flutter-apk/app-release.apk ../release/artefacts/ClientLeger
cd ../release/artefacts/ClientLeger
zip -qrm ../ClientLeger.zip *
cd ..
rm -rf ./ClientLeger
