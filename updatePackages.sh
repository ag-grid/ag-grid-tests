#!/usr/bin/env bash

for subDirectory in ./vue3/*;
do
  cd $subDirectory
  pwd
  ./update.sh
  if [ $? -ne 0 ];
  then
    exit 1
  fi
  cd ../..
done
