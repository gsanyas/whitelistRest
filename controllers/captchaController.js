require('dotenv').config();
const { Quarantine } = require('../models/quarantine');
const { WhiteList } = require('../models/whitelist');
const axios = require('axios');

exports.verifyEmail = async (req, res) => {
  const emailId = req.params.id;
  const data = req.body;
  console.log(emailId);
  console.log(data);

  const secret_key = process.env.RECAPTCHA_TOKEN;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${data.captchaToken}`;
  // TODO: REFACTOR THIS CODE.
  axios
    .post(url)
    .then(response => {
      if (response.data.success) {
        Quarantine.findOne({
          where: { id: emailId, email_sender: data.email }
        }).then(email => {
          console.log(email);
          if (email) {
            email.to_restore = true;
            WhiteList.build({ email: email.email_sender, fk_user: email.fk_user })
              .save()
              .then(user => {
                console.log(user);
                email.save().then(m => {
                  console.log(m);
                  if (m) {
                    res.status(204).send('');
                  } else {
                    res.status(404).send('Email does not exist');
                  }
                });
              });
          } else {
            res.status(404).send('Email does not exist');
          }
        });
      } else {
        res.status(404).send('Incorrect captcha');
      }
    })
    .catch(error => {
      res.status(500).send('Email does not exist');
    });
};
