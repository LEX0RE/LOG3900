#!/bin/bash

rm -rf ./artefacts/Serveur.zip
rm -rf ./artefacts/Serveur
cd ../server
rm -rf coverage
rm -rf out
npm ci
npm run build

if [ ! -d "./out" ]; then
    echo "failed to generate /out folder"
    exit 1
fi

mkdir -p ../release/artefacts/Serveur
cp -r ./out ../release/artefacts/Serveur
cd ../release/artefacts/Serveur
zip -qrm ../Serveur.zip *
cd ..
rm -rf ./Serveur
