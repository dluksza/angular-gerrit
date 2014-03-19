#! /bin/bash

plugins=(hello-world changes-screen)

for plugin in ${plugins[@]}
do
  echo -n "Building '${plugin}' ..."
  cd ${plugin}
  zip -qr0 ../${plugin}.jar .
  cd ..
  echo " DONE."
done
