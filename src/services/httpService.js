const axios = require('axios')

require('dotenv').config()

/**
 * Use Google recaptcha API to check the captcha
 * @param {string} captchaToken
 */
exports.verifyCaptcha = async captchaToken => {
    const secret_key = process.env.RECAPTCHA_TOKEN
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captchaToken}`
    try {
        const response = await axios.post(url)
        return response
    } catch (error) {
        return undefined
    }
}
