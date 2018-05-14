#!/usr/bin/env bash
cp -n config/application.properties.template config/application.properties
mvn clean package
java -jar target/*.jar &
echo $! > PID
