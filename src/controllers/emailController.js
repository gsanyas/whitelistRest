const {
    quarantineFilter,
    getAllEmailsService,
    deleteEmailService,
    restoreEmailService,
    handleSenderEmails
} = require('../services/quarantineService')
const { WhiteList, BlackList } = require('../models/list')
const { internalError } = require('../utils')

exports.getEmail = async (req, res) => {
    const user = req.user // obtained from cookies
    const quarantines = await getAllEmailsService(user.id)
    res.status(200).send(quarantines.map(quarantineFilter))
}

exports.deleteEmail = async (req, res) => {
    const email = req.email
    try {
        await deleteEmailService(email.id)
        res.status(200).json({ message: 'Email deleted.' })
    } catch (error) {
        res.status(500).json(internalError)
    }
}

exports.restoreEmail = async (req, res) => {
    const email = req.email
    try {
        const newmail = await restoreEmailService(email.id)
        res.status(200).send(newmail[1].map(quarantineFilter))
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
            const newquarantine = await handleSenderEmails(
                email.fk_user,
                email.email_sender,
                list === BlackList
            )
            res.status(200).send(newquarantine[1].map(quarantineFilter))
        } else {
            const result = await list.create({
                email: email.email_sender,
                fk_user: email.fk_user
            })
            await handleSenderEmails(email.fk_user, email.email_sender, list === BlackList)
            // TODO : add http request to backend
            res.status(201).send(result.email)
        }
    } catch (err) {
        console.log(JSON.stringify(err))
        res.status(500).json(internalError)
    }
}
