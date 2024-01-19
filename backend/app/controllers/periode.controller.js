const db = require("../models");
const Periode = db.periode;

exports.create = (req, res) => {
  const periode = {
    duree: req.body.duree,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
  };

  Periode.create(periode)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Periode."
      });
    });
};

exports.findAll = (req, res) => {
  return Periode.findAll()
  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving Periodes."
      });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  return Periode.findByPk(id)

    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Error while finding Periode."
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Periode.update(req.body, {
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

    Periode.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "Periode was deleted successfully!"
            });
        } else {
            res.send({
                message: "Cannot delete Periode with id=${id}. Maybe Periode was not found!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Periode with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Periode.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: "Periode is already empty."
          });

        for (const periode in data){
            Periode.destroy({
                where: { id: data[periode].dataValues.id }
            })
        }
        res.send({
            message: "Periodes were deleted successfully!"
        });
    })
};