const db = require("../models");
const Produit = db.produit;
const Abonnement = db.abonnement;

exports.create = (req, res) => {
  const produit = {
    nom: req.body.nom, 
    unite: req.body.unite,
    description: req.body.description
  };

  Produit.create(produit)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Produit."
      });
    });
};

exports.findAll = (req, res) => {
  return Produit.findAll({
    include: [
      {
        model: Abonnement,
        as: "abonnements",
        attributes: ["id", "frequence", "description"],
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
          err.message || "Error while retrieving Produits."
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    return Produit.findByPk(id, {
        include: [
        {
            model: Abonnement,
            as: "abonnements",
            attributes: ["id", "frequence", "description"],
            through: {
                attributes: [],
            },
        },
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Error while finding Produit."
            });
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

    Produit.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Produit was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Produit with id=${id}. Maybe Produit was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Produit with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Produit.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: `Produit is already empty.`
          });

        for (const produit in data){
            Produit.destroy({
                where: { id: data[produit].dataValues.id }
            })
        }
        res.send({
            message: `Produits were deleted successfully!`
        });
    })
};