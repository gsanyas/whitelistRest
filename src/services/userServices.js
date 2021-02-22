require('dotenv').config()
const { encryptPassword, sha512, hashWithNewSalt } = require('./cryptoService')
const { User } = require('../models/user')

exports.createUser = async (email, password, fullName, emailPassword) => {
    try {
        const { salt, hash } = await hashWithNewSalt(password)
        return await User.create({
            email: email,
            full_name: fullName,
            password: hash,
            salt: salt,
            email_password: encryptPassword(emailPassword).toString('base64')
        })
    } catch (error) {
        return undefined
    }
}

exports.findUserByEmail = email => User.findOne({ where: { email: email } })

exports.findUser = userId => User.findOne({ where: { id: userId } })

exports.changeParam = (id, param, value) => {
    switch (param) {
        case 'password':
            return this.changePassword(id, value)

        case 'email_password':
            return this.changeEmailPassword(id, value)

        default:
            var updateParam = {}
            updateParam[param] = value
            return User.update(updateParam, { where: { id: id } })
    }
}

exports.changePassword = async (id, value) => {
    const { salt, hash } = await hashWithNewSalt(value)
    return User.update({ password: hash, salt: salt }, { where: { id: id } })
}

exports.changeEmailPassword = (id, value) =>
    User.update(
        { email_password: encryptPassword(value).toString('base64') },
        { where: { id: id } }
    )

exports.filterUser = user => ({ full_name: user.full_name, email: user.email })

/**
 * check if the provided password is the one hashed in the database
 * @param {User} user
 * @param {string} password
 */
exports.checkUserPassword = async (user, password) =>
    user.password === (await sha512(password, user.salt))
