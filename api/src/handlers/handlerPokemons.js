//importamos el controlador al que se redirigira la info
const { getAllPokemons, getPokemonById, getPokemonByName, createNewPokemon } = require('../controllers/controllerPokemons.js');


module.exports = {
    getAllPokemonsHandler: async (req, res, next) => {
        await getAllPokemons(req, res, next);
    },
    getPokemonByIdHandler: async (req, res, next) => {
        await getPokemonById(req, res, next);
    },
    getPokemonByNameHandler: async (req, res, next) => {
        await getPokemonByName(req, res, next);
    },
    createNewPokemonHandler: async (req, res, next) => {
        await createNewPokemon(req, res, next);
    }
};