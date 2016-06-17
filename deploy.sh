#!/bin/bash
git add .

git commit -m "update"

git push -u coding

pm2 deploy ecosystem.json production
