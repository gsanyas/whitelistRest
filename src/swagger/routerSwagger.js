const _ = require('lodash')
const { lrRouteSwagger } = require('./route/lrRouteSwagger')
const { emailsRouteSwagger } = require('./route/emailsRouteSwagger')

const lrSwagger = _.mapKeys(lrRouteSwagger, (_value, key) => '/lr' + key)
const mailSwagger = _.mapKeys(emailsRouteSwagger, (_value, key) => '/emails' + key)

exports.swagger = { ...lrSwagger, ...mailSwagger }
