const db = require("../models");
const SouscriptionAB = db.souscriptionAB;
const Abonnement = db.abonnement;
const Depot = db.depot;
const Jour = db.jour;

exports.findAllDatesByAdherentAndAbonnementIds = (req, res) => {
    const adherentId = req.params.adherentId;
    const abonnementId = req.params.abonnementId;

    var datesTab = [];

    return SouscriptionAB.findOne({
        where: {
            adherent_id: adherentId,
            abonnement_id: abonnementId
        }})
  
    .then(data => {

        return Depot.findByPk(data[0].lieu_livraison, 
            {
                include: [
                    {
                        model: Jour,
                        as: "jours",
                        attributes: ["id", "date"],
                        through: {
                            attributes: [],
                        }
                    }
                ]
            }
        )

        .then(depot => {

            var indice;

            for (i = 0 ; i < depot.jours.length ; i++){
                if (depot.jours[i].date == data[0].jour_livraison){
                    indice = i;
                }
            }

            datesTab.push(data[0].jour_livraison);

            return Abonnement.findByPk(data[0].abonnement_id)

            .then(abonnement => {

                switch (abonnement.frequence) {
                    case '1':
                        for(let i = indice; i < depot.jours.length - 1; i++ ){
                            datesTab.push(depot.jours[i+1].date);
                        }
                        break;
                    case '2':
                        for(let i = indice; i < depot.jours.length - 2; i +=2 ){
                            datesTab.push(depot.jours[i+2].date);
                        }
                        break;
                    case '3':
                        for(let i = indice; i < depot.jours.length - 3; i += 3 ){
                            datesTab.push(depot.jours[i+3].date);
                        }
                        break;
                    default:
                        for(let i = indice; depot.jours.length - 1; i++ ){
                            datesTab.push(depot.jours[i+1].date);
                        }
                        break;
                }

                res.send(datesTab);
            }) 
        })  
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving SouscriptionABs."
      });
    });
};

exports.update = (req, res) => {
    const adherentId = req.params.adherentId;
    const abonnementId = req.params.abonnementId;

    SouscriptionAB.update(req.body, {
        where: { 
            adherent_id: adherentId,
            abonnement_id: abonnementId,
        }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "SouscriptionAB was updated successfully."
            });
        } 
        else {
            res.send({
                message: `Cannot update SouscriptionAB with id=${id}. Maybe SouscriptionAB was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating SouscriptionAB with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    SouscriptionAB.destroy({
        where: { id: id }
    })

        .then(num => {
        if (num == 1) {
            res.send({
                message: "SouscriptionAB was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete SouscriptionAB with id=${id}. Maybe SouscriptionAB was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete SouscriptionAB with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    SouscriptionAB.findAll()

    .then(data => {
        if(data.length === 0) 
          return res.send({
            message: `SouscriptionAB is already empty.`
          });

        for (const adherent in data){
            SouscriptionAB.destroy({
                where: { id: data[adherent].dataValues.id }
            })
        }
        res.send({
            message: `SouscriptionABs were deleted successfully!`
        });
    })
};