module.exports = (sequelize, Sequelize) => {
    const Jour = sequelize.define("jour", {

        date: {
            type: Sequelize.DATEONLY
        },
    });

    return Jour;
};