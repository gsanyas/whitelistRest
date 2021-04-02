#!/bin/sh
# Before testing, launch the app and login

API=`cat api.txt`
COOKIE=`cat cookie.txt`

# Test the connection
# Output should be : {"connected":true}
curl -H "Origin: http://localhost:4200" -H "Content-Type: application/json" -H "withCredentials: true" --cookie "$COOKIE" --url $API/lr/auth/connect