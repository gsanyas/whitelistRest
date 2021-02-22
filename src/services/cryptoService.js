const crypto = require('crypto')
const fs = require('fs')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

/**
 * Promisification of the crypto.pbkdf2 function
 */
const apbkdf2 = promisify(crypto.pbkdf2)

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = length =>
    crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length) /** return required number of characters */

/**
 * encrypt password with the public key of the application backend
 * @function encryptPassword
 * @param {string} password - Password to encrypt
 */
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

/**
 * hash password with sha512.
 * @async
 * @function sha512
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = async (password, salt) =>
    (await apbkdf2(password, salt, 100000, 64, 'sha512')).toString('base64')

/**
 * generate salt and hash password with sha512
 * @param {string} password
 */
const hashWithNewSalt = async password => {
    const salt = genRandomString(64)
    const hashed = await sha512(password, salt)
    return { salt: salt, hash: hashed }
}

/**
 * Create a jwt token containing an id field
 * @param {string} value - The value of the id field in the token
 */
const signToken = value => {
    const privateKey = fs.readFileSync('./private.pem', 'utf8')
    const token = jwt.sign({ id: value }, privateKey, { algorithm: 'HS256' })
    return token
}

/**
 * Verify a jwt token synchronously
 * @param {string} token
 */
const checkToken = token => {
    const private = fs.readFileSync('./private.pem', 'utf8')
    return jwt.verify(token, private)
}

module.exports = {
    encryptPassword,
    sha512,
    hashWithNewSalt,
    genRandomString,
    signToken,
    checkToken
}
