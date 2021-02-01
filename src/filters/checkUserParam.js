const validParams = ['email', 'password', 'email_password', 'full_name']

exports.checkUserParam = async (req, res, next) => {
    const userParam = req.params.userparam
    if (validParams.includes(userParam)) {
        req.userparam = userParam
        next()
    } else {
        res.sendStatus(404)
    }
}
