import Knex from 'knex';
export const knex = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'tcs',
    password: 'tcs',
    database: 'tcs'
  }
});
export default knex;