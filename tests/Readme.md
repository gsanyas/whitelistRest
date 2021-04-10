# Tests of Features

Each script tests one functionality.

## Preliminary

Tests need 2 files to work, containing URIs :

- `api.txt`: the address to connect to the API (eg: "http://localhost:8070")
- `origin.txt`: the address of the frontend software (it is the ORIGIN_URI environment variable)

## Test files

### User creation (to do before the rest)

- `create.sh`: create a new user called user1 with password user56
- `login.sh`: login to the account of user1 with password user56 (it creates a cookie.txt file with the token jwt containing the identifier)
- `test_connect.sh`: test that the token jwt is still valid

### Quarantine

To test the functionalities of the quarantine list, an email to user1 must be added in the quarantine

- `quarantine.sh` : obtain the list of all emails to user1 in quarantine

### White and black lists, and regular expressions

- `add_whitelist.sh`: add an address "user2@gmail.com" to the whitelist
- `add_whitelist_expression.sh`: add an expression "user+*@gmail.com" to the whitelist expressions
- `add_blacklist.sh`: add an address "user3@gmail.com" to the blacklist
- `add_blacklist_expression.sh`: add an expression "user-*@gmail.com" to the blacklist expressions
- `get_whitelist.sh`: obtain all addresses and exxpressions in whitelist
- `get_blacklist.sh`: obtain all addresses and exxpressions in blacklist

You can replace the value in those files and then test by sending emails from these addresses and check if they are received (whitelist) or deleted (blacklist) (check the quarantine).

Since the captcha must be created by the backend and resolve in the frontend, I did not add a command line test to test this feature.
