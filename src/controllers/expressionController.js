const {
    isExpression,
    createExpressionService,
    findAllExpressionService,
    deleteExpressionService
} = require('../services/expressionService')
const {
    createListElementService,
    findAllListService,
    deleteAddressInListService
} = require('../services/listServices')
const express = require('express')

/**
 * Curried controller to add a regular expression or an email to the lists
 * - The request MUST go through checkToken and checkBody first
 * @param {boolean} isWhite - if true, the email will be added to the Whitelist and the
 *      regular expression to the WhiteListRegularExpression, else to the Black version
 */
exports.addRegular = isWhite =>
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    async (req, res) => {
        const user = req.user // obtained from filter
        const expression = req.body.expression
        if (expression === null) res.status(404).send('Expression required')
        if (!expression.match(/.*@.*/)) res.sendStatus(422)
        if (isExpression(expression)) {
            try {
                const result = await createExpressionService(isWhite, expression, user.id)
                // TODO filter expression
                res.status(201).send(result)
            } catch (error) {
                res.sendStatus(502)
            }
        } else {
            // if the expression is here, it means it is simply an email address
            try {
                const result = createListElementService(isWhite, expression, user.id)
                res.status(201).send(result)
            } catch (error) {
                res.sendStatus(502)
            }
        }
    }

/**
 * Curried controller for obtaining list and regular expression list
 * - The requests needs to go through the checkToken filter first
 * @param {boolean} isWhite - if true, obtain white version, else black version
 */
exports.getRegular = isWhite =>
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    async (req, res) => {
        const user = req.user
        const expressions = await findAllExpressionService(isWhite, user.id)
        const list_content = await findAllListService(isWhite, user.id)
        // only keep user expressions and emails, and concatenate them into one list of string
        const result = expressions
            .map(e => e.user_expression)
            .concat(list_content.map(e => e.email))
        res.status(200).send(result)
    }

/**
 * Controller for deleting a regular expression or an email in a list
 * - if the expression or the email is in both lists, delete both
 * - Request MUST pass through checkToken and checkBody first
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.deleteRegular = async (req, res) => {
    const user = req.user // obtained from filter
    /** Type is ensured by checkBody filter @type {string} */
    const expression = req.body.expression
    if (isExpression(expression)) {
        await deleteExpressionService(expression, user.id)
    } else {
        await deleteAddressInListService(expression, user.id)
    }
    res.status(200).json({ message: 'Expression deleted' })
}
