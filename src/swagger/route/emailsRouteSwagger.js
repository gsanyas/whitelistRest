const {
    getEmailSwagger,
    deleteEmailSwagger,
    restoreEmailSwagger,
    putInWhiteListSwagger,
    putInBlackListSwagger
} = require('../controller/emailSwagger')

exports.emailsRouteSwagger = {
    '/': getEmailSwagger,
    '/:id': deleteEmailSwagger,
    '/restore/:id': restoreEmailSwagger,
    '/whitelist/:id': putInWhiteListSwagger,
    '/blacklist/:id': putInBlackListSwagger
}
