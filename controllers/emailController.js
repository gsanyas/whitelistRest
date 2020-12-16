const {Quarantine} = require('../models/quarantine')
const { WhiteList } = require('../models/whitelist')
const {BlackList} = require('../models/blacklist')

exports.getEmail = async (req, res) => {
    const userId = req.user // obtained from cookies
    const quarantines = await Quarantine.findAll({
        where: { fk_user: userId,  to_eliminate: false, to_restore: false}
    })
    res.send(quarantines)
}

exports.deleteEmail = async (req, res) => {
    const email = req.email
    try {
        await Quarantine.update({to_eliminate: true},{
            where: {
                id: email.id
            }
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
            where: {
                id: email.id
            }
        })
        res.status(201).send("Set email to be restored")
    }
    catch(_err) {
        res.status(502).send("Error while modifying the email")
    }
}

exports.putInWhiteList = async(req,res) => {
    const email = req.email
    try {
        const senderInWhitelist = await WhiteList.findOne({
            where: {
                email: email.email_sender,
                fk_user: email.fk_user
            }
        })
        if (senderInWhitelist != null) res.status(304).send("Sender already in whitelist.")
        else {
            await WhiteList.create({
                email: email.email_sender,
                fk_user: email.fk_user
            })
            await Quarantine.update({to_restore: true},{
                where: {
                    fk_user: email.fk_user,
                    email_sender: email.email_sender,
                    to_eliminate: false,
                    was_restored: false
                }
            })
            // TODO : add http request to backend
            res.status(201).send("Added sender to whitelist.")
        }
    }
    catch(err) {
        console.log(JSON.stringify(err))
        res.status(502).send(err)
    }
}

exports.putInBlackList = async(req,res) => {
    const email = req.email
    try {
        const senderInBlacklist = await BlackList.findOne({
            where: {
                email: email.email_sender,
                fk_user: email.fk_user
            }
        })
        if (senderInBlacklist != null) res.status(304).send("Sender already in blacklist.")
        else {
            await BlackList.create({
                email: email.email_sender,
                fk_user: email.fk_user
            })
            await Quarantine.update({to_eliminate: true},{
                where: {
                    fk_user: email.fk_user,
                    email_sender: email.email_sender,
                    to_restore: false,
                    was_restored: false
                }
            })
            // TODO : add http request to backend
            res.status(201).send("Added sender to blacklist.")
        }
    }
    catch(err) {
        console.log(JSON.stringify(err))
        res.status(502).send(err)
    }
}
