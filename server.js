// Imports
const express = require('express');
var cors = require('cors')
const {User,Quarantine} = require('./Model')

// Config
const port =  8000;

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
