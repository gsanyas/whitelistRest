const fs = require('fs')
const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
    const private = fs.readFileSync('./private.pem', 'utf8');
    console.log(JSON.stringify(req.cookies))
    const authcookie = req.cookies.authcookie
    jwt.verify(authcookie,private,(err,data)=>{
        if(err){
            res.sendStatus(403)
        } 
        else if(data.id){
            console.log("ok: "+ data.id)
            req.user = data.id
            next()
        }
    })
}