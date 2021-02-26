const { Quarantine, QuarantineObject } = require('../models/quarantine')

/**
 * Filter a quarantine object to only keep the attributes safe to send to the client
 * @param {QuarantineObject} quarantine
 */
const quarantineFilter = quarantine => ({
    id: quarantine.client_id,
    email_sender: quarantine.email_sender,
    email_subject: quarantine.email_subject,
    email_size: quarantine.email_size,
    created_at: quarantine.created_at
})

/**
 * Find the email among the user emails
 * @param {number} user_id
 * @param {string} client_id
 * @returns {Promise<QuarantineObject>}
 */
const checkEmailService = (user_id, client_id) =>
    Quarantine.findOne({
        where: {
            fk_user: user_id,
            client_id: client_id,
            to_eliminate: false,
            to_restore: false,
            was_eliminated: false,
            was_restored: false
        }
    })

/**
 * Return all emails corresponding to this user
 * @param {number} user_id
 * @returns {Promise<QuarantineObject[]>}
 */
const getAllEmailsService = user_id =>
    Quarantine.findAll({
        where: { fk_user: user_id, to_eliminate: false, to_restore: false, was_restored: false }
    })

/**
 * Delete the specified email
 * @param {number} id - The email id
 * @returns {Promise<[number, QuarantineObject[]]>}
 */
const deleteEmailService = id => Quarantine.update({ to_eliminate: true }, { where: { id: id } })

/**
 * Restore the email for which the sender has solved a captcha
 * @param {string} id - the email id (given to the sender)
 * @param {string} sender - the email address of the sender
 */
const restoreEmailForCaptchaService = async (id, sender) => {
    /** @type QuarantineObject */
    const email = await Quarantine.findOne({
        where: { id: id, email_sender: sender }
    })
    if (!email) return undefined
    return (await restoreEmailService(email.id))[1].pop()
}

/**
 * Restore the specified email
 * @param {number} id - The email id
 * @returns {Promise<[number, QuarantineObject[]]>}
 */
const restoreEmailService = id => Quarantine.update({ to_restore: true }, { where: { id: id } })

/**
 * Eliminate or restore emails addressed to the user from the specified address
 * @param {number} user_id - The id of the user
 * @param {number} sender - The email address
 * @param {boolean} mustDelete - if true, then the emails will be deleted, else they will be restored
 * @returns {Promise<[number, QuarantineObject[]]>}
 */
const handleSenderEmails = (user_id, sender, mustDelete) =>
    Quarantine.update(
        { to_restore: mustDelete, to_eliminate: !mustDelete },
        {
            where: {
                fk_user: user_id,
                email_sender: sender,
                to_restore: false,
                to_eliminate: false,
                was_restored: false
            }
        }
    )

module.exports = {
    checkEmailService,
    deleteEmailService,
    getAllEmailsService,
    handleSenderEmails,
    quarantineFilter,
    restoreEmailForCaptchaService,
    restoreEmailService
}
