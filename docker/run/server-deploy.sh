#!/bin/bash

docker rm -vf server-deploy
docker run -p 3000:3000 --restart=unless-stopped -d --name server-deploy $(docker build -qf ../files/server-deploy.Dockerfile ../..)
docker image prune --force