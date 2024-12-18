#!/usr/bin/env bash

cd ../latest
nx run ag-grid-vue3:build

if [ $? -ne 0 ];
then
  exit 1
fi

cd ../vue3-use-cases

for subDirectory in ./packages/*;
do
  cd $subDirectory
  if [ -d "./node_modules" ];
  then
    rm -rf node_modules/ag-grid-vue3
  fi

  mkdir -p node_modules/ag-grid-vue3
  cp -R ../../../latest/packages/ag-grid-vue3/dist node_modules/ag-grid-vue3/
  cp -R ../../../latest/packages/ag-grid-vue3/package.json node_modules/ag-grid-vue3/
  pwd
  npm run build
  if [ $? -ne 0 ];
  then
    exit 1
  fi
  cd ../..
done
