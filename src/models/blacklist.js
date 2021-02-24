const { DataTypes } = require('sequelize')
const { sequelize } = require('./sequelize')
const { User } = require('./user')

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
exports.BlackList = BlackList
