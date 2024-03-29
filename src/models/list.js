const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const { User } = require('./user')

/**
 * @typedef ListObject
 * @property {number} id
 * @property {string} email - The email in the list
 * @property {number} fk_user - The id of the user
 */

 /** Definition of the Blacklist table */
const BlackList = sequelize.define(
    'black_list',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING(120), allowNull: false },
        fk_user: { type: DataTypes.INTEGER, allowNull: false }
    },
    { freezeTableName: true, timestamps: false }
)
BlackList.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: { fieldName: 'fk_user' },
    targetKey: 'id'
})

 /** Definition of the Whitelist table */
const WhiteList = sequelize.define(
    'white_list',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING(120), allowNull: false },
        fk_user: { type: DataTypes.INTEGER, allowNull: false }
    },
    { freezeTableName: true, timestamps: false }
)
WhiteList.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: { fieldName: 'fk_user' },
    targetKey: 'id'
})

module.exports = { BlackList, WhiteList }
