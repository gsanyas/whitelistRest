const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { checkToken } = require('./utils/checktoken');
const { loginController, isConnected } = require('./controllers/loginController');
const { getEmail, checkEmail, deleteEmail } = require('./controllers/emailController');
const { getUser } = require('./controllers/userController');

// Config
const port = 8070;
const origin = 'http://localhost:8080';

// Express routing
const app = express()

app.use(cors({ credentials: true, origin: origin }))
app.use(cookieParser())
app.use(express.json())

// listen to incoming requests on port 8000
app.listen(port, () => {
    console.log('Server started !')
})

/* Routes */

app.post('/login', loginController);
app.get('/connect', checkToken, isConnected);
app.get('/api/emails', checkToken, getEmail);
app.get('/api/user', checkToken, getUser);
app.delete('/api/email', checkToken, checkEmail, deleteEmail);
