exports.quarantineFilter = quarantine => ({
    id: quarantine.id,
    email_sender: quarantine.email_sender,
    email_subject: quarantine.email_subject,
    email_size: quarantine.email_size,
    created_at: quarantine.created_at
})
