module.exports = app => {
    const depots = require("../controllers/depot.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], depots.create);

    router.get("/", [authJwt.verifyToken], depots.findAll);

    router.get("/:id", [authJwt.verifyToken], depots.findById);

    router.post("/jour", [authJwt.verifyToken, authJwt.isAdmin], depots.addJour);

    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], depots.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], depots.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], depots.deleteAll);
  
    app.use('/api/depot', router);
  };