module.exports = app => {
    const adhesions = require("../controllers/adhesion.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], adhesions.create);

    router.get("/", [authJwt.verifyToken], adhesions.findAll);

    router.get("/:id", [authJwt.verifyToken], adhesions.findById);

    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], adhesions.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], adhesions.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], adhesions.deleteAll);
  
    app.use('/api/adhesion', router);
  };