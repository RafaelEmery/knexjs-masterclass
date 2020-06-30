// Run npx knex init to create the file
// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'knex_test',
      user: 'postgres',
      password: '1234'
    },

    // Run npx knex migrate:make create_table_users (example) 
    // Run npx knex migrate:latest to run migrations
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },

    // Run npx knex seed:make 001_users
    // Run npx:knex seed:run (--specific file_name for seeding only one)
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
  onUpdateTrigger: table => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp()
  `
};

// To access the knex_test db:
// 'psql -U postgres' and put the password
// '\c knex_test' to navigate to db
// '\dt' to list all tables
//  '\d table_name' to see the table
// 'SELECT * FROM table_name' to see all the stuff
