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

module.exports = { getAllPokemons, getPokemonById };