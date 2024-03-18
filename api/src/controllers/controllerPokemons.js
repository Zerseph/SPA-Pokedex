const { Pokemon, Type } = require('../db');

//Funcion para obtener todos los pokemons
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

module.exports = { getAllPokemons };