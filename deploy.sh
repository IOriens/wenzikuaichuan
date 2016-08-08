#!/bin/bash
var=$1

if [ -z $1 ]
then
    var="update"
fi

npm run build

git add .

git commit -m $var

git push -u origin

pm2 deploy ecosystem.json production
