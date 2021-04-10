#!/bin/sh
# Before testing, launch the app and login

API=`cat api.txt`
COOKIE=`cat cookie.txt`
ORIGIN=`cat origin.txt`

# Add an address "user-*@gmail.com" to the whitelist of the authentified user
# Output should be like {"expression": "user-*@gmail.com"}
curl -d '{"expression": "user-*@gmail.com"}' -H "Origin: $ORIGIN" -H "Content-Type: application/json" -H "withCredentials: true" --cookie "$COOKIE" --url $API/auth/list/blacklist