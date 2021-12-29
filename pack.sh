#!/bin/bash

FILE_NAME="site.tgz"

#sed -i '' 's/http/https/g' src/scripts/apiUrl.js
#sed -i '' 's/localhost/stockholdergame.com/g' src/scripts/apiUrl.js

#npm run build

if [ -f $FILE_NAME ]; then
  rm $FILE_NAME
fi
tar -czf $FILE_NAME public
ls -l |grep $FILE_NAME
