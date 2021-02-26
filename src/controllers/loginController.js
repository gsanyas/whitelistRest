const fs = require('fs')
const { internalError } = require('../utils')
const { checkUserPassword, findUserByEmail, login } = require('../services/userServices')

const cookieConfig = {
    httpOnly: false, // set true in final version, without the proxy
    //secure: true, // to force https (if you use it)
    maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: false //the token is already signed
}

/**
 * Prototype sent to the checkBody filter
 * It is also used by the OpenAPI docs
 */
exports.loginBodyPrototype = {
    email: {
        type: 'string',
        required: true,
        description: 'The email of the user who tries to log in.'
    },
    password: {
        type: 'string',
        required: true,
        description: 'The password of the user who tries to log in.'
    }
}

exports.loginBadUserError = {
    type: '/login-user',
    title: 'Invalid user',
    status: 404,
    details: 'The email address given do not exist.'
}

exports.loginWrongPasswordError = {
    type: '/login-password',
    title: 'Invalid password',
    status: 403,
    details: 'The password given does not correspond to this email.'
}

exports.loginSuccessMessage = { setCookie: true }

/**
 * POST /login
 * See the OpenAPI documentation for more information
 */
exports.loginController = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await findUserByEmail(email)
        if (!user) {
            res.status(404).send(this.loginBadUserError)
        } else {
            const passwordCorrect = await checkUserPassword(user, password)
            if (passwordCorrect) {
                const token = await login(user)
                res.cookie('authcookie', token, cookieConfig)
                res.status(200).json(this.loginSuccessMessage)
            } else {
                res.status(403).json(this.loginWrongPasswordError)
            }
        }
    } catch (err) {
        res.status(500).json(internalError)
    }
}
