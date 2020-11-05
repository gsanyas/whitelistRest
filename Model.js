const { Sequelize, DataTypes } = require('sequelize');
var exports = module.exports = {};
// Database connexion and sync

const sequelize = new Sequelize('whitelist', 'root', '', { // database, username, password
    host: 'localhost',
    dialect: 'mariadb'
}) //sequelize is an instance of connexion, while Sequelize is the whole library
exports.sequelize = sequelize;

const User = sequelize.define( "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
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
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        last_uid_scanned: {
            type: DataTypes.INTEGER,
            defaultValue: 1
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

const Quarantine = sequelize.define("quarantine",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },{
        freezeTableName: true,
        timestamps: false,
    }
)
Quarantine.belongsTo(User, {
    onDelete: 'RESTRICT',
    foreignKey: {
        fieldName: 'fk_user',
    },
    targetKey: 'id'
});
exports.Quarantine = Quarantine;

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect()
