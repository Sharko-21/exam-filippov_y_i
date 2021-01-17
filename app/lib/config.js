const config = require("../config/config.json")[process.env.NODE_ENV];

module.exports = field => config[field];
