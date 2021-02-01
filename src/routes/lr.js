const express = require('express')
const router = express.Router()

const { loginController, isConnected } = require('../controllers/loginController')
const { register } = require('../controllers/registerController')

router.post('/login', loginController)
router.post('/register', register)
router.get('/auth/connect', isConnected)

module.exports = router
