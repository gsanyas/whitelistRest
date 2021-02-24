const express = require('express')
const router = express.Router()

const { addRegular, getRegular } = require('../controllers/expressionController')
const { WhiteList, BlackList } = require('../models/list')
const { WhiteListRegularExpression, BlackListRegularExpression } = require('../models/regex')

router.post('/whitelist', addRegular(WhiteList, WhiteListRegularExpression))
router.post('/blacklist', addRegular(BlackList, BlackListRegularExpression))
router.get('/whitelist', getRegular(WhiteList, WhiteListRegularExpression))
router.get('/blacklist', getRegular(BlackList, BlackListRegularExpression))

module.exports = router
