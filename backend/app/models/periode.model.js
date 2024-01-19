module.exports = (sequelize, Sequelize) => {
    const Periode = sequelize.define("periode", {

        duree: {
            type: Sequelize.STRING(45)
        },
        date_debut: {
            type: Sequelize.DATEONLY
        },
        date_fin: {
            type: Sequelize.DATEONLY
        },
        
    });

    return Periode;
};