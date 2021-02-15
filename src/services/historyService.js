const { History } = require('../models/history')

exports.filterHistory = history => ({
    email_sender: history.email_sender,
    email_subject: history.email_subject,
    reason: history.reason,
    created_at: history.created_at
})

exports.getHistory = user_id => History.findAll({ where: { fk_user: user_id } })
