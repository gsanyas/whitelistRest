const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// Express routing
const app = express()

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URI }))
app.use(cookieParser())
app.use(express.json())

require('./routes')(app)

exports.app = app
