module.exports = app => {
    const jardins = require("../controllers/jardin.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], jardins.create);

    router.get("/", [authJwt.verifyToken], jardins.findAll);

    router.get("/:id", [authJwt.verifyToken], jardins.findById);

    router.post("/abonnement", [authJwt.verifyToken, authJwt.isAdmin], jardins.addAbonnement);

    router.post("/adhesion", [authJwt.verifyToken, authJwt.isAdmin], jardins.addAdhesion);

    router.post("/depot", [authJwt.verifyToken, authJwt.isAdmin], jardins.addDepot);

    router.post("/tournee", [authJwt.verifyToken, authJwt.isAdmin], jardins.addTournee);

    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], jardins.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], jardins.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], jardins.deleteAll);
  
    app.use('/api/jardin', router);
  };