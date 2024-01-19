module.exports = app => {
    const abonnements = require("../controllers/abonnement.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], abonnements.create);

    router.get("/", [authJwt.verifyToken], abonnements.findAll);

    router.get("/:id", [authJwt.verifyToken], abonnements.findById);

    router.post("/produit", [authJwt.verifyToken, authJwt.isAdmin], abonnements.addProduit);

    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], abonnements.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], abonnements.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], abonnements.deleteAll);
  
    app.use('/api/abonnement', router);
  };