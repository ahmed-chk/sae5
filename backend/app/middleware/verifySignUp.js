const db = require("../models");
const Adherent = db.adherent;

checkDuplicateMail = (req, res, next) => {
    Adherent.findOne({
      where: {
        mail: req.body.mail
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed ! Email is already in use !"
        });
        return;
      }

      next();
    });
  };

const verifySignUp = {
  checkDuplicateMail: checkDuplicateMail
};

module.exports = verifySignUp;