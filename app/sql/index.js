const QueryFile = require('pg-promise')().QueryFile;

const sql = file => new QueryFile(`${__dirname}/${file}`, {
  minify: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development'
});

module.exports = {
  /*
      Sorted by alphabet, please maintain it that way
   */
  musician: {
    findByID: sql('musician/findByID.sql'),
  }
};

