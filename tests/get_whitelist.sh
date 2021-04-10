#!/bin/sh
# Before testing, launch the app and login

API=`cat api.txt`
COOKIE=`cat cookie.txt`
ORIGIN=`cat origin.txt`

# Get all the emails and expressions in the whitelist of the authentified user
# Output should be like ["user2@gmail.com", "user+*@gmail.com"]
curl -H "Origin: $ORIGIN" -H "Content-Type: application/json" -H "withCredentials: true" --cookie "$COOKIE" --url $API/auth/list/whitelist