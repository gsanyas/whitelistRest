const {
    addExpressionSwagger,
    deleteExpressionSwagger,
    getExpressionSwagger
} = require('../controller/expressionSwagger')

exports.listRouteSwagger = {
    '/whitelist': { ...addExpressionSwagger(true), ...getExpressionSwagger(true) },
    '/blacklist': { ...addExpressionSwagger(false), ...getExpressionSwagger(false) },
    '/delete': deleteExpressionSwagger
}
