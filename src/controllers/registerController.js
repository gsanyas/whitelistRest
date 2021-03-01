require('dotenv').config()
const { createUser, findUserByEmail, filterUser } = require('../services/userServices')
const { internalError } = require('../utils')

exports.registerBodyPrototype = {
    email: { type: 'string', required: true, description: 'The email address of the user.' },
    password: {
        type: 'string',
        required: true,
        description:
            'The password the user will use on this website. It will be hashed on our servers.'
    },
    full_name: { type: 'string', required: true, description: 'The user name.' },
    email_password: {
        type: 'string',
        required: true,
        description:
            'The password the user uses to connect to his email server. It will be encrypted in our servers.'
    }
}

exports.registerEmailError = {
    type: '/register-email',
    title: 'Address already exist',
    status: 400,
    details:
        'The email address already exist in our database. Please provide a different email address.'
}

// TODO (possible): check the connection with the IMAP server (before the register in another endpoint)
exports.register = async (req, res) => {
    try {
        const user = await createUser(
            req.body.email,
            req.body.password,
            req.body.full_name,
            req.body.email_password
        )
        if (user) {
            res.status(201).json(filterUser(user))
        } else if (await findUserByEmail(req.body.email)) {
            res.status(400).json(this.registerEmailError)
        } else {
            res.status(500).json(internalError)
        }
    } catch (error) {
        res.status(500).json(internalError)
    }
}
