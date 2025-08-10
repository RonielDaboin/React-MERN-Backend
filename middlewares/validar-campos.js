const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    // manejo de errores
  const erros = validationResult( req );
    if ( !erros.isEmpty() ) {
      return res.status(400).json({
        ok: false,
        errors: erros.mapped()
      });
    }
  next();
}

module.exports = {
  validarCampos
};