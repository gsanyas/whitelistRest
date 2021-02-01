const express = require('express')
const router = express.Router()

const { loginController, isConnected, loginSwagger } = require('../controllers/loginController')
const { register } = require('../controllers/registerController')

router.post('/login', loginController)
router.post('/register', register)
router.get('/auth/connect', async (_req, res) => {
    res.status(200).send({ connected: true })
})

exports.router = router
exports.swagger = { '/login': loginSwagger }
