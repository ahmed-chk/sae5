const db = require("../models");
const Tournee = db.tournee;
const Depot = db.depot;
const Abonnement = db.abonnement;
const Ordre = db.ordre;
const Livraison = db.livraison;

exports.create = (req, res) => {
  const tournee = {
    jour_preparation_panier: req.body.jour_preparation_panier, 
    jour_livraison_panier: req.body.jour_livraison_panier,
    couleur: req.body.couleur
  };

  Tournee.create(tournee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Tournee."
      });
    });
};

exports.findAll = (req, res) => {
  return Tournee.findAll({
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
          model: Ordre,
          as: "ordres",
          attributes: ["numero_ordre"]
        }
      },
      {
        model: Abonnement,
        as: "abonnements",
        attributes: ["id", "frequence", "description"],
        through: {
          model: Livraison,
          as: "livraisons",
          attributes: ["id", "prepare", "livre", "recupere", "depotId"]
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
          err.message || "Error while retrieving Tournees."
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    return Tournee.findByPk(id, {
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
              model: Ordre,
              as: "ordres",
              attributes: ["numero_ordre"]
            }
          },
          {
            model: Abonnement,
            as: "abonnements",
            attributes: ["id", "frequence", "description"],
            through: {
              model: Livraison,
              as: "livraisons",
              attributes: ["id", "prepare", "livre", "recupere", "depotId"]
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
                err.message || "Error while finding Tournee."
            });
        });
};

exports.findAddressesByDate = (req, res) => {
  const date = req.body.date;

  let addressesTab = [];

  return Tournee.findOne({
    where: {
      jour_livraison_panier: date
    },
    include: [
      {
        model: Abonnement,
        as: "abonnements",
        attributes: ["id", "frequence", "description"],
        through: {
          model: Livraison,
          as: "livraisons",
          attributes: ["id", "prepare", "livre", "recupere", "depotId"]
        }
      }
    ],
  })
    .then(async tournee => {

      for(let i = 0 ; i < tournee.abonnements.length; i++){
        await Depot.findByPk(tournee.abonnements[i].livraisons.depotId)
          
          .then(depot => {
            addressesTab.push(depot.adresse);
          })
      }

      await res.send(addressesTab);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Error while finding Tournee."
        });
    });
};

exports.addDepot = (req, res) => {
    const tourneeId = req.query.tourneeId;
    const depotId = req.query.depotId;

    return Tournee.findByPk(tourneeId).then((tournee) => {
      if (!tournee) {
        console.log("Tournee not found!");
        return null;
      }

      return Depot.findByPk(depotId).then((depot) => {
        if (!depot) {
          console.log("Depot not found!");
          return null;
        }

        tournee.addDepot(depot, {
          through: {
            numero_ordre: req.body.numero_ordre
          },
        });
        res.send({
            message: `Added Depot id=${depot.id} to Tournee id=${tournee.id}`
        });
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Depot to Tournee: ", err);
    });
};

exports.addAbonnementDepot = (req, res) => {
  const tourneeId = req.query.tourneeId;
  const depotId = req.query.depotId;
  const abonnementId = req.query.abonnementId;

  return Tournee.findByPk(tourneeId).then((tournee) => {
    if (!tournee) {
      console.log("Tournee not found!");
      return null;
    }

    return Abonnement.findByPk(abonnementId).then((abonnement) => {
      if (!abonnement) {
        console.log("Abonnement not found!");
        return null;
      }

      return Depot.findByPk(depotId).then((depot) => {
        if (!depot) {
          console.log("Depot not found!");
          return null;
        }

        tournee.addAbonnement(abonnement, {
          through: {
            prepare: req.body.prepare,
            livre: req.body.livre,
            recupere: req.body.recupere,
            depotId: depotId
          },
        });
        res.send({
            message: `Added Abonnement id=${abonnement.id} to Tournee id=${tournee.id} with Depot id=${depot.id}`
        });
      })
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Depot to Tournee: ", err);
  });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tournee.update(req.body, {
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Tournee was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update Tournee with id=${id}. Maybe Tournee was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tournee with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tournee.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Tournee was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Tournee with id=${id}. Maybe Tournee was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tournee with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Tournee.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: `Tournee is already empty.`
          });

        for (const tournee in data){
            Tournee.destroy({
                where: { id: data[tournee].dataValues.id }
            })
        }
        res.send({
            message: `Tournees were deleted successfully!`
        });
    })
};