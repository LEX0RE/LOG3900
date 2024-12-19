#!/bin/bash

# Source : https://hackmamba.io/blog/2022/04/running-docker-in-a-jenkins-container/

docker image build -t log3900-jenkins .

docker run -d --name log3900-jenkins --restart=unless-stopped -p 8080:8080 -p 50000:50000 -v /var/run/docker.sock:/var/run/docker.sock -v jenkins_home:/var/jenkins_home log3900-jenkins
