const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes')
require('dotenv').config()
const { checkToken } = require('./filters/checktoken')

// Express routing
const app = express()

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URI }))
app.use(cookieParser())
app.use(express.json())

// Authentication middleware
app.use('/auth', checkToken)

app.use('/', router)

module.exports = app
