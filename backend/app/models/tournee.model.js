module.exports = (sequelize, Sequelize) => {
    const Tournee = sequelize.define("tournee", {

        jour_preparation_panier: {
            type: Sequelize.DATEONLY
        },
        jour_livraison_panier: {
            type: Sequelize.DATEONLY
        },
        couleur: {
            type: Sequelize.STRING(45)
        },
    });

    return Tournee;
};