const express = require('express')
const router = express.Router()
const { getEmail, deleteEmail, restoreEmail, putInList } = require('../controllers/emailController')
const { checkEmail } = require('../filters/checkEmail')

router.get('/', getEmail)
router.delete('/:id', checkEmail('emails/delete-error'), deleteEmail)
router.put('/restore/:id', checkEmail('emails/restore-error'), restoreEmail)
router.put('/whitelist/:id', checkEmail('emails/whitelist-error'), putInList(true))
router.put('/blacklist/:id', checkEmail('emails/blacklist-error'), putInList(false))

exports.emailRouter = router
