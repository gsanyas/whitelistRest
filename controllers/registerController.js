require('dotenv').config();
const crypto = require("crypto")
const fs = require('fs')

const {User} = require('../models/user')



// TODO (possible): check the connection with the IMAP server (before the register in another endpoint)
exports.register = async (req, res) => {
    const email = req.body.email;
    const fullName = req.body.full_name;
    const password = req.body.password; // TODO: hash the password

    // encryption logic
    const publicKey = process.env.PUBLIC_KEY_PATH;
    const emailPassword = crypto.publicEncrypt({
            key: fs.readFileSync(publicKey, 'utf8'),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(req.body.email_password)
    )

    const user = await User.build({
        email: email,
        full_name: fullName,
        password: password,
        email_password: emailPassword.toString("base64")
    })
    const userSaved = user.save()
    if (userSaved) {
        res.status(204).send("");
    } else {
        res.status(404).send("Register Error");
    }
}
