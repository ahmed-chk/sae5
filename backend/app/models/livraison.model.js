module.exports = (sequelize, Sequelize) => {
    const Livraison = sequelize.define("livraison", {
        id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        prepare: {
            type: Sequelize.BOOLEAN
        },
        livre: {
            type: Sequelize.BOOLEAN
        },
        recupere: {
            type: Sequelize.BOOLEAN
        },

    });

    return Livraison;
};