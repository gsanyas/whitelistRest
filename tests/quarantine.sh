#!/bin/sh
# Before testing, launch the app and login

API=`cat api.txt`
COOKIE=`cat cookie.txt`
ORIGIN=`cat origin.txt`

# Obtain all emails in quarantine
# Output should be like [] or [{"id":"0a9c06a9560685cf","email_sender":"test@mail","email_subject":"toto","email_size":54,"created_at":"2021-02-16T12:08:03.000Z"},...],  depending on your quarantine
curl -H "Origin: $ORIGIN" -H "Content-Type: application/json" -H "withCredentials: true" --cookie "$COOKIE" --url $API/auth/emails