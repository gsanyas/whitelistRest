const { getUserSwagger, setParamSwagger } = require('../controller/userSwagger')

exports.userRouteSwagger = {
    '/': getUserSwagger,
    '/:userparam': setParamSwagger
}
