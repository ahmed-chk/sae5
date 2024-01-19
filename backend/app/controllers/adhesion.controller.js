const db = require("../models");
const Adhesion = db.adhesion;
const Jardin = db.jardin;
const Adherent = db.adherent;

exports.create = (req, res) => {
  const adhesion = {
    type: req.body.type, 
    prix: req.body.prix,
    date_charniere: req.body.date_charniere,
    cotisation_degressive: req.body.cotisation_degressive
  };

  Adhesion.create(adhesion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Adhesion."
      });
    });
};

exports.findAll = (req, res) => {
  return Adhesion.findAll({
    include: [
      {
        model: Jardin,
        as: "jardins",
        attributes: ["id", "nom_commercial", "ville",
                    "raison_sociale", "siege_social",
                    "adresse_gestion", "telephone", 
                    "mail", "nom_contact", "site_web"],
        through: {
          attributes: [],
        }
      },
      {
        model: Adherent,
        as: "adherents",
        attributes: ["id", "raison_sociale", "civilite", "nom",
                    "prenom", "adresse", "code_postal", "ville",
                    "telephone1", "telephone2", "telephone3", "role",
                    "mail", "profession", "date_naissance", "mdp",
                    "date_premiere_adhesion", "expiration_derniere_adhesion"],
        through: {
          attributes: [],
        }
      },
    ],
  })
  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving Adhesions."
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    return Adhesion.findByPk(id, {
        include: [
          {
            model: Jardin,
            as: "jardins",
            attributes: ["id", "nom_commercial", "ville",
                        "raison_sociale", "siege_social",
                        "adresse_gestion", "telephone", 
                        "mail", "nom_contact", "site_web"],
            through: {
              attributes: [],
            }
          },
          {
            model: Adherent,
            as: "adherents",
            attributes: ["id", "raison_sociale", "civilite", "nom",
                        "prenom", "adresse", "code_postal", "ville",
                        "telephone1", "telephone2", "telephone3", "role",
                        "mail", "profession", "date_naissance", "mdp",
                        "date_premiere_adhesion", "expiration_derniere_adhesion"],
            through: {
              attributes: [],
            }
          },
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Error while finding Adhesion."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Adhesion.update(req.body, {
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Adhesion was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update Adhesion with id=${id}. Maybe Adhesion was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Adhesion with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Adhesion.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Adhesion was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Adhesion with id=${id}. Maybe Adhesion was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Adhesion with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Adhesion.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: `Adhesion is already empty.`
          });

        for (const adhesion in data){
            Adhesion.destroy({
                where: { id: data[adhesion].dataValues.id }
            })
        }
        res.send({
            message: `Adhesions were deleted successfully!`
        });
    })
};