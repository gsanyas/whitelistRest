const { emailNotFoundSwagger } = require('../filters/checkEmail')
const { checkTokenErrorSwagger } = require('../filters/checktoken')
const { QuarantineSwagger } = require('../models/quarantine')
const { messageComponent } = require('../utils')
const { listSwagger } = require('./model/list')

const idParameterList = [
    {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The id of the selected email.',
        schema: { type: 'integer' }
    }
]

exports.getEmailSwagger = {
    get: {
        tags: ['Email'],
        summary: 'Get all the users emails',
        security: [{ cookieAuth: [] }],
        responses: {
            200: {
                description: 'success',
                content: QuarantineSwagger
            },
            401: checkTokenErrorSwagger
        }
    }
}

exports.deleteEmailSwagger = {
    delete: {
        tags: ['Email'],
        summary: 'Delete the selected email.',
        security: [{ cookieAuth: [] }],
        parameters: idParameterList,
        responses: {
            200: {
                description: 'Email deleted',
                content: messageComponent('Email deleted.')
            },
            401: checkTokenErrorSwagger,
            404: emailNotFoundSwagger('/emails/delete-email-not-found')
        }
    }
}

exports.restoreEmailSwagger = {
    put: {
        tags: ['Email'],
        summary: 'Restore the selected email.',
        security: [{ cookieAuth: [] }],
        parameters: idParameterList,
        responses: {
            200: {
                description: 'Email restored',
                content: QuarantineSwagger
            },
            401: checkTokenErrorSwagger,
            404: emailNotFoundSwagger('/emails/restore-email-not-found')
        }
    }
}

exports.putInWhiteListSwagger = {
    put: {
        tags: ['Email'],
        summary: 'Put the sender of the selected email in whitelist.',
        security: [{ cookieAuth: [] }],
        parameters: idParameterList,
        responses: {
            200: {
                description:
                    'The sender was already in whitelist. The quarantine table has been updated, the new value is returned here.',
                content: QuarantineSwagger
            },
            201: {
                description:
                    'The sender was added to the whitelist. The quarantine table has been updated.',
                content: listSwagger
            },
            401: checkTokenErrorSwagger,
            404: emailNotFoundSwagger('/emails/whitelist-email-not-found')
        }
    }
}

exports.putInBlackListSwagger = {
    put: {
        tags: ['Email'],
        summary: 'Put the sender of the selected email in blacklist.',
        security: [{ cookieAuth: [] }],
        parameters: idParameterList,
        responses: {
            200: {
                description:
                    'The sender was already in blacklist. The quarantine table has been updated, the new value is returned here.',
                content: QuarantineSwagger
            },
            201: {
                description:
                    'The sender was added to the blacklist. The quarantine table has been updated.',
                content: listSwagger
            },
            401: checkTokenErrorSwagger,
            404: emailNotFoundSwagger('/emails/blacklist-email-not-found')
        }
    }
}
