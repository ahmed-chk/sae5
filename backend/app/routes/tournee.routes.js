module.exports = app => {
    const tournees = require("../controllers/tournee.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], tournees.create);

    router.get("/", [authJwt.verifyToken], tournees.findAll);

    router.get("/adresse", [authJwt.verifyToken], tournees.findAddressesByDate);

    router.get("/:id", [authJwt.verifyToken], tournees.findById);

    router.post("/depot", [authJwt.verifyToken, authJwt.isAdmin], tournees.addDepot);

    router.post("/abonnement-depot", [authJwt.verifyToken, authJwt.isAdmin], tournees.addAbonnementDepot);

    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], tournees.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], tournees.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], tournees.deleteAll);
  
    app.use('/api/tournee', router);
  };