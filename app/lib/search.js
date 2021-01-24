const db = require('./db');
const sql = require('../sql');

const ByEnsemble = async filters => {
    return db.manyOrNone(sql.ensemble.findByName, {
        name: filters.name
    }).then(ensembles => {
        return ensembles;
    });
};

const ByMusician = async filters => {
    return db.manyOrNone(sql.musician.findByName, {
        name: filters.name
    }).then(musicians => {
        return musicians;
    });
};

const ByComposition = async filters => {
    return db.manyOrNone(sql.composition.findByName, {
        name: filters.name
    }).then(compositions => {
        return compositions;
    });
};

const ByPlate = async filters => {
    return db.manyOrNone(sql.plate.findByName, {
        name: filters.name
    }).then(plates => {
        return plates;
    });
};

module.exports = {
    ByEnsemble, ByMusician, ByComposition, ByPlate
};