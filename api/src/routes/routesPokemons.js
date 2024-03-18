const { Router } = require('express');
const { getAllPokemonsHandler } = require('../handlers/handlerPokemons.js')

const routesPokemons = Router();

//Obtener todos los pokemons
///http://localhost:3001/pokemons/
routesPokemons.get('/', getAllPokemonsHandler);



module.exports = routesPokemons;