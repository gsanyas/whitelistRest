const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const { User } = require('./user')

const History = sequelize.define(
    'history',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        fk_user: { type: DataTypes.INTEGER },
        email_sender: { type: DataTypes.STRING(120), allowNull: false },
        email_subject: { type: DataTypes.STRING(120), allowNull: false },
        reason: { type: DataTypes.STRING(120), allowNull: false },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    { freezeTableName: true, timestamps: false }
)
History.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: { fieldName: 'fk_user' },
    targetKey: 'id'
})
exports.History = History
