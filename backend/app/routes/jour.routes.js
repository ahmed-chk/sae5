module.exports = app => {
    const jours = require("../controllers/jour.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], jours.create);

    router.get("/", [authJwt.verifyToken], jours.findAll);

    router.get("/:id", [authJwt.verifyToken], jours.findById);

    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], jours.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], jours.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], jours.deleteAll);
  
    app.use('/api/jour', router);
  };