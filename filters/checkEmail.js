const {Quarantine} = require('../models/quarantine')

exports.checkEmail = async (req,res,next) => {
    const emailId = req.params.id
    const userId = req.user
    const email = await Quarantine.findOne({
        where: { fk_user: userId, id: emailId}
    })
    if (email === null) {
        res.status(404).send("Email not found")
    }
    else {
        req.email = email
        next()
    }
}