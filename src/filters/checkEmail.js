const { Quarantine } = require('../models/quarantine')
const { swaggerErrorContent } = require('../utils')

exports.emailNotFoundErrorMessage = type => ({
    type: type,
    title: 'Email not found',
    status: 404,
    details: 'The email id provided is not in our database.'
})

exports.checkEmail = typeError404 => async (req, res, next) => {
    const emailId = req.params.id
    const userId = req.user
    const email = await Quarantine.findOne({
        where: { fk_user: userId, id: emailId }
    })
    if (
        !email ||
        email.to_eliminate ||
        email.to_restore ||
        email.was_eliminated ||
        email.was_restored
    ) {
        res.status(404).json(this.emailNotFoundErrorMessage(typeError404))
    } else {
        req.email = email
        next()
    }
}

exports.emailNotFoundSwagger = type => ({
    description: 'The requested email was not found.',
    content: swaggerErrorContent(this.emailNotFoundErrorMessage(type))
})
