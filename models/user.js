const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

const User = sequelize.define( "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: DataTypes.STRING(120)
        },
        email: {
            type: DataTypes.STRING(120),
            index: true,
            unique: true
        },
        email_password: {
            type: DataTypes.STRING(512),

        },
        password: {
            type: DataTypes.STRING(512)
        },
        last_uid_scanned: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
)
exports.User = User;
