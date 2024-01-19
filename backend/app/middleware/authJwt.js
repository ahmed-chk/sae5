const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Adherent = db.adherent;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.adherentId = decoded.id;
              next();
            });
};

isAdmin = (req, res, next) => {
  Adherent.findByPk(req.adherentId).then(adherent => {
    if (adherent.role == 2) {
        next();
        return;
    }
    res.status(403).send({
        message: "Require Admin Role!"
    });
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};
module.exports = authJwt;