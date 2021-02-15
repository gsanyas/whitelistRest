exports.validParams = ['email', 'password', 'email_password', 'full_name']

exports.checkUserParamError = {
    type: '/user/userparam-error',
    title: 'Incorrect parameter',
    status: 404,
    details:
        'The parameter to change does not exist. Here is a list of possible parameters: ' +
        this.validParams
}

exports.checkUserParam = async (req, res, next) => {
    const userParam = req.params.userparam
    if (this.validParams.includes(userParam)) {
        req.userparam = userParam
        next()
    } else {
        res.status(404).json(this.checkUserParamError)
    }
}
