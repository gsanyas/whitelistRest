const { DataTypes } = require('sequelize');
const { sequelize } = require("./sequelize");
const { User } = require('./user');

const BlackListRegularExpression = sequelize.define("black_list_regular_expression",
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_expression: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
    expression: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
    fk_user: {
        type: DataTypes.INTEGER
    },
},
{
    freezeTableName: true,
    timestamps: false,
})
BlackListRegularExpression.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: {
        fieldName: 'fk_user',
    },
    targetKey: 'id'
});
exports.BlackListRegularExpression = BlackListRegularExpression;