#!/usr/bin/env bash

for subDirectory in ./packages/*;
do
  cd $subDirectory
  pwd
  rm -rf node_modules
  npm i --no-package-lock --registry http://52.50.158.57:4873
  if [ $? -ne 0 ];
  then
    exit 1
  fi
  cd ../..
done