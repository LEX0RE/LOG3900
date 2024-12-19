#!/bin/bash

docker rm -vf web-deploy
docker run -p 4200:80/tcp --restart=unless-stopped -d --name web-deploy $(docker build -qf ../files/web-deploy.Dockerfile ../..)
docker image prune --force