const { checkTokenErrorSwagger } = require("../filter/checkTokenSwagger");
const { HistorySwagger } = require("../model/historySwagger");

exports.getHistorySwagger = {
    get: {
        tags: ['History', 'Email'],
        summary: 'Get the entire history of the user',
        security: [{ cookieAuth: [] }],
        responses: {
            200: {
                description: 'success',
                content: HistorySwagger
            },
            401: checkTokenErrorSwagger
        }
    }
}