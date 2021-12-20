#!/bin/bash

FILE_NAME="site.tgz"

if [ -f $FILE_NAME ]; then
  rm $FILE_NAME
fi
tar -czf $FILE_NAME public
ls -l |grep $FILE_NAME
