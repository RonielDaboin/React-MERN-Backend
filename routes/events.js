/*
    * Rutas de eventos
    * host + /api/events
    * Ejemplo: 
    *  host/api/events
    *  host/api/events/123
*/  

const express = require("express");
const { getEvents, createEvents, updateEvents, deleteEvents } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = express.Router();

//todas tienen que pasar por la validación por el JWT
router.use(validarJWT);

//obtener eventos
router.get('/', validarJWT, getEvents);

//crear eventos
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    validarJWT, 
    createEvents);

//actualizar eventos
router.put('/:id', validarJWT, updateEvents);

//eliminar eventos
router.delete('/:id',validarJWT, deleteEvents);

module.exports = router;