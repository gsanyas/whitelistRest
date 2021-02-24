require('dotenv').config()
const {
    encryptPassword,
    sha512,
    hashWithNewSalt,
    genRandomString,
    signToken
} = require('./cryptoService')
const { User } = require('../models/user')

/**
 * Find a token identifier that is not already used in the User table
 * It should statistically never loop
 */
const findNonExistingTokenIdentifier = async () => {
    let value // token value
    do {
        value = genRandomString(16)
    } while (await User.findOne({ where: { token: value } }))
    return value
}

exports.createUser = async (email, password, fullName, emailPassword) => {
    try {
        const { salt, hash } = await hashWithNewSalt(password)
        const tokenId = await findNonExistingTokenIdentifier()
        return await User.create({
            token: tokenId,
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

/**
 * Create a new identifier, store it in the user table, and create a signed token containing this value
 * @param {User} user
 */
exports.login = async user => {
    const value = await findNonExistingTokenIdentifier()
    await User.update({ token: value }, { where: { id: user.id } })
    return signToken(value)
}

exports.findByToken = token => User.findOne({ where: { token: token } })
