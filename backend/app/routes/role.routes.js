module.exports = app => {
    const roles = require("../controllers/role.controller");

    const router = require("express").Router();

    const { authJwt } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/all", roles.allAccess);

    router.get("/adherent", [authJwt.verifyToken], roles.adherentBoard);

    router.get(
        "/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        roles.adminBoard
    );

    app.use('/api/test', router);
};
