const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { checkToken } = require('./utils/checktoken');
const { loginController } = require('./controllers/loginController');
const { emailController } = require('./controllers/emailController');
const { userController } = require('./controllers/userController');

// Config
const port = 8000;
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
app.get('/api/emails', checkToken, emailController);
app.get('/api/user', checkToken, userController);
