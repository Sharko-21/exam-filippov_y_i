const QueryFile = require('pg-promise')().QueryFile;

const sql = file => new QueryFile(`${__dirname}/${file}`, {
  minify: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development'
});

module.exports = {
  /*
      Sorted by alphabet, please maintain it that way
   */
  image: {
    insert: sql('image/insert.sql')
  },
  musician: {
    findByID: sql('musician/findByID.sql'),
    insert: sql('musician/insert.sql'),
    updateImage: sql('musician/updateImage.sql'),
  }
};

