#!/bin/bash
var=$1

if [ -z $1 ]
then
    var="update"
fi

npm run build

git add .

git commit -m $var

git push -u coding

pm2 deploy ecosystem.json production
