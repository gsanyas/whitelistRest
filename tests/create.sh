#!/bin/sh
# Before testing, launch the app

API=`cat api.txt`
ORIGIN=`cat origin.txt`

# Create a new account
# Output should be like {"full_name":"user1","email":"user1@gmail.com"}
curl -d '{"email":"user1@gmail.com","password":"user56","full_name":"user1","email_password":"userpass"}' -H "Origin: $ORIGIN" -H "Content-Type: application/json" -H "withCredentials: true" --url $API/lr/register
