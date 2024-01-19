const db = require("../models");
const Jour = db.jour;
const Depot = db.depot;

exports.create = (req, res) => {
  const jour = {
    date: req.body.date
  };

  Jour.create(jour)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Jour."
      });
    });
};

exports.findAll = (req, res) => {
  return Jour.findAll({
    include: [
      {
        model: Depot,
        as: "depots",
        attributes: ["id", "nom", "adresse", "code_postal",
                    "ville", "telephone", "mail_structure",
                    "site_web_structure", "nom_contact", 
                    "prenom_contact", "telephone_contact",
                    "creneau_recuperation", "presentation"],
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
          err.message || "Error while retrieving Jours."
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    return Jour.findByPk(id, {
        include: [
        {
            model: Depot,
            as: "depots",
            attributes: ["id", "nom", "adresse", "code_postal",
                        "ville", "telephone", "mail_structure",
                        "site_web_structure", "nom_contact", 
                        "prenom_contact", "telephone_contact",
                        "creneau_recuperation", "presentation"],
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
                err.message || "Error while finding Jour."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Jour.update(req.body, {
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Jour was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update Jour with id=${id}. Maybe Jour was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Jour with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Jour.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Jour was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Jour with id=${id}. Maybe Jour was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Jour with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Jour.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: `Jour is already empty.`
          });

        for (const jour in data){
            Jour.destroy({
                where: { id: data[jour].dataValues.id }
            })
        }
        res.send({
            message: `Jours were deleted successfully!`
        });
    })
};