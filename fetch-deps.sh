#! /bin/sh

jquery_version='2.1.0'
angular_version='1.2.14'
bootstrap_version='3.1.1'

wget -O src/dist/angular-${angular_version}.js \
      https://ajax.googleapis.com/ajax/libs/angularjs/${angular_version}/angular.js
wget -O src/dist/angular-route-${angular_version}.js \
      https://ajax.googleapis.com/ajax/libs/angularjs/${angular_version}/angular-route.js
wget -O src/dist/jquery-${jquery_version}.js \
      http://code.jquery.com/jquery-${jquery_version}.js
wget -O src/dist/bootstrap-${bootstrap_version}.css \
      http://netdna.bootstrapcdn.com/bootstrap/${bootstrap_version}/css/bootstrap.css
wget -O fonts/glyphicons-halflings-regular.eot \
      http://netdna.bootstrapcdn.com/bootstrap/${bootstrap_version}/fonts/glyphicons-halflings-regular.eot
wget -O fonts/glyphicons-halflings-regular.svg \
      http://netdna.bootstrapcdn.com/bootstrap/${bootstrap_version}/fonts/glyphicons-halflings-regular.svg
wget -O fonts/glyphicons-halflings-regular.ttf \
      http://netdna.bootstrapcdn.com/bootstrap/${bootstrap_version}/fonts/glyphicons-halflings-regular.ttf
wget -O fonts/glyphicons-halflings-regular.woff \
      http://netdna.bootstrapcdn.com/bootstrap/${bootstrap_version}/fonts/glyphicons-halflings-regular.woff
