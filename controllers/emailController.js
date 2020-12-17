const {Quarantine} = require('../models/quarantine')
const { WhiteList } = require('../models/whitelist')
const {BlackList} = require('../models/blacklist')

exports.getEmail = async (req, res) => {
    const userId = req.user // obtained from cookies
    const quarantines = await Quarantine.findAll({
        where: { fk_user: userId,  to_eliminate: false, to_restore: false}
    })
    res.status(200).send(quarantines)
}

exports.deleteEmail = async (req, res) => {
    const email = req.email
    try {
        await Quarantine.update({to_eliminate: true},{
            where: {
                id: email.id
            }
        })
        res.sendStatus(204)
    }
    catch(_err) {
        res.sendStatus(502)
    }
}

exports.restoreEmail = async (req,res) => {
    const email = req.email
    try {
        const newmail = await Quarantine.update({to_restore: true},{
            where: {
                id: email.id
            }
        })
        res.status(200).send(newmail)
    }
    catch(_err) {
        res.sendStatus(502)
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
        if (senderInWhitelist != null) {
            // If the sender is already in whitelist the quarantine table must have a problem
            const inQuarantine = Quarantine.findOne({
                where: {
                    email: email.email_sender,
                    fk_user: email.fk_user,
                    to_restore: false
                }
            })
            if (inQuarantine === null) res.sendStatus(304)
            const newquarantine = await Quarantine.update({to_restore: true},{
                where: {
                    fk_user: email.fk_user,
                    email_sender: email.email_sender,
                    to_restore: false,
                    to_eliminate: false,
                    was_restored: false
                }
            })
            res.status(200).send(newquarantine)
        }
        else {
            const result = await WhiteList.create({
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
            res.status(201).send(result)
        }
    }
    catch(err) {
        console.log(JSON.stringify(err))
        res.sendStatus(502)
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
        if (senderInBlacklist != null) {
            // If the sender is already in whitelist the quarantine table must have a problem
            const inQuarantine = Quarantine.findOne({
                where: {
                    email: email.email_sender,
                    fk_user: email.fk_user,
                    to_eliminate: false
                }
            })
            if (inQuarantine === null) res.sendStatus(304)
            const newquarantine = await Quarantine.update({to_eliminate: true},{
                where: {
                    fk_user: email.fk_user,
                    email_sender: email.email_sender,
                    to_restore: false,
                    to_eliminate: false,
                    was_restored: false
                }
            })
            res.status(200).send(newquarantine)
        }
        else {
            const result = await BlackList.create({
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
            res.status(201).send(result)
        }
    }
    catch(err) {
        console.log(JSON.stringify(err))
        res.sendStatus(502)
    }
}
