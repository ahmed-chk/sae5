const db = require("../models");
const Abonnement = db.abonnement;
const Adherent = db.adherent;
const Produit = db.produit;
const Jardin = db.jardin;
const SouscriptionAB = db.souscriptionAB;

exports.create = (req, res) => {
  const abonnement = {
    frequence: req.body.frequence, 
    description: req.body.description
  };

  Abonnement.create(abonnement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Abonnement."
      });
    });
};

exports.findAll = (req, res) => {
  return Abonnement.findAll({
    include: [
      {
        model: Adherent,
        as: "adherents",
        attributes: ["id", "raison_sociale", "civilite", "nom",
                    "prenom", "adresse", "code_postal", "ville",
                    "telephone1", "telephone2", "telephone3", "role",
                    "mail", "profession", "date_naissance", "mdp",
                    "date_premiere_adhesion", "expiration_derniere_adhesion"],
        through: {
          model: SouscriptionAB,
          as: "souscription_abs",
          attributes: ["jour_livraison", "lieu_livraison", "statut"]
        }
      },
      {
        model: Produit,
        as: "produits",
        attributes: ["id", "nom", "unite", "description"],
        through: {
          attributes: [],
        }
      },
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
    ],
  })
  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving Abonnements."
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    return Abonnement.findByPk(id, {
        include: [
          {
            model: Adherent,
            as: "adherents",
            attributes: ["id", "raison_sociale", "civilite", "nom",
                        "prenom", "adresse", "code_postal", "ville",
                        "telephone1", "telephone2", "telephone3", "role",
                        "mail", "profession", "date_naissance", "mdp",
                        "date_premiere_adhesion", "expiration_derniere_adhesion"],
            through: {
              model: SouscriptionAB,
              as: "souscription_abs",
              attributes: ["jour_livraison", "lieu_livraison", "statut"]
            }
          },
          {
            model: Produit,
            as: "produits",
            attributes: ["id", "nom", "unite", "description"],
            through: {
              attributes: [],
            }
          },
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
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Error while finding Abonnement."
            });
        });
};

exports.addProduit = (req, res) => {
  const abonnementId = req.query.abonnementId;
  const produitId = req.query.produitId;

  return Abonnement.findByPk(abonnementId).then((abonnement) => {
    if (!abonnement) {
      console.log("Abonnement not found!");
      return null;
    }

    return Produit.findByPk(produitId).then((produit) => {
      if (!produit) {
        console.log("Produit not found!");
        return null;
      }

      abonnement.addProduit(produit);
      res.send({
          message: `Added Produit id=${produit.id} to Abonnement id=${abonnement.id}`
      });
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Produit to Abonnement: ", err);
  });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Abonnement.update(req.body, {
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Abonnement was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update Abonnement with id=${id}. Maybe Abonnement was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Abonnement with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Abonnement.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Abonnement was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Abonnement with id=${id}. Maybe Abonnement was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Abonnement with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Abonnement.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: `Abonnement is already empty.`
          });

        for (const abonnement in data){
            Abonnement.destroy({
                where: { id: data[abonnement].dataValues.id }
            })
        }
        res.send({
            message: `Abonnements were deleted successfully!`
        });
    })
};