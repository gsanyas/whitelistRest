require('dotenv').config();
const crypto = require("crypto")
const fs = require('fs')


// TODO (possible): check the connection with the IMAP server (before the register in another endpoint)
exports.register = async (req, res) => {
    // TODO: add all the register logic

    // encryption logic
    // TODO: get the other data
    const public_key = process.env.PUBLIC_KEY_PATH;
    const password = crypto.publicEncrypt(
        {
            key: fs.readFileSync(public_key, 'utf8'),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(req.body.email_password)
    )

    console.log("encrypted data: ", password.toString("base64"));
    // TODO: save the user in the database.

    res.status(204).send("");
}
