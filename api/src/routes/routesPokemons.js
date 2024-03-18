const { Router } = require('express');
const { getAllPokemonsHandler, getPokemonByIdHandler, getPokemonByNameHandler } = require('../handlers/handlerPokemons.js')
const { getPokemonByIdValidate, getPokemonByNameValidate } = require('../middleware/middlewarePokemons.js')

const routesPokemons = Router();

//Obtener Pokemon por name
routesPokemons.get('/name', getPokemonByNameValidate, getPokemonByNameHandler);


//Obtener Pokemon por id
///http://localhost:3001/pokemons/:id
routesPokemons.get('/:idPokemon', getPokemonByIdValidate, getPokemonByIdHandler);


//Obtener todos los pokemons
///http://localhost:3001/pokemons/
routesPokemons.get('/', getAllPokemonsHandler);


module.exports = routesPokemons;