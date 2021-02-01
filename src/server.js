const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { checkToken } = require('./filters/checktoken')
const { checkEmail } = require('./filters/checkEmail')
const { checkUserParam } = require('./filters/checkUserParam')
const { loginController, isConnected } = require('./controllers/loginController')
const { register } = require('./controllers/registerController')
const {
    getEmail,
    deleteEmail,
    restoreEmail,
    putInWhiteList,
    putInBlackList
} = require('./controllers/emailController')
const { getUser, setParam } = require('./controllers/userController')
const { verifyEmail } = require('./controllers/captchaController')
const model = require('../model-routes.json')

const config = require('../config.json')
const { addRegular, getRegular } = require('./controllers/expressionController')
const { WhiteList } = require('./models/whitelist')
const { WhiteListRegularExpression } = require('./models/whitelistRegularExpression')
const { BlackListRegularExpression } = require('./models/blacklistRegularExpression')
const { BlackList } = require('./models/blacklist')

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

app.get('/help', (_req, res) => res.status(200).json(model))
app.post('/login', loginController)
app.get('/api/connect', checkToken, isConnected)
app.get('/api/emails', checkToken, getEmail)
app.get('/api/user', checkToken, getUser)
app.delete('/api/emails/:id', checkToken, checkEmail, deleteEmail)
app.put('/api/emails/restore/:id', checkToken, checkEmail, restoreEmail)
app.put('/api/whitelist/:id', checkToken, checkEmail, putInWhiteList)
app.put('/api/blacklist/:id', checkToken, checkEmail, putInBlackList)
app.put('/api/verify/:id', verifyEmail)
app.post('/register', register)
app.post('/api/whitelist', checkToken, addRegular(WhiteList, WhiteListRegularExpression))
app.post('/api/blacklist', checkToken, addRegular(BlackList, BlackListRegularExpression))
app.get('/api/whitelist', checkToken, getRegular(WhiteList, WhiteListRegularExpression))
app.get('/api/blacklist', checkToken, getRegular(BlackList, BlackListRegularExpression))
app.put('/api/user/:userparam', checkToken, checkUserParam, setParam)
