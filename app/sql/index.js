const QueryFile = require('pg-promise')().QueryFile;

const sql = file => new QueryFile(`${__dirname}/${file}`, {
  minify: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development'
});

module.exports = {
  /*
      Sorted by alphabet, please maintain it that way
   */
  composition: {
    findByEnsembleID: sql('composition/findByEnsembleID.sql'),
    findByIDs: sql('composition/findByIDs.sql'),
    findByName: sql('composition/findByName.sql'),
  },
  ensemble: {
    findByIDs: sql('ensemble/findByIDs.sql'),
    findByName: sql('ensemble/findByName.sql'),
  },
  image: {
    insert: sql('image/insert.sql')
  },
  musician: {
    findByEnsembleID: sql('musician/findByEnsembleID.sql'),
    findByID: sql('musician/findByID.sql'),
    findByName: sql('musician/findByName.sql'),
    insert: sql('musician/insert.sql'),
    updateImage: sql('musician/updateImage.sql'),
  }
};

