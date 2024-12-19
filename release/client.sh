#!/bin/bash

rm -rf ./artefacts/ClientLourd.zip
rm -rf ./artefacts/ClientLourd
cd ../client
rm -rf build
rm -rf dist
rm -rf coverage
npm ci
npm run build
npm run package

if [ ! -f "./build/scrabble-win32-x64/scrabble.exe" ]; then
    echo "failed to generate ./build folder"
    exit 1
fi

mkdir -p ../release/artefacts/ClientLourd
cp -r './build/scrabble-win32-x64' ../release/artefacts/ClientLourd
cd ../release/artefacts/ClientLourd
zip -qrm ../ClientLourd.zip *
cd ..
rm -rf ./ClientLourd
