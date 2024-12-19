#!/bin/bash

# Inspired from https://stackoverflow.com/questions/27599839/how-to-wait-for-an-open-port-with-netcat

apt-get update && apt-get install -y netcat

echo "Waiting server to launch on 3000..."

while ! nc -z localhost 3000 > /dev/null; do
  sleep 2
done

echo "Server launched"