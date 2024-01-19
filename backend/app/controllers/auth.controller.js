const db = require("../models");
const config = require("../config/auth.config");
const Adherent = db.adherent;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  Adherent.create({
    raison_sociale: req.body.raison_sociale, 
    civilite: req.body.civilite, 
    nom: req.body.nom,
    prenom: req.body.prenom, 
    adresse: req.body.adresse, 
    code_postal: req.body.code_postal, 
    ville: req.body.ville,
    telephone1: req.body.telephone1, 
    telephone2: req.body.telephone2, 
    telephone3: req.body.telephone3,
    role: 1,
    mail: req.body.mail, 
    profession: req.body.profession, 
    date_naissance: req.body.date_naissance, 
    mdp: bcrypt.hashSync(req.body.mdp, 8),
    date_premiere_adhesion: req.body.date_premiere_adhesion, 
    expiration_derniere_adhesion: req.body.expiration_derniere_adhesion
  })
    .then(adherent => {
        res.send({ 
            message: "Adherent was registered successfully!" 
        });    
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Adherent.findOne({
    where: {
      mail: req.body.mail
    }
  })
    .then(adherent => {
      if (!adherent) {
        return res.status(404).send({ message: "Adherent Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.mdp,
        adherent.mdp
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: adherent.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

    res.status(200).send({
        id: adherent.id,
        mail: adherent.mail,
        role: adherent.role,
        accessToken: token
    });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};