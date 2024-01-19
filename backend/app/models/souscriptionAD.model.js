module.exports = (sequelize, Sequelize) => {
    const SouscriptionAD = sequelize.define("souscription_ad", {
       
        statut: {
            type: Sequelize.BOOLEAN
        }
    });

    return SouscriptionAD;
};