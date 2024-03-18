const { Router } = require('express');
const { getAllPokemonsHandler, getPokemonByIdHandler } = require('../handlers/handlerPokemons.js')
const { getPokemonByIdValidate } = require('../middleware/middlewarePokemons.js')

const routesPokemons = Router();

//Obtener todos los pokemons
///http://localhost:3001/pokemons/
routesPokemons.get('/', getAllPokemonsHandler);


//Obtener Pokemon por id
///http://localhost:3001/pokemons/:id
routesPokemons.get('/:idPokemon', getPokemonByIdValidate, getPokemonByIdHandler)



module.exports = routesPokemons;