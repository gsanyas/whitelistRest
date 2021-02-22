const fs = require('fs')
const jwt = require('jsonwebtoken')
const { checkToken } = require('../services/cryptoService')
const { findByToken } = require('../services/userServices')

exports.checkTokenError = {
    type: '/auth',
    title: 'Incorrect cookie token',
    status: 401,
    details: 'Unable to decipher the token in the cookies.'
}

exports.checkToken = (req, res, next) => {
    const authcookie = req.cookies.authcookie
    try {
        const data = checkToken(authcookie)
        if (data.id) {
            req.user = await findByToken(data.id)
            if (req.user) {
                next()
            } else {
                res.status(401).json(this.checkTokenError)
            }
        } else {
            res.status(401).json(this.checkTokenError)
        }
    } catch (err) {
        res.status(401).json(this.checkTokenError)
    }
}
