#!/bin/bash

# Inspired from https://stackoverflow.com/questions/27599839/how-to-wait-for-an-open-port-with-netcat

echo "Waiting server to launch on 3000..."

while ! netstat -ano | grep "3000" | grep "LISTENING" > /dev/null; do
  sleep 2
done

echo "Server launched"