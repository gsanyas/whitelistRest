const { WhiteList, BlackList } = require('../models/list')

/**
 * Create a new element in Whitelist or Blacklist
 * @param {boolean} isWhite
 */
const createListElementService = (isWhite, email, user_id) => {
    const List = isWhite ? WhiteList : BlackList
    return List.create({ email: email, fk_user: user_id })
}

/**
 * Find all items of one user in their whitelist or blacklist
 * @param {boolean} isWhite
 * @param {number} user_id
 * @returns {Promise<import('../models/list').ListObject[]>}
 */
const findAllListService = (isWhite, user_id) => {
    const List = isWhite ? WhiteList : BlackList
    return List.findAll({ where: { fk_user: user_id } })
}

module.exports = { createListElementService, findAllListService }
