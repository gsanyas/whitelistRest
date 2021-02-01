const express = require('express')
const router = express.Router()

const { addRegular, getRegular } = require('../controllers/expressionController')
const { WhiteList } = require('../models/whitelist')
const { WhiteListRegularExpression } = require('../models/whitelistRegularExpression')
const { BlackListRegularExpression } = require('../models/blacklistRegularExpression')
const { BlackList } = require('../models/blacklist')

router.post('/whitelist', addRegular(WhiteList, WhiteListRegularExpression))
router.post('/blacklist', addRegular(BlackList, BlackListRegularExpression))
router.get('/whitelist', getRegular(WhiteList, WhiteListRegularExpression))
router.get('/blacklist', getRegular(BlackList, BlackListRegularExpression))

module.exports = router
