module.exports = (sequelize, Sequelize) => {
    const Depot = sequelize.define("depot", {

        nom: {
            type: Sequelize.STRING(45)
        },
        adresse: {
            type: Sequelize.STRING(100)
        },
        code_postal: {
            type: Sequelize.INTEGER(6)
        },
        ville: {
            type: Sequelize.STRING(100)
        },
        telephone: {
            type: Sequelize.STRING(20)
        },
        mail_structure: {
            type: Sequelize.STRING(100)
        },
        site_web_structure: {
            type: Sequelize.STRING(100)
        },
        nom_contact: {
            type: Sequelize.STRING(45)
        },
        prenom_contact: {
            type: Sequelize.STRING(45)
        },
        telephone_contact: {
            type: Sequelize.STRING(20)
        },
        creneau_recuperation: {
            type: Sequelize.STRING
        },
        presentation: {
            type: Sequelize.STRING
        },

    });

    return Depot;
};