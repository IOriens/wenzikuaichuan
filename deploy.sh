#!/bin/bash
var=$1

if [ -z $1 ]
then
    var="update"
fi

npm run build

git add . --all

git commit -m $var

git push -u origin

git push -u github

pm2 deploy ecosystem.json production
