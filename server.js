const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const { checkToken } = require('./filters/checktoken');
const { checkEmail } = require('./filters/checkEmail');
const { loginController, isConnected } = require('./controllers/loginController');
const { getEmail, deleteEmail, restoreEmail, putInWhiteList, putInBlackList } = require('./controllers/emailController');
const { getUser } = require('./controllers/userController');
const { verifyEmail } = require('./controllers/captchaController');
const model = require('./model-routes.json');

const config = require("./config.json");

// Express routing
const app = express()

app.use(cors({ credentials: true, origin: config.origin }))
app.use(cookieParser())
app.use(express.json())


// listen to incoming requests on port 8000
app.listen(config.port, () => {
    console.log('Server started !')
})

/* Routes */
/* See model-routes.json file for more details about each route */

app.get('/help', (_req,res) => res.status(200).json(model))
app.post('/login', loginController);
app.get('/api/connect', checkToken, isConnected);
app.get('/api/emails', checkToken, getEmail);
app.get('/api/user', checkToken, getUser);
app.delete('/api/emails', checkToken, checkEmail, deleteEmail);
app.put('/api/emails/restore', checkToken, checkEmail, restoreEmail)
app.put('api/whitelist', checkToken, checkEmail, putInWhiteList);
app.put('api/blacklist', checkToken, checkEmail, putInBlackList);
app.put('/api/verify/:id', verifyEmail)
