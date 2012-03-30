#!/bin/bash
PORT=$1
PORT=3001
mongrel_rails stop
rm log/mongrel.pid
# TDW 2010-09-06: For reasons I don't understand I was getting ActionController::InvalidAuthenticityToken errors, and redirect errors when I started an application with mongrel_rails directly.
COMMAND="ruby script/server -p $PORT -d"
echo $COMMAND
$COMMAND
