const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const { User } = require('./user')

/**
 * Model definition for Quarantine Table
 * @typedef QuarantineObject
 * @property {number} id - The email id in the database
 * @property {string} client_id - The last id provided to the client (null if this email was never sent to client, unique otherwise)
 * @property {User} fk_user - Use who owns the email
 * @property {string} email_sender - The address of the person who sent the email
 * @property {string} email_subject - The subject of the email
 * @property {number} email_size - The size of the email
 * @property {boolean} to_eliminate - Indicate whether the email is marked to elimination for the backend
 * @property {boolean} to_restore - Indicate whether the email is marked to restoration for the backend
 * @property {boolean} was_restored - Indicate whether the email was restored by the backend
 * @property {date} created_at - Date at which the email was created by the backend
 */
const Quarantine = sequelize.define(
    'quarantine',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        client_id: { type: DataTypes.STRING(16), allowNull: true },
        fk_user: { type: DataTypes.INTEGER, allowNull: false },
        email_sender: { type: DataTypes.STRING(120), allowNull: false },
        email_subject: { type: DataTypes.STRING(120), allowNull: false },
        email_size: { type: DataTypes.INTEGER },
        email_id: { type: DataTypes.STRING(120), allowNull: false },
        to_eliminate: { type: DataTypes.BOOLEAN, defaultValue: false },
        to_restore: { type: DataTypes.BOOLEAN, defaultValue: false },
        was_restored: { type: DataTypes.BOOLEAN, defaultValue: false },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false }
    },
    { freezeTableName: true, timestamps: false }
)
Quarantine.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: {
        fieldName: 'fk_user'
    },
    targetKey: 'id'
})

module.exports = { Quarantine }
