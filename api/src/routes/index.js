const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesPokemons = require('./routesPokemons.js');
const routesTypes = require('./routesTypes.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', routesPokemons);

router.use('/types', routesTypes);

module.exports = router;
