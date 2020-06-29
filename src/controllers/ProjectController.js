const knex = require('../database');

// Export for using in routes.js
// Async and await is another way to deal with Promises like '.then(...)'
// Steps: async + await + knex + return res

// Need to test all the requests (!!!)
module.exports = {
    // Getting all the projects and by the user_id query
    // Pagination is a query params also
    // http://localhost:3333/projects?user_id=1&page=5 (example)
    async index(req, res, next) {
        try {
            const { user_id, page = 1 } =  req.query;

            // Paginating the project's list
            const query = knex('projects').limit(5).offset((page-1) * 5);

            const countObj = knex('projects').count();

            // Verify the query and join the project(s) + user(s)
            if (user_id) {
                query
                    .where({ user_id })
                    .join('users', 'users.id', '=', 'projects.user_id')
                    .select('projects.*', 'users.username')
                    .where('users.deleted_at', null);
                
                // Counting total per user
                countObj
                    .where({ user_id })
            }   

            // Getting the total projects (count) and sending in header
            const [ count ] = await countObj;
            console.log(count);

            res.header('X-Total-Count', count['count']);

            const results = await query;
            return res.json(results);

        } catch (error) {
            next(error);
        }
    },

    // Creating a new user
    async create(req, res, next) {
        // Extrating only the user_id, title from body to prevent errors in req.body's Json
        try {
            const { user_id, title } = req.body;

            await knex('projects')
                    .insert({ user_id, title });

            return res.status(201).send({ 
                message: "Projeto cadastrado com sucesso!"
            });
        } catch (error) {   
            //Catching error and going to server.js (don't know why)
            next(error)
        }
    },

    //Deleting an user
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await knex('users')
                    .del()
                    .where({ id });

            return res.send({
                message: "Usuário deletado com sucesso!"
            })

        } catch (error) {
            next(error);
        }
        
    }
}