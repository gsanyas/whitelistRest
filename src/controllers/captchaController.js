require('dotenv').config()
const { Quarantine } = require('../models/quarantine')
const { WhiteList } = require('../models/list')
const axios = require('axios')
const { internalError } = require('../utils')
const { restoreEmailForCaptchaService } = require('../services/quarantineService')

exports.verifyEmail = async (req, res) => {
    const emailId = req.params.id
    const data = req.body
    console.log(emailId)
    console.log(data)

    const secret_key = process.env.RECAPTCHA_TOKEN
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${data.captchaToken}`
    // TODO: REFACTOR THIS CODE.
    let response
    try {
        response = await axios.post(url)
    } catch (error) {
        res.status(500).send('Email does not exist')
    }
    if (response.data.success) {
        /** @type import('../models/quarantine').QuarantineObject */
        let email
        try {
            email = await restoreEmailForCaptchaService(emailId, data.email)
            console.log(email)
        }
        catch (error) {
            res.status(500).json(internalError)
        }
        WhiteList.build({ email: email.email_sender, fk_user: email.fk_user })
            .save()
            .then(user => {
                console.log(user)
                email.save().then(m => {
                    console.log(m)
                    if (m) {
                        res.status(204).send('')
                    } else {
                        res.status(404).send('Email does not exist')
                    }
                })
            })
    } else {
        res.status(404).send('Incorrect captcha')
    }
}
