const { getAllTypes } = require('../controllers/controllerTypes.js');


module.exports = {
    getAllTypesHandler: async (req, res, next) => {
        await getAllTypes(req, res, next);
    }
};