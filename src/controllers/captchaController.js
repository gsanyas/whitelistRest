const { internalError } = require('../utils')
const { restoreEmailForCaptchaService } = require('../services/quarantineService')
const { createListElementService } = require('../services/listServices')
const express = require('express')
const { verifyCaptcha } = require('../services/httpService')

/**
 * Controller checking a captcha
 * - the request should go through checkBody first
 * @param {express.Request} req
 * @param {express.Response} res
 * @typedef verifyEmailData
 * @property {string} email
 * @property {string} captchaToken
 */
exports.verifyEmail = async (req, res) => {
    const emailId = req.params.id
    /** @type {verifyEmailData} */
    const data = req.body
    try {
        const response = await verifyCaptcha(data.captchaToken)
        if (response.data.success) {
            const email = await restoreEmailForCaptchaService(emailId, data.email)
            if (!email) res.status(404).json({ message: 'Email does not exist' })
            res.status(500).json(internalError)
            await createListElementService(true, email.email_sender, email.fk_user)
            res.status(204).send('')
        } else {
            res.status(404).send('Incorrect captcha')
        }
    } catch (error) {
        res.status(500).json(internalError)
    }
}
