# ListeBlanche API documentation

## Authorization

TODO

## Resources

### Login

**Login** is a specific request which is treated separately.

### Register

**Register** is a specific request which is treated separately.

### User

**User** is the person who owns an account. Use the user API to manage user information and preferences.

User authorization token is needed to access this resource.

**URI**: `/api/user`

**Available Methods**:

- **`GET`** : `/`
  
  Obtain the name and the email adress of the user.
  
  **URL Params**: None
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 200
  - **Content**: `{full_name: "jean-michel", email: "jean-michel@email.com"}`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`

  **Sample Call**:

  ```*TODO*```

- **`PUT`** : `/user/:userparam`
  
  Change a parameter for the user (email, name, password or email password).

  **URL Params (required)**
  - `userparam=[Text]`
  
  **Data params**:
  - `param=[Text]`
  
  **Success Response**:
  - **Code**: 200
  - **Content**: `{full_name: "jean-michel", email: "jean-michel@email.com"}`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`
  
    OR

  - **Code**: 404
  - **Content**: `"Not Found"`

  **Sample Call**:

  ```*TODO*```

### Quarantine

**Quarantine** contains the references for all emails stored in our system.

User authorization token is needed to access this resource.

**URI**: `/api/emails`

**Available Methods**:

- **`GET`** : `/`
  
  Obtain all emails of the user.
  
  **URL Params**: None
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 200
  - **Content**: `[{id: 58, fk_user: 65, email_sender: "net@email.com", email_subject: "test", created_at: "2020-11-06"}]`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`

  **Sample Call**:

  ```*TODO*```

- **`DELETE`** : `/:id`
  
  Delete the email from our storage (irreversible).

  **URL Params (required)**
  - `id=[Integer]`
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 204
  - **Content**: Empty
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`
  
    OR

  - **Code**: 404
  - **Content**: `"Not Found"`

- **`PUT`** : `/restore/:id`
  
  Restore the email from our storage into the user's mailbox (can take a few minutes).

  **URL Params (required)**
  - `id=[Integer]`
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 200
  - **Content**: `[{id: 58, fk_user: 65, email_sender: "net@email.com", email_subject: "test", created_at: "2020-11-06"}]`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`
  
    OR

  - **Code**: 404
  - **Content**: `"Not Found"`

### Blacklist

**Blacklist** contains all the blacklisted addresses for every user, and **BlacklistRegularExpression** contains the regular expressions used to group addresses together.

User authorization token is needed to access this resource.

**URI**: `/api/blacklist`

**Available Methods**:

- **`GET`** : `/`
  
  Obtain all blacklisted addresses for the user.
  
  **URL Params**: None
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 200
  - **Content**: `[{id: 58, email: "vid@email.com" , fk_user: 65}, {id: 61, email: "mal@email.com", fk_user: 65}]`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`

  **Sample Call**:

  ```*TODO*```

- **`POST`** : `/`
  
  Add an address to the blacklist or a regular expression to the blacklisted regular expressions.

  **URL Params**: None
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 201
  - **Content**: `{id: 58, email: "vid@email.com" , fk_user: 65}` OR `{id: 59, user_expression: "*@email.com", expression: ".*@email.com" , fk_user: 65}`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`
  
    OR

  - **Code**: 404
  - **Content**: `"Not Found"`
  
    OR

  - **Code**: 422
  - **Content**: `"Unprocessable Entity"`

- **`PUT`** : `/:id`
  
  Add the sender of the selected email in the blacklist, and remove all email from them currently in quarantine (irreversible).

  **URL Params (required)**
  - `id=[Integer]`
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 200
  - **Content**: `{id: 58, email: "vid@email.com" , fk_user: 65}`
  
    OR

  - **Code**: 201
  - **Content**: `{id: 59, email: "mal@email.com" , fk_user: 65}`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`
  
    OR

  - **Code**: 304
  - **Content**: `"Not Modified"`
  
    OR

  - **Code**: 404
  - **Content**: `"Not Found"`

### Whitelist

**Whitelist** contains all the whitelisted addresses for every user, and **WhitelistRegularExpression** contains the regular expressions used to group addresses together.

User authorization token is needed to access this resource.

**URI**: `/api/whitelist`

**Available Methods**:

- **`GET`** : `/`
  
  Obtain all whitelisted addresses for the user.
  
  **URL Params**: None
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 200
  - **Content**: `[{id: 58, email: "vid@email.com" , fk_user: 65}, {id: 61, email: "mal@email.com", fk_user: 65}]`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`

  **Sample Call**:

  ```*TODO*```

- **`POST`** : `/`
  
  Add an address to the whitelist or a regular expression to the whitelisted regular expressions.

  **URL Params**: None
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 201
  - **Content**: `{id: 58, email: "vid@email.com" , fk_user: 65}` OR `{id: 59, user_expression: "*@email.com", expression: ".*@email.com" , fk_user: 65}`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`
  
    OR

  - **Code**: 404
  - **Content**: `"Not Found"`
  
    OR

  - **Code**: 422
  - **Content**: `"Unprocessable Entity"`

- **`PUT`** : `/:id`
  
  Add the sender of the selected email in the whitelist, and restore all email from them currently in quarantine.

  **URL Params (required)**
  - `id=[Integer]`
  
  **Data params**: None
  
  **Success Response**:
  - **Code**: 200
  - **Content**: `{id: 58, email: "vid@email.com" , fk_user: 65}`
  
    OR

  - **Code**: 201
  - **Content**: `{id: 59, email: "mal@email.com" , fk_user: 65}`
  
  **Error Response**:
  - **Code**: 401
  - **Content**: `"Unauthorized"`
  
    OR

  - **Code**: 304
  - **Content**: `"Not Modified"`
  
    OR

  - **Code**: 404
  - **Content**: `"Not Found"`
  
- **PUT**: `/verify/:id`
  
  Verify that a captcha has been validated and add the validator to the whitelist.

  TODO

### Other endpoints

- **GET**: `/help`
- **GET**: `/api/connect`
