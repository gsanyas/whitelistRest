const { Sequelize } = require('sequelize')
const config = require('../config.json').database

var exports = (module.exports = {})

// Database connexion and sync
const sequelize = new Sequelize(config.name, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
}) //sequelize is an instance of connexion, while Sequelize is the whole library
exports.sequelize = sequelize

const connect = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        await sequelize.sync()
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
connect()
