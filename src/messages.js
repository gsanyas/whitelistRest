const _ = require('lodash')

exports.messages = {
    201: 'Object created',
    401: "Authentication failed. Please provide a valid cookie named 'authcookie' in your request.",
    403: 'Access forbidden. You account do not have acccess to this resource.',
    404: 'Resource not found.'
}

exports.messageObject = _.mapValues(this.messages, message => ({ message: message }))

exports.errors = {
    
}
