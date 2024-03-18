const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db');

//Funcion controladora para obtener todos los pokemons
const getAllPokemons = async (req, res, next) => {
    try {
        const allPokemons = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });

        return res.json(allPokemons);

    } catch (error) {
        next(error);
    }
}

//Funcion controladora para obtener pokemon por el id
const getPokemonById = async (req, res, next) => {
    try {
        const { idPokemon } = req.params;

        //Buscar el pais en la DB
        const detailsPokemon = await Pokemon.findByPk(idPokemon, {
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: [] }
            }
        })
        if (!detailsPokemon) {
            return res.status(404).json({ error: 'Pokemon not found.' });
        }
        return res.json(detailsPokemon);

    } catch (error) {
        next(error);
    }
}

//funcion controladora para obtener pokemons por name
const getPokemonByName = async (req, res, next) => {
    try {
        const { name } = req.query;

        let foundPokemons;

        //opcion de que busque tambien por id en caso que quiera habilitarla
        // if (!isNaN(parseInt(name))) {
        //     // Si el parámetro "name" es un número, busca el Pokémon por su identificador
        //     foundPokemons = await Pokemon.findAll({
        //         where: {
        //             id: parseInt(name)
        //         },
        //         include: {
        //             model: Type,
        //             attributes: ['name'],
        //             through: { attributes: [] }
        //         }
        //     });
        // } else {
        //     debo ingresar aqui el codigo de buscar por name si deseo habilitar esta opcion
        // }


        // Si el parámetro "name" no es un número, busca el Pokémon por su nombre
        foundPokemons = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: {
                model: Type,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });

        // Verificar si se encontraron pokemons
        if (foundPokemons.length === 0) {
            return res.status(404).json({ mensaje: 'No Pokémon found with the provided name or ID.' });
        } else {
            // Retornamos los pokemons encontrados
            return res.json(foundPokemons)
        }

    } catch (error) {
        next(error);
    }
}

module.exports = { getAllPokemons, getPokemonById, getPokemonByName };