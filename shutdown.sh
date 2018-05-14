#!/usr/bin/env bash
PID=`cat ./PID`
kill -SIGTERM ${PID}
echo ${PID} > target/PID.old
rm PID
