const model = require('../model-routes.json')
const { router: lrRouter } = require('./routes/lr')
const { emailRouter } = require('./routes/emails')
const listRouter = require('./routes/list')
const userRouter = require('./routes/user')
const verifyRouter = require('./routes/verify')

const express = require('express')
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

/**
 * GET /help
 * @summary Gives indications on the available endpoints
 * @return {object} 200 - endpoint model
 */
router.get('/help', (_req, res) => res.status(200).json(model))

exports.router = router
