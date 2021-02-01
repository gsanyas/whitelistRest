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

const { addRegular, getRegular } = require('./controllers/expressionController')
const { WhiteList } = require('./models/whitelist')
const { WhiteListRegularExpression } = require('./models/whitelistRegularExpression')
const { BlackListRegularExpression } = require('./models/blacklistRegularExpression')
const { BlackList } = require('./models/blacklist')

const express = require('express'),
    router = express.Router()

router.get('/help', (_req, res) => res.status(200).json(model))
router.post('/login', loginController)
router.get('/api/connect', checkToken, isConnected)
router.get('/api/emails', checkToken, getEmail)
router.get('/api/user', checkToken, getUser)
router.delete('/api/emails/:id', checkToken, checkEmail, deleteEmail)
router.put('/api/emails/restore/:id', checkToken, checkEmail, restoreEmail)
router.put('/api/whitelist/:id', checkToken, checkEmail, putInWhiteList)
router.put('/api/blacklist/:id', checkToken, checkEmail, putInBlackList)
router.put('/api/verify/:id', verifyEmail)
router.post('/register', register)
router.post('/api/whitelist', checkToken, addRegular(WhiteList, WhiteListRegularExpression))
router.post('/api/blacklist', checkToken, addRegular(BlackList, BlackListRegularExpression))
router.get('/api/whitelist', checkToken, getRegular(WhiteList, WhiteListRegularExpression))
router.get('/api/blacklist', checkToken, getRegular(BlackList, BlackListRegularExpression))
router.put('/api/user/:userparam', checkToken, checkUserParam, setParam)

module.exports = router
