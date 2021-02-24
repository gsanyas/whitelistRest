const { checkEmailService } = require('../services/quarantineService')
const express = require('express')

/**
 * Message returned in a 404 error.
 * It is exported because openAPI uses it.
 * @param {string} type - The error type
 */
exports.emailNotFoundErrorMessage = type => ({
    type: type,
    title: 'Email not found',
    status: 404,
    details: 'The email id provided is not in our database.'
})

/**
 * Curried function for an express filter
 * - Retrieves the email in parameter, only if the user owns the email
 * - Sends an error in case the email is not found
 *
 * The checkToken filter must have been used before
 * @param {string} typeError404 - The type of the error displayed in case of an error 404 (see error message template)
 */
exports.checkEmail = typeError404 =>
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    async (req, res, next) => {
        /** @type {number} */
        const emailId = req.params.id
        /** @type {import('../models/quarantine').QuarantineObject} */
        const user = req.user
        const email = await checkEmailService(user.id, emailId)
        if (!email) {
            res.status(404).json(this.emailNotFoundErrorMessage(typeError404))
        } else {
            req.email = email
            next()
        }
    }
