require('dotenv').config()
const crypto = require('crypto')
const fs = require('fs')
const { User } = require('../models/user')

const encryptPassword = password => {
    // encryption logic
    const publicKey = process.env.PUBLIC_KEY_PATH
    return crypto.publicEncrypt(
        {
            key: fs.readFileSync(publicKey, 'utf8'),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(password)
    )
}

// TODO : hash the password
exports.createUser = (email, password, fullName, emailPassword) =>
    User.build({
        email: email,
        full_name: fullName,
        password: password,
        email_password: encryptPassword(emailPassword).toString('base64')
    })

exports.findUser = userId =>
    User.findOne({
        where: { id: userId }
    })

exports.changeParam = (id, param, value) => {
    switch (param) {
        case 'password':
            return this.changePassword(id, value)

        case 'email_password':
            return this.changeEmailPassword(id, value)

        default:
            var updateParam = {}
            updateParam[param] = value
            return User.update(updateParam, {
                where: {
                    id: id
                }
            })
    }
}

// TODO : hash the password
exports.changePassword = (id, value) =>
    User.update(
        { password: value },
        {
            where: {
                id: id
            }
        }
    )

exports.changeEmailPassword = (id, value) =>
    User.update(
        { email_password: encryptPassword(value).toString('base64') },
        {
            where: {
                id: id
            }
        }
    )
