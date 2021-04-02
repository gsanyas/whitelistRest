const axios = require('axios')

require('dotenv').config()

/**
 * Sends a simple axios request, but returns undefined if it fails
 * @param {string} url - The URL to request.
 * @returns {*} the result of the request, and undefined if there is an error.
 */
const sendToURL = async url => {
    try {
        return await axios.post(url)
    } catch (error) {
        return undefined
    }
}

/**
 * Use Google recaptcha API to check the captcha
 * @param {string} captchaToken
 */
exports.verifyCaptcha = captchaToken => {
    const secret_key = process.env.RECAPTCHA_TOKEN
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captchaToken}`
    return sendToURL(url)
}

/**
 * Sends a signal to the backend to restore all emails marked as to_restore for the selected user
 * @param {number} user_id - The true id of the selected user.
 * @returns {*} 204 HTTP response if all went well, undefined otherwise.
 */
exports.sendRestoreSignal = user_id => {
    const url = `${process.env.BACKEND_URI}/user/${user_id}/email/restoration`
    console.log('Posting to URL: ' + url)
    return sendToURL(url)
}
