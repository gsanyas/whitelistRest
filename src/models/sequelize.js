const { Sequelize } = require('sequelize')
const config = require('../config.json').database
require('dotenv').config()

var exports = (module.exports = {})

// Database connexion and sync
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
) //sequelize is an instance of connexion, while Sequelize is the whole library
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
