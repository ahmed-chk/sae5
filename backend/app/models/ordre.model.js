module.exports = (sequelize, Sequelize) => {
    const Ordre = sequelize.define("ordre", {
      
        numero_ordre: {
            type: Sequelize.INTEGER
        },
    });

    return Ordre;
};