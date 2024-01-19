module.exports = (sequelize, Sequelize) => {
    const SouscriptionAB = sequelize.define("souscription_ab", {
        jour_livraison: {
            type: Sequelize.DATEONLY
        },
        lieu_livraison: {
            type: Sequelize.INTEGER
        },
        statut: {
            type: Sequelize.BOOLEAN
        }
    });

    return SouscriptionAB;
};