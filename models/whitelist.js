const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const { User } = require('./user')

const WhiteList = sequelize.define(
    'white_list',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(120)
        },
        fk_user: {
            type: DataTypes.INTEGER
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)
WhiteList.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: {
        fieldName: 'fk_user'
    },
    targetKey: 'id'
})
exports.WhiteList = WhiteList
