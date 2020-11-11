const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.checkToken = async (req, res) => {
    const privateKey = fs.readFileSync('./private.pem', 'utf8');
    const authcookie = req.cookies.authcookie
    jwt.verify(authcookie,privateKey,(err,data)=>{
        if(err){
            res.sendStatus(403)
        } 
        else if(data.id){
            req.user = data.id
            next()
        }
    })
}