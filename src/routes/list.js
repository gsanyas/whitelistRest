const express = require('express')
const router = express.Router()
const {
    addRegular,
    getRegular,
    deleteRegular,
    expressionBodyPrototype
} = require('../controllers/expressionController')
const { checkBody } = require('../filters/checkBody')

router.post(
    '/whitelist',
    checkBody('list/whitelist-body', expressionBodyPrototype),
    addRegular(true)
)
router.post(
    '/blacklist',
    checkBody('list/blacklist-body', expressionBodyPrototype),
    addRegular(false)
)
router.get('/whitelist', getRegular(true))
router.get('/blacklist', getRegular(false))
router.post('/delete', checkBody('list/delete-body', expressionBodyPrototype), deleteRegular)

module.exports = router
