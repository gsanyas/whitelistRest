// Imports
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const {User,Quarantine} = require('./Model')
const {checkToken} = require('./auth')

// Config
const port =  8000;

const cookieConfig = {
    httpOnly: true, // to disable accessing cookie via client side js (there is no client side on this API though)
    //secure: true, // to force https (if you use it)
    maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: false //the token is already signed
};

// Express routing
const app = express()

app.use(cors())
app.use(express.json())

// listen to incoming requests on port 8000
app.listen(port, () => {
    console.log('Server started !')
})

/* Routes */

app.post('/login', async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne( {where: { email: email }} )
    if (user === null){
        res.send("Error : user don't exist");
    }
    else {
        if (password === user["password"]) {
            const privateKey = fs.readFileSync('./private.pem', 'utf8');
            const token = jwt.sign({ "id": user["id"] }, privateKey , { algorithm: 'HS256'});
            res.cookie('authcookie', token, cookieConfig);
            res.send('set cookie');
        }
        else {
            res.send("Error : invalid password");
        }
    }
})

app.get('/api/emails', checkToken, async (req, res) => {
    const userId = req.user //recovered from cookies
    const quarantines = await Quarantine.findAll({
        where: { fk_user: userId }
    })
    res.send(quarantines)
})

// Old routes (to remove)

app.get('/api/emails/all', async (_req, res) => {
    const quarantines = await Quarantine.findAll({
        include: [{
            model: User
        }]
    })
    // DEBUG
    // console.log(JSON.stringify(quarantines))
    res.send(quarantines)
})
app.get('/api/emails/:address',async (req, res) => {
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
