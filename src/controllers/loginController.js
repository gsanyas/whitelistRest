const { User } = require('../models/user')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const cookieConfig = {
    httpOnly: false, // set true in final version, without the proxy
    //secure: true, // to force https (if you use it)
    maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: false //the token is already signed
}

/**
 * Prototype sent by the checkBody filter
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
 * Controller for Login Operations
 * See the OpenAPI documentation for more information
 */
exports.loginController = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
        res.status(404).send(this.loginBadUserError)
    } else {
        if (password === user['password']) {
            // TODO: check the password with the hash the password
            const privateKey = fs.readFileSync('./private.pem', 'utf8')
            const token = jwt.sign({ id: user['id'] }, privateKey, { algorithm: 'HS256' })
            res.cookie('authcookie', token, cookieConfig)
            res.status(200).json(this.loginSuccessMessage)
        } else {
            res.status(403).json(this.loginWrongPasswordError)
        }
    }
}
