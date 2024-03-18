const getPokemonByIdValidate = (req, res, next) => {
    try {
        //Verificar si el id es una propiedad en req.params
        if (req.params.hasOwnProperty('idPokemon')) {
            const { idPokemon } = req.params;

            //El id debe ser un numero entero
            if (!Number.isInteger(parseInt(idPokemon))) {
                throw new Error('The id must be an integer');
            }

            //No se permite un id exageradamente tan largo ya que no existe
            if (idPokemon.length > 15) {
                throw new Error('The id you provided is extremely long, please provide a correct id')
            }
        };
        // Pasar al siguiente middleware si todo está correcto
        next();
    } catch (error) {
        // Manejar errores y enviar una respuesta de error al cliente
        res.status(400).send(error.message);

    }
}

const getPokemonByNameValidate = (req, res, next) => {
    try {
        const { name } = req.query;
        if (!name || name.trim().length === 0) {
            throw new Error('Query parameter "name" is required.');
        }
        // Validar los caracteres permitidos en el nombre del Pokémon
        const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
        if (!allowedCharacters.test(name)) {
            throw new Error('Invalid characters in the query parameter "name".');
        }

        // Verificar si el nombre es una cadena o un número (si es un número, tratarlo como cadena para buscar el id tambien)
        // if (typeof name !== 'string' && !(typeof name === 'number' && !isNaN(name))) {
        //     throw new Error('The query parameter "name" must be either a string or a number.');
        // }
        
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
}


module.exports = {
    getPokemonByIdValidate,
    getPokemonByNameValidate,
}