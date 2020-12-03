const {User} = require('../models/user')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const cookieConfig = {
    httpOnly: false, // set true in final version, without the proxy
    //secure: true, // to force https (if you use it)
    maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: false //the token is already signed
};

exports.loginController = async (req,res) => {
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
            res.status(200).send({setCookie: true});
        }
        else {
            res.status(403).send("Error : invalid password");
        }
    }
};

exports.isConnected = async (_req,res) => {
    res.status(200).send({connected: true})
}
