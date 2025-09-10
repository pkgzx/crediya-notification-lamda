#! /bin/bash

# clear previous zip
rm main.zip

# npm install
npm i

# build
npm run build

# remove node_modules
rm -rf node_modules

# only install production dependencies for production build
npm install --omit=dev

# zip index.js
cd dist && zip -r ../main.zip index.js && cd ..

# zip node_modules
zip -r main.zip node_modules/ -g

# # install all dependencies again to ensure vs.code resolves them
# npm i

