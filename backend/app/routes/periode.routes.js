module.exports = app => {
    const periodes = require("../controllers/periode.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], periodes.create);

    router.get("/", [authJwt.verifyToken], periodes.findAll);

    router.get("/:id", [authJwt.verifyToken], periodes.findById);

    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], periodes.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], periodes.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], periodes.deleteAll);
  
    app.use('/api/periode', router);
  };
