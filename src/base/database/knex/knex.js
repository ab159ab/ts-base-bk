const knexFile = require("../../../../knexfile");

const knexConfig = knexFile[process.env.ENV.trim()];

module.exports = require("knex")(knexConfig);
