#!/bin/bash

start () {
    echo "Starting..."

    sudo docker compose up -d
}

stop () {
    echo "Stopping..."

    sudo docker compose down -v
}

build () {
    echo "Building..."

    sudo docker compose build --no-cache
}

if [ "$1" == "start" ]; then
    start
elif [ "$1" == "stop" ]; then
    stop
elif [ "$1" == "build" ]; then
    build
else
    echo "Invalid command"
fi
