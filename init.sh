#!/usr/bin/env bash

for subDirectory in ./vue3/*;
do
  cd $subDirectory
  cp ../../update.sh .
  rm -rf node_modules
#  npm i --no-package-lock --registry http://52.50.158.57:4873
  npm i --no-package-lock
  if [ $? -ne 0 ];
  then
    exit 1
  fi
  ./update.sh
  cd ../..
done
