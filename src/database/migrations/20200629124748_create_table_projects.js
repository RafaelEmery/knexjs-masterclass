const { onUpdateTrigger } = require('../../../knexfile');

// Docs: http://knexjs.org/#Schema-createTable
exports.up = async knex => knex.schema.createTable('projects', table => { 
    table.increments('id');
    table.text('title').notNullable();
    
    // Relationship
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');

    table.timestamps(true, true);
}).then(() => knex.raw(onUpdateTrigger('projects')));

exports.down = async knex => knex.schema.dropTable('projects'); 

