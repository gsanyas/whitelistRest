const express = require('express')
const router = express.Router()
const {
    getEmail,
    deleteEmail,
    restoreEmail,
    putInWhiteList,
    putInBlackList
} = require('../controllers/emailController')
const { checkEmail } = require('../filters/checkEmail')

router.get('/', getEmail)
router.delete('/:id', checkEmail, deleteEmail)
router.put('/restore/:id', checkEmail, restoreEmail)
router.put('/whitelist/:id', checkEmail, putInWhiteList)
router.put('/blacklist/:id', checkEmail, putInBlackList)

module.exports = router
