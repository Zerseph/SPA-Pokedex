const { Router } = require('express');
const { getAllTypesHandler } = require('../handlers/handlerTypes.js')

const routesTypes = Router();


//Obtener todos los tipos elementales
///http://localhost:3001/types/
routesTypes.get('/', getAllTypesHandler);


module.exports = routesTypes;