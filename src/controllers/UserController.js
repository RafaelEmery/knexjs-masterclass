const knex = require('../database');

// Export for using in routes.js
// Async and await is another way to deal with Promises like '.then(...)'
// Steps: async + await + knex + return res
module.exports = {
    // Getting all the users
    async index(req, res) {
        const results = await knex('users').where('deleted_at', null);

        return res.json(results);
    },

    // Creating a new user
    async create(req, res, next) {
        // Extrating only the username from body to prevent errors in req.body's Json
        try {
            const { username } = req.body;

            await knex('users')
                    .insert({ username });

            return res.status(201).send({ 
                message: "Usuário cadastrado com sucesso!"
            });
        } catch (error) {
            //Catching error and going to server.js (don't know why)
            next(error)
        }
    },

    //Updating an user
    async update(req, res, next) {
        try {
            const { username } = req.body;

            //req.params is the '/users/:id'
            const { id } = req.params;

            await knex('users')
                    .update({ username })
                    .where({ id });
            
            return res.send({ 
                message: "Usuário atualizado com sucesso!"
            });
        } catch (error) {
            next(error);
        }
    },

    //Deleting an user
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await knex('users')
                    .update('deleted_at', new Date())
                    .where({ id })

            return res.send({
                message: "Usuário deletado com sucesso!"
            })

        } catch (error) {
            next(error);
        }
        
    }
}