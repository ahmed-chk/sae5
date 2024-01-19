module.exports = (sequelize, Sequelize) => {
    const Adherent = sequelize.define("adherent", {
        raison_sociale: {
            type: Sequelize.STRING(45)
        },
        civilite: {
            type: Sequelize.STRING(45)
        },
        nom: {
            type: Sequelize.STRING(45)
        },
        prenom: {
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
        telephone1: {
            type: Sequelize.STRING(20)
        },
        telephone2: {
            type: Sequelize.STRING(20)
        },
        telephone3: {
            type: Sequelize.STRING(20)
        },
        role: {
            type: Sequelize.INTEGER(1) // 1 pour adherent et 2 pour admin
        },
        mail: {
            type: Sequelize.STRING(100)
        },
        profession: {
            type: Sequelize.STRING(45)
        },
        date_naissance: {
            type: Sequelize.DATEONLY
        },
        mdp: {
            type: Sequelize.STRING
        },
        date_premiere_adhesion: {
            type: Sequelize.DATEONLY
        },
        expiration_derniere_adhesion: {
            type: Sequelize.DATEONLY
        }
    });

    return Adherent;
};