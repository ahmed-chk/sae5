const db = require("../models");
const Jardin = db.jardin;
const Abonnement = db.abonnement;
const Adhesion = db.adhesion;
const Depot = db.depot;
const Tournee = db.tournee;

exports.create = (req, res) => {
  const jardin = {
    nom_commercial: req.body.nom_commercial, 
    ville: req.body.ville,
    raison_sociale: req.body.raison_sociale,
    siege_social: req.body.siege_social,
    adresse_gestion: req.body.adresse_gestion,
    telephone: req.body.telephone,
    mail: req.body.mail,
    nom_contact: req.body.nom_contact,
    site_web: req.body.site_web,
  };

  Jardin.create(jardin)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Jardin."
      });
    });
};

exports.findAll = (req, res) => {
  return Jardin.findAll({
    include: [
      {
        model: Abonnement,
        as: "abonnements",
        attributes: ["id", "frequence", "description"],
        through: {
            attributes: [],
        },
      },
      {
        model: Adhesion,
        as: "adhesions",
        attributes: ["id","type","prix","date_charniere","cotisation_degressive"],
        through: {
            attributes: [],
        },
      },
      "depots"
    ],
  })
  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving Jardins."
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    return Jardin.findByPk(id, {
        include: [
          {
            model: Abonnement,
            as: "abonnements",
            attributes: ["id", "frequence", "description"],
            through: {
                attributes: [],
            },
          },
          {
            model: Adhesion,
            as: "adhesions",
            attributes: ["id","type","prix","date_charniere","cotisation_degressive"],
            through: {
                attributes: [],
            },
          },
          "depots"
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Error while finding Jardin."
            });
        });
};

exports.addAbonnement = (req, res) => {
  const jardinId = req.query.jardinId;
  const abonnementId = req.query.abonnementId;

  return Jardin.findByPk(jardinId).then((jardin) => {
    if (!jardin) {
      console.log("Jardin not found!");
      return null;
    }

    return Abonnement.findByPk(abonnementId).then((abonnement) => {
      if (!abonnement) {
        console.log("Abonnement not found!");
        return null;
      }

      jardin.addAbonnement(abonnement);
      res.send({
          message: `Added Abonnement id=${abonnement.id} to Jardin id=${jardin.id}`
      });
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Abonnement to Jardin: ", err);
  });
};

exports.addAdhesion = (req, res) => {
  const jardinId = req.query.jardinId;
  const adhesionId = req.query.adhesionId;

  return Jardin.findByPk(jardinId).then((jardin) => {
    if (!jardin) {
      console.log("Jardin not found!");
      return null;
    }

    return Adhesion.findByPk(adhesionId).then((adhesion) => {
      if (!adhesion) {
        console.log("Adhesion not found!");
        return null;
      }

      jardin.addAdhesion(adhesion);
      res.send({
          message: `Added Adhesion id=${adhesion.id} to Jardin id=${jardin.id}`
      });
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Adhesion to Jardin: ", err);
  });
};

exports.addDepot = (req, res) => {
  const jardinId = req.query.jardinId;
  const depotId = req.query.depotId;

  return Jardin.findByPk(jardinId).then((jardin) => {
    if (!jardin) {
      console.log("Jardin not found!");
      return null;
    }

    return Depot.findByPk(depotId).then((depot) => {
      if (!depot) {
        console.log("Depot not found!");
        return null;
      }

      jardin.addDepot(depot);
      res.send({
          message: `Added Depot id=${depot.id} to Jardin id=${jardin.id}`
      });
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Depot to Jardin: ", err);
  });
};

exports.addTournee = (req, res) => {
  const jardinId = req.query.jardinId;
  const tourneeId = req.query.tourneeId;

  return Jardin.findByPk(jardinId).then((jardin) => {
    if (!jardin) {
      console.log("Jardin not found!");
      return null;
    }

    return Tournee.findByPk(tourneeId).then((tournee) => {
      if (!tournee) {
        console.log("Tournee not found!");
        return null;
      }

      jardin.addTournee(tournee);
      res.send({
          message: `Added Tournee id=${tournee.id} to Jardin id=${jardin.id}`
      });
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Tournee to Jardin: ", err);
  });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Produit.update(req.body, {
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Produit was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update Produit with id=${id}. Maybe Produit was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Produit with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Jardin.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Jardin was deleted successfully!"
            });
        } else {
            res.send({
                message: "Cannot delete Jardin with id=${id}. Maybe Jardin was not found!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Jardin with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Jardin.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: "Jardin is already empty."
          });

        for (const jardin in data){
            Jardin.destroy({
                where: { id: data[jardin].dataValues.id }
            })
        }
        res.send({
            message: "Jardins were deleted successfully!"
        });
    })
};