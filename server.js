// Imports
const mariadb = require('mariadb');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Config
const port =  8000;
var cors = require('cors')

//Database connexion
const sequelize = new Sequelize('whitelist', 'root', '', { // database, username, password
    host: 'localhost',
    dialect: 'mariadb'
}) //sequelize is an instance of connexion, while Sequelize is the whole library

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Models 

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
    },{
        freezeTableName: true,
        timestamps: false
    }
)

const Quarantine = sequelize.define("quarantine",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        fk_user: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
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

sequelize.sync();


// Express routing
const app = express()

app.use(cors())

// listen to incoming requests on port 8000
app.listen(port, () => {
    console.log('Server started !')
})

/* Routes */

app.route('/api/emails').get(async (_req, res) => {
    const quarantines = await Quarantine.findAll({
        include: [{
            model: User
        }]
    })
    // DEBUG
    // console.log(JSON.stringify(quarantines))
    res.send(quarantines)
})
app.route('/api/emails/:address').get(async (req, res) => {
    const requestedEmail = req.params['address']
    const quarantines = await Quarantine.findAll({
        include:  [{
            model: User,
            where: {
                email: requestedEmail
            }
        }],
    })
    res.send(quarantines)
})
