const { WhiteList, BlackList } = require('../models/list')

/**
 * Create a new element in Whitelist or Blacklist
 * @param {boolean} isWhite
 * @returns {Promise<import('../models/list').ListObject>}
 */
const createListElementService = (isWhite, email, user_id) => {
    const List = isWhite ? WhiteList : BlackList
    return List.create({ email: email, fk_user: user_id })
}

/**
 * Delete the address in whitelist and blacklist
 * @param {string} address - The address to delete
 * @param {number} user_id - The user owning the lists
 */
const deleteAddressInListService = async (address, user_id) => {
    const witems = await WhiteList.findAll({
        where: { email: address, fk_user: user_id }
    })
    witems.forEach(async exp => await exp.destroy())
    const bitems = await BlackList.findAll({
        where: { email: address, fk_user: user_id }
    })
    bitems.forEach(async exp => await exp.destroy())
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

/**
 * Find the an address in whitelist or blacklist
 * @param {boolean} isWhite - true for whitelist search, false for blacklist
 * @param {string} address - the email address to look for in the list
 * @param {number} user_id - the user owning the list
 * @returns {Promise<import('../models/list').ListObject>}
 */
const findInListService = (isWhite, address, user_id) => {
    const List = isWhite ? WhiteList : BlackList
    return List.findOne({
        where: { email: address, fk_user: user_id }
    })
}

module.exports = {
    createListElementService,
    deleteAddressInListService,
    findAllListService,
    findInListService
}
