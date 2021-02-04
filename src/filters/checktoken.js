const fs = require('fs')
const jwt = require('jsonwebtoken')
const { swaggerErrorContent: swaggerError } = require('../utils')

const checkTokenError = {
    type: '/auth',
    title: 'Incorrect cookie token',
    status: 401,
    details: 'Unable to decipher the token in the cookies.'
}

exports.checkToken = (req, res, next) => {
    const private = fs.readFileSync('./private.pem', 'utf8')
    const authcookie = req.cookies.authcookie
    jwt.verify(authcookie, private, (err, data) => {
        if (err) {
            res.status(401).json(checkTokenError)
        } else if (data.id) {
            req.user = data.id
            next()
        }
    })
}

exports.checkTokenErrorSwagger = {
    description: 'Authentication information is missing or invalid',
    content: swaggerError(checkTokenError)
}
