const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const { User, UserSwagger } = require('./user')

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

exports.QuarantineSwagger = {
    'application/json': {
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                user: UserSwagger['application/json'].schema,
                email_sender: { type: 'string' },
                email_subject: { type: 'string' },
                email_size: { type: 'number' },
                email_id: { type: 'string' },
                to_eliminate: { type: 'boolean' },
                to_restore: { type: 'boolean' },
                was_restored: { type: 'boolean' },
                created_at: { type: 'date' }
            },
            example: {
                id: 9,
                user: UserSwagger['application/json'].schema.example,
                email_sender: 'jack@email.com',
                email_subject: 'hello',
                email_size: 150,
                email_id: '56ZDFdez65DZ',
                to_eliminate: false,
                to_restore: false,
                was_restored: false,
                created_at: '2008-11-11 13:23:44'
            }
        }
    }
}
