const { Quarantine } = require('../models/quarantine')
const { quarantineFilter } = require('../services/quarantineService')
const { WhiteList } = require('../models/whitelist')
const { BlackList } = require('../models/blacklist')
const { internalError } = require('../utils')
const { listFilter } = require('../services/listServices')

exports.getEmail = async (req, res) => {
    const user = req.user // obtained from cookies
    const quarantines = await Quarantine.findAll({
        where: { fk_user: user.id, to_eliminate: false, to_restore: false, was_restored: false }
    })
    res.status(200).send(quarantines.map(quarantineFilter))
}

exports.deleteEmail = async (req, res) => {
    const email = req.email
    const user = req.user
    try {
        await Quarantine.update(
            { to_eliminate: true },
            { where: { id: email.id, fk_user: user.id } }
        )
        res.status(200).json({ message: 'Email deleted.' })
    } catch (error) {
        res.status(500).json(internalError)
    }
}

exports.restoreEmail = async (req, res) => {
    console.log('restore ici')
    const email = req.email
    try {
        const newmail = await Quarantine.update({ to_restore: true }, { where: { id: email.id } })
        res.status(200).send(quarantineFilter(newmail))
    } catch (_err) {
        res.status(500).json(internalError)
    }
}

/**
 * Send the sender of the selected email to the corresponding list
 * If the sender is already in the list, restore or delete all his mails depending of the list
 * @param {WhiteList or BlackList} list
 */
exports.putInList = list => async (req, res) => {
    const email = req.email
    try {
        const senderInlist = await list.findOne({
            where: { email: email.email_sender, fk_user: email.fk_user }
        })
        if (senderInlist != null) {
            // If the sender is already in list the quarantine table must have a problem
            // We know there is at least one item to change here thanks to the previous checkemail filter
            const newquarantine = await Quarantine.update(
                { to_restore: list === WhiteList, to_eliminate: list === BlackList },
                {
                    where: {
                        fk_user: email.fk_user,
                        email_sender: email.email_sender,
                        to_restore: false,
                        to_eliminate: false,
                        was_restored: false
                    }
                }
            )
            res.status(200).send(quarantineFilter(newquarantine))
        } else {
            const result = await list.create({
                email: email.email_sender,
                fk_user: email.fk_user
            })
            await Quarantine.update(
                { to_restore: list === WhiteList, to_eliminate: list === BlackList },
                {
                    where: {
                        fk_user: email.fk_user,
                        email_sender: email.email_sender,
                        to_eliminate: false,
                        was_restored: false
                    }
                }
            )
            // TODO : add http request to backend
            res.status(201).send(listFilter(result))
        }
    } catch (err) {
        console.log(JSON.stringify(err))
        res.status(500).json(internalError)
    }
}
