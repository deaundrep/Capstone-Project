const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
    createUser,
    loginUser,
    revalidToken,
} = require("../controllers/auth");
const { validField } = require("../middlewares/validate-fields");
const { validJWT } = require("../middlewares/valid-jwt");

router.post(
    "/new",
    [
        check("name", "check  name please").not().isEmpty(),
        check("email", "check email").isEmail(),
        check(
            "password",
            "need 3 char"
        ).isLength({ min: 3 }),
        validField,
    ],
    createUser
);

router.post(
    "/",
    [
        check("email", "check").isEmail(),
        check(
            "password",
            "password needs 3 char"
        ).isLength({ min: 3 }),
        validField,
    ],
    loginUser
);

router.get("/renew", validJWT, revalidToken);

module.exports = router;