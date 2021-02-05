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

exports.quarantineFilter = quarantine => ({
    id: quarantine.id,
    email_sender: quarantine.email_sender,
    email_subject: quarantine.email_subject,
    email_size: quarantine.email_size
})

exports.QuarantineSwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email_sender: { type: 'string' },
                email_subject: { type: 'string' },
                email_size: { type: 'number' }
            },
            example: {
                id: 9,
                email_sender: 'jack@email.com',
                email_subject: 'hello',
                email_size: 150
            }
        }
    }
}
