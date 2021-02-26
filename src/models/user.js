const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')

/**
 * Model definition for user table
 * @typedef UserObject
 * @property {number} id - The user id
 * @property {string} token - The random id that will be given to the client in his jwt token (changes at every login)
 * @property {string} full_name - The user name
 * @property {string} email - The user email address
 * @property {string} password - The user password for this website, hashed
 * @property {string} salt - The random salt used to hash the password of this particular user
 * @property {number} last_uid_scanned - Parameter used by backend only
 * @property {date} created_at - The date this user was added to the database
 */
const User = sequelize.define(
    'user',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        token: { type: DataTypes.STRING(16), unique: true },
        full_name: { type: DataTypes.STRING(120) },
        email: { type: DataTypes.STRING(120), index: true, unique: true },
        email_password: { type: DataTypes.STRING(512) },
        password: { type: DataTypes.STRING(512) },
        salt: { type: DataTypes.STRING(64) },
        last_uid_scanned: { type: DataTypes.INTEGER, defaultValue: 0 },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    { freezeTableName: true, timestamps: false }
)
exports.User = User
