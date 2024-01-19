const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Supprime les tables existantes et resynchronise la base de données
/*
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/

db.adherent = require("./adherent.model.js")(sequelize, Sequelize);
db.abonnement = require("./abonnement.model.js")(sequelize, Sequelize);
db.souscriptionAB = require("./souscriptionAB.model.js")(sequelize, Sequelize);
db.souscriptionAD = require("./souscriptionAD.model.js")(sequelize, Sequelize);
db.adhesion = require("./adhesion.model.js")(sequelize, Sequelize);
db.depot = require("./depot.model.js")(sequelize, Sequelize);
db.jardin = require("./jardin.model.js")(sequelize, Sequelize);
db.jour = require("./jour.model.js")(sequelize, Sequelize);
db.periode = require("./periode.model.js")(sequelize, Sequelize);
db.produit = require("./produit.model.js")(sequelize, Sequelize);
db.tournee = require("./tournee.model.js")(sequelize, Sequelize);
db.ordre = require("./ordre.model.js")(sequelize, Sequelize);
db.livraison = require("./livraison.model.js")(sequelize, Sequelize);

// Association Adherent n - n Abonnement
db.adherent.belongsToMany(db.abonnement, {
  through: db.souscriptionAB,
  foreignKey: "adherent_id"
});
db.abonnement.belongsToMany(db.adherent, {
  through: db.souscriptionAB,
  foreignKey: "abonnement_id"
});

// Association Abonnement n - n Produit
db.abonnement.belongsToMany(db.produit, {
  through: "Abonnement_Produit",
  foreignKey: "abonnement_id"
});
db.produit.belongsToMany(db.abonnement, {
  through: "Abonnement_Produit",
  foreignKey: "produit_id"
});

// Association Jardin n - n Abonnement
db.jardin.belongsToMany(db.abonnement, {
  through: "Jardin_Abonnement",
  foreignKey: "jardin_id"
});
db.abonnement.belongsToMany(db.jardin, {
  through: "Jardin_Abonnement",
  foreignKey: "abonnement_id"
});

// Association Jardin n - n Adhesion
db.jardin.belongsToMany(db.adhesion, {
  through: "Jardin_Adhesion",
  foreignKey: "jardin_id"
});
db.adhesion.belongsToMany(db.jardin, {
  through: "Jardin_Adhesion",
  foreignKey: "adhesion_id"
});

// Association Jardin n - n Adhesion
db.jardin.belongsToMany(db.adhesion, {
  through: "Jardin_Adhesion",
  foreignKey: "jardin_id"
});
db.adhesion.belongsToMany(db.jardin, {
  through: "Jardin_Adhesion",
  foreignKey: "adhesion_id"
});

// Association Depot n - n Jour
db.depot.belongsToMany(db.jour, {
  through: "Calendrier",
  foreignKey: "depot_id"
});
db.jour.belongsToMany(db.depot, {
  through: "Calendrier",
  foreignKey: "jour_id"
});

// Association Depot n - n Tournee
db.depot.belongsToMany(db.tournee, {
  through: db.ordre,
  foreignKey: "depot_id"
});
db.tournee.belongsToMany(db.depot, {
  through: db.ordre,
  foreignKey: "tournee_id"
});

// Association Jardin 1 - n Depot 
db.jardin.hasMany(db.depot);
db.depot.belongsTo(db.jardin);

// Association Jardin 1 - n Tournee 
db.jardin.hasMany(db.tournee);
db.tournee.belongsTo(db.jardin);

// Association ternaire Abonnement, Tournee et Depot

db.tournee.belongsToMany(db.abonnement, {
  through: db.livraison
});
db.abonnement.belongsToMany(db.tournee, {
  through: db.livraison
});
db.depot.hasMany(db.livraison);
db.livraison.belongsTo(db.depot);

// Association quaternaire Adherent, Jardin, Adhesion et Periode

db.adherent.belongsToMany(db.adhesion, {
  through: db.souscriptionAD
});
db.adhesion.belongsToMany(db.adherent, {
  through: db.souscriptionAD
});
db.jardin.hasMany(db.souscriptionAD);
db.souscriptionAD.belongsTo(db.jardin);
db.periode.hasMany(db.souscriptionAD);
db.souscriptionAD.belongsTo(db.periode);

module.exports = db;