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
const { internalError } = require('../utils')

/**
 * Prototype sent to the checkBody filter
 * It is also used by the OpenAPI docs
 */
exports.expressionBodyPrototype = {
    expression: {
        type: 'string',
        required: true,
        description:
            'The expression that must be added or deleted. It can be a user expression or an email address, the system will add or change it it in the correct place.'
    }
}

/**
 * Body response when an expression is provided which does not contain a valid expression or email
 * - it is also used in OpenAPI description of the POST /list/whitelist and POST /list/blacklist routes
 * @param {string} color
 */
exports.addExpressionInvalidBody = color => ({
    type: `/list/${color}list/add-invalid`,
    title: 'Invalid expression',
    status: 400,
    details: 'The provided expression is not an email neither a group of email addresses'
})

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
        /**
         * The user adding the expression
         * - the request MUST go through checkToken first to obtain it
         * @type {import('../models/user').UserObject}
         */
        const user = req.user
        /**
         * The expression to add to the database
         * - type SHOULD be checked by checkBody filter first
         * @type {string}
         */
        const expression = req.body.expression
        // Checks whether the expression matches a valid email or expression
        // TODO: send a correct error message
        if (!expression.match(/.*@.*/))
            res.status(400).json(this.addExpressionInvalidBody(isWhite ? 'white' : 'black'))
        if (isExpression(expression)) {
            try {
                const result = await createExpressionService(isWhite, expression, user.id)
                // TODO filter expression
                res.status(201).send(result)
            } catch (error) {
                res.status(500).json(internalError)
            }
        } else {
            // if the expression is here, it means it is simply an email address
            try {
                const result = await createListElementService(isWhite, expression, user.id)
                // TODO: filter result
                res.status(201).send(result)
            } catch (error) {
                res.sendStatus(500).json(internalError)
            }
        }
    }

/**
 * Curried controller for obtaining list and regular expression list
 * - The requests MUST go through the checkToken filter first
 * @param {boolean} isWhite - if true, obtain white version, else black version
 */
exports.getRegular = isWhite =>
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    async (req, res) => {
        /**
         * The user whose list is obtained
         * - the request MUST go through checkToken first to obtain it
         * @type {import('../models/user').UserObject}
         */
        const user = req.user
        const expressions = await findAllExpressionService(isWhite, user.id)
        const list_content = await findAllListService(isWhite, user.id)
        // only keep user expressions and emails, and concatenate them into one list of string
        const result = expressions
            .map(e => e.user_expression)
            .concat(list_content.map(e => e.email))
        res.status(200).send(result)
    }

exports.deleteExpressionMessage = { message: 'Expression deleted' }

/**
 * Controller for deleting a regular expression or an email in a list
 * - if the expression or the email is in both lists, delete both
 * - Request MUST pass through checkToken and checkBody first
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.deleteRegular = async (req, res) => {
    /**
     * The user whose list is obtained
     * - the request MUST go through checkToken first to obtain it
     * @type {import('../models/user').UserObject}
     */
    const user = req.user // obtained from filter
    /** Type is ensured by checkBody filter @type {string} */
    const expression = req.body.expression
    if (isExpression(expression)) {
        await deleteExpressionService(expression, user.id)
    } else {
        await deleteAddressInListService(expression, user.id)
    }
    res.status(200).json(this.deleteExpressionMessage)
}
