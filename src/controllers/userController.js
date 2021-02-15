const { changeParam, findUser, filterUser } = require('../services/userServices')
const { internalError } = require('../utils')

exports.getUser = async (req, res) => {
    const user = await findUser(req.user)
    res.status(200).json(filterUser(user))
}

exports.wrongParamValueBodyPrototype = param => {
    const result = {}
    result[param] = {
        type: 'string',
        required: true,
        description: 'The new value for the parameter'
    }
    return result
}

exports.wrongParamValueError = param => ({
    type: '/user/' + param + '/value-error',
    title: 'Invalid param value',
    status: 404,
    details:
        'The new value for the parameter ' +
        param +
        ' was not provided in the body. Body example: ' +
        this.wrongParamValueBodyPrototype(param)
})

exports.setParam = async (req, res) => {
    const param = req.userparam
    const value = req.body[param]
    if (value === null) res.status(404).json(this.wrongParamValueError)
    try {
        const result = await changeParam(req.user, param, value)
        res.status(200).send(result)
    } catch (error) {
        console.log(JSON.stringify(error))
        res.status(500).json(internalError)
    }
}
