module.exports = (sequelize, Sequelize) => {
    const Jardin = sequelize.define("jardin", {

        nom_commercial: {
            type: Sequelize.STRING(45)
        },
        ville: {
            type: Sequelize.STRING(100)
        },
        raison_sociale: {
            type: Sequelize.STRING(45)
        },
        siege_social: {
            type: Sequelize.STRING(100)
        },
        adresse_gestion: {
            type: Sequelize.STRING(100)
        },
        telephone: {
            type: Sequelize.STRING(20)
        },
        mail: {
            type: Sequelize.STRING(100)
        },
        nom_contact: {
            type: Sequelize.STRING(45)
        },
        site_web: {
            type: Sequelize.STRING(100)
        },
        
    });

    return Jardin;
};