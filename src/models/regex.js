const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const { User } = require('./user')

/**
 * @typedef ExpressionObject
 * @property {number} id
 * @property {string} user_expression - The expression, as given by the user
 * @property {number} expression - The expression in regex form, as read by the backend
 * @property {string} expression_type
 */

/** Definition for BlackListRegularExpression table */
const BlackListRegularExpression = sequelize.define(
    'black_list_regular_expression',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_expression: { type: DataTypes.STRING(120), allowNull: false },
        expression: { type: DataTypes.STRING(120), allowNull: false },
        fk_user: { type: DataTypes.INTEGER, allowNull: false },
        expression_type: {
            type: DataTypes.STRING(120),
            defaultValue: 'email_address',
            allowNull: false
        }
    },
    { freezeTableName: true, timestamps: false }
)
BlackListRegularExpression.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: { fieldName: 'fk_user' },
    targetKey: 'id'
})

/** Definition for WhiteListRegularExpression table */
const WhiteListRegularExpression = sequelize.define(
    'white_list_regular_expression',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_expression: { type: DataTypes.STRING(120), allowNull: false },
        expression: { type: DataTypes.STRING(120), allowNull: false },
        fk_user: { type: DataTypes.INTEGER, allowNull: false },
        expression_type: {
            type: DataTypes.STRING(120),
            defaultValue: 'email_address',
            allowNull: false
        }
    },
    { freezeTableName: true, timestamps: false }
)
WhiteListRegularExpression.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: { fieldName: 'fk_user' },
    targetKey: 'id'
})

module.exports = { BlackListRegularExpression, WhiteListRegularExpression }
