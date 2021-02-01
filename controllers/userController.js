const { changeParam, findUser, changePassword } = require('../services/userServices')

exports.getUser = async (req, res) => {
    const user = await findUser(req.user)
    const sendUser = {
        full_name: user.full_name,
        email: user.email
    }
    res.status(200).send(sendUser)
}

exports.setParam = async (req, res) => {
    const param = req.userparam
    const value = req.body[param]
    if (value === null) res.sendStatus(404)
    try {
        const result = await changeParam(req.user, param, value)
        res.status(200).send(result)
    } catch (error) {
        console.log(JSON.stringify(error))
        res.sendStatus(500)
    }
}
