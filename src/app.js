const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const { router, swagger } = require('./routes')
require('dotenv').config()
const { checkToken } = require('./filters/checktoken')
const options = require('./swagger')

// Express routing
const app = express()

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URI }))
app.use(cookieParser())
app.use(express.json())

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(options))

app.get('/testme', (req, res) => res.send(JSON.stringify(swagger)))

// Authentication middleware
app.use('/auth', checkToken)

app.use('/', router)

module.exports = app
