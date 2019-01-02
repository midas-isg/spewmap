#!/usr/bin/env bash
git fetch --tags
TAG=$1
git checkout tags/$TAG
echo checkout form tags/$TAG
# Add write permissions to group recursively
chmod -R g+w . &>/dev/null
