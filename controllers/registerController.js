require('dotenv').config();
const { createUser } = require('../services/userServices');

// TODO (possible): check the connection with the IMAP server (before the register in another endpoint)
exports.register = async (req, res) => {
  const user = createUser(
    req.body.email,
    req.body.password,
    req.body.full_name,
    req.body.email_password
  );
  const userSaved = user.save();
  if (userSaved) {
    res.sendStatus(204);
  } else {
    res.status(404).send('Register Error');
  }
};
