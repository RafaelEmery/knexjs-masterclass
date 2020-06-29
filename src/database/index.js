// The const knex receive the module develpment with our postgre db
const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

//Export for using in controllers
module.exports = knex;