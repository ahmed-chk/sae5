module.exports = (sequelize, Sequelize) => {
    const Abonnement = sequelize.define("abonnement", {

        frequence: {
            type: Sequelize.INTEGER(1)
        },
        description: {
            type: Sequelize.STRING
        },
    });

    return Abonnement;
};