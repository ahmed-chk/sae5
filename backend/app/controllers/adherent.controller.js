const db = require("../models");
const Adherent = db.adherent;
const Abonnement = db.abonnement;
const Adhesion = db.adhesion;
const Jardin = db.jardin;
const Periode = db.periode;
const SouscriptionAB = db.souscriptionAB;
const SouscriptionAD = db.souscriptionAD;
const Depot = db.depot;
const Tournee = db.tournee;

exports.findAll = (req, res) => {
  return Adherent.findAll({
    include: [
      {
        model: Abonnement,
        as: "abonnements",
        attributes: ["id", "frequence", "description"],
        through: {
          model: SouscriptionAB,
          as: "souscription_abs",
          attributes: ["jour_livraison", "lieu_livraison", "statut"]
        }
      },
      {
        model: Adhesion,
        as: "adhesions",
        attributes: ["id", "type", "prix", "date_charniere",
                    "cotisation_degressive"],
        through: {
          model: SouscriptionAD,
          as: "souscription_ads",
          attributes: ["statut"]
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
          err.message || "Error while retrieving Adherents."
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    return Adherent.findByPk(id, {
        include: [
          {
            model: Abonnement,
            as: "abonnements",
            attributes: ["id", "frequence", "description"],
            through: {
              model: SouscriptionAB,
              as: "souscription_abs",
              attributes: ["jour_livraison", "lieu_livraison", "statut"]
            }
          },
          {
            model: Adhesion,
            as: "adhesions",
            attributes: ["id", "type", "prix", "date_charniere",
                        "cotisation_degressive"],
            through: {
              model: SouscriptionAD,
              as: "souscription_ads",
              attributes: ["statut"]
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
                err.message || "Error while finding Adherent."
            });
        });
};

exports.addAbonnement = (req, res) => {
    const adherentId = req.query.adherentId;
    const abonnementId = req.query.abonnementId;

    return Adherent.findByPk(adherentId).then((adherent) => {
      if (!adherent) {
        console.log("Adherent not found!");
        return null;
      }

      return Abonnement.findByPk(abonnementId).then((abonnement) => {
        if (!abonnement) {
          console.log("Abonnement not found!");
          return null;
        }

        adherent.addAbonnement(abonnement, {
          through: {
            jour_livraison: req.body.jour_livraison,
            lieu_livraison: req.body.lieu_livraison,
            statut: true
          },
        });

        return Depot.findByPk(req.body.lieu_livraison)
          .then(depot => {

            return Tournee.findOne({
              where: {
                  jour_livraison_panier: req.body.jour_livraison,
                  jardinId: depot.jardinId
            }})
              .then(tournee => {

                console.log("test");
                console.log(tournee.id);
                console.log(abonnementId);
                console.log(req.body.lieu_livraison);
                console.log("test");


                tournee.addAbonnement(abonnementId, {
                  through: {
                    prepare: false,
                    livre: false,
                    recupere: false,
                    depotId: req.body.lieu_livraison
                  },
                });

                res.send({
                  message: `Added Abonnement id=${abonnement.id} to Adherent id=${adherent.id}`
                });
            })
          })
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Abonnement to Adherent: ", err);
    });
};

exports.addAdhesion = (req, res) => {
  const adherentId = req.query.adherentId;
  const adhesionId = req.query.adhesionId;
  const jardinId = req.query.jardinId;
  const periodeId = req.query.periodeId;

  return Adherent.findByPk(adherentId).then((adherent) => {
    if (!adherent) {
      console.log("Adherent not found!");
      return null;
    }

    return Adhesion.findByPk(adhesionId).then((adhesion) => {
      if (!adhesion) {
        console.log("Adhesion not found!");
        return null;
      }

      return Jardin.findByPk(jardinId).then((jardin) => {
        if (!jardin) {
          console.log("Jardin not found!");
          return null;
        }

        return Periode.findByPk(periodeId).then((periode) => {
          if (!periode) {
            console.log("Periode not found!");
            return null;
          }

          adherent.addAdhesion(adhesion, {
            through: {
              statut: req.body.statut,
              jardinId: jardinId,
              periodeId: periodeId
            },
          });
          res.send({
              message: `Added Adhesion id=${adhesion.id} to Adherent id=${adherent.id}`
          });
        })
      })
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Adhesion to Adherent: ", err);
  });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Adherent.update(req.body, {
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Adherent was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update Adherent with id=${id}. Maybe Adherent was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Adherent with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Adherent.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Adherent was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Adherent with id=${id}. Maybe Adherent was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Adherent with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Adherent.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: `Adherent is already empty.`
          });

        for (const adherent in data){
            Adherent.destroy({
                where: { id: data[adherent].dataValues.id }
            })
        }
        res.send({
            message: `Adherents were deleted successfully!`
        });
    })
};