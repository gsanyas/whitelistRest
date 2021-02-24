const express = require('express')
const router = express.Router()
const { addRegular, getRegular } = require('../controllers/expressionController')

router.post('/whitelist', addRegular(true))
router.post('/blacklist', addRegular(false))
router.get('/whitelist', getRegular(true))
router.get('/blacklist', getRegular(false))

module.exports = router
