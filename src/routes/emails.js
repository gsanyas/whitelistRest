const express = require('express')
const router = express.Router()
const { getEmail, deleteEmail, restoreEmail, putInList } = require('../controllers/emailController')
const { checkEmail } = require('../filters/checkEmail')
const { BlackList } = require('../models/blacklist')
const { WhiteList } = require('../models/whitelist')

router.get('/', getEmail)
router.delete('/:id', checkEmail, deleteEmail)
router.put('/restore/:id', checkEmail, restoreEmail)
router.put('/whitelist/:id', checkEmail, putInList(WhiteList))
router.put('/blacklist/:id', checkEmail, putInList(BlackList))

exports.emailRouter = router
