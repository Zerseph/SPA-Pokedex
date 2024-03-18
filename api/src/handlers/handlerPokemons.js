//importamos el controlador al que se redirigira la info
const { getAllPokemons, getPokemonById } = require('../controllers/controllerPokemons.js')


module.exports = {
    getAllPokemonsHandler: async (req, res, next) => {
        await getAllPokemons(req, res, next);
    },
    getPokemonByIdHandler: async (req, res, next) => {
        await getPokemonById(req, res, next);
    }
}