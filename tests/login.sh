#!/bin/sh
# Before testing, launch the app

API=`cat api.txt`

# Login to the account and prints the cookie in a txt file
curl -d '{"email":"user1@gmail.com","password":"user56"}' -H "Origin: http://localhost:4200" -H "Content-Type: application/json" -H "withCredentials: true" -i --url $API/lr/login | grep "authcookie" | sed 's/Set-Cookie: \([^,]*\),/\1/' > cookie.txt
