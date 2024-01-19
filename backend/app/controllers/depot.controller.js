const db = require("../models");
const Depot = db.depot;
const Jardin = db.jardin;
const Jour = db.jour;

exports.create = (req, res) => {
  const depot = {
    nom: req.body.nom, 
    adresse: req.body.adresse,
    code_postal: req.body.code_postal, 
    ville: req.body.ville,
    telephone: req.body.telephone, 
    mail_structure: req.body.mail_structure, 
    site_web_structure: req.body.site_web_structure, 
    nom_contact: req.body.nom_contact,
    prenom_contact: req.body.prenom_contact,
    telephone_contact: req.body.telephone_contact,
    creneau_recuperation: req.body.creneau_recuperation,
    presentation: req.body.presentation
  };

  Depot.create(depot)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Depot."
      });
    });
};

exports.findAll = (req, res) => {
  return Depot.findAll({
    include: [
      {
        model: Jour,
        as: "jours",
        attributes: ["id", "date"],
        through: {
          attributes: [],
        }
      }
    ],
  })
  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving Depots."
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    return Depot.findByPk(id, {
        include: [
          {
            model: Jour,
            as: "jours",
            attributes: ["id", "date"],
            through: {
              attributes: [],
            }
          }
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Error while finding Depot."
            });
        });
};

exports.addJour = (req, res) => {
    const depotId = req.query.depotId;
    const jourId = req.query.jourId;

    return Depot.findByPk(depotId).then((depot) => {
      if (!depot) {
        console.log("Depot not found!");
        return null;
      }

      return Jour.findByPk(jourId).then((jour) => {
        if (!jour) {
          console.log("Jour not found!");
          return null;
        }

        depot.addJour(jour);
        res.send({
            message: `Added Jour id=${jour.id} to Depot id=${depot.id}`
        });
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Jour to Depot: ", err);
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Depot.update(req.body, {
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Depot was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update Depot with id=${id}. Maybe Depot was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Depot with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Depot.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Depot was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Depot with id=${id}. Maybe Depot was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Depot with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Depot.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: `Depot is already empty.`
          });

        for (const depot in data){
            Depot.destroy({
                where: { id: data[depot].dataValues.id }
            })
        }
        res.send({
            message: `Depots were deleted successfully!`
        });
    })
};