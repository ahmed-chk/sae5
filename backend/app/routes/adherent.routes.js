module.exports = app => {
    const adherents = require("../controllers/adherent.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], adherents.findAll);

    router.get("/:id", [authJwt.verifyToken], adherents.findById);

    router.post("/abonnement", [authJwt.verifyToken], adherents.addAbonnement);

    router.post("/adhesion", [authJwt.verifyToken], adherents.addAdhesion);

    router.put("/:id", [authJwt.verifyToken], adherents.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], adherents.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], adherents.deleteAll);
  
    app.use('/api/adherent', router);
  };
