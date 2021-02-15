const { router: lrRouter } = require('./routes/lr')
const { emailRouter } = require('./routes/emails')
const listRouter = require('./routes/list')
const userRouter = require('./routes/user')
const verifyRouter = require('./routes/verify')

const express = require('express')
const { getHistory } = require('./controllers/historyController')
const router = express.Router()

// Login - Register routes
router.use('/lr', lrRouter)

// Resource routes
router.use('/auth/emails', emailRouter)
router.use('/auth/list', listRouter)
router.use('/auth/user', userRouter)

// Captcha verification route
router.use('/verify', verifyRouter)

// Other routes
router.get('/auth/history', getHistory)

exports.router = router
