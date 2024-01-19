module.exports = app => {
    const souscriptionABs = require("../controllers/souscriptionAB.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/:adherentId/:abonnementId", [authJwt.verifyToken], souscriptionABs.findAllDatesByAdherentAndAbonnementIds);

    router.put("/:adherentId/:abonnementId", [authJwt.verifyToken], souscriptionABs.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], souscriptionABs.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], souscriptionABs.deleteAll);
  
    app.use('/api/souscriptionAB', router);
  };