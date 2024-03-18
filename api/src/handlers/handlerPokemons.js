//importamos el controlador al que se redirigira la info
const {getAllPokemons} = require('../controllers/controllerPokemons.js')


module.exports = {
    getAllPokemonsHandler: async (req, res, next) => {
        await getAllPokemons(req, res, next);
    }
}