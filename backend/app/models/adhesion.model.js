module.exports = (sequelize, Sequelize) => {
    const Adhesion = sequelize.define("adhesion", {
        type: {
            type: Sequelize.STRING(45)
        },
        prix: {
            type: Sequelize.FLOAT(4, 2)
        },
        date_charniere: {
            type: Sequelize.DATEONLY
        },
        cotisation_degressive: {
            type: Sequelize.STRING(1)
        },
    });

    return Adhesion;
};