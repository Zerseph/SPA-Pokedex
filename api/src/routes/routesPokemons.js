const { Router } = require('express');
const { getAllPokemonsHandler, getPokemonByIdHandler, getPokemonByNameHandler, createNewPokemonHandler } = require('../handlers/handlerPokemons.js')
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

//Crear Pokemons
// {
//     "id": 1901,
//     "name": "Bulbasaur Ultra X",
//     "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
//     "hp": 450,
//     "attack": 490,
//     "defense": 490,
//     "special_attack": 650,
//     "special_defense": 650,
//     "speed": 450,
//     "height": 7,
//     "weight": 69,
//     "Types": [1, 3]
//   }
///http://localhost:3001/pokemons/

routesPokemons.post('/', createNewPokemonHandler)


module.exports = routesPokemons;