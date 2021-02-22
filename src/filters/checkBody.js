const { isObjectCorrect } = require('../utils')

exports.badBodyError = (type, prototype) => ({
    type: type,
    title: 'Bad body',
    status: 404,
    details: 'Required body format is invalid. Expected body: ' + JSON.stringify(prototype)
})

exports.checkBody = (errorType, prototype) => (req, res, next) => {
    if (isObjectCorrect(req.body, prototype)) {
        next()
    } else {
        res.status(404).json(this.badBodyError(errorType, prototype))
    }
}
