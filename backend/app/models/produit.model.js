module.exports = (sequelize, Sequelize) => {
    const Produit = sequelize.define("produit", {

        nom: {
            type: Sequelize.STRING(45)
        },
        unite: {
            type: Sequelize.STRING(45)
        },
        photo: {
            type: Sequelize.BLOB('long')
        },
        description:{
            type: Sequelize.STRING
        },
    });

    return Produit;
};