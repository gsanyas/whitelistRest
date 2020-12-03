const { Sequelize, DataTypes } = require('sequelize');
var exports = module.exports = {};
// Database connexion and sync

const sequelize = new Sequelize('whitelist', 'back', 'imta2020', { // database, username, password
    host: 'localhost',
    dialect: 'mariadb'
}) //sequelize is an instance of connexion, while Sequelize is the whole library
exports.sequelize = sequelize;

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
