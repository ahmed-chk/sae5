module.exports = app => {
    const controller = require("../controllers/auth.controller");

    var router = require("express").Router();

    const { verifySignUp } = require("../middleware");

    router.use((req, res, next) => {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/signup", [verifySignUp.checkDuplicateMail], controller.signup);
    router.post("/signin", controller.signin);

    app.use('/api/auth', router);
};
