const { Type, Pokemon } = require('../db');

//funcion controladora para obtener todos los tipos elementales
const getAllTypes = async (req, res, next) => {
    try {
        const allTypes = await Type.findAll({
            include: {
                model: Pokemon,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });

        return res.json(allTypes);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTypes
}