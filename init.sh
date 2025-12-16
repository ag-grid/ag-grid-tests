#!/usr/bin/env bash

for subDirectory in ./vue3/*;
do
  cd $subDirectory
  cp ../../update.sh .
  rm -rf node_modules
  npm i --no-package-lock --registry https://registry.ag-grid.com/
  if [ $? -ne 0 ];
  then
    pwd
    exit 1
  fi
  ./update.sh
  if [ $? -ne 0 ];
  then
    pwd
    exit 1
  fi
  cd ../..
done
