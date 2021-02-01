const express = require('express')
const router = express.Router()
const { verifyEmail } = require('./controllers/captchaController')

router.put('/:id', verifyEmail)

module.exports = router
