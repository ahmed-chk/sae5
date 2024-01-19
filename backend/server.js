const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SAE5." });
});

require("./app/routes/abonnement.routes")(app);
require("./app/routes/adherent.routes")(app);
require("./app/routes/adhesion.routes")(app);
require("./app/routes/depot.routes")(app);
require("./app/routes/jardin.routes")(app);
require("./app/routes/jour.routes")(app);
require("./app/routes/periode.routes")(app);
require("./app/routes/produit.routes")(app);
require("./app/routes/souscriptionAB.routes")(app);
require("./app/routes/tournee.routes")(app);

require('./app/routes/auth.routes')(app);
require('./app/routes/role.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});