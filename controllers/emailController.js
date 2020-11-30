const {Quarantine} = require('../models/quarantine')

exports.checkEmail = async (req,res,next) => {
    const emailId = req.body.email
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

exports.getEmail = async (req, res) => {
    const userId = req.user // recovered from cookies
    console.log(userId)
    const quarantines = await Quarantine.findAll({
        where: { fk_user: userId,  to_eliminate: false}
    })
    res.send(quarantines)
}

exports.deleteEmail = async (req, res) => {
    const email = req.email
    try {
        await Quarantine.update({to_eliminate: true},{
            where: email
        })
        res.status(204).send("Email deleted")
    }
    catch(_err) {
        res.status(502).send("Error while deleting the email.")
    }
}

exports.restoreEmail = async (req,res) => {
    const email = req.email
    try {
        await Quarantine.update({to_restore: true},{
            where: email
        })
        res.status(201).send("Set email to be restored")
    }
    catch(_err) {
        res.status(502).send("Error while modifying the email")
    }
}
