import Knex from 'knex';
import db from './db';
export const knex = Knex(db);
export default knex;