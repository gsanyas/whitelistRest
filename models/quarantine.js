const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const { User } = require('./user')

const Quarantine = sequelize.define(
    'quarantine',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fk_user: {
            type: DataTypes.INTEGER
        },
        email_sender: {
            type: DataTypes.STRING(120)
        },
        email_subject: {
            type: DataTypes.STRING(120)
        },
        email_size: {
            type: DataTypes.INTEGER
        },
        email_id: {
            type: DataTypes.STRING(120)
        },
        to_eliminate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        to_restore: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        was_restored: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)
Quarantine.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: {
        fieldName: 'fk_user'
    },
    targetKey: 'id'
})
exports.Quarantine = Quarantine
