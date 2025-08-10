/* 
    Route of users / auth
    host + /api/auth
*/

const express = require("express");


const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { createUser, loginUser, revalueToken } = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validate-jwt");

const router = express.Router();

router.post(
    "/new", 
    [ //middlewares
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
        validarCampos
    ],
    createUser 
);

router.post(
    "/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
        validarCampos
    ], loginUser
);

router.get("/renew", validarJWT, revalueToken);


module.exports = router;