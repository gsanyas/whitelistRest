const express = require('express')
const router = express.Router()
const { getUser, setParam } = require('./controllers/userController')
const { checkUserParam } = require('./filters/checkUserParam')

router.get('/', getUser)
router.put('/:userparam', checkUserParam, setParam)

module.exports = router
