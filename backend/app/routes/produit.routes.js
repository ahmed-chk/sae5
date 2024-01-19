module.exports = app => {
    const produits = require("../controllers/produit.controller.js");
  
    var router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], produits.create);

    router.get("/", [authJwt.verifyToken], produits.findAll);

    router.get("/:id", [authJwt.verifyToken], produits.findById);

    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], produits.update);

    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], produits.delete);

    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], produits.deleteAll);
  
    app.use('/api/produit', router);
  };