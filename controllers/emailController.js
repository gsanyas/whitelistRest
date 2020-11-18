const {Quarantine} = require('../Model')

exports.emailController = async (req, res) => {
    const userId = req.user // recovered from cookies
    console.log(userId)
    const quarantines = await Quarantine.findAll({
        where: { id: userId }
    })
    res.send(quarantines)
}
