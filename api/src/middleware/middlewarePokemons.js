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


module.exports = {
    getPokemonByIdValidate,
}