const _ = require('lodash')
const { lrRouteSwagger } = require('./route/lrRouteSwagger')
const { emailsRouteSwagger } = require('./route/emailsRouteSwagger')
const { userRouteSwagger } = require('./route/userRouteSwagger')
const { getHistorySwagger } = require('./controller/historySwagger')
const { listRouteSwagger } = require('./route/listRouteSwagger')

const lrSwagger = _.mapKeys(lrRouteSwagger, (_value, key) => '/lr' + key)
const mailSwagger = _.mapKeys(emailsRouteSwagger, (_value, key) => '/auth/emails' + key)
const userSwagger = _.mapKeys(userRouteSwagger, (_value, key) => '/auth/user' + key)
const listSwagger = _.mapKeys(listRouteSwagger, (_value, key) => '/auth/list' + key)

const historySwagger = { '/auth/history': getHistorySwagger }

exports.swagger = {
    ...lrSwagger,
    ...mailSwagger,
    ...userSwagger,
    ...listSwagger,
    ...historySwagger
}
